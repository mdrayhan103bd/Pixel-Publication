"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/">
              <Image 
                src="/logo.png" 
                alt="Pixel Publication Logo" 
                width={120} 
                height={50} 
                className="object-contain cursor-pointer"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">
              Home
            </Link>
            <Link href="#books" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">
              Books
            </Link>
            <Link href="#authors" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">
              Authors
            </Link>
            <Link href="#about" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">
              About Us
            </Link>
            <Link href="#contact" className="text-gray-700 hover:text-blue-600 px-3 py-2 rounded-md text-sm font-medium transition">
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-blue-600 focus:outline-none p-2"
            >
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <Link 
              href="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-3 rounded-md text-base font-medium transition"
            >
              Home
            </Link>
            <Link 
              href="#books" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-3 rounded-md text-base font-medium transition"
            >
              Books
            </Link>
            <Link 
              href="#authors" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-3 rounded-md text-base font-medium transition"
            >
              Authors
            </Link>
            <Link 
              href="#about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-3 rounded-md text-base font-medium transition"
            >
              About Us
            </Link>
            <Link 
              href="#contact" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-gray-700 hover:text-blue-600 hover:bg-gray-50 block px-3 py-3 rounded-md text-base font-medium transition"
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
