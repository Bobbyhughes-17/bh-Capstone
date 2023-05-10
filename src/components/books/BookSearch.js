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
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

export const BookSearch = () => {
  const [query, setQuery] = useState("");
  const [books, setBooks] = useState([]);
  const [showDescription, setShowDescription] = useState("");
  const [description, setDescription] = useState("");
  const [bookDescriptions, setBookDescriptions] = useState({});
  const [addedToTBR, setAddedToTBR] = useState(
    JSON.parse(localStorage.getItem("addedToTBR")) || {}
  );
  const [addedToRead, setAddedToRead] = useState(
    JSON.parse(localStorage.getItem("addedToRead")) || {}
  );

  // function to search books using google api
  const searchBooks = async () => {
    const data = await fetchBooks(query);
    setBooks(data);
  };
  // function to add a book to the Read List
  const handleAddToReadList = async (book) => {
    // creates an object with the relevant book info
    const read = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      pageCount: book.volumeInfo.pageCount,
      publishedDate: book.volumeInfo.publishedDate,
      thumbnail: book.volumeInfo.imageLinks.thumbnail,
    };

    await newRead(read);
    setAddedToRead((prevState) => {
      const newState = {
        ...prevState,
        [book.id]: true,
      };
      localStorage.setItem("addedToRead", JSON.stringify(newState));
      return newState;
    });
  };
  // function to add a book to the TBR list
  const handleAddToTbReadList = async (book) => {
    // creates object with relevant info
    const read = {
      title: book.volumeInfo.title,
      authors: book.volumeInfo.authors,
      pageCount: book.volumeInfo.pageCount,
      publishedDate: book.volumeInfo.publishedDate,
      thumbnail: book.volumeInfo.imageLinks.thumbnail,
    };
    await tbRead(read);
    setAddedToTBR((prevState) => {
      const newState = {
        ...prevState,
        [book.id]: true,
      };
      localStorage.setItem("addedToTBR", JSON.stringify(newState));
      return newState;
    });
  };

  return (
    <Container fluid className="social-container">
      <Row className="search-container justify-content-center mb-4">
        <Col md={3}>
          <InputGroup>
            <FormControl
              placeholder="Search for books"
              aria-label="Search for books"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <Button
              className="search-button"
              variant="info"
              onClick={searchBooks}
            >
              Search
            </Button>
          </InputGroup>
        </Col>
      </Row>
      <Row className="book-list p-10">
        {books.map((book) => (
          <Col key={book.id} md={4} className="mb-4">
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
                    <strong className="">Description: </strong>
                    <p className="text-gray-700">{description}</p>
                  </div>
                )}

                <div className="button-container">
                  <Button
                    variant="primary"
                    className=""
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

                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      addedToTBR[book.id] ? (
                        <Tooltip id={`tooltip-tbr-${book.id}`}>
                          Added to TBR List
                        </Tooltip>
                      ) : (
                        <Tooltip id={`tooltip-tbr-${book.id}`}>
                          Add to TBR List
                        </Tooltip>
                      )
                    }
                  >
                    <Button
                      variant="success"
                      className=""
                      onClick={() => handleAddToTbReadList(book)}
                      disabled={addedToTBR[book.id]}
                    >
                      {addedToTBR[book.id] ? "Added!" : "Add to TBR List"}
                    </Button>
                  </OverlayTrigger>

                  <OverlayTrigger
                    placement="bottom"
                    overlay={
                      addedToRead[book.id] ? (
                        <Tooltip id={`tooltip-read-${book.id}`}>
                          Added to Read List
                        </Tooltip>
                      ) : (
                        <Tooltip id={`tooltip-read-${book.id}`}>
                          Add to Read List
                        </Tooltip>
                      )
                    }
                  >
                    <Button
                      variant="warning"
                      onClick={() => handleAddToReadList(book)}
                      disabled={addedToRead[book.id]}
                    >
                      {addedToRead[book.id] ? "Added!" : "Add to Read List"}
                    </Button>
                  </OverlayTrigger>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};
