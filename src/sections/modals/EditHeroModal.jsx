import  { useState } from 'react';
import { X, Upload, AlignLeft, AlignCenter } from 'lucide-react';

export function EditHeroModal({ hero, onSave, onClose }) {
   const [imagePreview, setImagePreview] = useState(null);
  const [formData, setFormData] = useState({
    title: hero.title,
    subtitle: hero.subtitle,
    cta: hero.cta || 'Get Started',
    ctaLink: hero.ctaLink || '#',
    alignment: hero.alignment || 'left'
  });

 const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
    setImagePreview(URL.createObjectURL(file));

     setFormData(prev => ({
      ...prev,
      image: URL.createObjectURL(file)
    }));


    }};

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => (
            {
                ...prev,
                [name]: value
            }
        ));
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
          <h2 className="text-2xl font-bold text-foreground">Edit Hero Section</h2>
          <button
            onClick={onClose}
            className="icon-btn"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Hero Image
            </label>

            <label className="upload-zone min-h-[180px] flex flex-col items-center justify-center">
              {imagePreview ? (
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-32 h-32 rounded-full object-cover"
                />
              ) : (
                <>
                  <Upload size={40} className="mb-3 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    Click to upload image
                  </span>
                </>
              )}

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
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
  );
}
