
import React, { useState } from "react";
import BookCard from "../../components/BookCard";

const books = [
  {
    id: 1,
    title: "The Alchemist",
    author: "Paulo Coelho",
    category: "Fiction",
    isbn: "9780062315007",
    quantity: 10,
    available: 7,
  },
  {
    id: 2,
    title: "Rich Dad Poor Dad",
    author: "Robert Kiyosaki",
    category: "Finance",
    isbn: "9781612680194",
    quantity: 5,
    available: 1,
  },
  {
    id: 3,
    title: "Wings of Fire",
    author: " Abdul Kalam",
    category: "Autobiography",
    isbn: "9788173711466",
    quantity: 6,
    available: 3,
  },
  {
    id: 4,
    title: "1984",
    author: "George Orwell",
    category: "Fiction",
    isbn: "9780451524935",
    quantity: 8,
    available: 4,
  },
  // ...repeat for testing
];

const HomePage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterAuthor, setFilterAuthor] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  const toggleWishlist = (id) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((bookId) => bookId !== id) : [...prev, id]
    );
  };

  const filteredBooks = books.filter((book) => {
    return (
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (filterAuthor ? book.author === filterAuthor : true) &&
      (filterCategory ? book.category === filterCategory : true)
    );
  });

  const uniqueAuthors = [...new Set(books.map((b) => b.author))];
  const uniqueCategories = [...new Set(books.map((b) => b.category))];

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

      {/* Right: Category Filter */}
      <select
        value={filterCategory}
        onChange={(e) => setFilterCategory(e.target.value)}
        className="px-3 py-1.5 text-sm border border-gray-300 rounded-md bg-white text-black shadow-sm"
      >
        <option value="">All Categories</option>
        {uniqueCategories.map((category) => (
          <option key={category} value={category}>
            {category}
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
            isWishlisted={wishlist.includes(book.id)}
          />
        ))
      ) : (
        <p className="text-gray-500 col-span-full text-center">No books found.</p>
      )}
    </div>
  </div>
);

};

export default HomePage;
