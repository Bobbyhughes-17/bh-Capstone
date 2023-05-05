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
} from "react-bootstrap";
import "./Profile.css";
function ProfileDashboard() {
  const [users, setUsers] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    username: "",
    bio: "",
  });

  const formRef = useRef(null);

  useEffect(() => {
    getAllUsers().then(setUsers);
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

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

  const handleEditClick = () => {
    setShowForm(true);
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <Authorized>
      <Container>
        <h1 className="profile-heading">Welcome, {users[0]?.name}!</h1>
        <Row className="profile-content">
          <Col md={4} className="profile-details-column">
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
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} className="profile-actions">
            {!showForm ? (
              <Button
                className="profile-action-button profile-action-edit"
                onClick={() => setShowForm(true)}
              >
                Edit Profile
              </Button>
            ) : (
              <Button
                className="profile-action-button profile-action-cancel"
                onClick={() => setShowForm(false)}
              >
                Cancel
              </Button>
            )}

            {showForm && (
              <Form className="profile-edit-form" onSubmit={handleSubmit}>
                <Form.Group controlId="name">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter name"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    value={formData.username}
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
                    onChange={handleChange}
                  />
                </Form.Group>
                <Button variant="primary" type="submit">
                  Save
                </Button>
                <Button
                  className="form-button form-button-cancel"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </Button>
              </Form>
            )}
          </Col>
        </Row>
      </Container>
    </Authorized>
  );
}

export default ProfileDashboard;
