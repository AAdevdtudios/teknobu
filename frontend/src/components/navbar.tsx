"use client"

import React from 'react'
import NavLink from './navLink'
import { Home, Bell, Menu, X, LogOut } from 'lucide-react';
import MobileNavLink from './mobileLink';
import { Button } from './ui/button';
import { logout } from '@/lib/actions';
import { useRouter } from 'next/navigation';

export default function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push("/");
  };

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <span className="text-xl font-bold text-indigo-600">ProfileHub</span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink icon={<Home size={20} />} title="Home" />
            <NavLink icon={<Bell size={20} />} title="Notifications" />
            <Button onClick={handleLogout}>LogOut <LogOut /> </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <MobileNavLink icon={<Home size={20} />} title="Home" />
            <MobileNavLink icon={<Bell size={20} />} title="Notifications" />
            <Button onClick={handleLogout} className='w-full'>LogOut <LogOut /> </Button>
          </div>
        </div>
      )}
    </nav>
  )
}
