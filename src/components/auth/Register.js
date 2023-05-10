import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./Login.css"

export const Register = (props) => {
  const [user, setUser] = useState({
    email: "",
    fullName: "",
    isStaff: false,
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    return fetch("http://localhost:8088/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((createdUser) => {
        if (createdUser.hasOwnProperty("id")) {
          localStorage.setItem(
            "book_user",
            JSON.stringify({
              id: createdUser.id,
              staff: createdUser.isStaff,
              userName: createdUser.userName,
            })
          );

          navigate("/");
        }
      });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    return fetch(`http://localhost:8088/users?email=${user.email}`)
      .then((res) => res.json())
      .then((response) => {
        if (response.length > 0) {
          window.alert("Account with that email address already exists");
        } else {
          registerNewUser();
        }
      });
  };

  const updateUser = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <Form className="form--login" onSubmit={handleRegister}>
        <h1 className="h3 mb-3 font-weight-normal">
          Register for Gooder Reads, or not. Whatever.
        </h1>
        <Form.Group contolId="fullName">
          <Form.Label htmlFor="fullName"> Full Name </Form.Label>
          <Form.Control
            onChange={updateUser}
            type="text"
            className="form-control"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </Form.Group>
        <Form.Group controlId="email">
          <Form.Label> Email address </Form.Label>
          <Form.Control
            onChange={updateUser}
            type="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Label htmlFor="username"> Username </Form.Label>
          <Form.Control
            onChange={updateUser}
            type="username"
            className="form-control"
            placeholder="Username"
            required
          />
        </Form.Group>
        <Form.Group contolId="isStaff">
          <Form.Check
            onChange={(evt) => {
              const copy = { ...user };
              copy.isStaff = evt.target.checked;
              setUser(copy);
            }}
            type="checkbox"
            id="isStaff"
          />
        </Form.Group>
        
          <Button type="submit" className="registerbtn">
            {" "}
            Register{" "}
          </Button>
       
      </Form>
    </main>
  );
};
