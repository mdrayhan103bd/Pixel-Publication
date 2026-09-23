"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const themeColor = "#e31e24";

  const navLinks = [
    { name: "Home", href: "/", active: true },
    { name: "Books", href: "#books" },
    { name: "Software", href: "#software" },
    { name: "Courses", href: "#courses" },
    { name: "Learning Articles", href: "#articles" },
    { name: "About Publication", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <nav className="bg-white sticky top-0 z-50 border-b border-gray-100 py-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex-shrink-0 flex items-center h-full py-2">
            <Link href="/" className="relative block h-10 w-32 sm:h-12 sm:w-40">
              <Image 
                src="/logo.png" 
                alt="Pixel Publication Logo" 
                fill
                className="object-contain object-left cursor-pointer"
                priority
              />
            </Link>
          </div>
          
          {/* Desktop Menu */}
          <div className="hidden lg:flex lg:items-center lg:space-x-6">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href} 
                className={`text-sm font-medium transition ${link.active ? 'text-gray-900 border-b-2 border-[#e31e24] pb-1' : 'text-gray-600 hover:text-[#e31e24]'}`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center space-x-6">
            <button className="text-gray-500 hover:text-[#e31e24]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            <Link href="#order" className="bg-[#e31e24] text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-[#c1151a] transition">
              Order / Get Started
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden space-x-4">
             <button className="text-gray-500 hover:text-[#e31e24]">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 hover:text-[#e31e24] focus:outline-none p-1"
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
        <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-xl">
          <div className="px-4 pt-2 pb-6 space-y-1 flex flex-col">
            {navLinks.map((link) => (
              <Link 
                key={link.name}
                href={link.href} 
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-3 rounded-md text-base font-medium transition ${link.active ? 'bg-[#e31e24]/10 text-[#e31e24]' : 'text-gray-700 hover:text-[#e31e24] hover:bg-gray-50'}`}
              >
                {link.name}
              </Link>
            ))}
            <div className="pt-4 px-3">
              <Link href="#order" onClick={() => setIsMobileMenuOpen(false)} className="bg-[#e31e24] w-full block text-center text-white px-5 py-3 rounded-full text-base font-medium hover:bg-[#c1151a] transition">
                Order / Get Started
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
