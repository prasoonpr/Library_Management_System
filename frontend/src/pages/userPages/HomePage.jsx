
import React, { useState } from "react";
import BookCard from "../../components/BookCard";
import { useAddToWishlistMutation, useBorrowBookMutation, useGetBooksQuery, useRemoveWishlistMutation } from "../../services/userApi";
import { format } from "date-fns"; 
import { toast } from "sonner";



const HomePage = () => {
  const { data } = useGetBooksQuery();
  const [borrow]=useBorrowBookMutation()
  const [addWishlist]=useAddToWishlistMutation()
  const [removeWishlist]=useRemoveWishlistMutation()
  const books = data?.books || [];
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterGenre, setFilterGenre] = useState("");
  const [selectedBook, setSelectedBook] = useState(null); // for modal
const [showModal, setShowModal] = useState(false); 

const onBorrow = (book) => {
  setSelectedBook(book);
  setShowModal(true);
};

  const toggleWishlist = async(id,isWishlisted) => {
    if(isWishlisted){
      const response=await removeWishlist(id)
      if(response.data){
        toast.success('Book removed from wishlist')
      }else{
        toast.error('something went wrong')
      }
    }else{
      console.log(id)
      const response=await addWishlist(id)
      if(response.data){
        toast.success('Book added to wishlist')
      }else{
        toast.error('something went wrong')
      }
    }
  };

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterAuthor ? book.author === filterAuthor : true) &&
      (filterGenre ? book.genre === filterGenre : true)
    );
  });

  const uniqueAuthors = [...new Set(books.map((b) => b.author))];
  const uniqueGenres = [...new Set(books.map((b) => b.genre))];

  return (
    <div className="min-h-screen flex flex-col p-4">
      {/* Filters */}
      <div className="flex items-center justify-between gap-4 mb-6">
        {/* Left: Author Filter */}
        <select
          value={filterAuthor}
          onChange={(e) => setFilterAuthor(e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-black shadow-sm"
        >
          <option value="">All Authors</option>
          {uniqueAuthors.map((author) => (
            <option key={author} value={author}>
              {author}
            </option>
          ))}
        </select>

        {/* Center: Search Bar */}
        <input
          type="text"
          placeholder="Search by title..."
          className="flex-1 max-w-md px-4 py-2 text-sm border border-gray-300 rounded-md bg-white text-black shadow-sm text-center"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Right: Genre Filter */}
        <select
          value={filterGenre}
          onChange={(e) => setFilterGenre(e.target.value)}
          className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-black shadow-sm"
        >
          <option value="">All Genres</option>
          {uniqueGenres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>
      </div>

      {/* Book Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 flex-grow">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <BookCard
              key={book.id + book.isbn}
              book={book}
              onWishlistToggle={toggleWishlist}
              onBorrow={onBorrow}
            />
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">No books found.</p>
        )}
      </div>
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
      <p className="text-sm text-gray-600">
        A fine of ₹50/day will be charged for late returns.
      </p>
      <div className="flex justify-end gap-3 pt-4">
        <button
          onClick={() => setShowModal(false)}
          className="px-4 py-1.5 bg-gray-300 text-sm rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={async() => {
            // borrow logic here
           const response=await borrow(selectedBook._id)
           if(response.data){
            toast.success( `${selectedBook.title} borrowed successfully`)
               console.log("Borrow confirmed for:", selectedBook.title);
               setShowModal(false);
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
  );
};

export default HomePage;
