import React from "react";
import AdminLayout from "../../components/adminComponents/AdminLayout";
import {
  useGetBooksQuery,
  useGetBorrowHistoryQuery,
  useGetUsersQuery,
} from "../../services/adminApi";

const AdminDashboard = () => {
  const { data: usersData, isLoading: usersLoading } = useGetUsersQuery();
  const { data: booksData, isLoading: booksLoading } = useGetBooksQuery();
  const { data: borrowsData, isLoading: borrowsLoading } = useGetBorrowHistoryQuery();

  const users = usersData?.users?.filter((user) => user.role !== "admin") || [];
  const books = booksData?.books || [];
  const borrows = borrowsData?.history || [];

  // Filter for books that have not been returned yet
  const currentlyBorrowed = borrows.filter((b) => !b.returnedAt);

  if (usersLoading || booksLoading || borrowsLoading) {
    return <div className="p-6 text-center">Loading Dashboard...</div>;
  }

  return (
    <AdminLayout>
      <div className="w-full p-6">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-4 rounded-lg shadow text-center">
            📚 <span className="font-semibold">Total Books:</span> {books.length}
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            👥 <span className="font-semibold">Total Users:</span> {users.length}
          </div>
          <div className="bg-white p-4 rounded-lg shadow text-center">
            📖 <span className="font-semibold">Currently Borrowed:</span> {currentlyBorrowed.length}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
