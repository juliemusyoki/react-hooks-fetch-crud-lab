// QuestionList.js
import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ questions, onDelete, onCorrectAnswerChange }) {
  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={onDelete} // Pass the onDelete function
            onCorrectAnswerChange={onCorrectAnswerChange}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
