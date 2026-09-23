import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full bg-blue-600 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
              Discover Your Next <br className="hidden md:block"/> Great Read
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 max-w-lg mx-auto md:mx-0">
              Pixel Publication brings you the finest selection of books from acclaimed authors across all genres.
            </p>
            <Link href="#books" className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition">
              Explore Books
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center">
            {/* A placeholder illustration or featured book cover can go here */}
            <div className="bg-white/20 p-8 rounded-2xl backdrop-blur-sm border border-white/30">
               <Image 
                src="/logo.png" 
                alt="Pixel Publication Logo" 
                width={300} 
                height={300} 
                className="object-contain drop-shadow-2xl brightness-0 invert"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section id="books" className="w-full py-20 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Newly Published</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100 flex flex-col">
                <div className="h-64 bg-gray-200 w-full relative flex items-center justify-center">
                   {/* Placeholder for Book Cover */}
                   <span className="text-gray-400 font-medium">Book Cover {item}</span>
                </div>
                <div className="p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">Sample Book Title {item}</h3>
                  <p className="text-sm text-gray-500 mb-4">by Author Name</p>
                  <p className="text-gray-700 text-sm mb-4 line-clamp-2 flex-grow">
                    This is a short description of the book. It gives readers a quick overview of what to expect.
                  </p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="font-bold text-blue-600">৳ ৩০০</span>
                    <button className="bg-gray-900 text-white text-xs px-4 py-2 rounded hover:bg-blue-600 transition">
                      Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Authors Section */}
      <section id="authors" className="w-full py-20 px-4 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Authors</h2>
            <div className="h-1 w-20 bg-blue-600 mx-auto rounded"></div>
          </div>
          <div className="flex flex-wrap justify-center gap-10">
            {[1, 2, 3].map((author) => (
              <div key={author} className="text-center">
                <div className="w-32 h-32 rounded-full bg-gray-300 mx-auto mb-4 border-4 border-white shadow-lg flex items-center justify-center">
                   <span className="text-gray-500 text-xs">Photo</span>
                </div>
                <h4 className="font-bold text-gray-900">Author Name</h4>
                <p className="text-sm text-gray-500">Fiction Writer</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
