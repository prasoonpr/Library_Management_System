import React from "react";
import Sidebar from "./sideBar";

const AdminLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen   bg-gray-100">
      <Sidebar />
      <main className="flex-1 p-6 text-gray-900 bg-gray-50 shadow-inner">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
