import React from 'react';
import { ShoppingCart, Search, User, Heart, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  return (
    <nav className="bg-[#f85606] text-white sticky top-0 z-50 shadow-md">
      {/* Top Bar */}
      <div className="container mx-auto px-4 py-2 flex justify-between items-center text-xs">
        <div className="flex gap-4">
          <span className="hover:underline cursor-pointer">Become a Seller</span>
          <span className="hover:underline cursor-pointer">Help & Support</span>
        </div>
        <div className="flex gap-4">
          <span className="hover:underline cursor-pointer">Login</span>
          <span className="hover:underline cursor-pointer">Sign Up</span>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 flex items-center gap-6">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold tracking-tighter flex items-center gap-2 cursor-pointer">
          <span className="bg-white text-[#f85606] px-2 py-1 rounded">SHOP</span>
          <span>DEMO</span>
        </Link>

        {/* Search Bar */}
        <div className="flex-1 max-w-2xl relative hidden md:block">
          <input 
            type="text" 
            placeholder="Search in Shop..." 
            className="w-full py-2.5 px-4 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-300"
          />
          <button className="absolute right-1 top-1 bg-orange-700 hover:bg-orange-800 text-white p-1.5 rounded-md">
            <Search size={20} />
          </button>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Link to Standalone Demo Page (React Route) */}
          <Link to="/virtual-try-on" className="hidden md:flex items-center gap-1 bg-white/20 hover:bg-white/30 px-3 py-1.5 rounded-full transition-colors">
            <Sparkles size={16} />
            <span className="text-sm font-medium">Try-On Studio</span>
          </Link>

          <button className="flex items-center gap-1 hover:text-orange-100">
            <User size={24} />
            <span className="hidden lg:inline text-sm font-medium">Account</span>
          </button>
          <button className="flex items-center gap-1 hover:text-orange-100 relative">
            <Heart size={24} />
            <span className="absolute -top-1 -right-1 bg-white text-[#f85606] text-[10px] font-bold px-1 rounded-full">2</span>
          </button>
          <button className="flex items-center gap-1 hover:text-orange-100 relative">
            <ShoppingCart size={24} />
            <span className="absolute -top-1 -right-1 bg-white text-[#f85606] text-[10px] font-bold px-1 rounded-full">0</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
