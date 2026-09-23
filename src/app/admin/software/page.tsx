"use client";

import { useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";

interface Software {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  imageUrl: string;
  buyLink: string;
}

export default function AdminSoftware() {
  const [items, setItems] = useState<Software[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  
  // Form State
  const [editingId, setEditingId] = useState<string | null>(null);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [description, setDescription] = useState("");
  const [featuresText, setFeaturesText] = useState(""); 
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");
  const [buyLink, setBuyLink] = useState("");

  const fetchItems = async () => {
    setLoading(true);
    try {
      const querySnapshot = await getDocs(collection(db, "software"));
      const data: Software[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Software);
      });
      setItems(data);
    } catch (error) {
      console.error("Error fetching software:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const openModal = (item?: Software) => {
    if (item) {
      setEditingId(item.id);
      setTitle(item.title);
      setSubtitle(item.subtitle || "");
      setDescription(item.description);
      setFeaturesText(item.features?.join(", ") || "");
      setImageUrl(item.imageUrl);
      setBuyLink(item.buyLink || "");
    } else {
      setEditingId(null);
      setTitle("");
      setSubtitle("");
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
      
      if (imageFile) {
        const imageRef = ref(storage, `software/${Date.now()}_${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        finalImageUrl = await getDownloadURL(snapshot.ref);
      }

      const itemData = {
        title,
        subtitle,
        description,
        features: featuresText.split(",").map(f => f.trim()).filter(f => f),
        imageUrl: finalImageUrl,
        buyLink
      };

      if (editingId) {
        await updateDoc(doc(db, "software", editingId), itemData);
      } else {
        await addDoc(collection(db, "software"), itemData);
      }
      
      setIsModalOpen(false);
      fetchItems();
    } catch (error) {
      console.error("Error saving software:", error);
      alert("Error saving software.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this software?")) {
      try {
        await deleteDoc(doc(db, "software", id));
        fetchItems();
      } catch (error) {
        console.error("Error deleting software:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Manage Software & Add-ins</h1>
        </div>
        <button 
          onClick={() => openModal()}
          className="bg-[#009fe3] text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#007bb5] transition flex items-center shadow-sm"
        >
          Add New Software
        </button>
      </div>

      {loading ? (
        <div className="text-center py-12 text-gray-500">Loading...</div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Software</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {items.length === 0 && (
                <tr>
                  <td colSpan={2} className="px-6 py-12 text-center text-gray-500">No software added yet.</td>
                </tr>
              )}
              {items.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-16 w-24 bg-gray-100 rounded border border-gray-200 overflow-hidden relative">
                        {item.imageUrl ? (
                          <img src={item.imageUrl} alt={item.title} className="h-full w-full object-cover" />
                        ) : (
                          <span className="text-gray-400 text-xs flex items-center justify-center h-full">No Img</span>
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.subtitle}</div>
                      </div>
                    </div>
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
            <h3 className="text-xl font-bold mb-4">{editingId ? "Edit Software" : "Add Software"}</h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input required type="text" value={title} onChange={e => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subtitle / Badge</label>
                <input type="text" value={subtitle} onChange={e => setSubtitle(e.target.value)} placeholder="e.g. Microsoft Word Add-in" className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea required rows={3} value={description} onChange={e => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md"></textarea>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Features (comma separated)</label>
                <input type="text" value={featuresText} onChange={e => setFeaturesText(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Buy/Get Link</label>
                <input type="url" value={buyLink} onChange={e => setBuyLink(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mockup Image</label>
                <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files?.[0] || null)} className="w-full p-2 border border-gray-300 rounded-md" />
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 border rounded-lg text-gray-700 font-medium">Cancel</button>
                <button type="submit" disabled={saving} className="px-4 py-2 bg-[#009fe3] text-white rounded-lg font-medium">
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
