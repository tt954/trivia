import React, { useState } from 'react';
import { fetchQuestions } from './API';

// Components
import QuestionCard from './components/QuestionCard';

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(fetchQuestions(10, "easy"));

  const startTrivia = async => {

  }

  const checkAnswer = (e) => {

  }

  const nextQuestion = () => {

  }

  return (
    <div className="App">
      <h1>
        Trivia Game
      </h1>

      <button className="start" onClick={startTrivia}>Start Trivia</button>

      <p className="score">Score:</p>
      <p>Loading questions...</p>

      {/* <QuestionCard 
        questionNumber={number + 1}
        totalQuestions={TOTAL_QUESTIONS}
        question={questions[number].question}
        answers={questions[number].answers}
        userAnswers={userAnswers ? userAnswers[number] : undefined}
        cb={checkAnswer}
      /> */}

      <button className="next" onClick={nextQuestion}>Next</button>
    </div>
  );
}

export default App;
