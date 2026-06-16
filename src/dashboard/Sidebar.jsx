import  { useState } from 'react';
import { ChevronRight, ChevronDown } from 'lucide-react';
import * as Icons from 'lucide-react';
import { cmsNavigation } from '../data/cms-data';

const iconMap = {
  LayoutDashboard: Icons.LayoutDashboard,
  CheckCircle2: Icons.CheckCircle2,
  Image: Icons.Image,
  BookOpen: Icons.BookOpen,
  Users: Icons.Users,
  MessageSquare: Icons.MessageSquare,
  Zap: Icons.Zap,
  Folder: Icons.Folder,
  Bell: Icons.Bell,
  Mail: Icons.Mail,
  MessageCircle: Icons.MessageCircle,
  Search: Icons.Search,
  Settings: Icons.Settings,
  Lock: Icons.Lock,
};

export default function Sidebar({ open, onToggle, currentPage, onNavigate }) {
  const [expandedGroups, setExpandedGroups] = useState({
    'Dashboard': true,
    'Website Sections': true,
    'Media & Assets': false,
    'Communication': false,
    'Settings': false
  });

  const toggleGroup = (group) => {
    setExpandedGroups(prev => ({
      ...prev,
      [group]: !prev[group]
    }));
  };

  return (
    <div className={`${open ? 'w-64' : 'w-20'} transition-all duration-200 bg-card border-r border-border flex flex-col h-screen`}>
      
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {open && <div className="text-lg font-bold text-accent">CMS Hub</div>}
        <button
          onClick={onToggle}
          className="p-1 hover:bg-muted rounded transition-colors"
          aria-label="Toggle sidebar"
        >
          <ChevronRight size={20} className={`${!open ? 'rotate-180' : ''} transition-transform`} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-3 no-scrollbar">
        {cmsNavigation.map((group) => {
          const isExpanded = expandedGroups[group.group];
          
          return (
            <div key={group.group}>
              {open && (
                <button
                  onClick={() => toggleGroup(group.group)}
                  className="flex items-center justify-between w-full px-2 py-2 text-xs font-semibold text-muted-foreground hover:text-accent transition-colors"
                >
                  {group.group}
                  <ChevronDown size={16} className={`transition-transform duration-300 ${isExpanded ? '' : '-rotate-90'}`} />
                </button>
              )}
              
              {(open && isExpanded) && (
                <div className="space-y-1 mt-1">
                  {group.items.map((item) => {
                    const IconComponent = iconMap[item.icon];
                    const isActive = currentPage === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-accent/20 text-accent'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        {IconComponent && <IconComponent size={18} />}
                        <span className="text-sm">{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              
              {!open && group.items.length > 0 && (
                <div className="space-y-1">
                  {group.items.slice(0, 2).map((item) => {
                    const IconComponent = iconMap[item.icon];
                    const isActive = currentPage === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`flex items-center justify-center w-full p-2 rounded-lg transition-colors ${
                          isActive
                            ? 'bg-accent/20 text-accent'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                        title={item.label}
                      >
                        {IconComponent && <IconComponent size={18} />}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-border mt-auto">
        <div className="h-10 w-10 bg-accent rounded-full flex items-center justify-center font-semibold text-accent-foreground">
          {open ? 'CMS' : 'C'}
        </div>
      </div>
    </div>
  );
}
