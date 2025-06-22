import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import logo from '../assets/IMG_0424.jpeg';
import logoLight from '../assets/darkmode.jpeg';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { currentUser, userData, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <nav className={`fixed top-0 w-full z-50 border-b border-gray-100 transition-colors duration-300 backdrop-blur-sm ${
      scrolled
        ? 'bg-white/95 dark:bg-gray-900 dark:border-gray-800'
        : 'bg-transparent dark:bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center font-bold text-xl text-slate-800 dark:text-white">
            <img
              src={theme === 'dark' ? logo : logoLight}
              alt="Logo"
              className="h-14 w-auto mr-3 transition-all duration-300"
            />
            Mark Chamane
          </Link>
          <button
            onClick={toggleTheme}
            className="ml-4 p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500"
            aria-label="Toggle dark mode"
          >
            <span className="inline-block w-6 h-6 transition-transform duration-300">
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-yellow-400 animate-spin-slow">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75c-5.385 0-9.75-4.365-9.75-9.75 0-4.136 2.664-7.64 6.418-9.165a.75.75 0 01.908.325.75.75 0 01-.062.87A7.501 7.501 0 0012 19.5a7.48 7.48 0 006.27-3.345.75.75 0 01.87-.262.75.75 0 01.362.859z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-amber-500 animate-spin-slow">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 21v-2.25m-6.364-.386l1.591-1.591M3 12h2.25m.386-6.364l1.591 1.591M12 7.5a4.5 4.5 0 100 9 4.5 4.5 0 000-9z" />
                </svg>
              )}
            </span>
          </button>
          
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