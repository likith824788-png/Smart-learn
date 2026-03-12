import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { UserProfile } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: UserProfile;
  setUser: (u: UserProfile | null) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user }) => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    {
      label: 'Dashboard', path: '/dashboard',
      activeClass: 'from-[#6b3318]/10 to-[#a0522d]/10 border-[#a0522d]/20',
      iconActiveClass: 'text-[#a0522d]',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
        </svg>
      )
    },
    {
      label: 'AI Assistant', path: '/ai-assistant',
      activeClass: 'from-[#6b3318]/10 to-[#a0522d]/10 border-[#a0522d]/20',
      iconActiveClass: 'text-[#a0522d]',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z"></path>
          <path d="M12 7l1 1 4-4"></path>
        </svg>
      )
    },
    {
      label: 'Performance', path: '/performance',
      activeClass: 'from-[#6b3318]/10 to-[#a0522d]/10 border-[#a0522d]/20',
      iconActiveClass: 'text-[#a0522d]',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
        </svg>
      )
    },
    {
      label: 'History', path: '/history',
      activeClass: 'from-[#a0522d]/10 to-[#c87941]/10 border-[#a0522d]/20',
      iconActiveClass: 'text-[#a0522d]',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      label: 'Profile', path: '/profile',
      activeClass: 'from-[#6b3318]/10 to-[#a0522d]/10 border-[#a0522d]/20',
      iconActiveClass: 'text-[#a0522d]',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )
    },
  ];

  return (
    <div className="flex h-screen bg-[#ffffff] overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 glass flex flex-col z-20 hidden md:flex border-r border-slate-100 shadow-xl shadow-brown-500/5">
        <div className="p-6 border-b border-slate-100">
          <h1 className="text-2xl font-bold gradient-text tracking-tight">
            Smart Learn
          </h1>
          <p className="text-xs text-slate-500 mt-1 tracking-wide">Personalized Learning</p>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${location.pathname === item.path
                ? `bg-gradient-to-r ${item.activeClass} text-[#111111] border`
                : 'text-slate-500 hover:text-[#a0522d] hover:bg-[#a0522d]/5'
                }`}
            >
              <span className={`${location.pathname === item.path ? item.iconActiveClass : 'text-slate-400 group-hover:text-[#a0522d]'} transition-colors`}>{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User section at bottom */}
        <div className="p-4 border-t border-slate-100">
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-brown-500/20" style={{ background: 'linear-gradient(135deg, #6b3318, #a0522d)' }}>
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-[#111111] truncate">{user.name}</p>
              <p className="text-xs text-slate-500 truncate">{user.email}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 glass z-40 transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h1 className="text-xl font-bold gradient-text">
            Smart Learn
          </h1>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-500 hover:text-[#a0522d] text-2xl transition-colors"
          >
            ×
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${location.pathname === item.path
                ? `bg-gradient-to-r ${item.activeClass} text-[#111111] border`
                : 'text-slate-500 hover:text-[#a0522d] hover:bg-[#a0522d]/5'
                }`}
            >
              <span className={location.pathname === item.path ? item.iconActiveClass : 'text-slate-500'}>{item.icon}</span>
              <span className="font-medium text-sm">{item.label}</span>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="glass border-b border-slate-100 p-4 md:hidden flex justify-between items-center z-10">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-slate-600 hover:text-[#a0522d] text-xl transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <h1 className="font-bold text-lg gradient-text">Smart Learn</h1>
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-brown-500/10" style={{ background: 'linear-gradient(135deg, #6b3318, #a0522d)' }}>
            {user.name.charAt(0).toUpperCase()}
          </div>
        </header>

        <div className="flex-1 overflow-auto p-4 md:p-8 relative">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;