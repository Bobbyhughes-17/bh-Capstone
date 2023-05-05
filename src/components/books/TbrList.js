import React, { useState, useEffect } from "react";
import { getTbrList } from "../ApiManager";

import { Container, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
function TbrList({}) {
  const [tbrList, setTbrList] = useState([]);
  const [clickedBook, setClickedBook] = useState(null);

  useEffect(() => {
    getTbrList().then((data) => {
      setTbrList(data);
    });
  }, []);

  return (
    <Card className="mt-5">
      <Card.Header className="text-center">
        <h1 className="header">TBR List</h1>
      </Card.Header>
      <Card.Body>
        <ListGroup>
          {tbrList.map((item) => (
            <ListGroup.Item
              variant="danger"
              key={item.id}
              className="d-flex mb-4 p-4 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
            >
              <Col md={3}>
                <Image src={item.thumbnail} rounded fluid />
              </Col>
              <Col md={9}>
                <h2 className="book-title">{item.title}</h2>

                <div className="book-details">
                  <p>
                    <strong>Author:</strong> {item.authors.join(", ")}
                  </p>
                  <p>
                    <strong>Pages:</strong> {item.pageCount} pages
                  </p>
                  <p>
                    <strong>Published Date:</strong> {item.publishedDate}
                  </p>
                </div>
              </Col>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default TbrList;
