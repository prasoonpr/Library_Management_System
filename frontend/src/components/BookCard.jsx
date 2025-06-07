
import React from "react";
import { Heart } from "lucide-react";
import defaultBookImage from "../assets/books-stack-realistic_1284-4735.avif"; // You can use any image

const BookCard = ({ book, onWishlistToggle, isWishlisted,onBorrow  }) => {
  return (
    <div className="bg-white rounded-xl  shadow-lg border border-gray-200 overflow-hidden hover:shadow-xl transition-all duration-200 mb-52">
      {/* Book Image */}
      <div className="relative h-36 w-52">
        <img
          src={defaultBookImage}
          alt={book.title}
          className="object-cover w-full h-full"
        />
        <button
          onClick={() => onWishlistToggle(book.id)}
          className="absolute top-2 right-2 bg-white p-1 rounded-full shadow hover:scale-110 transition"
          title="Add to Wishlist"
        >
          <Heart
            size={20}
            className={`${
              isWishlisted ? "fill-red-500 text-red-500" : "text-gray-500"
            }`}
          />
        </button>
      </div>

      {/* Book Info */}
      <div className="p-4 space-y-1">
        <h2 className="text-lg font-semibold text-blue-700 truncate">
          {book.title}
        </h2>
        <p className="text-sm text-gray-700">
          <strong>Author:</strong> {book.author}
        </p>
        <p className="text-sm text-gray-700">
          <strong>Genre:</strong> {book.genre}
        </p>
        <p className="text-sm text-gray-700">
          <strong>ISBN:</strong> {book.isbn}
        </p>
        <div className="flex justify-between text-sm text-gray-700 pt-2">
          <span>
            <strong>Qty:</strong> {book.quantity}
          </span>
          <span>
            <strong>Available:</strong> {book.available}
          </span>
          
        </div>
        <button
          onClick={() => onBorrow(book)}
          disabled={book.available === 0}
          className={`mt-3 w-full px-4 py-1.5 rounded-md text-white text-sm font-medium transition ${
            book.available === 0
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {book.available === 0 ? "Not Available" : "Borrow"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
