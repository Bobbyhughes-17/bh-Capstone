import React, { useEffect, useState } from "react";
import { fetchBooks, getAllUsers } from "../ApiManager";
import { Row, Col, ListGroup, Image, Card } from "react-bootstrap";

function ReviewList({ reviews }) {
  const [books, setBooks] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchBooks().then((data) => {
      setBooks(data);
    });
  }, []);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  return (
    <Col md={12}>
      <Card className="mt-5">
        <Card.Header className="text-center">
          <h1 className="header">Reviews by {users[0]?.name} </h1>
        </Card.Header>
        <Card.Body>
          <ListGroup>
            {reviews.map((review) => (
              <ListGroup.Item
                variant="info"
                key={review.id}
                className="review-item"
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
