import { Edit2, Loader2, Plus, Trash2 } from 'lucide-react';
import { useCallback, useEffect, useState } from 'react';
import * as Icons from 'react-icons/lu';
import { deleteSupportData, getSupportData } from '../services/api';
import EditSupportModal from './modals/EditSupportModal';
import AddSupportModal from './modals/AddSupportModal';
import WhyChooseSkeleton from '../loader/WhyChooseSkeleton';

const iconMap = {

     Flame: Icons.LuFlame,
     GraduationCap: Icons.LuGraduationCap,
     Users: Icons.LuUsers,
     Wrench: Icons.LuWrench,
     FileText: Icons.LuFileText,
}

export default function OurSupportedCard() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [deletingId, setDeletingId] = useState(null);


  const loadSupportedData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getSupportData();
      console.log("Fetched Support Data Data:", data);
      setItems(Array.isArray(data) ? data : data?.data || []);
    } catch (error) {
      console.error("Error loading Support Data data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

 useEffect(() => {
    const fetchAsyncData = async () => {
      await loadSupportedData();
    };
    fetchAsyncData();
  }, [loadSupportedData]);

  const handleEdit = (id) => {
    setEditingId(id);
    setIsEditModalOpen(true);
  };

const handleDelete = async (id) => {
  setDeletingId(id);

  try {
    await deleteSupportData(id); 
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  } catch (error) {
    console.error("Failed to delete:", error);
  } finally {
    setDeletingId(null)
  }
};

  const handleAddItem = () => {
    loadSupportedData(); 
  };
  

  const editingItem = items.find(item => item.id === editingId);


  return (
     <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title text-4xl">Support Data Us</h1>
          <p className="page-subtitle">Manage your key selling points and value propositions</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Support Data
        </button>
      </div>

      {/* Loading & Empty State */}
      {loading && items.length === 0 ? (
        <WhyChooseSkeleton />
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No items found. Add some data!</div>
      ) : (
        /* Cards Grid */
        <div className="space-y-4">
          {items.map(item => {
            const IconComponent = iconMap[item.icon];
            
            return (
              <div
                key={item.id}
                className="glass-card-hover group relative overflow-hidden"
              >
                <div className="p-6 flex gap-6 items-start">
                  {/* Icon Area */}
                   <div className="w-16 h-16 rounded-xl bg-accent/10 flex-shrink-0 flex items-center justify-center border border-accent/20">
                    {IconComponent ? (
                      <IconComponent size={32} className="text-accent" />
                    ) : (
                      <Icons.LuUsers size={32} className="text-accent" />
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                      </div>
                    </div>

                  

                    {/* Meta Info */}
                    <div className="text-xs text-muted-foreground mb-4">
                      Created {item.created_at ? new Date(item.created_at).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      }) : 'N/A'}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                   
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="btn-secondary flex items-center gap-2 text-sm"
                    >
                      <Edit2 size={16} />
                      Edit
                    </button>
                    <button
                      disabled={deletingId === item.id}
                      onClick={() => handleDelete(item.id)}
                      className="px-4 py-2 bg-destructive/10 hover:bg-destructive/20 text-destructive rounded-lg transition-colors font-medium text-sm flex items-center gap-2"
                    >
                      {deletingId === item.id ? (
                        <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>Deleting...</span>
                        </>

                      ) : (

                        <>
                        <Trash2 size={16} />
                        <span>Delete</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Modal */}
      <AddSupportModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />

      {/* Edit Modal */}
      {isEditModalOpen && editingItem && (
        <EditSupportModal
          item={editingItem}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingId(null);
          }}
          onRefresh={loadSupportedData} 
        />
      )}
    </div>
  )
}
