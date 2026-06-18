import { Upload, X } from "lucide-react";
import { useState } from "react"


export default function AddTeamModal({isOpen, onClose, onAdd}) {
    const [preview, setPreview] = useState(null);
    const [form, setForm] = useState({

        name: "",
        role: "",
        bio: "",
        email: "",
        image: ""
    })


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
        if (form.name.trim()) {
        onAdd(form);
        setForm({
             name: "",
             role: "",
             bio: "",
             email: "",
             image: "",
             

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
            <h2 className="text-2xl font-bold text-foreground">Add Team Member</h2>
            <p className="text-muted-foreground text-sm mt-1">Create a new team member</p>
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

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                className="glass-input"
                placeholder="Enter member name"
              />
            </div>

              <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Role</label>
              <input
                type="text"
                name="role"
                value={form.role}
                onChange={handleChange}
                className="glass-input"
                placeholder="Enter role"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Bio</label>
              <textarea
                name="bio"
                value={form.bio}
                onChange={handleChange}
                className="glass-input resize-none h-24"
                placeholder="Enter bio"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">Email</label>
                <input
                  type="text"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  className="glass-input"
                  placeholder="e.g., name@company.com"
                />
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
