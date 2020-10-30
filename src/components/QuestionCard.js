import React from 'react';

const QuestionCard = props => {
  const { question, answers, cb, userAnswer, questionNumber, totalQuestions } = props;
  return (
    <div>
      <p className="number">
        Question: {questionNumber} / {totalQuestions}
      </p>  
      <p dangerouslySetInnerHTML={{ __html: question }} />
      
      <div>
        {answers.map(answer => (
          <div key={answer}>
            <button disabled={!!userAnswer} value={answer} onClick={cb}>
              <span dangerouslySetInnerHTML={{ __html: answer }}></span>
            </button>
          </div>
        ))}
      </div>

    </div>
  )
}

export default QuestionCard;