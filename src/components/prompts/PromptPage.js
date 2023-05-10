import React, { useState, useEffect } from "react";
import { getAllPrompts, addPrompt } from "../ApiManager";
import RandomTbr from "./RandomTbr";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Card,
  ListGroup,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Prompts.css";
function Prompts() {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [newPromptText, setNewPromptText] = useState("");

  // function to generate new prompt
  const handleGeneratePrompt = async () => {
    // fetchs prompts form database
    const prompts = await getAllPrompts();
    const randomIndex = Math.floor(Math.random() * prompts.length);
    // gets a random prompt from array
    const randomPrompt = prompts[randomIndex].prompt;
    setCurrentPrompt(randomPrompt);

    const randomColor = "#" + Math.floor(Math.random() * 16777215).toString(16);
    document.querySelector(".gen-prompt").style.color = randomColor;
  };

  // function to submit new prompt
  const handleSubmitPrompt = async () => {
    // creates new object
    const newPrompt = { prompt: newPromptText };
    await addPrompt(newPrompt);
    setNewPromptText("");
  };

  useEffect(() => {
    handleGeneratePrompt();
  }, []);

  return (
    <Container className="prompt-tbr-container">
      <Row className="prompt-row">
        <Col className="prompt-col">
          <Card className="prompt-card">
            <Card.Body>
              <Card.Title className="prompt-header">
                Generate Random Reading Prompts!
              </Card.Title>
              <Card.Subtitle className="prompt-header">
                Read a book...
              </Card.Subtitle>
              <div className="prompt-button-container">
                <p className="gen-prompt">{currentPrompt}</p>
                <Button
                  variant="primary"
                  color="white"
                  className="promptbtn"
                  onClick={handleGeneratePrompt}
                >
                  Generate Prompt
                </Button>
              </div>

              <div className="prompt-form">
                <Form>
                  <Form.Label htmlFor="new-prompt-input" className="lead">
                    Submit a Prompt:
                  </Form.Label>
                  <Form.Group className="new-prompt-textbox">
                    <Form.Control
                      className="new-prompt-input"
                      type="text"
                      id="new-prompt-input"
                      placeholder="Read a book.."
                      value={newPromptText}
                      onChange={(event) => setNewPromptText(event.target.value)}
                    />
                    <Button
                      variant="success"
                      className="submit-prompt-button"
                      onClick={handleSubmitPrompt}
                    >
                      Submit
                    </Button>
                  </Form.Group>
                </Form>
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Card className="tbr-card">
            <Card.Body>
              <Card.Title className="tbrheader">
                Generate a Random Book from your TBR List!
              </Card.Title>
              <RandomTbr />
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Card className="links-card">
        <Card.Header className="link-header">Reading Challenges</Card.Header>
        <Card.Body>
          <ListGroup className="links-list">
            <ListGroup.Item>
              <a href="https://www.popsugar.com/entertainment/reading-challenge-2023-49013480">
                PopSugar Reading Challenge
              </a>
            </ListGroup.Item>
            <ListGroup.Item>
              <a href="https://bookriot.com/read-harder-2023/">
                Book Riot READ HARDER Challenge
              </a>
            </ListGroup.Item>
            <ListGroup.Item>
              <a href="https://www.the52book.club/2023-reading-challenge/">
                The 52 Book Club Challenge
              </a>
            </ListGroup.Item>
            <ListGroup.Item>
              <a href="https://www.escapewithdollycas.com/2023-reading-challenges/2023-alphabet-soup-author-edition-reading-challenge/">
                Alphabet Soup Reading Challenge
              </a>
            </ListGroup.Item>
            <ListGroup.Item>
              <a href="https://caffeinatedbookreviewer.com/2022/12/2023-audiobook-challenge-sign-up.html">
                Audiobook Challenge
              </a>
            </ListGroup.Item>
            <ListGroup.Item>
              <a href="https://bookwyrmshoard.com/challenges/the-backlist-reader-challenge-2023-rules-sign-up/">
                The Backlist Reader Challenge
              </a>
            </ListGroup.Item>
            <ListGroup.Item>
              <a href="https://www.goodreads.com/challenges/show/11633-2023-reading-challenge">
                The enemies reading challenge (aka "Not So GoodReads" aka "Okay
                Reads")
              </a>
            </ListGroup.Item>
          </ListGroup>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Prompts;
