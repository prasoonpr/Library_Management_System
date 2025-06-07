import React from "react";
import { format } from "date-fns";
import { useBorrowedHistoryQuery } from "../../services/userApi";

const HistoryPage = () => {
  const { data, isLoading } = useBorrowedHistoryQuery();
  const history = data?.history || [];

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex justify-center">
      <div className="w-full max-w-3xl">
        <h1 className="text-xl font-bold mb-6 text-blue-700 text-center">Borrow History</h1>

        {history.length === 0 ? (
          <p className="text-center text-gray-600">No borrowing history available.</p>
        ) : (
          <div className="space-y-4">
            {history.map((entry) => {
              const borrowDate = new Date(entry.borrowedAt);
              const returnDate = entry.returnedAt ? new Date(entry.returnedAt) : null;

              return (
                <div
                  key={entry._id}
                  className="bg-white shadow-sm rounded-lg p-4 border border-gray-200"
                >
                  <h2 className="text-lg font-semibold text-gray-800">
                    {entry.book?.title || "Unknown Title"}
                  </h2>
                  <p className="text-sm text-gray-600">Author: {entry.book?.author || "N/A"}</p>
                  <p className="text-sm text-gray-600">
                    Borrowed On: {format(borrowDate, "dd MMM yyyy")}
                  </p>
                  <p className="text-sm text-gray-600">
                    Returned On:{" "}
                    {returnDate ? format(returnDate, "dd MMM yyyy") : "Not Returned"}
                  </p>
                  <p className={`text-sm font-semibold ${returnDate ? "text-green-600" : "text-red-500"}`}>
                    Status: {returnDate ? "Returned" : "Not Returned"}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
