"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminDashboard() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Books as the default dashboard view
    router.replace("/admin/books");
  }, [router]);

  return (
    <div className="flex items-center justify-center h-full min-h-[60vh]">
      <p className="text-gray-500 font-medium">Loading Dashboard...</p>
    </div>
  );
}
