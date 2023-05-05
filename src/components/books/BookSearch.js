import React, { useState } from "react";
import "./BookSearch.css";
import { fetchBooks, newRead, tbRead } from "../ApiManager";
import {
  Col,
  Container,
  FormControl,
  InputGroup,
  Button,
  Row,
  Card,
} from "react-bootstrap";

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
    <Container fluid className="social-container">
      <Row className="search-container justify-content-center mb-4">
        <Col md={6}>
          <InputGroup>
            <FormControl
              placeholder="Search for books"
              aria-label="Search for books"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
              onClick={searchBooks}
            >
              Search
            </button>
          </InputGroup>
        </Col>
      </Row>
      <Row className="book-list p-10">
        {books.map((book) => (
          <Col key={book.id} md={3} className="mb-4">
            <Card className="h-100">
              <div className="d-flex justify-content-center">
                <div className="p-3">
                  {book.volumeInfo.imageLinks && (
                    <Card.Img
                      variant="top"
                      src={book.volumeInfo.imageLinks.thumbnail}
                      alt="Book Cover"
                      style={{
                        height: "200px",
                        width: "150px",
                        objectFit: "cover",
                      }}
                    />
                  )}
                </div>
              </div>
              <Card.Body>
                <Card.Title className="text-lg font-bold mb-2">
                  {book.volumeInfo.title}
                </Card.Title>

                <div className="text-gray-700">
                  <strong>By:</strong>{" "}
                  {book.volumeInfo.authors?.map((author) => (
                    <a
                      key={author}
                      href={`https://www.google.com/search?q=${encodeURIComponent(
                        `${author} books`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
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

                {showDescription === book.id && (
                  <div className="book-description">
                    <strong className="text-lg font-bold mb-2">
                      Description:{" "}
                    </strong>
                    <p className="text-gray-700">{description}</p>
                  </div>
                )}

                <div className="d-flex justify-content-center mt-3">
                  <Button
                    variant="primary"
                    className="mr-3"
                    onClick={() => {
                      const bookDescription =
                        book.volumeInfo.description ||
                        "No description available";
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
                  </Button>

                  <Button
                    variant="warning"
                    className="mr-3"
                    onClick={() => handleAddToTbReadList(book)}
                  >
                    Add to TBR List
                  </Button>

                  <Button
                    variant="success"
                    onClick={() => handleAddToReadList(book)}
                  >
                    Add to Read List
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
