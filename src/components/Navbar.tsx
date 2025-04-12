'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { FiSun, FiMoon } from 'react-icons/fi';
import { usePathname } from 'next/navigation';
import styles from './Navbar.module.css'; // Import the CSS module

const Navbar: React.FC = () => {
  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Blogs', path: '/blogs' },
    { name: 'Projects', path: '/projects' },
    { name: 'Experience', path: '/experience' },
    { name: 'Contact', path: '/contact' },
  ];

  // Basic mobile menu state (can enhance later)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  // Ensure component is mounted before rendering theme toggle
  useEffect(() => setMounted(true), []);

  const handleThemeToggle = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const themeToggleSwitch = (
    <button
      aria-label="Toggle Dark Mode"
      onClick={handleThemeToggle}
      className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-black ${ 
        theme === 'dark' ? 'bg-gray-700' : 'bg-yellow-400'
      }`}
    >
      <span className="sr-only">Toggle theme</span>
      <div className="absolute inset-0 flex items-center justify-between px-1">
         <FiSun className="w-4 h-4 text-white" />
         <FiMoon className="w-4 h-4 text-gray-800" />
      </div>
      <span
        className={`absolute left-0 inline-block w-5 h-5 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${ 
          theme === 'dark' ? 'translate-x-[calc(100%-0.1rem)]' : 'translate-x-[0.1rem]'
        }`}
      />
    </button>
  );

  if (!mounted) {
    // Placeholder rendering remains unchanged
    return (
      <nav className={`w-full bg-[var(--background)] text-[var(--foreground)] ${styles.navbarShadow}`}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
             <div className="flex-shrink-0">
              <Link href="/" className="flex items-center">
                <Image 
                  src="/vk-icon.svg" 
                  alt="VK Logo" 
                  width={40} 
                  height={40} 
                  className="dark:invert" 
                />
              </Link>
            </div>
             <div className="hidden md:flex items-center space-x-4">
                <div className="h-6 w-11 bg-gray-300 rounded-full"></div>
             </div>
             <div className="md:hidden flex items-center">
                <div className="h-6 w-11 bg-gray-300 rounded-full mr-4"></div>
             </div>
          </div>
        </div>
      </nav>
    );
  }

  // Use CSS module classes instead of generating Tailwind classes
  const getLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return `${styles.navLink} ${isActive ? styles.active : ''}`;
  };

  // Function to determine link classes for mobile
  const getMobileLinkClasses = (path: string) => {
    const isActive = pathname === path;
    return `${styles.mobileNavLink} ${isActive ? styles.active : ''}`;
  };

  return (
    <nav className={`w-full bg-[var(--background)] text-[var(--foreground)] ${styles.navbarShadow}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image 
                src="/vk-icon.svg" 
                alt="VK Logo" 
                width={40} 
                height={40} 
                className="dark:invert" 
              />
            </Link>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => (
              <Link
                key={item.name}
                href={item.path}
                className={getLinkClasses(item.path)}
              >
                {item.name}
              </Link>
            ))}
            {/* Theme Toggle Switch */}
            <div className="ml-4">
              {themeToggleSwitch}
            </div>
          </div>

          {/* Mobile Nav Items & Toggle */}
          <div className="md:hidden flex items-center">
             {/* Theme Toggle Switch (Mobile) */}
             <div className="mr-4">
               {themeToggleSwitch}
             </div>
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-slate-700 dark:hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[var(--foreground)]"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {/* Hamburger Icon */}
              <svg className={`block h-6 w-6 ${isMobileMenuOpen ? 'hidden' : 'block'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
              </svg>
              {/* Close Icon */}
              <svg className={`block h-6 w-6 ${isMobileMenuOpen ? 'block' : 'hidden'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.path}
              className={getMobileLinkClasses(item.path)}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 