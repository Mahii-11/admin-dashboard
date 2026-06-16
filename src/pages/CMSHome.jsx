import { FileText, Users, Mail,  Clock } from 'lucide-react';
import { cmsMetrics, blogPosts, announcements } from '../data/cms-data';

export function CMSHome({ onNavigate }) {
  const metrics = [
    { label: 'Published Posts', value: cmsMetrics.publishedPosts, icon: FileText, color: 'bg-blue-500/20 text-blue-400' },
    { label: 'Draft Posts', value: cmsMetrics.draftPosts, icon: Clock, color: 'bg-amber-500/20 text-amber-400' },
    { label: 'Subscribers', value: cmsMetrics.totalSubscribers.toLocaleString(), icon: Mail, color: 'bg-indigo-500/20 text-indigo-400' },
    { label: 'Team Members', value: cmsMetrics.activeTeamMembers, icon: Users, color: 'bg-green-500/20 text-green-400' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">CMS Dashboard</h1>
        <p className="text-muted-foreground mt-1">Welcome back to your content management hub</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, idx) => {
          const Icon = metric.icon;
          return (
            <div key={idx} className="bg-card border border-border rounded-lg p-6 hover:border-accent/50 transition-all">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">{metric.label}</p>
                  <p className="text-2xl font-bold text-foreground mt-2">{metric.value}</p>
                </div>
                <div className={`p-3 rounded-lg ${metric.color}`}>
                  <Icon size={20} />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Blog Posts */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Recent Blog Posts</h2>
            <button 
              onClick={() => onNavigate('blog')}
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {blogPosts.slice(0, 3).map(post => (
              <div key={post.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
                <h3 className="font-medium text-foreground">{post.title}</h3>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-muted-foreground">{post.author}</span>
                  <span className={`text-xs px-2 py-1 rounded ${post.status === 'published' ? 'bg-green-500/20 text-green-400' : 'bg-amber-500/20 text-amber-400'}`}>
                    {post.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Announcements */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground">Announcements</h2>
            <button 
              onClick={() => onNavigate('announcements')}
              className="text-sm text-accent hover:text-accent/80 transition-colors"
            >
              View all
            </button>
          </div>
          <div className="space-y-3">
            {announcements.slice(0, 3).map(announcement => (
              <div key={announcement.id} className="pb-3 border-b border-border last:border-0 last:pb-0">
                <div className="flex items-start justify-between">
                  <h3 className="font-medium text-foreground flex-1">{announcement.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded whitespace-nowrap ml-2 ${
                    announcement.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                    announcement.priority === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                    'bg-blue-500/20 text-blue-400'
                  }`}>
                    {announcement.priority}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <button 
            onClick={() => onNavigate('blog')}
            className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-colors text-sm font-medium"
          >
            New Blog Post
          </button>
          <button 
            onClick={() => onNavigate('gallery')}
            className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-colors text-sm font-medium"
          >
            Upload Image
          </button>
          <button 
            onClick={() => onNavigate('announcements')}
            className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-colors text-sm font-medium"
          >
            New Announcement
          </button>
          <button 
            onClick={() => onNavigate('team')}
            className="p-3 rounded-lg bg-accent/10 hover:bg-accent/20 text-accent transition-colors text-sm font-medium"
          >
            Add Team Member
          </button>
        </div>
      </div>
    </div>
  );
}
