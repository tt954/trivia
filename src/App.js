import React, { useState } from 'react';
import './styles.css';

// Components
import QuestionCard from './components/QuestionCard';
import LandingPage from './components/LandingPage';
import GameOver from './components/GameOver';

import { fetchQuestions } from './API';

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

  // Restart game, take user back to landing page
  const restart = () => { 
    setLanding(true); 
  }

  const checkAnswer = e => {
    const answer = e.currentTarget.value;
    const correct = questions[number].correct_answer === answer;
    if (correct) setScore(prev => prev + 1);

    // Set up answer object to update userAnswers array
    const answerObject = {
      question: questions[number].question,
      answer, 
      correct, 
      correctAnswer: questions[number].correct_answer,
    };
    setUserAnswers(prev => [...prev, answerObject]);
  }

  const nextQuestion = () => {
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <div className="App">
      {/* Restart available only when not on landing page */}
      {!landing && 
        <button 
          className="restart" 
          title="Restart" 
          onClick={restart}>
            &#10006;
        </button>}

      <h1 className="title fl">Trivia</h1>

      {landing && 
        <LandingPage 
          setDifficulty={setDifficulty}
          start={start}
        />}

      {/* When questions are loading  */}
      {loading && <p>Loading questions...</p>}
      
      {/* When questions are not loading and game is not over */}
      {!loading && !gameOver && !landing && 
        <QuestionCard 
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          checkAnswer={checkAnswer}
          score={score}
          nextQuestion={nextQuestion}
        />}

      {/* Next button available only when user has chosen an answer (increasing userAnswers length) */}
      {!landing && !loading && !gameOver && userAnswers.length === number + 1 &&
        <button className="next action-btn" onClick={nextQuestion}>Next</button>}

      {gameOver && !landing &&
        <GameOver 
          score={score}
          userAnswers={userAnswers}
          restart={restart}
        />}
    </div>
  );
}

export default App;
