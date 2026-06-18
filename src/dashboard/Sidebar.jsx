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
    <div className={`${open ? 'w-64' : 'w-20'} transition-all duration-300 sidebar-shell flex flex-col h-screen flex-shrink-0`}>
      
      {/* Logo */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-border">
        {open && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg avatar-gradient flex items-center justify-center text-xs font-bold shadow-glow">
              C
            </div>
            <span className="text-lg font-bold logo-gradient">CMS Hub</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="icon-btn p-1.5"
          aria-label="Toggle sidebar"
        >
          <ChevronRight size={20} className={`${!open ? 'rotate-180' : ''} transition-transform duration-300`} />
        </button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 overflow-y-auto p-3 space-y-2 no-scrollbar">
        {cmsNavigation.map((group) => {
          const isExpanded = expandedGroups[group.group];
          
          return (
            <div key={group.group}>
              {open && (
                <button
                  onClick={() => toggleGroup(group.group)}
                  className="flex items-center justify-between w-full px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground hover:text-accent transition-colors"
                >
                  {group.group}
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isExpanded ? '' : '-rotate-90'}`} />
                </button>
              )}
              
              {(open && isExpanded) && (
                <div className="space-y-0.5 mt-0.5">
                  {group.items.map((item) => {
                    const IconComponent = iconMap[item.icon];
                    const isActive = currentPage === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`nav-item ${isActive ? 'nav-item-active' : ''}`}
                      >
                        {IconComponent && <IconComponent size={18} />}
                        <span>{item.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}
              
              {!open && group.items.length > 0 && (
                <div className="space-y-0.5">
                  {group.items.slice(0, 2).map((item) => {
                    const IconComponent = iconMap[item.icon];
                    const isActive = currentPage === item.id;
                    
                    return (
                      <button
                        key={item.id}
                        onClick={() => onNavigate(item.id)}
                        className={`flex items-center justify-center w-full p-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? 'nav-item-active'
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
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 avatar-gradient rounded-xl flex items-center justify-center font-semibold text-sm shadow-glow flex-shrink-0">
            {open ? 'CMS' : 'C'}
          </div>
          {open && (
            <div className="min-w-0">
              <p className="text-sm font-semibold text-foreground truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">Content Manager</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
