import React from "react";

// const dummyBooks = [
//   { id: 1, title: "The Alchemist", author: "Coelho", quantity: 10, available: 7 },
//   { id: 2, title: "Rich Dad Poor Dad", author: "Kiyosaki", quantity: 5, available: 1 },
// ];

const BookTable = ({ dummyBooks, onEdit ,onArchiveToggle }) => (
  <table className="min-w-full bg-white shadow rounded">
    <thead>
      <tr className="bg-blue-100 text-left">
        <th className="py-3 pl-14">Title</th>
        <th className="py-3 pl-14">Author</th>
        <th className="py-3 pl-14">Qty</th>
        <th className="py-3 pl-14">Available</th>
        <th className="py-3 pl-14">Actions</th>
      </tr>
    </thead>
    <tbody>
      {dummyBooks.map((book) => (
        <tr key={book._id} className="border-t">
          <td className=" py-2">{book.title}</td>
          <td className="">{book.author}</td>
          <td className="">{book.quantity}</td>
          <td className="">{book.available}</td>
          <td className=" space-x-2">
            <button
              onClick={() => onEdit(book)}
              className="px-3 py-1 bg-green-500 text-white rounded"
            >
              Edit
            </button>
            <button
              onClick={() => onArchiveToggle(book._id, book.isArchived)}
              className={`px-3 py-1 rounded text-white ${
                book.isArchived ? "bg-yellow-500" : "bg-red-500"
              }`}
            >
              {book.isArchived ? "Unarchive" : "Archive"}
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);


export default BookTable;
