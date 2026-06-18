import  { useState } from 'react';
import { X } from 'lucide-react';

export function EditWhyChooseModal({ item, onClose, onSave }) {
  const [formData, setFormData] = useState({
    title: item.title,
    description: item.description,
    linkText: item.linkText,
    icon: item.icon,
    status: item.status
  });

  const iconOptions = ['Heart', 'Users', 'Award', 'Check', 'Shield', 'Globe'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay p-4">
      <div className="modal-panel">
        {/* Header */}
        <div className="modal-header">
          <h2 className="text-2xl font-bold text-foreground">Edit Why Choose Item</h2>
          <button
            onClick={onClose}
            className="icon-btn"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="e.g., Loved by students"
              className="glass-input"
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Icon
            </label>
            <select
              name="icon"
              value={formData.icon}
              onChange={handleChange}
              className="glass-input"
            >
              <option value="">Select an icon</option>
              {iconOptions.map(icon => (
                <option key={icon} value={icon}>{icon}</option>
              ))}
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter the description"
              rows="4"
              className="glass-input resize-none"
            />
          </div>

          {/* Link Text */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Link Text
            </label>
            <input
              type="text"
              name="linkText"
              value={formData.linkText}
              onChange={handleChange}
              placeholder="e.g., Learn More, Discover, Read More"
              className="glass-input"
            />
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="glass-input"
            >
              <option value="published">Published</option>
              <option value="draft">Draft</option>
            </select>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t section-divider">
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
  );
}
