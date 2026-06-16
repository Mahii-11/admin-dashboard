import  { useState } from 'react';
import { X, Upload, AlignLeft, AlignCenter } from 'lucide-react';

export function EditHeroModal({ hero, onSave, onClose }) {
  const [formData, setFormData] = useState({
    title: hero.title,
    subtitle: hero.subtitle,
    cta: hero.cta || 'Get Started',
    ctaLink: hero.ctaLink || '#',
    alignment: hero.alignment || 'left'
  });

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
    <>
      {/* Overlay */}
      <div className=" fixed inset-0 bg-black/40 backdrop-blur-sm z-40" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
        <div className="glass-card w-full max-w-2xl max-h-[90vh] overflow-y-auto no-scrollbar">
          {/* Header */}
          <div className="sticky top-0 flex items-center justify-between p-6 border-b border-white/10 bg-white/5 backdrop-blur-md">
            <h2 className="text-2xl font-bold text-foreground">Edit Hero Section</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors text-muted-foreground hover:text-foreground"
            >
              <X size={24} />
            </button>
          </div>

          {/* Content */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Image Upload */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-3">Hero Image</label>
              <div className="glass-card border-2 border-dashed border-white/20 hover:border-accent/50 transition-all p-8 text-center cursor-pointer group">
                <Upload size={32} className="mx-auto mb-2 text-muted-foreground group-hover:text-accent transition-colors" />
                <p className="text-foreground font-medium">Drag and drop your image</p>
                <p className="text-muted-foreground text-sm">or click to select</p>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2">Title</label>
              <input
                type="text"
                name="title"
                value={formData.title}
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
                value={formData.subtitle}
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
                  value={formData.cta}
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
                  value={formData.ctaLink}
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
                      onClick={() => setFormData(prev => ({ ...prev, alignment: option.value }))}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
                        formData.alignment === option.value
                          ? 'glass-card bg-accent/20 border-accent/50'
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
            <div className="flex gap-3 pt-6 border-t border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 glass-button text-muted-foreground hover:text-foreground"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 glass-button bg-accent/20 text-accent hover:bg-accent/30 border-accent/50 font-semibold"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
