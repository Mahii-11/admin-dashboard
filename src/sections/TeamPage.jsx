import  { useState } from 'react';
import { Plus, Mail, Trash2, Edit2, CheckCircle, Circle } from 'lucide-react';
import { teamMembers } from '../data/cms-data';

export function TeamPage() {
  const [members] = useState(teamMembers);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Team Members</h1>
          <p className="text-muted-foreground mt-1">Manage your team and their roles</p>
        </div>
        <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} />
          Add Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {members.map(member => (
          <div key={member.id} className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all">
            {/* Status Badge */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-2">
                {member.status === 'active' ? (
                  <CheckCircle size={18} className="text-green-400" />
                ) : (
                  <Circle size={18} className="text-muted-foreground" />
                )}
                <span className="text-xs text-muted-foreground capitalize">{member.status}</span>
              </div>
              <div className="flex gap-2">
                <button className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-foreground">
                  <Edit2 size={14} />
                </button>
                <button className="p-1 hover:bg-muted rounded transition-colors text-muted-foreground hover:text-red-400">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>

            {/* Avatar */}
            <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
              <span className="text-sm font-bold text-accent">{member.name.charAt(0)}</span>
            </div>

            {/* Info */}
            <h3 className="font-semibold text-foreground">{member.name}</h3>
            <p className="text-sm text-accent mt-1">{member.role}</p>
            <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{member.bio}</p>

            {/* Email */}
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
              <Mail size={14} />
              <span className="text-xs truncate">{member.email}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
