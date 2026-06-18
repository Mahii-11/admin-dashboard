import  { useState } from 'react';
import { Plus, Mail, Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';
import { teamMembers } from '../data/cms-data';
import EditTeamMember from './modals/EditTeamMember';
import AddTeamModal from './modals/AddTeamModal';


export function TeamPage() {
  const [members, setMembers] = useState(teamMembers);
  const [editingId, setEditingId] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const handleEdit = (id) => {
    setEditingId(id);
    setIsEditModalOpen(true);
  }

  const handleSave = (updatedData) => {

    setMembers(
      members.map((member) => 
      member.id === editingId
      ? {...member, ...updatedData}
      : member
      ));

      setIsEditModalOpen(false);
      setEditingId(null)

  };


    const handleAddItem = (newData) => {
    const newId = Math.max(...members.map(i => i.id), 0) + 1;
    setMembers([...members, 
    { ...newData, 
    id: newId, 
    createdAt: new Date().toISOString().split('T')[0] }]);
  };



  const handleDelete = (id) => {
    setMembers(members.filter(member => member.id !== id));
  };



   const editingMember = members.find(item => item.id === editingId);


  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="page-title">Team Members</h1>
          <p className="page-subtitle">Manage your team and their roles</p>
        </div>
        <button 
         onClick={() => setIsAddModalOpen(true)}
        className="btn-primary flex items-center gap-2">
          <Plus size={18} />
          Add Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(member => (
          <div key={member.id} className="premium-card-hover p-6">
            {/* Status Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {member.status === 'active' ? (
                  <CheckCircle size={18} className="text-success" />
                ) : (
                  <Circle size={18} className="text-muted-foreground" />
                )}
                <span className="text-xs text-muted-foreground capitalize">{member.status}</span>
              </div>
              <div className="flex gap-1">
                <button 
                onClick={() => handleEdit(member.id)}
                className="icon-btn p-1.5">
                  <Edit2 size={14} />
                </button>
                <button 
                onClick={() => handleDelete(member.id)}
                className="icon-btn p-1.5 hover:text-destructive">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

           {/* Avatar */}
          <div className="relative w-14 h-14 mb-4">
             <div className="w-full h-full rounded-xl overflow-hidden ring-2 ring-accent/20 shadow-glow">
             <img
             src={member.image}
             alt={member.name}
             className="w-full h-full object-cover"
             />
           </div>

            {/* Online indicator */}
           <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success border-2 border-card rounded-full"></div>
           </div>

            {/* Info */}
            <h3 className="font-semibold text-foreground">{member.name}</h3>
            <p className="text-sm text-accent mt-1">{member.role}</p>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>

            {/* Email */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t section-divider text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <Mail size={14} />
              <span className="text-xs truncate">{member.email}</span>
            </div>
          </div>
        ))}
      </div>

      <AddTeamModal
      isOpen={isAddModalOpen}
      onClose={() => setIsAddModalOpen(false)}
      onAdd={handleAddItem}
      />

      {isEditModalOpen && editingMember && (
        <EditTeamMember 
          member={editingMember}
          onClose={() => {
            setIsEditModalOpen(false);
            setEditingId(null);
          }}
          onSave={handleSave}
        />
      ) }

    </div>
  );
}
