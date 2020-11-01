import React from 'react';

const LandingPage = props => {
  const { handleDifficulty, start } = props;
  const difficulties = ["easy", "medium", "hard"];

  return (
    <>
      <p>Choose a difficulty:</p>
      <div className="difficulty">
        {difficulties.map(difficulty => (
          <button 
            value={difficulty} 
            onClick={handleDifficulty}>
              {difficulty}
          </button>
        ))}
      </div>

      <button className="start action-btn" onClick={start}>Start Game</button>
    </>
  );
}

export default LandingPage;