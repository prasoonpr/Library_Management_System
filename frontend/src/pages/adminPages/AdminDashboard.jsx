import React from "react";
import Sidebar from "../../components/adminComponents/sideBar";
import AdminLayout from "../../components/adminComponents/AdminLayout";

const AdminDashboard = () => {
  return (
    <AdminLayout>
      <div className="w-full ">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow">📚 Total Books: 120</div>
          <div className="bg-white p-4 rounded-lg shadow">👥 Total Users: 45</div>
          <div className="bg-white p-4 rounded-lg shadow">📖 Borrowed: 23</div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
