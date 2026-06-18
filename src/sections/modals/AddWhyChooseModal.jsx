import { Plus, X } from "lucide-react";
import { useState } from "react"




export default function AddWhyChooseModal({isOpen, onClose, onAdd}) {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        icon: "",
        linkText: "",
        status: "draft"
     });

     const handleSubmit = (e) => {
        e.preventDefault();
        if (formData.title.trim()) {
            onAdd(formData);
            setFormData({
                title: "",
                description: "",
                icon: "",
                linkText: "",
                status: "draft"
            });
            onClose()
        }
     };

      if (!isOpen) return null;



  return (
    <div className="modal-overlay no-scrollbar">
      <div className="modal-panel">
        {/* Header */}
        <div className="modal-header">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Add Why Choose</h2>
            <p className="text-muted-foreground text-sm mt-1">Create a new Why Choose item</p>
          </div>
          <button
            onClick={onClose}
            className="icon-btn"
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Title *</label>
            <input
              type="text"
              placeholder="Enter title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="glass-input"
              required
            />
          </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Icon</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="glass-input"
              >
                <option value="">Select an icon</option>
                <option value="Heart">Heart</option>
                <option value="Users">Users</option>
                <option value="Award">Award</option>
                <option value="Check">Check</option>
                <option value="Shield">Shield</option>
                <option value="Globe">Globe</option>
                <option value="Star">Star</option>
                <option value="Zap">Zap</option>
              </select>
            </div>
        
          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Description</label>
            <textarea
              placeholder="Enter description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="glass-input resize-none h-32"
            />
          </div>


            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Link Text</label>
              <input
                type="text"
                placeholder="e.g., Learn More, Discover More"
                value={formData.linkText}
                onChange={(e) => setFormData({ ...formData, linkText: e.target.value })}
                className="glass-input"
              />
            </div>
          

          {/* Status */}
          <div>
            <label className="block text-sm font-semibold text-foreground mb-2">Status</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="published"
                  checked={formData.status === 'published'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-sm text-foreground">Published</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="status"
                  value="draft"
                  checked={formData.status === 'draft'}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-4 h-4 accent-accent"
                />
                <span className="text-sm text-foreground">Draft</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
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
              className="flex-1 btn-primary flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add 
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
