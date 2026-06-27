import { useCallback, useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, CheckCircle, Circle, Loader2 } from 'lucide-react';
import { teamMembers } from '../data/cms-data';
import EditTeamMember from './modals/EditTeamMember';
import AddTeamModal from './modals/AddTeamModal';
import { deleteTeamData, getTeamData } from '../services/api';
import TeamSkeleton from '../loader/TeamSkeleton';

export function TeamPage() {
  const [members, setMembers] = useState(teamMembers);
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const loadTeamData = useCallback(async () => {
    setLoading(true);
    try {
      const response = await getTeamData();
      const actualData = response?.data?.data || response?.data || response;
      setMembers(Array.isArray(actualData) ? actualData : []);
    } catch (error) {
      console.error("Error loading team data:", error);
    } finally {
      setLoading(false);
    }
  }, []);
  
  useEffect(() => {
    const fetchAsyncData = async () => {
      await loadTeamData();
    };
    fetchAsyncData();
  }, [loadTeamData]);

  const handleEdit = (id) => {
    setEditingId(id);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id) => {
    setDeletingId(id);
    try {
      await deleteTeamData(id); 
      setMembers(prevItems => prevItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Failed to delete:", error);
    } finally {
      setDeletingId(null);
    }
  };

  const editingMember = members.find(item => item.id === editingId);

  return (
    <div className="space-y-8">
      {/* Top Header Section */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Team Members</h1>
          <p className="page-subtitle">Manage your team and their roles</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={18} />
          Add Member
        </button>
      </div>

      {/* Loading State */}
      {loading && (
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[1, 2, 3].map((item) => (
            <TeamSkeleton key={item} />
          ))}
        </div>
      )}

      {/* Team Grid */}
      {!loading && (
        members.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-accent/10 rounded-2xl bg-card/30">
            <p className="text-muted-foreground text-sm">No team members found. Click 'Add Member' to create one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {members.map(member => (
              <div key={member.id} className="premium-card-hover p-6 flex flex-col justify-between bg-white dark:bg-zinc-900/40 rounded-2xl border border-slate-100 dark:border-zinc-800 shadow-sm">
                <div>
                  {/* Status Badge & Action Buttons */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-2">
                      {member.status === 1 ? (
                        <CheckCircle size={18} className="text-success" />
                      ) : (
                        <Circle size={18} className="text-muted-foreground" />
                      )}
                      <span className="text-xs text-muted-foreground capitalize">
                        {member.status === 1 ? 'active' : 'inactive'}
                      </span>
                    </div>
                    
                    <div className="flex gap-1">
                      <button 
                        onClick={() => handleEdit(member.id)}
                        className="icon-btn p-1.5"
                      >
                        <Edit2 size={14} />
                      </button>
                      <button 
                        disabled={deletingId === member.id}
                        onClick={() => handleDelete(member.id)}
                        className="icon-btn p-1.5 hover:text-destructive flex items-center justify-center"
                      >
                        {deletingId === member.id ? (
                          <Loader2 size={14} className="animate-spin" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Avatar Section */}
                  <div className="relative w-14 h-14 mb-4">
                    <div className="w-full h-full rounded-xl overflow-hidden ring-2 ring-accent/20 shadow-glow bg-slate-50">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    {member.status === 1 && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success border-2 border-white dark:border-zinc-900 rounded-full" />
                    )}
                  </div>

                  {/* Info Details */}
                  <h3 className="font-semibold text-foreground">{member.name}</h3>
                  <p className="text-sm text-accent mt-1">{member.role}</p>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2 min-h-[2rem]">
                    {member.bio || "No bio available."}
                  </p>
                </div>

                {/* 🛠️ ফিক্সড জোন: এখানে Lucide আইকনের বদলে র-SVG ব্যবহার করা হলো */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-100 dark:border-zinc-800/60 text-muted-foreground">
                  {member.linkedin_url && (
                    <a 
                      href={member.linkedin_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1.5 text-xs hover:text-[#0077B5] dark:hover:text-blue-400 transition-colors group"
                    >
                      {/* LinkedIn SVG */}
                      <svg className="w-3.5 h-3.5 fill-[#0077B5] dark:fill-blue-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <span className="group-hover:underline">LinkedIn</span>
                    </a>
                  )}
                  
                  {member.whatsapp_url && (
                    <a 
                      href={member.whatsapp_url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-1.5 text-xs hover:text-[#25D366] dark:hover:text-green-400 transition-colors group"
                    >
                      {/* WhatsApp SVG */}
                      <svg className="w-3.5 h-3.5 fill-[#25D366] dark:fill-green-400" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                      <span className="group-hover:underline">WhatsApp</span>
                    </a>
                  )}
                </div>

              </div>
            ))}
          </div>
        )
      )}

      {/* Add Modal */}
      <AddTeamModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onAdd={loadTeamData}
      />

      {/* Edit Modal */}
      {isEditModalOpen && editingMember && (
        <EditTeamMember 
          member={editingMember}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingId(null);
          }}
          onRefresh={loadTeamData}
        />
      )}
    </div>
  );
}