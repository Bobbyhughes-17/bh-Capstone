import React, { useState, useEffect } from "react";
import { getAllPrompts, addPrompt } from "../ApiManager";

function PromptPage() {
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
    <div className="flex flex-col items-center">
      <h1 className="text-4xl font-bold mt-8 mb-12 text-gray-700">Prompt Page</h1>
  
      <div className="w-4/5 max-w-md p-4 rounded-lg shadow-lg bg-white">
        <p className="text-3xl mb-4 text-center text-gray-700 font-bold">{currentPrompt}</p>
        <button
          className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full w-full"
          onClick={handleGeneratePrompt}
        >
          Generate Prompt
        </button>
      </div>
  
      <div className="w-4/5 max-w-md mt-8 p-4 rounded-lg shadow-lg bg-white">
        <label
          htmlFor="new-prompt-input"
          className="block text-gray-700 font-bold mb-2"
        >
          Submit a Prompt:
        </label>
        <div className="flex">
          <input
            className="w-full rounded-l-lg py-2 px-4 text-gray-700 border-gray-400 border-2"
            type="text"
            id="new-prompt-input"
            value={newPromptText}
            onChange={(event) => setNewPromptText(event.target.value)}
          />
          <button
            className="bg-purple-700 hover:bg-purple-800 text-white font-bold py-2 px-4 rounded-full w-26 ml-2"
            onClick={handleSubmitPrompt}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
  
}

export default PromptPage;
