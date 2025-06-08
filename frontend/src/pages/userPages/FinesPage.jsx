import React from 'react';
import { useGetFinesQuery } from '../../services/userApi';
import { format } from 'date-fns';

const FinesPage = () => {
  const { data, isLoading } = useGetFinesQuery();
  const borrows = data?.borrows || [];

  if (isLoading) return <p className="text-center mt-10">Loading fines...</p>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">Unpaid Fines</h1>

      {borrows.length === 0 ? (
        <p className="text-center text-gray-600">No unpaid fines.</p>
      ) : (
        <div className="grid gap-4 max-w-3xl mx-auto">
          {borrows.map((entry) => {
            const isReturned = !!entry.returnedAt;
            const fineAmount = isReturned ? entry.fine : entry.calculatedFine;

            return (
              <div
                key={entry._id}
                className="bg-white border border-gray-200 shadow-sm rounded-lg p-4"
              >
                <h2 className="text-lg font-semibold text-gray-800">
                  {entry.book?.title || 'Unknown Title'}
                </h2>
                <p className="text-sm text-gray-600">Author: {entry.book?.author || 'N/A'}</p>
                <p className="text-sm text-gray-600">
                  Due Date: {format(new Date(entry.dueDate), 'dd MMM yyyy')}
                </p>

                {!isReturned && (
                  <p className="text-sm text-gray-600">Overdue Days: {entry.overdueDays}</p>
                )}

                <p className="text-sm text-gray-600 font-medium">Fine: ₹{fineAmount}</p>

                <p
                  className={`text-sm font-semibold ${
                    isReturned ? 'text-green-600' : 'text-red-600'
                  }`}
                >
                  Status: {isReturned ? 'Returned' : 'Not Returned'}
                </p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default FinesPage;
