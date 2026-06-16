import { Search, Bell, Settings, Menu } from 'lucide-react'

export default function TopBar({  onToggleSidebar }) {
  return (
    <div className="h-16 border-b border-border bg-card flex items-center justify-between px-6 sticky top-0 z-40">
      
      {/* Left side - Search */}
      <div className="flex items-center gap-4 flex-1">
        <button
          onClick={onToggleSidebar}
          className="p-2 hover:bg-muted rounded-lg transition-colors lg:hidden"
        >
          <Menu size={20} />
        </button>
        
        <div className="hidden sm:flex items-center gap-2 bg-muted rounded-lg px-3 py-2 flex-1 max-w-xs">
          <Search size={18} className="text-muted-foreground" />
          <input
            type="text"
            placeholder="Search..."
            className="bg-transparent outline-none text-sm flex-1 text-foreground placeholder-muted-foreground"
          />
        </div>
      </div>

      {/* Right side - Icons */}
      <div className="flex items-center gap-4">
        <button className="p-2 hover:bg-muted rounded-lg transition-colors relative">
          <Bell size={20} />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>
        
        <button className="p-2 hover:bg-muted rounded-lg transition-colors">
          <Settings size={20} />
        </button>

        <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-semibold cursor-pointer hover:opacity-80 transition-opacity">
          U
        </div>
      </div>
    </div>
  )
}
