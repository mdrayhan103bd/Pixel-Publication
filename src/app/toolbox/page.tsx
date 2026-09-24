"use client";

import { useState } from "react";
import Link from "next/link";
import { unicodeToBijoy, bijoyToUnicode } from "@abdalgolabs/ansi-unicode-converter";

export default function Toolbox() {
  const [unicodeText, setUnicodeText] = useState("");
  const [bijoyText, setBijoyText] = useState("");
  
  const handleUnicodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setUnicodeText(text);
    // Convert to Bijoy automatically
    try {
      const converted = unicodeToBijoy(text);
      setBijoyText(converted);
    } catch (err) {
      console.error("Conversion error", err);
    }
  };

  const handleBijoyChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.target.value;
    setBijoyText(text);
    // Convert to Unicode automatically
    try {
      const converted = bijoyToUnicode(text);
      setUnicodeText(converted);
    } catch (err) {
      console.error("Conversion error", err);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] selection:bg-[#009fe3]/20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-500 hover:text-[#009fe3] transition font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <div className="flex items-center bg-[#009fe3]/10 px-4 py-1.5 rounded-full">
            <span className="text-[#009fe3] font-bold text-sm tracking-wide">TOOLBOX</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4 text-[#009fe3]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Unicode to <span className="text-[#009fe3]">Bijoy</span> Converter
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Easily convert your Bengali text from Unicode to Bijoy (ANSI) format and vice versa in real-time.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative">
          {/* Unicode Box */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-lg flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#009fe3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" /></svg>
                Unicode (অভ্র)
              </h3>
              <button 
                onClick={() => copyToClipboard(unicodeText)}
                className="text-sm font-medium text-[#009fe3] hover:text-[#007bb5] transition flex items-center bg-blue-50 px-3 py-1.5 rounded-full"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Copy
              </button>
            </div>
            <textarea
              className="flex-1 w-full p-6 text-lg min-h-[300px] resize-none outline-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#009fe3]/20"
              placeholder="এখানে ইউনিকোড টেক্সট পেস্ট করুন অথবা লিখুন..."
              value={unicodeText}
              onChange={handleUnicodeChange}
            ></textarea>
          </div>

          {/* Center Arrows Icon (visible on large screens) */}
          <div className="hidden lg:flex absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white rounded-full shadow-xl items-center justify-center border border-gray-100 text-[#009fe3]">
             <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
            </svg>
          </div>

          {/* Bijoy Box */}
          <div className="bg-white rounded-3xl shadow-lg border border-gray-100 flex flex-col overflow-hidden">
            <div className="bg-gray-50 border-b border-gray-100 p-4 flex justify-between items-center">
              <h3 className="font-bold text-gray-800 text-lg flex items-center">
                <svg className="w-5 h-5 mr-2 text-[#009fe3]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                Bijoy (বিজয়)
              </h3>
              <button 
                onClick={() => copyToClipboard(bijoyText)}
                className="text-sm font-medium text-[#009fe3] hover:text-[#007bb5] transition flex items-center bg-blue-50 px-3 py-1.5 rounded-full"
              >
                <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                Copy
              </button>
            </div>
            <textarea
              className="flex-1 w-full p-6 text-lg min-h-[300px] resize-none outline-none text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#009fe3]/20"
              placeholder="এখানে বিজয় টেক্সট পেস্ট করুন অথবা লিখুন..."
              value={bijoyText}
              onChange={handleBijoyChange}
            ></textarea>
          </div>
        </div>

        <div className="mt-8 text-center text-gray-500 text-sm">
          <p>This converter works automatically. Just type or paste in any box and the result will instantly appear in the other.</p>
        </div>
      </main>
    </div>
  );
}
