import React, { useState, useEffect, useRef } from "react";
import { getAllUsers, updateUser } from "../ApiManager";
import Authorized from "../Authorized";
import {
  Container,
  Button,
  Form,
  Row,
  Col,
  Image,
  Card,
  Modal,
} from "react-bootstrap";
import "./Profile.css";
import BookRecommendations from "./BookRec";

function ProfileDashboard() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    bio: "",
    avatar: "",
  });

  const formRef = useRef(null);
  // gets all users
  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  useEffect(() => {
    if (users[0]) {
      setFormData({
        name: users[0].name,
        email: users[0].email,
        username: users[0].username,
        bio: users[0].bio,
        avatar: users[0].avatar,
      });
    }
  }, [users]);

  // updates form data when something is changed
  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };
  // handles submit on edit form
  const handleSubmit = (event) => {
    event.preventDefault();

    updateUser(users[0].id, formData)
      .then((updatedUser) => {
        alert("User information updated successfully!");
        setShowForm(false);
        setUsers([updatedUser, ...users.slice(1)]);
      })
      .catch((error) => {
        console.error("Error updating user:", error);
      });
  };

  return (
    <Authorized>
      <Container className="profile-container">
        <h1 className="profile-heading">Welcome, {users[0]?.name}!</h1>
        <Row className="profile-content">
          <Col lg={4} className="profile-details-column">
            <Card className="profile-details-card">
              <Image
                src={users[0]?.avatar}
                alt="Avatar"
                className="profile-avatar"
                roundedCircle
              />
              <Card.Body>
                <Card.Title>{users[0]?.name}</Card.Title>
                <Card.Subtitle className="mb-2">
                  <strong>Username: </strong>

                  {users[0]?.username}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Bio: </strong>
                  {users[0]?.bio}
                </Card.Text>

                <Button
                  className="profile-action-button profile-action-edit"
                  onClick={() => {
                    setFormData({
                      name: users[0]?.name,
                      email: users[0]?.email,
                      username: users[0]?.username,
                      bio: users[0]?.bio,
                      avatar: users[0]?.avatar,
                    });
                    setShowForm(true);
                  }}
                >
                  Edit Profile
                </Button>
              </Card.Body>
            </Card>
          </Col>
          <Col lg={8}>
            <Card className="rec-card">
              <BookRecommendations />
            </Card>
          </Col>
        </Row>

        <Modal show={showForm} onHide={() => setShowForm(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Profile</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form className="profile-edit-form" onSubmit={handleSubmit}>
              <Form.Group controlId="avatar">
                <Form.Label>Avatar</Form.Label>
                <Form.Control
                  type="url"
                  placeholder="Image URL"
                  value={formData.avatar}
                  name="avatar"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  value={formData.name}
                  name="name"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  name="email"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter username"
                  value={formData.username}
                  name="username"
                  onChange={handleChange}
                />
              </Form.Group>
              <Form.Group controlId="bio">
                <Form.Label>Bio</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter bio"
                  value={formData.bio}
                  name="bio"
                  onChange={handleChange}
                />
              </Form.Group>
              <Modal.Footer>
                <Button variant="primary" type="submit">
                  Save
                </Button>
                <Button
                  className="form-button form-button-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </Modal.Footer>
            </Form>
          </Modal.Body>
        </Modal>
      </Container>
    </Authorized>
  );
}

export default ProfileDashboard;
