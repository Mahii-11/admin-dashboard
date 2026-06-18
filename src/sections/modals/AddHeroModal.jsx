import { AlignCenter, AlignLeft, Upload, X } from "lucide-react";
import { useState } from "react"

export default function AddHeroModal({isOpen, onClose, onAdd}) {
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({
           title: "",
           subtitle: "",
           image: "",
           cta: "",
           ctaLink: "",
           alignment: "left",
           status: "draft"
           });
             
        const handleChange = (e) => {
  const { name, value, files, type } = e.target;

  if (type === "file") {
    const file = files[0];
    const imageUrl = URL.createObjectURL(file);

    setForm(prev => ({
      ...prev,
      [name]: imageUrl
    }));

    setPreview(imageUrl);
  } else {
    setForm(prev => ({
      ...prev,
      [name]: value
    }));
  }
};

    const handleSubmit = (e) => {
        e.preventDefault();
        if (form.title.trim()) {
        onAdd(form);
        setForm({
             title: "",
             subtitle: "",
             image: "",
             cta: "",
             ctaLink: "",
             alignment: "left",
             status: "draft"

            });
        onClose();
            
        }
    };

     if (!isOpen) return null;



  return (
    <div className="modal-overlay no-scrollbar">
      <div className="modal-panel">
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Add Hero Section</h2>
            <p className="text-muted-foreground text-sm mt-1">Create a new Hero Data</p>
          </div>
          <button
            onClick={onClose}
            className="icon-btn"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image Upload */}
            <div>
           <label className="upload-zone group block">

  {preview ? (
    <img
      src={preview}
      alt="Preview"
      className="w-full h-48 object-cover rounded-lg"
    />
  ) : (
    <>
      <Upload
        size={32}
        className="mx-auto mb-2 text-muted-foreground group-hover:text-accent transition-colors"
      />

      <p className="text-foreground font-medium">
        Drag and drop your image
      </p>

      <p className="text-muted-foreground text-sm">
        or click to select
      </p>
    </>
  )}

  <input
    type="file"
    name="image"
    accept="image/*"
    onChange={handleChange}
    className="hidden"
  />
</label>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                className="glass-input"
                placeholder="Enter hero title"
              />
            </div>

            {/* Subtitle */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Subtitle</label>
              <textarea
                name="subtitle"
                value={form.subtitle}
                onChange={handleChange}
                className="glass-input resize-none h-24"
                placeholder="Enter hero subtitle"
              />
            </div>

            {/* CTA Section */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Button Text</label>
                <input
                  type="text"
                  name="cta"
                  value={form.cta}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="e.g., Get Started"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Button Link</label>
                <input
                  type="text"
                  name="ctaLink"
                  value={form.ctaLink}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="e.g., /contact"
                />
              </div>
            </div>

            {/* Alignment */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Content Alignment</label>
              <div className="flex gap-3">
                {[
                  { value: 'left', label: 'Left', icon: AlignLeft },
                  { value: 'center', label: 'Center', icon: AlignCenter }
                ].map(option => {
                  const Icon = option.icon;
                  return (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setForm(prev => ({ ...prev, alignment: option.value }))}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        form.alignment === option.value
                          ? 'btn-secondary'
                          : 'glass-button'
                      }`}
                    >
                      <Icon size={18} />
                      {option.label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-6 border-t section-divider">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 btn-ghost"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 btn-primary"
              >
                Save Changes
              </button>
            </div>
          </form>

      </div>
    </div>
  )
}
