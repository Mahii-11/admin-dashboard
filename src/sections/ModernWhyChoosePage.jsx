import  { useState } from 'react';
import { Plus, Edit2, Trash2, Eye, EyeOff } from 'lucide-react';
import { whyChooseData } from '../data/cms-data';
import { EditWhyChooseModal } from './modals/EditWhyChooseModal';
import { AddItemModal } from './modals/AddItemModal';
import * as Icons from 'lucide-react';

const iconMap = {
  Heart: Icons.Heart,
  Users: Icons.Users,
  Award: Icons.Award,
  Check: Icons.Check,
  Shield: Icons.Shield,
  Globe: Icons.Globe,
  Star: Icons.Star,
  Zap: Icons.Zap,
};

export function ModernWhyChoosePage() {
  const [items, setItems] = useState(whyChooseData);
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEdit = (id) => {
    setEditingId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  const handleSave = (updatedData) => {
    setItems(items.map(item => item.id === editingId ? { ...item, ...updatedData } : item));
    setIsEditModalOpen(false);
    setEditingId(null);
  };

  const handleAddItem = (newData) => {
    const newId = Math.max(...items.map(i => i.id), 0) + 1;
    setItems([...items, { ...newData, id: newId, createdAt: new Date().toISOString().split('T')[0] }]);
  };

  const toggleVisibility = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, status: item.status === 'published' ? 'draft' : 'published' } : item
    ));
  };

  const editingItem = items.find(item => item.id === editingId);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-bold text-foreground mb-2">Why Choose Us</h1>
          <p className="text-muted-foreground">Manage your key selling points and value propositions</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="glass-button bg-accent hover:bg-accent/90 text-white border-accent flex items-center gap-2"
        >
          <Plus size={18} />
          Add Why Choose
        </button>
      </div>

      {/* Cards Grid */}
      <div className="space-y-4">
        {items.map(item => {
          const IconComponent = iconMap[item.icon];
          
          return (
            <div
              key={item.id}
              className="glass-card-hover group relative overflow-hidden "
            >
              <div className="p-6 flex gap-6 items-start">
                {/* Icon Area */}
                <div className="w-16 h-16 rounded-lg bg-accent/20 flex-shrink-0 flex items-center justify-center border border-accent/30">
                  {IconComponent && (
                    <IconComponent size={32} className="text-accent" />
                  )}
                </div>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                      <span className={`inline-block text-xs px-3 py-1 rounded-full font-medium ${
                        item.status === 'published'
                          ? 'bg-green-500/20 text-green-400'
                          : 'bg-amber-500/20 text-amber-400'
                      }`}>
                        {item.status === 'published' ? '● Published' : '● Draft'}
                      </span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

                  {/* Link Text */}
                  <div className="mb-4">
                    <span className="text-xs text-accent font-medium">{item.linkText}</span>
                  </div>

                  {/* Meta Info */}
                  <div className="text-xs text-muted-foreground mb-4">
                    Created {new Date(item.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => toggleVisibility(item.id)}
                    className="p-2 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
                    title={item.status === 'published' ? 'Hide' : 'Show'}
                  >
                    {item.status === 'published' ? (
                      <Eye size={18} />
                    ) : (
                      <EyeOff size={18} />
                    )}
                  </button>
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="px-4 py-2 bg-accent/10 hover:bg-accent/20 text-accent rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
                  >
                    <Edit2 size={16} />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      <AddItemModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        itemType="Why Choose Item"
        onAdd={handleAddItem}
      />

      {/* Edit Modal */}
      {isEditModalOpen && editingItem && (
        <EditWhyChooseModal
          item={editingItem}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingId(null);
          }}
          onSave={handleSave}
        />
      )}
    </div>
  );
}
