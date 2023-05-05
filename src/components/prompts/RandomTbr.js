import React, { useState, useEffect } from "react";
import { getTbrList } from "../ApiManager";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";

function RandomTbr() {
  const [toBeRead, setToBeRead] = useState("");
  const [clickCount, setClickCount] = useState(0);

  const handleRandomTbr = async () => {
    const tbrlist = await getTbrList();
    const randomIndex = Math.floor(Math.random() * tbrlist.length);
    const randomTbr = tbrlist[randomIndex].title;
    setToBeRead(randomTbr);

    setClickCount(clickCount + 1);
  };

  useEffect(() => {
    handleRandomTbr();
  }, []);

  useEffect(() => {
    if (clickCount === 4) {
      window.alert("PICK A BOOK ALREADY SHEESH!!!");
    }
  }, [clickCount]);

  return (
    <Container>
      <div className="text-center">
        <p className="">{toBeRead}</p>
        <Button variant="primary" className="h3" onClick={handleRandomTbr}>
          Random TBR Book!!
        </Button>
      </div>
    </Container>
  );
}

export default RandomTbr;
