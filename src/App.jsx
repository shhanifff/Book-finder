import { useState } from "react";
import axios from "axios";
import BookCard from "./Components/BookCard";

function App() {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 12;

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setCurrentPage(1);

    try {
      const res = await axios.get(
        `https://openlibrary.org/search.json?title=${query}`
      );
      setBooks(res.data.docs);
    } catch (err) {
      console.error("Error fetching data:", err);
    } finally {
      setLoading(false);
    }
  };

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(books.length / booksPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-50 px-4 py-10 transition-all duration-500">
      <h1 className="text-3xl font-bold text-blue-600 mb-8 text-center">
        📚 Book Finder
      </h1>

      <form onSubmit={handleSearch} className="w-full max-w-md flex gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search any book..."
          className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 text-gray-700"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Search
        </button>
      </form>

      {loading && <p className="mt-6 text-gray-500">Searching books...</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-10 w-full max-w-5xl">
        {currentBooks.map((book, index) => (
          <BookCard
            key={index}
            title={book.title}
            author={book.author_name ? book.author_name[0] : "Unknown Author"}
            coverId={book.cover_i}
          />
        ))}
      </div>

      {!loading && books.length > 0 && (
        <div className="flex items-center justify-center gap-4 mt-10">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className={`px-4 py-2 rounded-lg ${
              currentPage === 1
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Prev
          </button>

          <span className="text-gray-700 font-medium">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === totalPages}
            className={`px-4 py-2 rounded-lg ${
              currentPage === totalPages
                ? "bg-gray-300 text-gray-600 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            Next
          </button>
        </div>
      )}

      {!loading && books.length === 0 && (
        <p className="mt-10 text-gray-500 text-center">
          Type a book name to search 📖
        </p>
      )}
    </div>
  );
}

export default App;
