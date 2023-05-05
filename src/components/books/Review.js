import React, { useState } from "react";
import "./Book.css";
import { Modal, Form, Button, Col } from "react-bootstrap";

export default function Review({ isOpen, onClose, onSave }) {
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [rec, setRec] = useState("");

  const handleRatingChange = (event) => {
    setRating(parseFloat(event.target.value));
  };

  const handleReviewTextChange = (event) => {
    setReviewText(event.target.value);
  };

  const handleRecTextChange = (event) => {
    setRec(event.target.value);
  };

  const handleSaveReview = () => {
    onSave({ rating, reviewText, rec });
    setRating(0);
    setReviewText("");
    setRec("");
    onClose();
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="rating">
            <Form.Label>Rating:</Form.Label>
            <Form.Control
              as="select"
              value={rating}
              onChange={handleRatingChange}
            >
              <option value="">Select a rating</option>
              {[1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="rec">
            <Form.Label>Recommend to:</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter recommendation"
              value={rec}
              onChange={handleRecTextChange}
            />
          </Form.Group>
          <Form.Group controlId="reviewText">
            <Form.Label>Review:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={reviewText}
              onChange={handleReviewTextChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSaveReview}>
          Save Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
