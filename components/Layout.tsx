import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { logoutUser } from '../services/storageService';
import { UserProfile } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  user: UserProfile;
  setUser: (u: UserProfile | null) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, user, setUser }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logoutUser();
    setUser(null);
    navigate('/');
  };

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: '🏠' },
    { label: 'Profile & History', path: '/profile', icon: '👤' },
  ];

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Desktop Sidebar */}
      <aside className="w-64 bg-slate-900 text-white flex flex-col shadow-xl z-20 hidden md:flex">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Smart Learn
          </h1>
          <p className="text-xs text-slate-400 mt-1">Personalized Learning</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === item.path
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50'
                  : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700 bg-slate-900">
          <div className="flex items-center space-x-3 mb-4 px-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${user.cluster === 'Topper' ? 'bg-green-500' :
                user.cluster === 'Average' ? 'bg-yellow-500' :
                  user.cluster === 'Below Average' ? 'bg-orange-500' : 'bg-red-500'
              }`}>
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.cluster}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-slate-800 hover:bg-red-600 text-slate-300 hover:text-white rounded-md transition-colors text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Mobile Sidebar */}
      <aside className={`fixed top-0 left-0 h-full w-64 bg-slate-900 text-white z-40 transform transition-transform duration-300 md:hidden ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="p-6 border-b border-slate-700 flex justify-between items-center">
          <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Smart Learn
          </h1>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="text-slate-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${location.pathname === item.path
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-300 hover:bg-slate-800'
                }`}
            >
              <span className="text-xl">{item.icon}</span>
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-700">
          <div className="flex items-center space-x-3 mb-4">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${user.cluster === 'Topper' ? 'bg-green-500' :
                user.cluster === 'Average' ? 'bg-yellow-500' :
                  user.cluster === 'Below Average' ? 'bg-orange-500' : 'bg-red-500'
              }`}>
              {user.name.charAt(0)}
            </div>
            <div className="overflow-hidden flex-1">
              <p className="text-sm font-semibold truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.cluster}</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="w-full py-2 px-4 bg-red-600 hover:bg-red-700 text-white rounded-md text-sm font-medium"
          >
            Sign Out
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative">
        {/* Mobile Header */}
        <header className="bg-white border-b border-gray-200 p-4 md:hidden flex justify-between items-center z-10">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="text-slate-800 text-2xl"
          >
            ☰
          </button>
          <h1 className="font-bold text-lg text-slate-800">Smart Learn</h1>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold text-white ${user.cluster === 'Topper' ? 'bg-green-500' :
              user.cluster === 'Average' ? 'bg-yellow-500' :
                user.cluster === 'Below Average' ? 'bg-orange-500' : 'bg-red-500'
            }`}>
            {user.name.charAt(0)}
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