import { useEffect, useState, useCallback } from 'react';
import { Plus, Edit2, Trash2, Calendar, MapPin, Award, Loader2 } from 'lucide-react';
import AddProgramsModal from './modals/AddProgramsModal';
import EditProgramsModal from './modals/EditProgramsModal';
import { deleteProgramsData, getProgramsData } from '../services/api'; // আপনার এপিআই সার্ভিস অনুযায়ী পাথ এডজাস্ট করবেন

function ProgramsSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((index) => (
        <div key={index} className="border border-accent/10 rounded-xl bg-slate-200 p-6 flex gap-6 items-start animate-pulse">
          {/* Image Skeleton */}
          <div className="w-24 h-24 rounded-xl bg-muted flex-shrink-0" />
          
          {/* Content Skeleton */}
          <div className="flex-1 space-y-3 min-w-0">
            <div className="h-6 bg-muted rounded-md w-1/3" />
            <div className="h-5 bg-muted rounded-md w-1/4" />
            <div className="flex gap-4 pt-2">
              <div className="h-4 bg-muted rounded-md w-20" />
              <div className="h-4 bg-muted rounded-md w-24" />
            </div>
          </div>

          {/* Buttons Skeleton */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <div className="w-20 h-9 bg-muted rounded-lg" />
            <div className="w-24 h-9 bg-muted rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function ModernProgramsPage() {
  const [items, setItems] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
   const [deletingId, setDeletingId] = useState(null);

  const loadProgramsData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getProgramsData();
      setItems(response?.data?.data || response?.data || Array.isArray(response) ? response : []);
    } catch (error) {
      console.error("Error loading programs data:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    const fetchAsyncData = async () => {
      await loadProgramsData();
    };
    fetchAsyncData();
  }, [loadProgramsData]);

  const handleEdit = (id) => {
    setEditingId(id);
    setIsEditModalOpen(true);
  };

 const handleDelete = async (id) => {
   setDeletingId(id);
 
   try {
     await deleteProgramsData(id); 
     setItems(prevItems => prevItems.filter(item => item.id !== id));
   } catch (error) {
     console.error("Failed to delete:", error);
   } finally {
     setDeletingId(null)
   }
 };

   const handleAddItem = () => {
    loadProgramsData(); 
  };
  

  const editingItem = items.find(item => item.id === editingId);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title text-4xl font-bold text-foreground">Academic Programs</h1>
          <p className="page-subtitle text-muted-foreground">Manage degrees, universities, and student enrollment paths</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Program
        </button>
      </div>

      {/* Conditional Rendering UI */}
      {loading && items.length === 0 ? (
        <ProgramsSkeleton />
      ) : items.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">No programs found. Add some programs!</div>
      ) : (
        /* List Grid */
        <div className="space-y-4">
          {items.map((item) => (
            <div key={item.id} className="glass-card-hover group relative overflow-hidden border border-accent/10 rounded-xl bg-card/40">
              <div className="p-6 flex gap-6 items-start">
                
                {/* Image Section */}
                <div className="w-24 h-24 rounded-xl bg-muted overflow-hidden flex-shrink-0 border border-accent/10 relative">
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" 
                    onError={(e) => { e.target.src = 'https://placehold.co/100x100?text=No+Image'; }}
                  />
                  {item.trending === 1 && (
                    <span className="absolute top-1 left-1 bg-amber-500 text-white font-bold uppercase tracking-wider rounded px-1.5 py-0.5 text-[9px] flex items-center gap-0.5">
                      <Award size={10} /> Trending
                    </span>
                  )}
                </div>

                {/* Content Details */}
                <div className="flex-1 min-w-0">
                  <div className="mb-1 flex flex-wrap items-center gap-x-3 gap-y-1">
                    <h3 className="text-xl font-bold text-foreground leading-snug">{item.title}</h3>
                  </div>
                  
                  <p className="text-sm font-medium text-accent flex items-center gap-1 mb-3">
                    <MapPin size={14} /> {item.university} ({item.country})
                  </p>

                  {/* Badges Info */}
                  <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span className="px-2.5 py-1 rounded-md bg-accent/5 border border-accent/10 text-accent flex items-center gap-1 uppercase">
                      <Calendar size={12} /> {item.duration}
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-muted/60 border border-muted/20 flex items-center gap-1 uppercase">
                      {item.mode}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0 self-center">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="btn-secondary flex items-center gap-2 text-sm"
                  >
                    <Edit2 size={16} /> Edit
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
          ))}
        </div>
      )}

      {/* Add Modal Component */}
      <AddProgramsModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={handleAddItem}
      />

      {/* Edit Modal Component */}
      {isEditModalOpen && editingItem && (
        <EditProgramsModal
          item={editingItem}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingId(null);
          }}
          onRefresh={loadProgramsData}
        />
      )}
    </div>
  );
}