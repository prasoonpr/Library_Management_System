import React from "react";
import BorrowTable from "../../components/adminComponents/borrowedTable";
import AdminLayout from "../../components/adminComponents/AdminLayout";


const BorrowHistory = () => (
    <AdminLayout>
    <div className=" p-6">
      <h1 className="text-xl font-bold mb-4">Borrow History</h1>
      <BorrowTable />
    </div>
  </AdminLayout>
);

export default BorrowHistory;
