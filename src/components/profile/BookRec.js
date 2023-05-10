import React, { useState, useEffect } from "react";
import {
  Form,
  Container,
  Row,
  Col,
  Image,
  ListGroup,
  Button,
} from "react-bootstrap";
import { fetchBooksByGenre, tbRead } from "../ApiManager";
import "./Profile.css";
function BookRecommendations() {
  const [genre, setGenre] = useState("");
  const [books, setBooks] = useState([]);

  // fetch books based on genre
  useEffect(() => {
    fetchBooksByGenre(genre).then((data) => {
      setBooks(data);
    });
  }, [genre]);

  const refreshRecs = () => {
    // pulls 15 books by genre
    fetchBooksByGenre(genre, 15).then((data) => {
      // removes dupe books
      const uniqueBooks = new Set(data);
      // shuffles books on refresh because the api was populating the top of the list with the same books for some reason
      const shuffledBooks = Array.from(uniqueBooks).sort(
        () => Math.random() - 0.5
      );
      // updates the tate with the shuffled array of books
      setBooks(shuffledBooks);
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
    window.alert(`"${read.title}" has been added to your To Be Read List!`);
  };

  return (
    <Container>
      <h2>Recommended Books</h2>
      <Row>
        <Col md={4}>
          <Form.Group controlId="genre-select">
            <Form.Label>Select a Genre:</Form.Label>
            <Form.Control
              as="select"
              value={genre}
              onChange={(event) => setGenre(event.target.value)}
            >
              <option>Please select Genre...</option>
              <option value="fiction">Fiction</option>
              <option value="nonfiction">Nonfiction</option>
              <option value="romance">Romance</option>
              <option value="mystery">Mystery</option>
              <option value="horror">Horror</option>
              <option value="history">History</option>
              <option value="science">Science</option>
              <option value="biography">Biography</option>
              <option value="cooking">Cooking</option>
              <option value="medical">Medical</option>
              <option value="crafts">Crafts & Hobbies</option>
              <option value="law">Law</option>
              <option value="philosophy">Philosophy</option>
              <option value="psychology">Psychology</option>
              <option value="photography">Photography</option>
              <option value="psychology">Psychology</option>
              <option value="technology">Technology</option>
              <option value="travel">Travel</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
      <Button className="refresh-btn" onClick={refreshRecs}>
        Refresh
      </Button>
      <Row>
        <Col>
          {genre && books.length > 0 ? (
            <ListGroup>
              {books.map((book) => (
                <ListGroup.Item key={book.id}>
                  <Row>
                    <Col md={2}>
                      <Image
                        src={book?.volumeInfo?.imageLinks?.thumbnail}
                        alt={book?.volumeInfo?.title}
                        fluid
                      />
                    </Col>
                    <Col md={10}>
                      <h3>{book?.volumeInfo?.title}</h3>
                      <p>{book.volumeInfo.authors}</p>
                    </Col>
                  </Row>
                  <Button
                    variant="danger"
                    className="add-rec-btn"
                    onClick={() => handleAddToTbReadList(book)}
                  >
                    Add to TBR List
                  </Button>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p>Please select a genre</p>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default BookRecommendations;
