"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

interface Course {
  id: string;
  title: string;
  instructor: string;
  lessons: number;
  price: string;
  originalPrice: string;
  imageUrl: string;
  enrollLink: string;
}

export default function AdminCourses() {
  const [items, setItems] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [instructor, setInstructor] = useState("");
  const [lessons, setLessons] = useState(0);
  const [price, setPrice] = useState("");
  const [originalPrice, setOriginalPrice] = useState(""); 
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [enrollLink, setEnrollLink] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      const data: Course[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Course);
      });
      setItems(data);
    } catch (error) {
      console.error("Error fetching courses:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openModal = (item?: Course) => {
    if (item) {
      setEditingId(item.id);
      setTitle(item.title);
      setInstructor(item.instructor);
      setLessons(item.lessons);
      setPrice(item.price);
      setOriginalPrice(item.originalPrice || "");
      setImageUrl(item.imageUrl);
      setEnrollLink(item.enrollLink || "");
    } else {
      setEditingId(null);
      setTitle("");
      setInstructor("");
      setLessons(0);
      setPrice("");
      setOriginalPrice("");
      setImageUrl("");
      setEnrollLink("");
    }
    setImageFile(null);
    setIsModalOpen(true);
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      let finalImageUrl = imageUrl;
      
      if (imageFile) {
        const imageRef = ref(storage, `courses/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      const itemData = {
        title,
        instructor,
        lessons: Number(lessons),
        price,
        originalPrice,
        imageUrl: finalImageUrl,
        enrollLink
      };

      if (editingId) {
        await updateDoc(doc(db, "courses", editingId), itemData);
      } else {
        await addDoc(collection(db, "courses"), itemData);
      }
      
      setIsModalOpen(false);
      fetchItems();
    } catch (error) {
      console.error("Error saving course:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this course?")) {
      try {
        await deleteDoc(doc(db, "courses", id));
        fetchItems();
      } catch (error) {
        console.error("Error deleting course:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Courses</h1>
        </div>
        <button onClick={() => openModal()} className="bg-[#009fe3] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#007bb5]">
          Add New Course
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Price</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-12 w-20 bg-gray-100 rounded overflow-hidden">
                        {item.imageUrl && <img src={item.imageUrl} className="h-full w-full object-cover" />}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">by {item.instructor} • {item.lessons} lessons</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ৳{item.price} <span className="line-through text-gray-400 text-xs ml-1">{item.originalPrice ? `৳${item.originalPrice}` : ''}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button onClick={() => openModal(item)} className="text-[#009fe3] hover:text-[#007bb5] mr-4">Edit</button>
                    <button onClick={() => handleDelete(item.id)} className="text-red-600 hover:text-red-900">Delete</button>
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
          <div className="bg-white rounded-xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <h3 className="text-xl font-bold mb-4">{editingId ? "Edit Course" : "Add Course"}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Title</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border rounded-md" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium">Instructor</label>
                  <input required type="text" value={instructor} onChange={e => setInstructor(e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Lessons Count</label>
                  <input required type="number" value={lessons} onChange={e => setLessons(Number(e.target.value))} className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Current Price (৳)</label>
                  <input required type="text" value={price} onChange={e => setPrice(e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
                <div>
                  <label className="block text-sm font-medium">Original Price (৳)</label>
                  <input type="text" value={originalPrice} onChange={e => setOriginalPrice(e.target.value)} className="w-full p-2 border rounded-md" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Enroll Link</label>
                <input type="url" value={enrollLink} onChange={e => setEnrollLink(e.target.value)} className="w-full p-2 border rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium">Thumbnail Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full p-2 border rounded-md" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-[#009fe3] text-white rounded-lg">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
