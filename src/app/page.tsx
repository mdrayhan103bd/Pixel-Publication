import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center w-full">
      {/* Hero Section */}
      <section className="w-full bg-blue-600 text-white py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 text-center md:text-left flex flex-col items-center md:items-start">
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 md:mb-6 leading-tight">
              Discover Your Next <br className="hidden md:block"/> Great Read
            </h1>
            <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8 text-blue-100 max-w-lg">
              Pixel Publication brings you the finest selection of books from acclaimed authors across all genres.
            </p>
            <Link href="#books" className="inline-block bg-white text-blue-600 font-bold py-3 px-8 rounded-full shadow-lg hover:bg-gray-100 transition w-full sm:w-auto text-center">
              Explore Books
            </Link>
          </div>
          <div className="md:w-1/2 flex justify-center w-full">
            <div className="bg-white/20 p-6 md:p-8 rounded-2xl backdrop-blur-sm border border-white/30 max-w-xs md:max-w-md w-full flex justify-center">
               <Image 
                src="/logo.png" 
                alt="Pixel Publication Logo" 
                width={280} 
                height={280} 
                className="object-contain drop-shadow-2xl brightness-0 invert w-full h-auto"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section id="books" className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Newly Published</h2>
            <div className="h-1 w-16 md:w-20 bg-blue-600 mx-auto rounded"></div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="bg-white rounded-xl shadow-sm hover:shadow-xl transition-shadow border border-gray-100 flex flex-col overflow-hidden">
                <div className="h-56 sm:h-64 bg-gray-100 w-full relative flex items-center justify-center">
                   <span className="text-gray-400 font-medium">Book Cover {item}</span>
                </div>
                <div className="p-5 md:p-6 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg text-gray-900 mb-1 leading-tight">Sample Book Title {item}</h3>
                  <p className="text-sm text-gray-500 mb-3">by Author Name</p>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2 flex-grow">
                    This is a short description of the book. It gives readers a quick overview of what to expect.
                  </p>
                  <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-50">
                    <span className="font-bold text-blue-600 text-lg">৳ ৩০০</span>
                    <button className="bg-gray-900 text-white text-xs md:text-sm px-4 py-2 rounded hover:bg-blue-600 transition">
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
      <section id="authors" className="w-full py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 md:mb-4">Meet Our Authors</h2>
            <div className="h-1 w-16 md:w-20 bg-blue-600 mx-auto rounded"></div>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10 justify-items-center">
            {[1, 2, 3, 4].map((author) => (
              <div key={author} className="text-center flex flex-col items-center">
                <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gray-200 mb-3 md:mb-4 border-4 border-white shadow-md flex items-center justify-center overflow-hidden">
                   <span className="text-gray-400 text-xs">Photo</span>
                </div>
                <h4 className="font-bold text-gray-900 text-sm md:text-base">Author Name</h4>
                <p className="text-xs md:text-sm text-gray-500 mt-1">Fiction Writer</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
