import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start text-center sm:text-left bg-white p-10 rounded-2xl shadow-xl max-w-2xl w-full mx-4">
        <div className="w-full flex justify-center mb-4">
          <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-600 tracking-tight">
            Pixel Publication
          </h1>
        </div>
        
        <p className="text-gray-600 text-lg sm:text-xl text-center w-full mb-6">
          Welcome to the official website of Pixel Publication. We are building something amazing here.
        </p>

        <div className="flex gap-4 items-center flex-col sm:flex-row w-full justify-center">
          <a
            className="rounded-full border border-solid border-transparent transition-colors flex items-center justify-center bg-blue-600 text-white gap-2 hover:bg-blue-700 text-sm sm:text-base h-10 sm:h-12 px-8 sm:px-10 font-medium"
            href="#publications"
            rel="noopener noreferrer"
          >
            View Publications
          </a>
          <a
            className="rounded-full border border-solid border-gray-300 transition-colors flex items-center justify-center hover:bg-gray-100 text-sm sm:text-base h-10 sm:h-12 px-8 sm:px-10 font-medium text-gray-700"
            href="#contact"
            rel="noopener noreferrer"
          >
            Contact Us
          </a>
        </div>
      </main>

      <footer className="mt-12 text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Pixel Publication. All rights reserved.
      </footer>
    </div>
  );
}
