import React, { useState } from "react";

function QuestionItem({ question, onDelete, onCorrectAnswerChange }) {
  const { id, prompt, answers, correctIndex } = question;

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  const [selectedAnswer, setSelectedAnswer] = useState(correctIndex);

  const handleCorrectAnswerChange = (event) => {
    const newIndex = parseInt(event.target.value);
    setSelectedAnswer(newIndex);
    onCorrectAnswerChange(id, newIndex);
  };

  const handleDeleteClick = () => {
    onDelete(id);
  };

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select value={selectedAnswer} onChange={handleCorrectAnswerChange}>
          {options}
        </select>
      </label>
      <button onClick={handleDeleteClick}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
