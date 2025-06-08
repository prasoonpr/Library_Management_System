import React from "react";
import BorrowTable from "../../components/adminComponents/borrowedTable";
import AdminLayout from "../../components/adminComponents/AdminLayout";
import { useFinePaidMutation, useGetBorrowHistoryQuery } from "../../services/adminApi";
import { toast } from "sonner";

const BorrowHistory = () => {
  const { data, isLoading } = useGetBorrowHistoryQuery();
  const [finePaying]=useFinePaidMutation()
  const finePay = async (borrowId) => {
  const response = await finePaying(borrowId); 
  if (response.data) {
    toast.success("Fine paid successfully!");
  } else {
    toast.error("Payment failed. Try again.");
  }
};
  const dummyBorrows = data?.history || [];
  console.log(dummyBorrows)
  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Borrow History</h1>
        <BorrowTable dummyBorrows={dummyBorrows} finePay={finePay} isLoading={isLoading} />
      </div>
    </AdminLayout>
  );
};

export default BorrowHistory;
