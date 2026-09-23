import Link from "next/link";
import Image from "next/image";

export default function Home() {
  const themeColor = "#c5914c";
  
  return (
    <div className="flex flex-col items-center w-full bg-[#fcfcfc]">
      
      {/* 1. Hero Section */}
      <section className="w-full bg-[#f8f6f3] pt-12 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 flex flex-col items-start z-10">
            <div className="flex items-center text-xs font-bold tracking-widest text-gray-500 mb-6 uppercase">
              <span className="w-8 h-[2px] bg-[#c5914c] mr-3"></span>
              <span className="text-[#c5914c] mr-2">Digital Skills</span> • Books • Software • Courses • Articles
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] text-gray-900">
              Learn Digital Skills.<br/>Work Smarter.
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-lg leading-relaxed">
              Digital Skills Learning Books, Software Tools & Learning Resources for Modern Learners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="#books" className="bg-[#c5914c] text-white font-medium py-3 px-8 rounded-full shadow-md hover:bg-[#b07d3b] transition flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Explore Books
              </Link>
              <Link href="#software" className="bg-transparent border border-[#c5914c] text-[#c5914c] font-medium py-3 px-8 rounded-full hover:bg-[#c5914c]/10 transition flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Explore Software
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center lg:justify-end w-full relative h-[400px] md:h-[500px] items-center">
             {/* 3D Book Mockup */}
             <div className="relative group cursor-pointer" style={{ perspective: "1500px" }}>
               <div 
                 className="relative w-56 md:w-72 h-[350px] md:h-[420px] transition-transform duration-700 ease-out group-hover:rotate-y-[25deg]" 
                 style={{ transformStyle: "preserve-3d", transform: "rotateY(20deg) rotateX(5deg)" }}
               >
                 {/* Front Cover */}
                 <div className="absolute inset-0 z-20 rounded-r-md overflow-hidden bg-white shadow-2xl" style={{ transform: "translateZ(20px)" }}>
                   <Image src="/book-cover.jpg" alt="Basic Office Application Book" fill className="object-fill" priority />
                   {/* Glossy Overlay */}
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                 </div>
                 
                 {/* Book Spine (Left) */}
                 <div 
                   className="absolute top-0 left-0 h-full w-[40px] bg-gradient-to-r from-gray-900 to-[#c5914c] border-r border-black/20"
                   style={{ transform: "rotateY(-90deg) translateZ(20px) translateX(-20px)", transformOrigin: "center" }}
                 >
                   <div className="w-full h-full flex items-center justify-center -rotate-90 text-white font-bold tracking-widest text-xs whitespace-nowrap">
                     বেসিক অফিস অ্যাপ্লিকেশন
                   </div>
                 </div>
                 
                 {/* Book Pages (Top) */}
                 <div 
                   className="absolute top-0 left-0 w-full h-[40px] bg-gray-100 flex justify-evenly px-1"
                   style={{ transform: "rotateX(90deg) translateZ(20px) translateY(-20px)", transformOrigin: "center" }}
                 >
                    {[...Array(40)].map((_,i) => <div key={i} className="w-px h-full bg-gray-300 opacity-60"></div>)}
                 </div>

                 {/* Book Back Cover */}
                 <div className="absolute inset-0 z-0 bg-[#8b2323] rounded-l-md shadow-2xl" style={{ transform: "translateZ(-20px)" }}></div>
               </div>
             </div>
          </div>
        </div>
      </section>

      {/* 2. Featured Books */}
      <section id="books" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-1 h-8 bg-[#c5914c] mr-3 rounded"></span> Featured Books
            </h2>
            <p className="text-gray-500 pl-4">Practical books designed to build real-world digital skills.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Featured Book */}
            <div className="lg:col-span-6 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex flex-col sm:flex-row p-6 sm:p-8">
              <div className="w-full sm:w-2/5 min-h-[300px] mb-6 sm:mb-0 sm:mr-8 flex items-center justify-center relative perspective-[1200px]" style={{ perspective: "1200px" }}>
                 <div 
                   className="relative w-40 h-[240px] md:w-48 md:h-[280px] transition-transform duration-500 ease-out hover:rotate-y-[20deg]"
                   style={{ transformStyle: "preserve-3d", transform: "rotateY(15deg) rotateX(5deg)" }}
                 >
                   {/* Front Cover */}
                   <div className="absolute inset-0 z-20 rounded-r-sm overflow-hidden bg-white shadow-xl" style={{ transform: "translateZ(10px)" }}>
                     <Image src="/book-cover.jpg" alt="Basic Office Application Book" fill className="object-fill" />
                     <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                   </div>
                   
                   {/* Book Spine (Left) */}
                   <div 
                     className="absolute top-0 left-0 h-full w-[20px] bg-gradient-to-r from-gray-900 to-[#c5914c] border-r border-black/20"
                     style={{ transform: "rotateY(-90deg) translateZ(10px) translateX(-10px)", transformOrigin: "center" }}
                   >
                     <div className="w-full h-full flex items-center justify-center -rotate-90 text-white font-bold tracking-widest text-[8px] whitespace-nowrap">
                       বেসিক অফিস অ্যাপ্লিকেশন
                     </div>
                   </div>
                   
                   {/* Book Pages (Top) */}
                   <div 
                     className="absolute top-0 left-0 w-full h-[20px] bg-gray-100 flex justify-evenly px-1"
                     style={{ transform: "rotateX(90deg) translateZ(10px) translateY(-10px)", transformOrigin: "center" }}
                   >
                      {[...Array(20)].map((_,i) => <div key={i} className="w-px h-full bg-gray-300 opacity-60"></div>)}
                   </div>

                   {/* Book Back Cover */}
                   <div className="absolute inset-0 z-0 bg-[#8b2323] rounded-l-sm shadow-xl" style={{ transform: "translateZ(-10px)" }}></div>
                 </div>
              </div>
              <div className="w-full sm:w-3/5 flex flex-col justify-center">
                <h3 className="font-bold text-2xl text-gray-900 mb-4">Basic Office Application</h3>
                <ul className="space-y-2 mb-8">
                  {["Windows Basics", "Microsoft Word", "Microsoft Excel", "Microsoft PowerPoint", "Microsoft Access", "Bangla, English & Arabic Typing", "Practical Examples", "Shortcuts & Step-by-Step Learning"].map((feature, i) => (
                    <li key={i} className="flex items-start text-sm text-gray-600">
                      <span className="text-[#c5914c] mr-2 mt-0.5">▪</span> {feature}
                    </li>
                  ))}
                </ul>
                <div className="flex gap-3 mt-auto">
                  <button className="flex-1 bg-[#c5914c] text-white py-2.5 px-4 rounded-full text-sm font-medium hover:bg-[#b07d3b] transition flex justify-center items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                    View Book
                  </button>
                  <button className="flex-1 bg-transparent border border-gray-300 text-gray-700 py-2.5 px-4 rounded-full text-sm font-medium hover:bg-gray-50 transition flex justify-center items-center">
                    <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Order Now
                  </button>
                </div>
              </div>
            </div>

            {/* Other Books Grid */}
            <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[1, 2, 3].map((item) => (
                <div key={item} className="bg-[#f9f9f9] rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[250px] border border-gray-50">
                  <div className="w-12 h-12 rounded-full bg-[#c5914c]/10 flex items-center justify-center mb-4 text-[#c5914c]">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                    </svg>
                  </div>
                  <h4 className="font-bold text-gray-800 text-lg mb-2">More Digital Skills Books</h4>
                  <p className="text-gray-500 font-medium">Coming Soon</p>
                  <div className="w-8 h-1 bg-[#c5914c]/30 rounded-full mt-4"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. Software & Office Add-ins */}
      <section id="software" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#fbfbfa]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-1 h-8 bg-[#c5914c] mr-3 rounded"></span> Software & Office Add-ins
            </h2>
            <p className="text-gray-500 pl-4">Useful tools designed to make everyday digital work easier.</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Main Software */}
            <div className="lg:col-span-5 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 p-8 flex flex-col h-full">
              <div className="flex items-start mb-6">
                <div className="w-16 h-16 bg-[#1a365d] rounded-2xl text-white flex items-center justify-center font-bold text-2xl mr-4 shadow-md">
                  OT
                </div>
                <div>
                  <h3 className="font-bold text-xl text-gray-900 mb-2">Unicode to Bijoy Converter</h3>
                  <span className="inline-block border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full bg-gray-50 font-medium">Microsoft Word Add-in</span>
                </div>
              </div>
              
              <p className="text-gray-600 mb-6 text-sm leading-relaxed">
                Convert Unicode Bangla text to Bijoy directly <strong className="text-gray-900">inside Microsoft Word</strong>.
              </p>
              
              <ul className="space-y-3 mb-8">
                {["Unicode to Bijoy conversion", "Works directly inside Microsoft Word", "Easy workflow", "No copy-paste to online converter", "English text remains correct"].map((feature, i) => (
                  <li key={i} className="flex items-center text-sm text-gray-600">
                    <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              
              <div className="flex gap-3 mt-auto">
                <button className="flex-1 bg-[#c5914c] text-white py-2.5 px-4 rounded-full text-sm font-medium hover:bg-[#b07d3b] transition flex justify-center items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  View Details
                </button>
                <button className="flex-1 bg-transparent border border-gray-300 text-gray-700 py-2.5 px-4 rounded-full text-sm font-medium hover:bg-gray-50 transition flex justify-center items-center">
                  <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Get Now
                </button>
              </div>
            </div>

            {/* Software Screenshot */}
            <div className="lg:col-span-7 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex items-center justify-center p-4">
              <div className="w-full h-full min-h-[300px] relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                <Image src="/software-mockup.png" alt="Unicode to Bijoy Converter Interface" fill className="object-cover object-left-top" />
              </div>
            </div>

            {/* Coming Soon Tool */}
            <div className="lg:col-span-2 bg-[#f9f9f9] rounded-2xl p-6 flex flex-col items-center justify-center text-center border border-gray-50 h-full min-h-[250px]">
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center mb-4 text-gray-500">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h4 className="font-bold text-gray-800 text-base mb-1">More Tools</h4>
              <p className="text-gray-500 text-sm font-medium">Coming Soon</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Learn With Pixel Publication (Courses) */}
      <section id="courses" className="w-full py-16 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-gray-900">Learn With Pixel Publication</h2>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-6 items-center">
            {/* Free Courses */}
            <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-6 flex items-center w-full shadow-sm">
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mr-5">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-blue-900 mb-1">FREE COURSES</h4>
                <p className="text-gray-500 text-sm">Learn essential digital skills with accessible educational content.</p>
              </div>
            </div>

            {/* Paid Courses */}
            <div className="flex-1 bg-[#fdfaf5] border border-[#f5ead6] rounded-2xl p-6 flex items-center w-full shadow-sm">
              <div className="w-14 h-14 bg-[#c5914c]/10 rounded-xl flex items-center justify-center text-[#c5914c] mr-5">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-[#b07d3b] mb-1">PAID COURSES</h4>
                <p className="text-gray-500 text-sm">Structured courses for deeper practical learning.</p>
              </div>
            </div>

            {/* Explore Button */}
            <div className="flex-shrink-0 w-full lg:w-auto text-center lg:text-left mt-4 lg:mt-0">
              <Link href="#courses" className="inline-flex bg-[#c5914c] text-white py-4 px-8 rounded-full font-medium hover:bg-[#b07d3b] transition items-center justify-center w-full lg:w-auto shadow-md">
                Explore Courses 
                <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Learning Articles */}
      <section id="articles" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-1 h-8 bg-[#c5914c] mr-3 rounded"></span> Learning Articles
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {tag: "MS WORD", title: "10 Essential MS Word Shortcuts", desc: "Save time and work smarter with these must-know MS Word shortcuts.", color: "bg-blue-800"},
              {tag: "EXCEL", title: "Excel Skills Every Office Professional Should Know", desc: "Boost your productivity with these essential Excel skills.", color: "bg-green-700"},
              {tag: "BANGLA TYPING", title: "Unicode vs Bijoy: What's the Difference?", desc: "Understand the key differences between Unicode and Bijoy for Bangla typing.", color: "bg-purple-700"},
              {tag: "COMPUTER BASICS", title: "Computer Basics for Beginners", desc: "Get started with computers, even if you're a complete beginner.", color: "bg-gray-800", isImage: true}
            ].map((article, i) => (
              <div key={i} className="flex flex-col group cursor-pointer border border-transparent hover:border-gray-100 rounded-xl hover:shadow-lg transition-all p-2 pb-6">
                <div className={`h-40 w-full rounded-lg mb-4 ${article.isImage ? 'bg-gray-200' : article.color} flex items-center justify-center overflow-hidden`}>
                  {article.isImage ? (
                    <span className="text-gray-400 font-medium text-sm">Article Image</span>
                  ) : (
                    <div className="w-12 h-12 bg-white/20 rounded backdrop-blur-sm flex items-center justify-center text-white font-bold text-xl">Icon</div>
                  )}
                </div>
                <div className="px-2 flex flex-col flex-grow">
                  <span className="text-xs font-bold text-gray-400 tracking-wider mb-2 uppercase">{article.tag}</span>
                  <h4 className="font-bold text-lg text-gray-900 mb-2 leading-snug group-hover:text-[#c5914c] transition">{article.title}</h4>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-3">{article.desc}</p>
                  <span className="text-[#c5914c] text-sm font-bold flex items-center mt-auto">
                    Read Article 
                    <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. About & Why Choose Us */}
      <section id="about" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#fbfbfa] border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* About */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-[2px] bg-[#c5914c] mr-4"></span> About Pixel Publication
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-full sm:w-2/5 h-32 bg-gray-200 rounded-lg shrink-0 flex items-center justify-center shadow-inner">
                <span className="text-gray-400 text-sm">Books & Laptop Img</span>
              </div>
              <div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">About Pixel Publication</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Pixel Publication creates practical Digital Skills Learning Books, useful software tools, courses and educational resources to help learners and professionals improve their digital skills.
                </p>
              </div>
            </div>
          </div>
          
          {/* Why Choose Us */}
          <div className="lg:w-1/2">
            <h2 className="text-lg font-bold text-gray-900 mb-8 flex items-center justify-center lg:justify-start">
              <span className="w-8 h-[2px] bg-[#c5914c] mr-4"></span> Why Choose Us
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", label: "Practical Learning"},
                {icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Professional Content"},
                {icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", label: "Useful Digital Tools"},
                {icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", label: "Continuous Learning"}
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#c5914c]/30 hover:shadow-md transition">
                  <div className="w-12 h-12 bg-[#c5914c]/10 text-[#c5914c] rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-xs font-bold text-gray-700 leading-tight">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
