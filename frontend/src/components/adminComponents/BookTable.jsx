import React from "react";

const dummyBooks = [
  { id: 1, title: "The Alchemist", author: "Coelho", quantity: 10, available: 7 },
  { id: 2, title: "Rich Dad Poor Dad", author: "Kiyosaki", quantity: 5, available: 1 },
];

const BookTable = () => (
  <table className="min-w-full bg-white shadow rounded">
    <thead>
      <tr className="bg-blue-100 text-left">
        <th className="py-3 pl-10">Title</th>
        <th className="py-3 pl-10">Author</th>
        <th className="py-3 pl-10">Qty</th>
        <th className="py-3 pl-10">Available</th>
        <th className="py-3 pl-10">Actions</th>
      </tr>
    </thead>
    <tbody>
      {dummyBooks.map((book) => (
        <tr key={book.id} className="border-t">
          <td className="">{book.title}</td>
          <td className="p-3">{book.author}</td>
          <td className="p-3">{book.quantity}</td>
          <td className="p-3">{book.available}</td>
          <td className="p-3 space-x-2">
            <button className="px-3 py-1 bg-green-500 text-white rounded">Edit</button>
            <button className="px-3 py-1 bg-red-500 text-white rounded">Delete</button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default BookTable;
