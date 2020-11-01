import React from 'react';

const GameOver = props => {
  const { score, userAnswers, restart } =  props;
  

  return (
    <div>
      <h2>Game Over</h2>
      <p>Final Score: {score}</p>
      <button className="action-btn" onClick={restart}>Try Again</button>

      <ol className="question-list">
        {userAnswers.map((question, idx) => {
          const userAnswer = !question.correct ? question.answer : null;
          return (
            <li key={idx}>
              <p dangerouslySetInnerHTML={{ __html: question.question }}></p>
              <div className="ql-answers">
                <p className="cr" dangerouslySetInnerHTML={{ __html: question.correctAnswer }}></p>
                <p className="icr" dangerouslySetInnerHTML={{ __html: userAnswer }}></p>
              </div>
            </li>
          )
        })}
      </ol>

    </div>
  )
}

export default GameOver;