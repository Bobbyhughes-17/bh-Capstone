import React, { useState, useEffect } from "react";
import { getTbrList } from "../ApiManager";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container } from "react-bootstrap";

function RandomTbr() {
  const [toBeRead, setToBeRead] = useState("");
  const [clickCount, setClickCount] = useState(0);

  // function to select a random book from the TBR list
  const handleRandomTbr = async () => {
    const tbrlist = await getTbrList();
    // generate a random index within the length of the list
    const randomIndex = Math.floor(Math.random() * tbrlist.length);
    // set the title of the random book
    const randomTbr = tbrlist[randomIndex].title;
    setToBeRead(randomTbr);

    setClickCount(clickCount + 1);

    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector(".book-title").style.color = randomColor;
  };

  useEffect(() => {
    handleRandomTbr();
  }, []);
  // hook to display an alert if the button has been clicked 4 times
  useEffect(() => {
    if (clickCount === 4) {
      window.alert("PICK A BOOK ALREADY SHEESH!!!");
    }
  }, [clickCount]);

  return (
    <Container>
      <div className="text-center">
        <p className="book-title">{toBeRead}</p>
        <Button
          variant="primary"
          className="random-book-button"
          onClick={handleRandomTbr}
        >
          Random TBR Book!!
        </Button>
      </div>
    </Container>
  );
}

export default RandomTbr;
