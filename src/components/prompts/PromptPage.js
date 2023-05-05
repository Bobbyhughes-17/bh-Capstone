import React, { useState, useEffect } from "react";
import { getAllPrompts, addPrompt } from "../ApiManager";
import RandomTbr from "./RandomTbr";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Prompts.css";
function Prompts() {
  const [currentPrompt, setCurrentPrompt] = useState("");
  const [newPromptText, setNewPromptText] = useState("");

  const handleGeneratePrompt = async () => {
    const prompts = await getAllPrompts();
    const randomIndex = Math.floor(Math.random() * prompts.length);
    const randomPrompt = prompts[randomIndex].prompt;
    setCurrentPrompt(randomPrompt);
  };

  const handleSubmitPrompt = async () => {
    const newPrompt = { prompt: newPromptText };
    await addPrompt(newPrompt);
    setNewPromptText("");
  };

  useEffect(() => {
    handleGeneratePrompt();
  }, []);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center mt-5">Generate Random Reading Prompts!</h1>
          <div className="border p-3 my-3">
            <p className="lead">{currentPrompt}</p>
            <Button
              variant="primary"
              className="mr-2"
              onClick={handleGeneratePrompt}
            >
              Generate Prompt
            </Button>
          </div>

          <div className="border p-3 my-3">
            <Form>
              <Form.Label htmlFor="new-prompt-input" className="lead">
                Submit a Prompt:
              </Form.Label>
              <Form.Group className="new-prompt-textbox">
                <Form.Control
                  className="new-prompt-input"
                  type="text"
                  id="new-prompt-input"
                  value={newPromptText}
                  onChange={(event) => setNewPromptText(event.target.value)}
                />
                <button
                  variant="success"
                  className="mt-3"
                  onClick={handleSubmitPrompt}
                >
                  Submit
                </button>
              </Form.Group>
            </Form>
          </div>
        </Col>
        <Col>
          <h1 className="text-center">
            For the indecisive, picky, can't make a call on anything... ever.
            This button is for you!
          </h1>
          <div className="border p-3 my-3">
            <RandomTbr />
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default Prompts;
