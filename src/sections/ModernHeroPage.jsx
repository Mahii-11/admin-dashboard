import  { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { heroData } from '../data/cms-data';
import { EditHeroModal } from './modals/EditHeroModal';
import AddHeroModal from './modals/AddHeroModal';


export function ModernHeroPage() {
  const [heroes, setHeroes] = useState(heroData);
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEdit = (id) => {
    setEditingId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setHeroes(heroes.filter(h => h.id !== id));
  };

  const handleSave = (updatedData) => {
    setHeroes(heroes.map(h => h.id === editingId ? { ...h, ...updatedData } : h));
    setIsEditModalOpen(false);
    setEditingId(null);
  };

  const handleAddHero = (newData) => {
    const newId = Math.max(...heroes.map(h => h.id), 0) + 1;
    setHeroes([...heroes, { ...newData, id: newId, createdAt: new Date().toISOString().split('T')[0] }]);
  };

  const toggleVisibility = (id) => {
    setHeroes(heroes.map(h => 
      h.id === id ? { ...h, status: h.status === 'published' ? 'draft' : 'published' } : h
    ));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title text-4xl">Hero Sections</h1>
          <p className="page-subtitle">Manage your website hero sections with premium editing experience</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Hero
        </button>
      </div>

      {/* Hero Cards Grid */}
      <div className="space-y-4">
        {heroes.map(hero => (
          <div
            key={hero.id}
            className="glass-card-hover group relative overflow-hidden"
          >
            <div className="p-6 flex gap-6">
              <div className="w-40 h-40 rounded-xl flex-shrink-0 overflow-hidden border border-border shadow-premium">
                {hero.image ? (
                  <img
                    src={hero.image}
                    alt={hero.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-accent/20 to-accent/5 text-accent/50">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-foreground mb-1">{hero.title}</h3>
                      <p className="text-muted-foreground text-sm line-clamp-2">{hero.subtitle}</p>
                    </div>
                    <span className={`flex-shrink-0 whitespace-nowrap ${
                      hero.status === 'published' ? 'badge-success' : 'badge-warning'
                    }`}>
                      {hero.status === 'published' ? '● Live' : '● Draft'}
                    </span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex gap-6 my-4 pb-4 border-b section-divider">
                  <div>
                    <div className="text-xs text-muted-foreground">Created</div>
                    <div className="text-sm font-medium text-foreground">
                      {new Date(hero.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                  <div>
                    <div className="text-xs text-muted-foreground">Modified</div>
                    <div className="text-sm font-medium text-foreground">
                      {new Date(hero.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => handleEdit(hero.id)}
                    className="btn-secondary flex items-center gap-2 flex-1"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => toggleVisibility(hero.id)}
                    className="glass-button flex items-center gap-2 flex-1"
                  >
                    {hero.status === 'published' ? <Eye size={16} /> : <EyeOff size={16} />}
                    {hero.status === 'published' ? 'Hide' : 'Show'}
                  </button>
                  <button
                    onClick={() => handleDelete(hero.id)}
                    className="glass-button text-destructive hover:bg-destructive/10 flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Modal */}
      <AddHeroModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddHero}
      />

      {/* Edit Modal */}
      {isEditModalOpen && (
        <EditHeroModal
          hero={heroes.find(h => h.id === editingId)}
          onSave={handleSave}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingId(null);
          }}
        />
      )}
    </div>
  );
}
