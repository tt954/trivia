import React from 'react';

const LandingPage = props => {
  const { handleDifficulty, start } = props;

  return (
    <>
      <p>Choose a difficulty:</p>
      <div className="difficulty">
        <button value="easy" onClick={handleDifficulty}>Easy</button>
        <button value="medium" onClick={handleDifficulty}>Med</button>
        <button value="hard" onClick={handleDifficulty}>Hard</button>
      </div>

      <button className="start" onClick={start}>Start Game</button>
    </>
  );
}

export default LandingPage;