import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("user@user.com");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    return fetch(`http://localhost:8088/users?email=${email}`)
      .then((res) => res.json())
      .then((foundUsers) => {
        if (foundUsers.length === 1) {
          const user = foundUsers[0];
          localStorage.setItem(
            "book_user",
            JSON.stringify({
              id: user.id,
              staff: user.isStaff,
            })
          );

          navigate("/");
        } else {
          window.alert("Invalid login");
        }
      });
  };

  return (
    <main className="container--login">
      <Form className="form--login" onSubmit={handleLogin}>
        <h1>Gooder Reads</h1>
        <h2>Please sign in</h2>
        <Form.Group controlId="formBasicEmail">
          <Form.Label> Email address </Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(evt) => setEmail(evt.target.value)}
            className="form-control"
            placeholder="Email address"
            required
            autoFocus
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Sign in
        </Button>
      </Form>

      <section className="link--register">
        <Link to="/register">Wanna Join? Click Here!</Link>
      </section>
    </main>
  );
};
