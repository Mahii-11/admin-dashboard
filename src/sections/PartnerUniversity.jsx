import { useEffect, useState, useCallback } from "react"; 
import { Plus, Trash2, Loader2, Image as ImageIcon, Edit2 } from "lucide-react";
import { deletePartnerUniData, getPartnerUniData } from "../services/api";
import HighlightCardSkeleton from "../loader/HighlightCardSkeleton";
import AddPartnerUniversity from "./modals/AddPartnerUniversity";
import EditPartnerUniversity from "./modals/EditPartnerUniversity";


const IMAGE_BASE_URL = "https://education.banglatechsolutionit.com"; 

export default function PartnerUniversity() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deletingId, setDeletingId] = useState(null); 

  const loadPartnerUni = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getPartnerUniData();
      console.log("Fetched Partner Uni Cards Data:", response);
      
      // 🛠️ লারাভেল প্যাজিনেশন ডাটা স্ট্রাকচার ফিক্স (response.data.data)
      if (response && response.data && Array.isArray(response.data.data)) {
        setItems(response.data.data);
      } else if (Array.isArray(response)) {
        setItems(response);
      } else {
        setItems([]);
      }
      setError(null);
    } catch (error) {
      console.error("Error loading Partner Uni cards data:", error);
      setError("Failed to load Partner Uni cards.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchAsyncData = async () => {
      await loadPartnerUni();
    };
    fetchAsyncData();
  }, [loadPartnerUni]);

  const handleEdit = (id) => {
    setEditingId(id);
    setIsEditModalOpen(true);
  };

  const handleAddItem = () => {
    loadPartnerUni(); 
  };

  const handleDelete = async (id) => {
    setDeletingId(id); 
    try {
      await deletePartnerUniData(id);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    } catch (err) {
      console.error("Delete Error:", err);
      alert(err.message || "Failed to delete item.");
    } finally {
      setDeletingId(null); 
    }
  };

  // 🛠️ loose equality (==) ব্যবহার করা হয়েছে যাতে স্ট্রিং বা নাম্বারের টাইপ মিসম্যাচ না হয়
  const editingItem = items.find((item) => item.id == editingId);

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Top Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Partner Cards</h1>
          <p className="text-muted-foreground text-sm mt-1">Manage the visual feature partner elements</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add New Partner University Card
        </button>
      </div>

      <hr className="section-divider" />

      {/* Loading & Error States */}
      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <HighlightCardSkeleton key={n} />
          ))}
        </div>
      )}

      {error && !loading && (
        <div className="p-4 bg-destructive/10 border border-destructive/20 text-destructive rounded-xl text-center">
          {error}
        </div>
      )}

      {/* Grid List View */}
      {!loading && !error && (
        items.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-accent/10 rounded-2xl bg-card/30">
            <p className="text-muted-foreground">No highlight cards available. Click 'Add New Card' to create one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div
                key={item.id}
                className="group relative flex flex-col justify-between bg-card hover:bg-card/80 rounded-2xl border border-accent/10 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-accent/20 via-accent/40 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                <div className="p-5 space-y-4">
                  <div className="w-full h-44 rounded-xl overflow-hidden bg-muted flex items-center justify-center border border-accent/5 relative">
                    
            
                    {item.logo ? (
                      <img
                        src={
                          item.logo.startsWith("http")
                            ? item.logo
                            : item.logo.startsWith("/")
                            ? `${IMAGE_BASE_URL}${item.logo}`
                            : `${IMAGE_BASE_URL}/storage/${item.logo}` // যদি শুধু ফাইলের নাম থাকে তবে লারাভেলের ডিফল্ট স্টোরেজ ডিরেক্টরি
                        }
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = "https://placehold.co/400x300?text=Logo+Not+Found";
                        }}
                      />
                    ) : (
                      <ImageIcon size={32} className="text-muted-foreground/60" />
                    )}

                    <div className="absolute top-3 right-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-semibold backdrop-blur-md shadow-sm bg-green-500/10 text-green-500 border border-green-500/20">
                        Active
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <h3 className="font-bold text-lg text-foreground tracking-tight line-clamp-2 min-h-[3.5rem] group-hover:text-accent transition-colors">
                      {item.name}
                    </h3>
                  </div>
                </div>

                <div className="px-5 py-4 bg-muted/30 border-t border-accent/5 flex items-center justify-between gap-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-card hover:bg-muted border border-accent/10 rounded-xl shadow-sm transition-all"
                  >
                    <Edit2 size={15} />
                    <span>Edit Details</span>
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    disabled={deletingId === item.id}
                    className="p-2 text-destructive hover:text-white bg-destructive/5 hover:bg-destructive border border-destructive/10 hover:border-transparent rounded-xl transition-all flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {deletingId === item.id ? (
                      <Loader2 size={16} className="animate-spin" />
                    ) : (
                      <Trash2 size={16} />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )
      )}

      {/* Add Entry Modal Overlay */}
      <AddPartnerUniversity
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddItem} 
      />

      {/* Edit Entry Modal Overlay */}
      {isEditModalOpen && editingItem && (
        <EditPartnerUniversity
          isOpen={isEditModalOpen} // 🛠️ প্রপ্স পাস নিশ্চিত করা হলো
          item={editingItem}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingId(null);
          }}
          onRefresh={loadPartnerUni}
        />
      )}
    </div>
  );
}