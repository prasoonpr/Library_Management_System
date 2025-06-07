import React from "react";
import UserTable from "../../components/adminComponents/userTable";
import AdminLayout from "../../components/adminComponents/AdminLayout";


const ManageUsers = () => (
    <AdminLayout>
    <div className=" p-6">
      <h1 className="text-xl font-bold mb-4">Manage Users</h1>
      <UserTable />
    </div>
  </AdminLayout>
);

export default ManageUsers;
