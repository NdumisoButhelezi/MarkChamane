import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { currentUser, userData, logout } = useAuth();

  const isActive = (path: string) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/about', label: 'About' },
    { path: '/services', label: 'Services' },
    { path: '/testimonials', label: 'Testimonials' },
    { path: '/booking', label: 'Book Event' },
    { path: '/contact', label: 'Contact' }
  ];

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  return (
    <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="font-bold text-xl text-slate-800">
            Mark Chamane
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`transition-colors ${
                  isActive(link.path)
                    ? 'text-amber-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Auth Section */}
            {currentUser ? (
              <div className="flex items-center space-x-4">
                {userData?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className={`flex items-center gap-2 transition-colors ${
                      isActive('/admin')
                        ? 'text-amber-600 font-semibold'
                        : 'text-slate-600 hover:text-slate-800'
                    }`}
                  >
                    <Settings size={16} />
                    Admin
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  to="/login"
                  className="text-slate-600 hover:text-slate-800 transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 transition-colors ${
                  isActive(link.path)
                    ? 'text-amber-600 font-semibold'
                    : 'text-slate-600 hover:text-slate-800'
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Mobile Auth Section */}
            {currentUser ? (
              <div className="pt-4 border-t border-gray-100 mt-4">
                {userData?.role === 'admin' && (
                  <Link
                    to="/admin"
                    className="flex items-center gap-2 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    <Settings size={16} />
                    Admin Dashboard
                  </Link>
                )}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center gap-2 py-2 text-slate-600 hover:text-slate-800 transition-colors"
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            ) : (
              <div className="pt-4 border-t border-gray-100 mt-4 space-y-2">
                <Link
                  to="/login"
                  className="block py-2 text-slate-600 hover:text-slate-800 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block py-2 text-amber-600 hover:text-amber-700 font-semibold transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}