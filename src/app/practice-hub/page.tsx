"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

// Sample words for the typing test
const WORDS = [
  "the", "be", "of", "and", "a", "to", "in", "he", "have", "it", "that", "for",
  "they", "I", "with", "as", "not", "on", "she", "at", "by", "this", "we", "you",
  "do", "but", "from", "or", "which", "one", "would", "all", "will", "there",
  "say", "who", "make", "when", "can", "more", "if", "no", "man", "out", "other",
  "so", "what", "time", "up", "go", "about", "than", "into", "could", "state",
  "only", "new", "year", "some", "take", "come", "these", "know", "see", "use",
  "get", "like", "then", "first", "any", "work", "now", "may", "such", "give",
  "over", "think", "most", "even", "find", "day", "also", "after", "way", "many",
  "must", "look", "before", "great", "back", "through", "long", "where", "much",
  "should", "well", "people", "down", "own", "just", "because", "good", "each"
];

const TIME_LIMIT = 60;

export default function PracticeHub() {
  const [textToType, setTextToType] = useState("");
  const [userInput, setUserInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TIME_LIMIT);
  const [status, setStatus] = useState<"idle" | "typing" | "finished">("idle");
  const [wpm, setWpm] = useState(0);
  const [cpm, setCpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  
  const inputRef = useRef<HTMLInputElement>(null);

  // Initialize text
  useEffect(() => {
    generateText();
  }, []);

  // Timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (status === "typing" && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && status === "typing") {
      finishTest();
    }
    return () => clearInterval(timer);
  }, [status, timeLeft]);

  const generateText = () => {
    const shuffled = [...WORDS].sort(() => 0.5 - Math.random());
    setTextToType(shuffled.slice(0, 50).join(" "));
  };

  const startTest = () => {
    setStatus("typing");
    setTimeLeft(TIME_LIMIT);
    setUserInput("");
    generateText();
    setTimeout(() => {
      inputRef.current?.focus();
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (status === "idle") {
      setStatus("typing");
    }
    
    const value = e.target.value;
    // Don't allow typing beyond the text length
    if (value.length <= textToType.length) {
      setUserInput(value);
    }

    if (value.length === textToType.length) {
      finishTest(value);
    }
  };

  const finishTest = (finalInput = userInput) => {
    setStatus("finished");
    
    // Calculate metrics
    let correctChars = 0;
    for (let i = 0; i < finalInput.length; i++) {
      if (finalInput[i] === textToType[i]) {
        correctChars++;
      }
    }
    
    const timeUsed = TIME_LIMIT - timeLeft || 1; // prevent divide by zero
    const timeInMins = timeUsed / 60;
    
    const currentCpm = Math.round(correctChars / timeInMins);
    const currentWpm = Math.round((correctChars / 5) / timeInMins);
    const acc = finalInput.length > 0 ? Math.round((correctChars / finalInput.length) * 100) : 0;
    
    setCpm(currentCpm);
    setWpm(currentWpm);
    setAccuracy(acc);
  };

  const renderText = () => {
    return textToType.split("").map((char, index) => {
      let color = "text-gray-400";
      if (index < userInput.length) {
        color = userInput[index] === char ? "text-[#009fe3] font-medium" : "text-red-500 bg-red-100/50 rounded-sm";
      }
      return (
        <span key={index} className={`transition-colors duration-150 ${color}`}>
          {char}
        </span>
      );
    });
  };

  return (
    <div className="min-h-screen bg-[#fbfbfa] selection:bg-[#009fe3]/20">
      {/* Header */}
      <header className="bg-white border-b border-gray-100 py-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link href="/" className="flex items-center text-gray-500 hover:text-[#009fe3] transition font-medium">
            <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Home
          </Link>
          <div className="flex items-center bg-[#009fe3]/10 px-4 py-1.5 rounded-full">
            <span className="text-[#009fe3] font-bold text-sm tracking-wide">PRACTICE HUB</span>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-2xl mb-4 text-[#009fe3]">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Test your <span className="text-[#009fe3]">typing</span> skills
          </h1>
          <p className="text-lg text-gray-500 max-w-2xl mx-auto">
            Type the text below as quickly and accurately as you can to find out your typing speed in WPM.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1">{timeLeft}</div>
            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Seconds</div>
          </div>
          
          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1">{status === 'finished' ? wpm : '--'}</div>
            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Words/Min</div>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1">{status === 'finished' ? cpm : '--'}</div>
            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Chars/Min</div>
          </div>

          <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 p-6 flex flex-col items-center justify-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-3">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
            </div>
            <div className="text-4xl font-black text-gray-900 mb-1">{status === 'finished' ? `${accuracy}%` : '--'}</div>
            <div className="text-sm text-gray-500 font-medium uppercase tracking-wider">Accuracy</div>
          </div>
        </div>

        {/* Typing Area */}
        <div 
          className={`bg-white rounded-3xl shadow-xl border-2 transition-all duration-300 relative overflow-hidden ${
            status === 'typing' ? 'border-[#009fe3] shadow-[#009fe3]/10' : 'border-gray-100'
          }`}
        >
          {status === 'idle' && (
            <div className="absolute inset-0 bg-white/60 backdrop-blur-[2px] z-10 flex items-center justify-center">
              <button 
                onClick={startTest}
                className="bg-[#009fe3] text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-[#007bb5] transition transform hover:scale-105 shadow-lg shadow-[#009fe3]/30 flex items-center"
              >
                <svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Start Typing Test
              </button>
            </div>
          )}

          {status === 'finished' && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-10 flex flex-col items-center justify-center p-6 text-center">
              <h3 className="text-3xl font-black text-gray-900 mb-2">Test Complete! 🎉</h3>
              <p className="text-gray-600 mb-8 max-w-md">
                You type at a speed of <strong className="text-[#009fe3] text-xl">{wpm} WPM</strong> with <strong>{accuracy}%</strong> accuracy. Keep practicing to improve!
              </p>
              <button 
                onClick={startTest}
                className="bg-gray-900 text-white px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition shadow-lg flex items-center"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Try Again
              </button>
            </div>
          )}

          <div 
            className="p-8 md:p-12 text-2xl md:text-3xl leading-relaxed md:leading-relaxed font-medium tracking-wide text-gray-400 select-none cursor-text relative"
            onClick={() => inputRef.current?.focus()}
          >
            {/* The Text */}
            {renderText()}
            
            {/* Hidden Input to capture keystrokes */}
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={handleInputChange}
              disabled={status === 'finished'}
              className="absolute opacity-0 pointer-events-none"
              autoComplete="off"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
            />
          </div>
        </div>

        {/* Tips Section */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start">
            <div className="bg-blue-50 text-blue-500 p-2 rounded-lg mr-4 shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Focus on Accuracy</h4>
              <p className="text-sm text-gray-500">Speed comes naturally. Trying to type fast with mistakes will slow you down in the long run.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start">
            <div className="bg-purple-50 text-purple-500 p-2 rounded-lg mr-4 shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Look at the Screen</h4>
              <p className="text-sm text-gray-500">Try to memorize where the keys are and keep your eyes focused on the text, not your keyboard.</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex items-start">
            <div className="bg-green-50 text-green-500 p-2 rounded-lg mr-4 shrink-0">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <h4 className="font-bold text-gray-900 mb-1">Practice Daily</h4>
              <p className="text-sm text-gray-500">Just 10 minutes of daily typing practice can drastically improve your muscle memory and speed.</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
