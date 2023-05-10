import React, { useState, useEffect } from "react";
import {
  getTbrList,
  newRead,
  deleteFromTbrList,
  getReadList,
} from "../ApiManager";
import { v4 as uuidv4 } from "uuid";
import { Button, Col, ListGroup, Image, Card } from "react-bootstrap";

function TbrList({ addToReadList, updateReadList }) {
  // state to store TBR list
  const [tbrList, setTbrList] = useState([]);

  // hook to get TBR list from database
  useEffect(() => {
    getTbrList().then((data) => {
      setTbrList(data);
    });
  }, []);
  // function to handle adding book to read list
  const handleAddToReadList = (book) => {
    // remove the book from TBR list
    const updatedTbrList = tbrList.filter((item) => item.id !== book.id);
    setTbrList(updatedTbrList);
    // give the added book a new ID
    const newId = uuidv4();
    // create new book object with new ID
    const readBook = { ...book, id: newId };
    newRead(readBook).then(() => {
      //delete book from TBR list
      deleteFromTbrList(book.id);
      // get the updated read list and update state
      getReadList().then((readList) => {
        updateReadList(readList);
      });
    });
  };

  const handleDeleteFromTbrList = (book) => {
    const updatedTbrList = tbrList.filter((item) => item.id !== book.id);
    setTbrList(updatedTbrList);
    deleteFromTbrList(book.id);
  };

  return (
    <Card className="" style={{ minHeight: "1122px" }}>
      <Card.Header className="">
        <h1 className="header">TBR List</h1>
      </Card.Header>
      <Card.Body>
        <ListGroup
          className=""
          style={{ overflowY: "auto", maxHeight: "1000px" }}
        >
          {tbrList.map((item) => (
            <ListGroup.Item
              variant="danger"
              key={item.id}
              className="d-flex mb-4 rounded-lg bg-gray-100 hover:bg-gray-200 cursor-pointer"
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

                <Button
                  variant="primary"
                  className=""
                  onClick={() => handleAddToReadList(item)}
                >
                  Read it!!!
                </Button>
                <Button
                  variant="danger"
                  className=""
                  onClick={() => handleDeleteFromTbrList(item)}
                >
                  Delete
                </Button>
              </Col>
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default TbrList;
