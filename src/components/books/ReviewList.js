import React, { useEffect, useState } from "react";
import { fetchBooks, getAllUsers } from "../ApiManager";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";

function ReviewList({ reviews }) {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  // fetch list of all books and updating state
  useEffect(() => {
    fetchBooks().then((data) => {
      setBooks(data);
    });
  }, []);
  // fetch all users and update state
  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <Col md={12}>
      <Card className="" style={{ minHeight: "1122px" }}>
        <Card.Header className="">
          <h1 className="header">Reviews by {users[0]?.name} </h1>
        </Card.Header>
        <Card.Body>
          <ListGroup
            className=""
            style={{ overflowY: "auto", maxHeight: "1000px" }}
          >
            {reviews.map((review) => (
              <ListGroup.Item
                variant="info"
                key={review.id}
                className="d-flex mb-4 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
              >
                <Row className="align-items-center">
                  <Col md={3}>
                    <Image src={review.thumbnail} rounded fluid />
                  </Col>
                  <Col md={9}>
                    <h2 className="review-title">{review.title}</h2>
                    <div className="review-details">
                      <p>
                        <strong>User Rating:</strong> {review.rating}
                      </p>
                      <p>
                        <strong>Would Recommend to:</strong> {review.rec}
                      </p>
                      <p>
                        <strong>Review:</strong> {review.reviewText}
                      </p>
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default ReviewList;
