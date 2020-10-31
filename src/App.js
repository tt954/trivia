import React, { useState, useEffect } from 'react';
import './styles.css';
import { fetchQuestions } from './API';

// Components
import QuestionCard from './components/QuestionCard';
import LandingPage from './components/LandingPage';

const TOTAL_QUESTIONS = 10;

const App = () => {
  const [landing, setLanding] = useState(true);
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [number, setNumber] = useState(0);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);
  const [difficulty, setDifficulty] = useState("easy");

  // Set difficultiness 
  const handleDifficulty = e => {
    setDifficulty(e.target.value);
  }

  // Start game
  const start = async () => {
    setLanding(false);
    setLoading(true);
    setGameOver(false);

    const newQuestions = await fetchQuestions(
      TOTAL_QUESTIONS, 
      difficulty
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const restart = () => {
    setLanding(true);
  }

  const checkAnswer = e => {
    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;
    if (correct) setScore(prev => prev + 1);
    const answerObject = {
      question: questions[number].question,
      answer, 
      correct, 
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers(prev => [...prev, answerObject]);
  }


  const nextQuestion = () => {
    // Move onto the next question
    const nextQuestion = number + 1;
    console.log(userAnswers);
    console.log(questions);

    if (nextQuestion === TOTAL_QUESTIONS) {
      gameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <div className="App">
      {!landing && 
        <button className="restart" title="Restart" onClick={restart}>&#10006;</button>}

      <h1 className="title fl">Trivia</h1>

      {landing && <LandingPage 
        handleDifficulty={handleDifficulty}
        start={start}
      />}

      {/* When questions are loading  */}
      {loading && <p>Loading questions...</p>}
      
      {/* When questions are not loading and game is not over */}
      {!loading && !gameOver && !landing && (
        <QuestionCard 
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          checkAnswer={checkAnswer}
          score={score}
          nextQuestion={nextQuestion}
        />
      )}

      {!landing && !loading && !gameOver && userAnswers.length === number + 1 &&
        <button className="next" onClick={nextQuestion}>Next</button>}

    </div>
  );
}

export default App;
