import React from "react";

const dummyBorrows = [
  {
    id: 1,
    user: "Prasoon",
    book: "The Alchemist",
    borrowedAt: "2025-06-01",
    dueDate: "2025-06-15",
    status: "Borrowed",
  },
];

const BorrowTable = () => (
  <table className="min-w-full bg-white shadow rounded">
    <thead>
      <tr className="bg-blue-100 text-left">
        <th className="py-3 pl-10">User</th>
        <th className="py-3 pl-10">Book</th>
        <th className="py-3 pl-10">Borrowed At</th>
        <th className="py-3 pl-10">Due Date</th>
        <th className="py-3 pl-10">Status</th>
      </tr>
    </thead>
    <tbody>
      {dummyBorrows.map((b) => (
        <tr key={b.id} className="border-t">
          <td className="p-3">{b.user}</td>
          <td className="p-3">{b.book}</td>
          <td className="p-3">{b.borrowedAt}</td>
          <td className="p-3">{b.dueDate}</td>
          <td className="p-3">{b.status}</td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BorrowTable;
