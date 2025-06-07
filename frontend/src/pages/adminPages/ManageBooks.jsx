import React from "react";
import AdminLayout from "../../components/adminComponents/AdminLayout";
import BookTable from "../../components/adminComponents/bookTable";

const ManageBooks = () => {
  return (
    <AdminLayout>
      <h1 className="text-xl font-bold mb-4">Manage Books</h1>
      <BookTable />
    </AdminLayout>
  );
};

export default ManageBooks;
