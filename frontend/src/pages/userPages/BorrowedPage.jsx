import React from "react";
import { format } from "date-fns";
import { useBorrowedHistoryQuery, useReturnBookMutation } from "../../services/userApi";
import { toast } from "sonner";

const BorrowedPage = () => {
  const { data, isLoading } = useBorrowedHistoryQuery();
  const [returnBook] = useReturnBookMutation();

  const borrowedBooks = (data?.history || []).filter(
    (item) => item.returnedAt === null
  );

  const handleReturn = async (bookId) => {
    const response = await returnBook(bookId);
    if (response.data) {
      toast.success("Book returned successfully");
    } else {
      toast.error("Something went wrong");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-xl font-bold mb-6 text-blue-700 text-center">Your Borrowed Books</h1>

        {borrowedBooks.length === 0 ? (
          <p className="text-center text-gray-600">You haven't borrowed any books.</p>
        ) : (
          <div className="space-y-4">
            {borrowedBooks.map((borrow) => {
              const borrowDate = new Date(borrow.borrowedAt);
              const dueDate = new Date(borrow.dueDate);

              return (
                <div
                  key={borrow._id}
                  className="flex flex-col md:flex-row items-start md:items-center justify-between bg-white shadow-md rounded-xl p-4 border border-gray-200"
                >
                  <div className="space-y-1">
                    <h2 className="text-lg font-semibold text-gray-800">{borrow?.book?.title}</h2>
                    <p className="text-sm text-gray-600">Author: {borrow?.book?.author}</p>
                    <p className="text-sm text-gray-600">
                      Borrowed On: {format(borrowDate, "dd MMM yyyy")}
                    </p>
                    <p className="text-sm text-red-600 font-medium">
                      Due Date: {format(dueDate, "dd MMM yyyy")}
                    </p>
                  </div>

                  <button
                    onClick={() => handleReturn(borrow?._id)}
                    className="mt-4 md:mt-0 px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition"
                  >
                    Return Book
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default BorrowedPage;
