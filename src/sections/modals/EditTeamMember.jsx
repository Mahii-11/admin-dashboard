import { useState } from "react";
import { X, Upload } from "lucide-react";


export default function EditTeamMember({onClose, onSave, member}) {

    const [formData, setFormData] = useState(
        {
            name: member.name,
            role: member.role,
            email: member.email,
            image: member.image,
            bio: member.bio

        }
    );

    const [imagePreview, setImagePreview] = useState(null);

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
          <h2 className="text-2xl font-bold text-foreground">Edit Team Member</h2>
          <button
            onClick={onClose}
            className="icon-btn"
          >
            <X size={24} />
          </button>
        </div>

        <form className="p-6 space-y-6" onSubmit={handleSubmit}>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Name
              </label>
              <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name..."
              className="glass-input"
            />
            </div>

            <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Role
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="Enter the Role"
              className="glass-input"
            />
          </div>

           <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Bio
            </label>
            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              placeholder="Enter the description"
              rows="4"
              className="glass-input resize-none"
            />
          </div>


             <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Email
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter the Email"
              className="glass-input"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Profile Image
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
  )
}
