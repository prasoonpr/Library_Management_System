import React from "react";
import { format } from "date-fns";

const BorrowTable = ({ dummyBorrows, finePay }) => (
  <table className="min-w-full bg-white shadow rounded">
    <thead>
      <tr className="bg-blue-100 text-left">
        <th className="py-3 pl-10">User</th>
        <th className="py-3 pl-10">Book</th>
        <th className="py-3 pl-10">Borrowed At</th>
        <th className="py-3 pl-10">Due Date</th>
        <th className="py-3 pl-10">Status</th>
        <th className="py-3 pl-10">Fine</th>
      </tr>
    </thead>
    <tbody>
      {dummyBorrows.map((b) => (
        <tr key={b._id} className="border-t hover:bg-gray-50">
          <td className="p-3">{b.user?.name}</td>
          <td className="p-3">
            {b.book?.title} <br />
            <span className="text-sm text-gray-500">by {b.book?.author}</span>
          </td>
          <td className="p-3">{format(new Date(b.borrowedAt), "dd MMM yyyy")}</td>
          <td className="p-3">{format(new Date(b.dueDate), "dd MMM yyyy")}</td>
          <td className="p-3">
            {b.returnedAt ? (
              <span className="text-green-600 font-medium">Returned</span>
            ) : (
              <span className="text-red-600 font-medium">Pending</span>
            )}
          </td>
          <td className="p-3 flex items-center gap-2">
            ₹{b.fine}
            {b.fine > 0 && !b.finePayed && (
              <button
                onClick={() => finePay(b._id)}
                className="bg-blue-600 text-white px-2 py-1 text-xs rounded hover:bg-blue-700"
              >
                Pay
              </button>
            )}
            {b.finePayed && (
              <span className="text-green-600 text-sm font-medium">Paid</span>
            )}
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BorrowTable;
