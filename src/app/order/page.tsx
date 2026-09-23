"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Image from "next/image";
import Link from "next/link";

function OrderForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const type = searchParams.get("type");
  const id = searchParams.get("id");

  const [item, setItem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  useEffect(() => {
    if (!type || !id) {
      setLoading(false);
      return;
    }

    const fetchItem = async () => {
      try {
        const docRef = doc(db, type === "software" ? "software" : type === "course" ? "courses" : "books", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setItem({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error fetching item", error);
      } finally {
        setLoading(false);
      }
    };

    fetchItem();
  }, [type, id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    
    try {
      await addDoc(collection(db, "orders"), {
        customerName: name,
        phone,
        address,
        itemType: type,
        itemId: id,
        itemTitle: item.title,
        price: item.price || "Depends on item",
        status: "Pending",
        createdAt: new Date().toISOString(),
      });
      
      setSuccess(true);
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
  }

  if (!item && !success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Item not found</h1>
        <Link href="/" className="text-[#009fe3] hover:underline">Go back home</Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-4">
        <div className="bg-white p-8 rounded-2xl shadow-xl max-w-md w-full text-center border border-gray-100">
          <div className="w-16 h-16 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
          <p className="text-gray-600 mb-8">Thank you, <strong>{name}</strong>. Your order for <strong>{item.title}</strong> has been received successfully. We will contact you shortly.</p>
          <Link href="/" className="bg-[#009fe3] text-white py-3 px-8 rounded-full font-medium hover:bg-[#007bb5] transition inline-block">
            Return to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/" className="text-[#009fe3] font-medium flex items-center hover:underline">
            <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Order Summary Sidebar */}
          <div className="bg-gray-900 text-white p-8 md:w-1/3 flex flex-col">
            <h2 className="text-xl font-bold mb-6 text-[#009fe3]">Order Summary</h2>
            
            <div className="flex-1">
              <div className="w-full h-40 relative rounded-lg overflow-hidden bg-white/10 mb-4 flex items-center justify-center">
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={item.title} className="object-contain w-full h-full p-2" />
                ) : (
                  <span className="text-gray-400">No Image</span>
                )}
              </div>
              
              <div className="text-xs text-gray-400 uppercase tracking-wider mb-1">{type}</div>
              <h3 className="font-bold text-lg mb-2">{item.title}</h3>
              {item.price && (
                <div className="text-xl font-bold text-[#009fe3] mt-4">৳{item.price}</div>
              )}
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-700 text-sm text-gray-400">
              <p>Cash on Delivery available for physical books.</p>
              <p className="mt-2">For software or digital courses, we will contact you with payment details.</p>
            </div>
          </div>

          {/* Checkout Form */}
          <div className="p-8 md:w-2/3">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Delivery Details</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                  <input 
                    required 
                    type="text" 
                    value={name} 
                    onChange={e => setName(e.target.value)} 
                    placeholder="e.g. Hasan Ali"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009fe3] focus:border-[#009fe3] outline-none transition" 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                  <input 
                    required 
                    type="tel" 
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    placeholder="e.g. 017xxxxxxxx"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009fe3] focus:border-[#009fe3] outline-none transition" 
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Delivery Address *</label>
                <textarea 
                  required 
                  rows={3} 
                  value={address} 
                  onChange={e => setAddress(e.target.value)} 
                  placeholder="House No, Road No, Area, City"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#009fe3] focus:border-[#009fe3] outline-none transition"
                ></textarea>
              </div>

              <div className="bg-blue-50 border border-blue-100 p-4 rounded-lg flex items-start mt-6">
                <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm text-blue-800">
                  Please confirm your phone number is correct. Our team will call you to confirm the order and explain the delivery/payment process.
                </p>
              </div>

              <div className="pt-6">
                <button 
                  type="submit" 
                  disabled={submitting} 
                  className="w-full bg-[#009fe3] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#007bb5] transition shadow-lg shadow-[#009fe3]/30 disabled:opacity-70 flex justify-center items-center"
                >
                  {submitting ? (
                    <span className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </span>
                  ) : "Confirm Order"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>}>
      <OrderForm />
    </Suspense>
  );
}
