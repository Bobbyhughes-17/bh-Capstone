import React, { useState, useEffect } from "react";
import { getReadList, addReview, getReviews, newRead } from "../ApiManager";
import TbrList from "./TbrList";
import ReviewList from "./ReviewList";
import { Container, Row, Col, ListGroup, Button, Card } from "react-bootstrap";

import "./Book.css";
import Review from "./Review";

function ReadList() {
  const [readList, setReadList] = useState([]);
  const [clickedBook, setClickedBook] = useState(null);
  const [booksWithReviews, setBooksWithReviews] = useState([]);
  const [reviews, setReviews] = useState([]);

  // fetch readList and review data
  useEffect(() => {
    getReadList().then((data) => {
      setReadList(data);
    });

    getReviews().then((reviews) => {
      const reviewedBookIds = reviews.map((review) => review.bookId);
      setBooksWithReviews(reviewedBookIds);
      setReviews(reviews);
    });
  }, []);

  // function to add a book to read list
  const addToReadList = (book) => {
    setReadList([...readList, book]);
  };
  // function to update the read list
  const updateReadList = (newReadList) => {
    setReadList(newReadList);
  };

  return (
    <Container>
      <Row>
        <Col md={4}>
          <Card className="" style={{ minHeight: "1122px" }}>
            <Card.Header className="">
              <h1 className="header">Read List</h1>
            </Card.Header>
            <Card.Body>
              <ListGroup
                className=""
                style={{ overflowY: "auto", height: "1000px" }}
              >
                {readList.map((item) => (
                  <ListGroup.Item
                    variant="primary"
                    key={item.id}
                    className="d-flex mb-4 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
                  >
                    <div className="me-3">
                      <img
                        src={item.thumbnail}
                        alt="Book cover"
                        className="book-cover"
                      />
                    </div>

                    <div className="">
                      <h2 className="book-title">{item.title}</h2>

                      <div className="book-details">
                        <p className="book-author">
                          <strong>Author:</strong> {item.authors.join(", ")}
                        </p>
                        <p className="book-pagecount">
                          <strong>Pages:</strong> {item.pageCount} pages
                        </p>
                        <p className="book-publisheddate">
                          <strong>Published Date:</strong> {item.publishedDate}
                        </p>
                      </div>
                      {!booksWithReviews.includes(item.id) && (
                        <Button
                          variant="primary"
                          className=""
                          onClick={() => setClickedBook(item)}
                        >
                          Add Review
                        </Button>
                      )}
                    </div>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <TbrList
            addToReadList={addToReadList}
            updateReadList={updateReadList}
          />
        </Col>

        <Col md={4}>
          <ReviewList reviews={reviews} />
        </Col>
      </Row>

      <Review
        isOpen={clickedBook !== null}
        onClose={() => setClickedBook(null)}
        onSave={(review) => {
          addReview(clickedBook.id, {
            ...review,
            thumbnail: clickedBook.thumbnail,
          }).then((savedReview) => {
            setBooksWithReviews([...booksWithReviews, savedReview.bookId]);
            setReviews([...reviews, savedReview]);
          });
          setClickedBook(null);
        }}
        hasReview={booksWithReviews.includes(clickedBook?.id)}
      />
    </Container>
  );
}

export default ReadList;
