export default function AdminDashboard() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Stat Cards */}
        {[
          { title: "Total Books", count: "12", color: "bg-blue-500" },
          { title: "Total Software", count: "3", color: "bg-purple-500" },
          { title: "Active Courses", count: "5", color: "bg-green-500" },
          { title: "Articles", count: "24", color: "bg-yellow-500" },
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex items-center">
            <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md`}>
              {stat.count}
            </div>
            <div>
              <p className="text-gray-500 text-sm font-medium">{stat.title}</p>
              <p className="text-gray-900 text-2xl font-bold">{stat.count}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 bg-white p-8 rounded-xl shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Welcome to Pixel Publication Admin</h2>
        <p className="text-gray-600">
          From this dashboard, you can manage all the content on your website. Use the sidebar to navigate to different sections (Books, Software, Courses, Articles).
        </p>
        <p className="text-gray-600 mt-2">
          Note: Currently, the database is not connected. Once connected, you will see real data here.
        </p>
      </div>
    </div>
  );
}
