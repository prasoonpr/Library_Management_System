
import React, { useState } from "react";
import AdminLayout from "../../components/adminComponents/AdminLayout";
import BookTable from "../../components/adminComponents/bookTable";
import AddBookModal from "../../components/adminComponents/AddBookModal";
import { useArchiveBookMutation, useGetBooksQuery, useUnArchiveBookMutation } from "../../services/adminApi";

const ManageBooks = () => {
  const { data } = useGetBooksQuery();
  const books = data?.books || [];
  const [archiveBook]=useArchiveBookMutation()
  const [unArchiveBook]=useUnArchiveBookMutation()

  const [showModal, setShowModal] = useState(false);
  const [bookToEdit, setBookToEdit] = useState(null);

  const handleEditClick = (book) => {
    setBookToEdit(book);
    setShowModal(true);
  };

  const closeModal = () => {
    setBookToEdit(null);
    setShowModal(false);
  };

  const handleArchiveToggle = async (id, isArchived) => {
  if (isArchived) {
    await unArchiveBook(id);  // API call to unarchive
  } else {
    await archiveBook(id);    // API call to archive
  }
};

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">Manage Books</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          ➕ Add Book
        </button>
      </div>

      <BookTable dummyBooks={books} onEdit={handleEditClick}  onArchiveToggle={handleArchiveToggle}/>

      {showModal && (
        <AddBookModal onClose={closeModal} bookToEdit={bookToEdit} />
      )}
    </AdminLayout>
  );
};

export default ManageBooks;
