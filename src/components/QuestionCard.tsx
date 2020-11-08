import React from 'react';

type Props = {
  question: string;
  answers: string[];
  checkAnswer: any;
  userAnswer: string;
  questionNumber: number;
  totalQuestions: number;
  score: number;
}

const QuestionCard: React.FC<Props> = ({ 
  question, 
  answers, 
  checkAnswer, 
  userAnswer, 
  questionNumber, 
  totalQuestions, 
  score 
}) => (

    <div className="question-card">

      <p className="question-number">
        Question: {questionNumber} / {totalQuestions}
      </p>  

      <p className="score">Score: <span>{score}</span></p>

      <p className="question" dangerouslySetInnerHTML={{ __html: question }} />
      
      <div className="choices">
        {answers.map(answer => {
          const correct = userAnswer ? userAnswer.correctAnswer === answer : false;
          const userClicked = userAnswer ? userAnswer.answer === answer : false;

          return (
            <button 
              key={answer} 
              className={`answer-wrapper
                ${correct ? "correct" : "incorrect"}
                ${userClicked? "clicked" : "notclicked"}`}
              disabled={userAnswer ? true : false}
              value={answer} 
              onClick={checkAnswer}
            >
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
        )})}
      </div>
    </div>
    
  );

export default QuestionCard;