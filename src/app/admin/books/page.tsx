"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

interface Book {
  id: string;
  title: string;
  description: string;
  features: string[];
  imageUrl: string;
  buyLink: string;
}

export default function AdminBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [featuresText, setFeaturesText] = useState(""); // Comma separated
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [buyLink, setBuyLink] = useState("");

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "books"));
      const booksData: Book[] = [];
      querySnapshot.forEach((doc) => {
        booksData.push({ id: doc.id, ...doc.data() } as Book);
      });
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const openModal = (book?: Book) => {
    if (book) {
      setEditingId(book.id);
      setTitle(book.title);
      setDescription(book.description);
      setFeaturesText(book.features?.join(", ") || "");
      setImageUrl(book.imageUrl);
      setBuyLink(book.buyLink || "");
    } else {
      setEditingId(null);
      setTitle("");
      setDescription("");
      setFeaturesText("");
      setImageUrl("");
      setBuyLink("");
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalImageUrl = imageUrl;
      
      // Upload new image if selected
      if (imageFile) {
        const imageRef = ref(storage, `books/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      const bookData = {
        title,
        description,
        features: featuresText.split(",").map(f => f.trim()).filter(f => f),
        imageUrl: finalImageUrl,
        buyLink
      };

      if (editingId) {
        await updateDoc(doc(db, "books", editingId), bookData);
      } else {
        await addDoc(collection(db, "books"), bookData);
      }
      
      setIsModalOpen(false);
      fetchBooks();
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Error saving book. Make sure Firebase is properly configured.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteDoc(doc(db, "books", id));
        fetchBooks();
      } catch (error) {
        console.error("Error deleting book:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Books</h1>
          <p className="text-gray-500 text-sm mt-1">Add, edit or remove books from the website.</p>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-[#009fe3] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#007bb5] transition flex items-center shadow-sm"
        >
          <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add New Book
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Features</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {books.length === 0 && (
                <tr>
                  <td colSpan={3} className="px-6 py-12 text-center text-gray-500">No books found. Add your first book!</td>
                </tr>
              )}
              {books.map((book) => (
                <tr key={book.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-12 bg-gray-100 rounded border border-gray-200 overflow-hidden relative">
                        {book.imageUrl ? (
                          <img src={book.imageUrl} alt={book.title} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-gray-400 text-xs flex items-center justify-center h-full">No Img</span>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{book.title}</div>
                        <div className="text-sm text-gray-500 truncate w-48">{book.description}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-gray-900">{book.features?.length || 0} features</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openModal(book)} className="text-[#009fe3] hover:text-[#007bb5] mr-4">Edit</button>
                    <button onClick={() => handleDelete(book.id)} className="text-red-600 hover:text-red-900">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex justify-between items-center">
              <h3 className="text-xl font-bold text-gray-900">{editingId ? "Edit Book" : "Add New Book"}</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <form onSubmit={handleSave} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book Title</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#009fe3] focus:border-[#009fe3]" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#009fe3] focus:border-[#009fe3]"></textarea>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                <input type="text" value={featuresText} onChange={e => setFeaturesText(e.target.value)} placeholder="e.g. MS Word, Excel, Shortcuts" className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#009fe3] focus:border-[#009fe3]" />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buy/Order Link</label>
                <input type="url" value={buyLink} onChange={e => setBuyLink(e.target.value)} placeholder="e.g. https://rokomari.com/..." className="w-full p-2 border border-gray-300 rounded-md focus:ring-[#009fe3] focus:border-[#009fe3]" />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Cover Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full p-2 border border-gray-300 rounded-md" />
                {imageUrl && !imageFile && (
                  <div className="mt-2 h-20 relative">
                    <img src={imageUrl} alt="Preview" className="h-full object-contain" />
                  </div>
                )}
              </div>
              
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-[#009fe3] text-white rounded-lg hover:bg-[#007bb5] font-medium disabled:opacity-50">
                  {saving ? "Saving..." : "Save Book"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
