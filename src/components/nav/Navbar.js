import "./Navbar.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Navbar,
  Nav,
  NavDropdown,
  Offcanvas,
  Form,
  Button,
  Container,
} from "react-bootstrap";

function CustomNavbar() {
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState(false);

  const handleLinkClick = () => {
    setExpanded(false);
  };

  return (
    <>
      <Navbar expand={false} className="mb-3 custom-navbar">
        <Container fluid>
          <Navbar.Brand
            as={Link}
            to="/"
            className="profile"
            onClick={handleLinkClick}
          >
            GR
          </Navbar.Brand>
          <Navbar.Toggle
            onClick={() => setExpanded(!expanded)}
            aria-controls="offcanvasNavbar"
          />
          <Navbar.Offcanvas
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
            show={expanded}
            onHide={() => setExpanded(false)}
          >
            <Offcanvas.Header closeButton className="offcanvas-header">
              <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body className="offcanvas-body">
              <Nav className="flex-column">
                <Nav.Link
                  as={Link}
                  to="/books"
                  onClick={handleLinkClick}
                  className="nav-link"
                >
                  Book Lists
                </Nav.Link>
                <Nav.Link as={Link} to="/prompts" onClick={handleLinkClick}>
                  Prompts
                </Nav.Link>
                <Nav.Link as={Link} to="/search" onClick={handleLinkClick}>
                  Search
                </Nav.Link>
              </Nav>
              <Nav>
                {localStorage.getItem("book_user") ? (
                  <NavDropdown title="Account" id="basic-nav-dropdown">
                    <NavDropdown.Item
                      onClick={() => {
                        localStorage.removeItem("book_user");
                        navigate("/", { replace: true });
                      }}
                    >
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : null}
              </Nav>
            </Offcanvas.Body>
          </Navbar.Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default CustomNavbar;
