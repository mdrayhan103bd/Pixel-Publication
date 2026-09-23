import Link from "next/link";
import Image from "next/image";

// Helper to fetch data from Firestore via REST API (works in Server Components)
async function getCollection(collectionName: string) {
  try {
    const res = await fetch(`https://firestore.googleapis.com/v1/projects/pixel-publication/databases/(default)/documents/${collectionName}`, { next: { revalidate: 10 } });
    if (!res.ok) return [];
    const data = await res.json();
    return data.documents?.map((doc: any) => {
      const fields = doc.fields;
      const parsed: any = { id: doc.name.split('/').pop() };
      for (const key in fields) {
        if (fields[key].stringValue !== undefined) parsed[key] = fields[key].stringValue;
        else if (fields[key].integerValue !== undefined) parsed[key] = parseInt(fields[key].integerValue, 10);
        else if (fields[key].arrayValue !== undefined) parsed[key] = fields[key].arrayValue.values?.map((v:any) => v.stringValue) || [];
      }
      return parsed;
    }) || [];
  } catch (error) {
    console.error("Error fetching", collectionName, error);
    return [];
  }
}

export default async function Home() {
  const themeColor = "#009fe3";
  
  // Fetch dynamic data
  const books = await getCollection("books");
  const software = await getCollection("software");
  const courses = await getCollection("courses");
  const articles = await getCollection("articles");
  
  // Get main items (fallback to first item or empty if none)
  const mainBook = books.length > 0 ? books[0] : null;
  const mainSoftware = software.length > 0 ? software[0] : null;
  
  return (
    <div className="flex flex-col items-center w-full bg-[#fcfcfc]">
      
      {/* 1. Hero Section */}
      <section className="w-full bg-[#f8f6f3] pt-12 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="md:w-1/2 flex flex-col items-start z-10">
            <div className="flex items-center text-xs font-bold tracking-widest text-gray-500 mb-6 uppercase">
              <span className="w-8 h-[2px] bg-[#009fe3] mr-3"></span>
              <span className="text-[#009fe3] mr-2">Digital Skills</span> • Books • Software • Courses • Articles
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-[1.1] text-gray-900">
              Learn Digital Skills.<br/>Work Smarter.
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-600 max-w-lg leading-relaxed">
              Digital Skills Learning Books, Software Tools & Learning Resources for Modern Learners.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
              <Link href="#books" className="bg-[#009fe3] text-white font-medium py-3 px-8 rounded-full shadow-md hover:bg-[#007bb5] transition flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Explore Books
              </Link>
              <Link href="#software" className="bg-transparent border border-[#009fe3] text-[#009fe3] font-medium py-3 px-8 rounded-full hover:bg-[#009fe3]/10 transition flex items-center justify-center">
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
                   <Image src={mainBook?.imageUrl || "/book-cover.jpg"} alt="Hero Book" fill className="object-fill" priority />
                   <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                 </div>
                 
                 {/* Book Spine (Left) */}
                 <div 
                   className="absolute top-0 left-0 h-full w-[40px] bg-gradient-to-r from-gray-900 to-[#009fe3] border-r border-black/20"
                   style={{ transform: "rotateY(-90deg) translateZ(20px) translateX(-20px)", transformOrigin: "center" }}
                 >
                   <div className="w-full h-full flex items-center justify-center -rotate-90 text-white font-bold tracking-widest text-xs whitespace-nowrap">
                     {mainBook?.title || "Pixel Publication Book"}
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
                 <div className="absolute inset-0 z-0 bg-[#007bb5] rounded-l-md shadow-2xl" style={{ transform: "translateZ(-20px)" }}></div>
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
              <span className="w-1 h-8 bg-[#009fe3] mr-3 rounded"></span> Featured Books
            </h2>
            <p className="text-gray-500 pl-4">Practical books designed to build real-world digital skills.</p>
          </div>
          
          {mainBook ? (
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
                      <Image src={mainBook.imageUrl || "/book-cover.jpg"} alt={mainBook.title} fill className="object-fill" />
                      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"></div>
                    </div>
                    
                    {/* Book Spine */}
                    <div 
                      className="absolute top-0 left-0 h-full w-[20px] bg-gradient-to-r from-gray-900 to-[#009fe3] border-r border-black/20"
                      style={{ transform: "rotateY(-90deg) translateZ(10px) translateX(-10px)", transformOrigin: "center" }}
                    >
                      <div className="w-full h-full flex items-center justify-center -rotate-90 text-white font-bold tracking-widest text-[8px] whitespace-nowrap">
                        {mainBook.title}
                      </div>
                    </div>
                    
                    {/* Book Pages */}
                    <div 
                      className="absolute top-0 left-0 w-full h-[20px] bg-gray-100 flex justify-evenly px-1"
                      style={{ transform: "rotateX(90deg) translateZ(10px) translateY(-10px)", transformOrigin: "center" }}
                    >
                        {[...Array(20)].map((_,i) => <div key={i} className="w-px h-full bg-gray-300 opacity-60"></div>)}
                    </div>

                    {/* Back Cover */}
                    <div className="absolute inset-0 z-0 bg-[#007bb5] rounded-l-sm shadow-xl" style={{ transform: "translateZ(-10px)" }}></div>
                  </div>
                </div>
                <div className="w-full sm:w-3/5 flex flex-col justify-center">
                  <h3 className="font-bold text-2xl text-gray-900 mb-4">{mainBook.title}</h3>
                  <p className="text-gray-500 text-sm mb-4 line-clamp-2">{mainBook.description}</p>
                  <ul className="space-y-2 mb-8">
                    {mainBook.features?.map((feature: string, i: number) => (
                      <li key={i} className="flex items-start text-sm text-gray-600">
                        <span className="text-[#009fe3] mr-2 mt-0.5">▪</span> {feature}
                      </li>
                    ))}
                  </ul>
                  <div className="flex gap-3 mt-auto">
                    {mainBook.buyLink ? (
                      <a href={mainBook.buyLink} target="_blank" className="flex-1 bg-[#009fe3] text-white py-2.5 px-4 rounded-full text-sm font-medium hover:bg-[#007bb5] transition flex justify-center items-center">
                        <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Get Book
                      </a>
                    ) : (
                      <button className="flex-1 bg-[#009fe3] text-white py-2.5 px-4 rounded-full text-sm font-medium hover:bg-[#007bb5] transition flex justify-center items-center">
                        Coming Soon
                      </button>
                    )}
                  </div>
                </div>
              </div>

              {/* Other Books Grid */}
              <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
                {books.slice(1).map((book: any, i: number) => (
                  <div key={i} className="bg-[#f9f9f9] rounded-2xl p-6 flex flex-col items-center text-center h-full border border-gray-50">
                    <div className="w-full h-40 relative mb-4">
                      {book.imageUrl ? (
                        <Image src={book.imageUrl} alt={book.title} fill className="object-contain" />
                      ) : (
                        <div className="w-full h-full bg-gray-200 rounded flex items-center justify-center text-gray-400 text-xs">No Cover</div>
                      )}
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">{book.title}</h4>
                    <p className="text-gray-500 text-sm mb-4 line-clamp-2">{book.description}</p>
                    {book.buyLink && (
                      <a href={book.buyLink} target="_blank" className="mt-auto text-[#009fe3] font-medium text-sm border border-[#009fe3] rounded-full px-4 py-1.5 hover:bg-[#009fe3]/10">View Book</a>
                    )}
                  </div>
                ))}
                
                {/* Filler blocks if less than 2 extra books */}
                {books.length < 3 && [...Array(3 - books.length)].map((_, i) => (
                  <div key={`filler-${i}`} className="bg-[#f9f9f9] rounded-2xl p-6 flex flex-col items-center justify-center text-center h-full min-h-[250px] border border-gray-50">
                    <div className="w-12 h-12 rounded-full bg-[#009fe3]/10 flex items-center justify-center mb-4 text-[#009fe3]">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h4 className="font-bold text-gray-800 text-lg mb-2">More Books</h4>
                    <p className="text-gray-500 font-medium">Coming Soon</p>
                    <div className="w-8 h-1 bg-[#009fe3]/30 rounded-full mt-4"></div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl">
              No books added yet. Go to Admin panel to add books.
            </div>
          )}
        </div>
      </section>

      {/* 3. Software & Office Add-ins */}
      <section id="software" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#fbfbfa]">
        <div className="max-w-7xl mx-auto">
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
              <span className="w-1 h-8 bg-[#009fe3] mr-3 rounded"></span> Software & Office Add-ins
            </h2>
            <p className="text-gray-500 pl-4">Useful tools designed to make everyday digital work easier.</p>
          </div>
          
          {mainSoftware ? (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Main Software */}
              <div className="lg:col-span-5 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 p-8 flex flex-col h-full">
                <div className="flex items-start mb-6">
                  <div className="w-16 h-16 bg-[#1a365d] rounded-2xl text-white flex items-center justify-center font-bold text-2xl mr-4 shadow-md">
                    {mainSoftware.title.substring(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2">{mainSoftware.title}</h3>
                    <span className="inline-block border border-gray-200 text-gray-600 text-xs px-3 py-1 rounded-full bg-gray-50 font-medium">{mainSoftware.subtitle}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mb-6 text-sm leading-relaxed whitespace-pre-line">
                  {mainSoftware.description}
                </p>
                
                <ul className="space-y-3 mb-8">
                  {mainSoftware.features?.map((feature: string, i: number) => (
                    <li key={i} className="flex items-center text-sm text-gray-600">
                      <svg className="w-5 h-5 text-green-500 mr-2 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
                
                <div className="flex gap-3 mt-auto">
                  {mainSoftware.buyLink && (
                    <a href={mainSoftware.buyLink} target="_blank" className="flex-1 bg-[#009fe3] text-white py-2.5 px-4 rounded-full text-sm font-medium hover:bg-[#007bb5] transition flex justify-center items-center">
                      <svg className="w-4 h-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                      </svg>
                      Get Software
                    </a>
                  )}
                </div>
              </div>

              {/* Software Screenshot */}
              <div className="lg:col-span-7 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex items-center justify-center p-4">
                <div className="w-full h-full min-h-[300px] relative rounded-xl overflow-hidden border border-gray-200 shadow-sm">
                  <Image src={mainSoftware.imageUrl || "/software-mockup.png"} alt={mainSoftware.title} fill className="object-cover object-left-top" />
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-white rounded-2xl shadow-sm">
              No software added yet. Go to Admin panel to add software.
            </div>
          )}
        </div>
      </section>

      {/* 4. Courses */}
      <section id="courses" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
          <div className="lg:w-1/3">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 flex items-center">
              <span className="w-1 h-8 bg-[#009fe3] mr-3 rounded"></span> Video Courses
            </h2>
            <p className="text-gray-500 mb-8 leading-relaxed">
              Step-by-step video tutorials and complete courses for those who learn best by watching and doing.
            </p>
            <Link href="#courses" className="inline-flex bg-[#009fe3] text-white py-4 px-8 rounded-full font-medium hover:bg-[#007bb5] transition items-center justify-center w-full lg:w-auto shadow-md">
              View All Courses
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
          
          <div className="lg:w-2/3 w-full">
            {courses.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {courses.slice(0, 2).map((course: any, i: number) => (
                  <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 group">
                    <div className="h-48 bg-gray-200 relative overflow-hidden">
                      {course.imageUrl ? (
                        <Image src={course.imageUrl} alt={course.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                      ) : (
                        <div className="absolute inset-0 bg-[#009fe3]/10 flex items-center justify-center">
                          <svg className="w-12 h-12 text-[#009fe3]/40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div>
                      )}
                    </div>
                    <div className="p-6">
                      <div className="flex justify-between items-center mb-3">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{course.lessons} Lessons</span>
                        <div className="flex items-center text-[#009fe3] font-bold">
                          ৳{course.price}
                          {course.originalPrice && <span className="text-gray-400 line-through text-xs ml-1 font-normal">৳{course.originalPrice}</span>}
                        </div>
                      </div>
                      <h3 className="font-bold text-lg text-gray-900 mb-2 line-clamp-2">{course.title}</h3>
                      <p className="text-gray-500 text-sm mb-4">by {course.instructor}</p>
                      {course.enrollLink && (
                        <a href={course.enrollLink} target="_blank" className="block text-center w-full py-2 bg-gray-50 hover:bg-[#009fe3]/10 text-[#009fe3] font-medium rounded-lg transition text-sm">
                          Enroll Now
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl w-full border border-gray-100">
                No courses added yet. Go to Admin panel to add courses.
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. Learning Articles */}
      <section id="articles" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2 flex items-center">
                <span className="w-1 h-8 bg-[#009fe3] mr-3 rounded"></span> Learning Articles
              </h2>
              <p className="text-gray-500 pl-4">Tips, tricks and tutorials to boost your productivity.</p>
            </div>
            <Link href="#articles" className="hidden sm:flex text-[#009fe3] font-medium hover:underline items-center">
              View All Articles
              <svg className="w-4 h-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
          
          {articles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {articles.slice(0, 3).map((article: any, i: number) => (
                <div key={i} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition group flex flex-col h-full">
                  <div className="h-48 relative overflow-hidden bg-gray-200">
                    {article.imageUrl && (
                      <Image src={article.imageUrl} alt={article.title} fill className="object-cover group-hover:scale-105 transition duration-500" />
                    )}
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center text-xs text-gray-500 mb-3">
                      <span className="bg-gray-100 px-2 py-1 rounded text-gray-700 font-medium mr-3">{article.category}</span>
                      <span>{article.date} • {article.readTime}</span>
                    </div>
                    <h4 className="font-bold text-lg text-gray-900 mb-2 leading-snug group-hover:text-[#009fe3] transition">{article.title}</h4>
                    {article.link && (
                      <a href={article.link} target="_blank" className="text-[#009fe3] text-sm font-bold flex items-center mt-auto pt-4">
                        Read Article
                        <svg className="w-4 h-4 ml-1 group-hover:translate-x-1 transition" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-500 bg-white rounded-2xl w-full border border-gray-100">
              No articles added yet. Go to Admin panel to add articles.
            </div>
          )}
        </div>
      </section>

      {/* 6. About & Why Choose Us */}
      <section id="about" className="w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#fbfbfa] border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12">
          {/* About */}
          <div className="lg:w-1/2">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 flex items-center">
              <span className="w-8 h-[2px] bg-[#009fe3] mr-4"></span> About Pixel Publication
            </h2>
            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-full sm:w-1/2 h-40 bg-white rounded-lg shrink-0 flex items-center justify-center shadow-sm border border-gray-100 relative overflow-hidden">
                <Image src="/about-img.jpg" alt="About Pixel Publication" fill className="object-contain p-2" />
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
              <span className="w-8 h-[2px] bg-[#009fe3] mr-4"></span> Why Choose Us
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[
                {icon: "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z", label: "Practical Learning"},
                {icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", label: "Professional Content"},
                {icon: "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z", label: "Useful Digital Tools"},
                {icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", label: "Continuous Learning"}
              ].map((item, i) => (
                <div key={i} className="bg-white border border-gray-100 p-4 rounded-xl flex flex-col items-center justify-center text-center hover:border-[#009fe3]/30 hover:shadow-md transition">
                  <div className="w-12 h-12 bg-[#009fe3]/10 text-[#009fe3] rounded-full flex items-center justify-center mb-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                  </div>
                  <span className="text-sm font-medium text-gray-800">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
