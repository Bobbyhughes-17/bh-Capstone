import React, { useState } from "react";
import "./BookSearch.css";
import { fetchBooks, newRead, tbRead } from "../ApiManager";

export const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [showDescription, setShowDescription] = useState("");
  const [description, setDescription] = useState("");
  const [bookDescriptions, setBookDescriptions] = useState({});

  const searchBooks = async () => {
    const data = await fetchBooks(query);
    setBooks(data);
  };

  const handleAddToReadList = async (book) => {
    const read = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      pageCount: book.volumeInfo.pageCount,
      publishedDate: book.volumeInfo.publishedDate,
      thumbnail: book.volumeInfo.imageLinks.thumbnail,
    };
    await newRead(read);
  };
  const handleAddToTbReadList = async (book) => {
    const read = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      pageCount: book.volumeInfo.pageCount,
      publishedDate: book.volumeInfo.publishedDate,
      thumbnail: book.volumeInfo.imageLinks.thumbnail,
    };
    await tbRead(read);
  };

  return (
    <div className="social-container">
      <div className="search-container flex justify-center items-center space-x-4 mb-4">
        <input
          type="text"
          className="border-2 border-gray-300 py-2 px-4 rounded-lg w-1/4 text-black"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
          onClick={searchBooks}
        >
          Search
        </button>
      </div>

      <div className="book-list grid grid-cols-4 gap-10 p-10">
        {books.map((book) => (
          <div
            key={book.id}
            className="book-item bg-white rounded-lg overflow-hidden shadow-md flex flex-col justify-center items-center p-4"
          >
            {book.volumeInfo.imageLinks && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt="Book Cover"
                className="w-book-cover h-book-cover object-cover"
              />
            )}
            <div className="book-details px-4 py-2 text-center">
              <h3 className="text-lg font-bold mb-2">
                {book.volumeInfo.title}
              </h3>

              <div className="text-gray-700">
                <strong>By:</strong>{" "}
                {book.volumeInfo.authors?.map((author) => (
                  <a
                    key={author}
                    href={`https://www.google.com/search?q=${encodeURIComponent(
                      `${author} books`
                    )}`}
                    target="_blank"
                    className="text-blue-500 hover:underline"
                  >
                    {author}
                  </a>
                ))}
              </div>
              <p className="text-gray-700">{book.volumeInfo.publishedDate}</p>
              <p className="text-gray-700">
                Pages: {book.volumeInfo.pageCount}
              </p>
              <p className="text-gray-700">
                Average Rating: {book.volumeInfo.averageRating}
              </p>
            </div>

            {showDescription === book.id && (
              <div className="book-description px-4 py-2">
                <strong className="text-lg font-bold mb-2">
                  Description:{" "}
                </strong>
                <p className="text-gray-700">{description}</p>
              </div>
            )}

            <div className="px-4 py-2">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg descbtn"
                onClick={() => {
                  const bookDescription =
                    book.volumeInfo.description || "No description available";
                  setDescription(bookDescription);
                  setBookDescriptions({
                    ...bookDescriptions,
                    [book.id]: bookDescription,
                  });
                  setShowDescription(book.id);
                }}
              >
                {showDescription === book.id
                  ? "Hide Description"
                  : "Show Description"}
              </button>
            </div>

            <div className="book-buttons px-4 py-2 flex justify-center">
              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => handleAddToTbReadList(book)}
              >
                Add to TBR List
              </button>

              <button
                className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={() => handleAddToReadList(book)}
              >
                Add to Read List
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
