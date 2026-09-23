import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1a202c] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-12 lg:gap-8 mb-12">
          
          {/* Left: Logo & Desc */}
          <div className="lg:w-1/3">
            <Link href="/" className="inline-block mb-4">
              <Image 
                src="/logo.png" 
                alt="Pixel Publication Logo" 
                width={150} 
                height={50} 
                className="object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-gray-400 text-sm max-w-xs leading-relaxed">
              Digital Skills Learning Books, Software & Learning Resources
            </p>
          </div>

          {/* Center: Links */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-center w-full">
            <div className="flex flex-wrap justify-center gap-x-6 gap-y-3 mb-6">
              <Link href="#books" className="text-gray-300 hover:text-[#c5914c] text-sm transition">Books</Link>
              <Link href="#software" className="text-gray-300 hover:text-[#c5914c] text-sm transition">Software</Link>
              <Link href="#courses" className="text-gray-300 hover:text-[#c5914c] text-sm transition">Courses</Link>
              <Link href="#articles" className="text-gray-300 hover:text-[#c5914c] text-sm transition">Learning Articles</Link>
              <Link href="#about" className="text-gray-300 hover:text-[#c5914c] text-sm transition">About</Link>
              <Link href="#contact" className="text-gray-300 hover:text-[#c5914c] text-sm transition">Contact</Link>
            </div>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-500 hover:text-white text-xs transition">Privacy Policy</Link>
              <Link href="#" className="text-gray-500 hover:text-white text-xs transition">Terms & Conditions</Link>
            </div>
          </div>

          {/* Right: Social */}
          <div className="lg:w-1/4 flex flex-col items-start lg:items-end w-full">
            <h4 className="text-sm font-medium mb-4 text-gray-300">Follow Us</h4>
            <div className="flex gap-3">
              {/* Facebook */}
              <a href="#" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c5914c] hover:bg-[#c5914c] transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"/></svg>
              </a>
              {/* YouTube */}
              <a href="#" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c5914c] hover:bg-[#c5914c] transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.5 12 3.5 12 3.5s-7.505 0-9.377.55a3.015 3.015 0 0 0-2.122 2.136C0 8.07 0 12 0 12s0 3.93.501 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.55 9.377.55 9.377.55s7.505 0 9.377-.55a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              {/* LinkedIn */}
              <a href="#" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c5914c] hover:bg-[#c5914c] transition">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
              {/* X / Twitter */}
              <a href="#" className="w-8 h-8 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#c5914c] hover:bg-[#c5914c] transition">
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row justify-between items-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} Pixel Publication. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Learn • Build Skills • Create a Better Future</p>
        </div>
      </div>
    </footer>
  );
}
