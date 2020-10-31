import React, { useState } from 'react';
import './styles.css';
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
  const [difficulty, setDifficulty] = useState("easy");

  // Set difficultiness 
  const handleDiff = e => {
    console.log(e.target);
    setDifficulty(e.target.value);
  }

  const startTrivia = async () => {
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

  const checkAnswer = (e) => {
    if (!gameOver) {
      const answer = e.currentTarget.value;
      const correct = questions[number].correct_answer === answer;
      if (correct) setScore(prevScore => prevScore + 1);
      const answerObject = {
        question: questions[number].question,
        answer, 
        correct, 
        correctAnswer: questions[number].correct_answer,
      }
      setUserAnswers(prev => [...prev, answerObject]);
    }
  }

  const nextQuestion = () => {
    // Move onto the next question
    const nextQuestion = number + 1;

    if (nextQuestion === TOTAL_QUESTIONS) {
      gameOver(true);
    } else {
      setNumber(nextQuestion);
    }
  }

  return (
    <div className="App">
      <h1 className="title fl">
        Trivia Game
      </h1>

      {gameOver || userAnswers.length === TOTAL_QUESTIONS ? (
        <>
          <div className="difficulty">
            <button value="easy" onClick={handleDiff}>Easy</button>
            <button value="medium" onClick={handleDiff}>Med</button>
            <button value="hard" onClick={handleDiff}>Hard</button>
          </div>

          <button className="start" onClick={startTrivia}>Start Trivia</button>
        </>
      ) : null}

      {number + 1 !== 0 && <p className="score">Score: {score}</p>}

      {/* When questions are loading  */}
      {loading && <p>Loading questions...</p>}
      
      {/* When questions are not loading and game is not over */}
      {!loading && !gameOver && (
        <QuestionCard 
          questionNumber={number + 1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers ? userAnswers[number] : undefined}
          cb={checkAnswer}
        />
      )}

      {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? (
        <button className="next" onClick={nextQuestion}>Next</button>
      ) : null}
    </div>
  );
}

export default App;
