import { Plus, Upload, X } from "lucide-react";
import { useState } from "react";
import { storeHighlightCardData } from "../../services/api"; 

export default function AddHighlightCardModal({ isOpen, onClose, onAdd }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [preview, setPreview] = useState(null);
  
  const [formData, setFormData] = useState({
    title: "",
    image: null,
    status: 1
  });

  if (!isOpen) return null;
  
  const handleChange = (e) => {
    const { name, value, files, type } = e.target;

    if (type === "file") {
      const file = files[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file);
        setPreview(imageUrl); // UI-তে দেখানোর জন্য
        setFormData((prev) => ({
          ...prev,
          [name]: file, // বাইনারি ফাইল অবজেক্ট
        }));
      }
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // ফাইল হ্যান্ডেল করার জন্য FormData আর্কিটেকচার
      const dataToSend = new FormData();
      dataToSend.append("title", formData.title);
      dataToSend.append("status", formData.status);
      
      if (formData.image) {
        dataToSend.append("image", formData.image);
      }

      const response = await storeHighlightCardData(dataToSend);
      if (response) {
        // ফর্ম ক্লিয়ার করা
        setFormData({ title: "", image: null, status: 1 });
        setPreview(null);
        if (onAdd) onAdd(); // লিস্ট রিফ্রেশ করার জন্য
        onClose();
      }
    } catch (err) {
      console.error("Store error:", err);
      setError(err.message || "Failed to add new highlight card.");
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setPreview(null);
    onClose();
  };

  return (
    <div className="modal-overlay no-scrollbar">
      <div className="modal-panel max-w-xl">
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Add Highlight Card</h2>
            <p className="text-muted-foreground text-sm mt-1">Create a new visual highlight feature card</p>
          </div>
          <button onClick={handleCloseModal} className="icon-btn" disabled={loading}>
            <X size={24} />
          </button>
        </div>

        {error && (
          <div className="mx-6 mt-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-sm">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-5">
          
          {/* Card Title */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Card Title *</label>
            <input
              type="text"
              name="title"
              placeholder="e.g., Why Choose Eduvisors, Partner Universities"
              value={formData.title}
              onChange={handleChange}
              className="glass-input"
              required
              disabled={loading}
            />
          </div>

          {/* Image Upload Zone */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Card Image *</label>
            <label className="upload-zone group block cursor-pointer border-2 border-dashed border-accent/20 rounded-xl p-6 text-center hover:bg-accent/5 transition-all">
              {preview ? (
                <div className="relative">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity rounded-lg">
                    <p className="text-white text-sm font-medium">Change Image</p>
                  </div>
                </div>
              ) : (
                <>
                  <Upload size={32} className="mx-auto mb-2 text-muted-foreground group-hover:text-accent transition-colors" />
                  <p className="text-foreground font-medium">Drag and drop your image</p>
                  <p className="text-muted-foreground text-sm">or click to select</p>
                </>
              )}

              <input
                type="file"
                name="image"
                accept="image/*"
                onChange={handleChange}
                className="hidden"
                disabled={loading}
                required
              />
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t section-divider">
            <button type="button" onClick={handleCloseModal} className="flex-1 btn-ghost" disabled={loading}>
              Cancel
            </button>
            <button type="submit" className="flex-1 btn-primary flex items-center justify-center gap-2" disabled={loading}>
              <Plus size={18} />
              {loading ? "Adding..." : "Add Card"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}