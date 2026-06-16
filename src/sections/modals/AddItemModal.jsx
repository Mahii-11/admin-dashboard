import { X, Plus } from 'lucide-react';
import { useState } from 'react';

export function AddItemModal({ isOpen, onClose, itemType, onAdd }) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    icon: '',
    linkText: '',
    status: 'draft'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
      onAdd(formData);
      setFormData({ title: '', description: '', icon: '', linkText: '', status: 'draft' });
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 no-scrollbar">
      <div className="bg-card border border-border rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border px-8 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Add {itemType}</h2>
            <p className="text-muted-foreground text-sm mt-1">Create a new {itemType.toLowerCase()} item</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
            aria-label="Close"
          >
            <X size={24} className="text-muted-foreground" />
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

          {itemType === 'Why Choose Item' && (
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Icon</label>
              <select
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="glass-input "
              >
                <option className='bg-slate-900 text-white' value="">Select an icon</option>
                <option className='bg-slate-900 text-white' value="Heart">Heart</option>
                <option className='bg-slate-900 text-white' value="Users">Users</option>
                <option className='bg-slate-900 text-white' value="Award">Award</option>
                <option className='bg-slate-900 text-white' value="Check">Check</option>
                <option className='bg-slate-900 text-white' value="Shield">Shield</option>
                <option className='bg-slate-900 text-white' value="Globe">Globe</option>
                <option className='bg-slate-900 text-white' value="Star">Star</option>
                <option className='bg-slate-900 text-white' value="Zap">Zap</option>
              </select>
            </div>
          )}

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

          {/* Link Text (for Why Choose) */}
          {itemType === 'Why Choose Item' && (
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
          )}

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
                  className="w-4 h-4"
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
                  className="w-4 h-4"
                />
                <span className="text-sm text-foreground">Draft</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-6 border-t border-border">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 rounded-lg border border-border text-foreground hover:bg-muted transition-colors font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 rounded-lg bg-accent hover:bg-accent/90 text-accent-foreground transition-colors font-medium flex items-center justify-center gap-2"
            >
              <Plus size={18} />
              Add {itemType}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
