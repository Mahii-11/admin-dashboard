import  { useState } from 'react';
import Sidebar from './dashboard/Sidebar';
import TopBar from './dashboard/TopBar';
import { CMSHome } from './pages/CMSHome';
import { ModernHeroPage } from './sections/ModernHeroPage';
import { TeamPage } from './sections/TeamPage';
import { ModernWhyChoosePage } from './sections/ModernWhyChoosePage';


export default function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [currentPage, setCurrentPage] = useState('dashboard');

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <CMSHome onNavigate={setCurrentPage} />;
      case 'whychoose':
        return <ModernWhyChoosePage />;
      case 'team':
        return <TeamPage />; 
      case 'hero':
        return <ModernHeroPage />;
    
      default:
        return <CMSHome onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="flex h-screen bg-background text-foreground overflow-hidden">
      <Sidebar
        open={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        currentPage={currentPage}
        onNavigate={setCurrentPage}
      />

      <div className="flex-1 flex flex-col overflow-hidden min-w-0">
        <TopBar onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} />

        <div className="flex-1 overflow-auto no-scrollbar bg-background">
          <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
            {renderPage()}
          </div>
        </div>
      </div>
    </div>
  );
}
