// App.js
import React, { useState, useEffect } from 'react';
import AdminNavBar from './AdminNavBar';
import QuestionForm from './QuestionForm';
import QuestionList from './QuestionList';

function App() {
  const [page, setPage] = useState('List');
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    if (page === 'List') {
      // Implement the GET request using useEffect to fetch questions from the API when the component mounts
      fetch('http://localhost:3000/questions')
        .then((response) => response.json())
        .then((data) => setQuestions(data))
        .catch((error) => {
          console.error('Error fetching questions:', error);
        });
    }
  }, [page]);

  const handleAddQuestion = (newQuestion) => {
    // Function to add a new question
    // Implement the POST request using fetch
    fetch('http://localhost:3000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newQuestion),
    })
      .then((response) => response.json())
      .then((data) => {
        setQuestions([...questions, data]);
        setPage('List'); // After adding, switch back to the list view
      })
      .catch((error) => {
        console.error('Error adding a question:', error);
      });
  };

  const handleDeleteQuestion = (id) => {
    // Function to delete a question
    // Implement the DELETE request using fetch
    fetch(`http://localhost:3000/questions/${id}`, {
      method: 'DELETE',
    })
      .then(() => {
        setQuestions(questions.filter((question) => question.id !== id));
      })
      .catch((error) => {
        console.error('Error deleting a question:', error);
      });
  };

  const handleUpdateCorrectAnswer = (id, correctIndex) => {
    // Function to update the correct answer for a question
    // Implement the PATCH request using fetch
    fetch(`http://localhost:3000/questions/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ correctIndex }),
    })
      .then(() => {
        setQuestions((prevQuestions) =>
          prevQuestions.map((question) =>
            question.id === id ? { ...question, correctIndex } : question
          )
        );
      })
      .catch((error) => {
        console.error('Error updating correct answer:', error);
      });
  };

  return (
    <main>
      <AdminNavBar onChangePage={setPage} />
      {page === 'Form' ? (
        <QuestionForm onAdd={handleAddQuestion} />
      ) : (
        <QuestionList
          questions={questions}
          onDelete={handleDeleteQuestion}
          onCorrectAnswerChange={handleUpdateCorrectAnswer}
        />
      )}
    </main>
  );
}

export default App;
