import { useEffect, useState, useCallback } from 'react';
import { Plus, Edit2, Trash2, Loader2 } from 'lucide-react';
import * as Icons from 'react-icons/fa';
import { deleteStudyStepUniData, getStudyStepData } from '../services/api'; 
import WhyChooseSkeleton from '../loader/WhyChooseSkeleton';
import EditStudyStepModal from './modals/EditStudyStepModal';
import AddStudyStepModal from './modals/AddStudyStepModal';


const iconMap = {
  FaPassport: Icons.FaPassport,
  FaFileAlt: Icons.FaFileAlt,
  FaUniversity: Icons.FaUniregistry,
  FaGraduationCap: Icons.FaGraduationCap,
  FaWallet: Icons.FaWallet,
};



export default  function StudyStepPage() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false); 
  const [deletingId, setDeletingId] = useState(null);

  const loadStudyStepData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getStudyStepData();
      console.log("Fetched Why Choose Data:", data);
      setItems(Array.isArray(data) ? data : data?.data || []);
    } catch (error) {
      console.error("Error loading why choose data:", error);
    } finally {
      setLoading(false);
    }
  }, []);

 useEffect(() => {
    const fetchAsyncData = async () => {
      await loadStudyStepData();
    };
    fetchAsyncData();
  }, [loadStudyStepData]);

  const handleEdit = (id) => {
    setEditingId(id);
    setIsEditModalOpen(true);
  };

const handleDelete = async (id) => {
  setDeletingId(id);

  try {
    await deleteStudyStepUniData(id); 
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  } catch (error) {
    console.error("Failed to delete:", error);
  } finally {
    setDeletingId(null)
  }
};

  const handleAddItem = () => {
    loadStudyStepData(); 
  };
  

  const editingItem = items.find(item => item.id === editingId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title text-4xl">Study Step</h1>
          <p className="page-subtitle">Manage your key selling points and value propositions</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Study Step
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
            const IconComponent = iconMap[item.icon] ;
            
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
                      <Icons.FaWallet size={32} className="text-accent" />
                    )}
                  </div>

                  {/* Content Area */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-foreground mb-1">{item.title}</h3>
                      </div>
                    </div>

                    {/* Description */}
                    <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>

                  

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
      <AddStudyStepModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />

      {/* Edit Modal */}
      {isEditModalOpen && editingItem && (
        <EditStudyStepModal 
          item={editingItem}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingId(null);
          }}
          onRefresh={loadStudyStepData} 
        />
      )}
    </div>
  );
}
