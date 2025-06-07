import React, { useState } from "react";
import {  useBorrowBookMutation, useAddToWishlistMutation, useRemoveWishlistMutation, useGetBooksQuery } from "../../services/userApi";
import { toast } from "sonner";
import BookCard from "../../components/BookCard";
import { format } from "date-fns";

const WishlistPage = () => {
  const { data, isLoading } = useGetBooksQuery();
  const [borrow] = useBorrowBookMutation();
  const [addWishlist] = useAddToWishlistMutation();
  const [removeWishlist] = useRemoveWishlistMutation();

  const [selectedBook, setSelectedBook] = useState(null);
  const [showModal, setShowModal] = useState(false);

 const wishlist = (data?.books || []).filter((book) => book.isWishlisted === true);

  const toggleWishlist = async (id, isWishlisted) => {
    if (isWishlisted) {
      const res = await removeWishlist(id);
      if (res.data) {
        toast.success("Book removed from wishlist");
      } else {
        toast.error("Something went wrong");
      }
    } else {
      const res = await addWishlist(id);
      if (res.data) {
        toast.success("Book added to wishlist");
      } else {
        toast.error("Something went wrong");
      }
    }
  };

  const onBorrow = (book) => {
    setSelectedBook(book);
    setShowModal(true);
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-6xl">
        <h1 className="text-xl font-bold mb-6 text-blue-700 text-center">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <p className="text-center text-gray-600">Your wishlist is empty.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {wishlist.map((book) => (
              <BookCard
                key={book._id}
                book={book}
                onWishlistToggle={toggleWishlist}
                onBorrow={onBorrow}
              />
            ))}
          </div>
        )}

        {/* Borrow Confirmation Modal */}
        {showModal && selectedBook && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-6 max-w-md w-full space-y-4">
              <h2 className="text-lg font-bold text-blue-700">Confirm Borrow</h2>
              <p className="text-gray-700">
                Are you sure you want to borrow <strong>{selectedBook.title}</strong>?
              </p>
              <p className="text-gray-700">
                Please return it by:{" "}
                <strong className="text-red-600">
                  {format(
                    new Date(Date.now() + selectedBook.dueDays * 24 * 60 * 60 * 1000),
                    "dd MMM yyyy"
                  )}
                </strong>
              </p>
              <p className="text-sm text-gray-600">A fine of ₹50/day will be charged for late returns.</p>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  onClick={() => setShowModal(false)}
                  className="px-4 py-1.5 bg-gray-300 text-sm rounded-md"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => {
                    const res = await borrow(selectedBook._id);
                    if (res.data) {
                      toast.success(`${selectedBook.title} borrowed successfully`);
                      setShowModal(false);
                    } else {
                      toast.error("Borrowing failed");
                    }
                  }}
                  className="px-4 py-1.5 bg-blue-600 text-white text-sm rounded-md"
                >
                  Confirm
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
