import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">Pixel Publication</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              We are dedicated to bringing the best books to our readers. Discover new stories, insightful non-fiction, and inspiring authors with Pixel Publication.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
              <li><Link href="#books" className="hover:text-blue-400 transition">Books</Link></li>
              <li><Link href="#authors" className="hover:text-blue-400 transition">Authors</Link></li>
              <li><Link href="#contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact</h3>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Email: info@pixelpublication.com</li>
              <li>Phone: +880 1234 567890</li>
              <li>Address: Dhaka, Bangladesh</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Pixel Publication. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
