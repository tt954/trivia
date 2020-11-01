import React from 'react';

const LandingPage = props => {
  const { setDifficulty, start } = props;
  const difficulties = ["easy", "medium", "hard"];

  const _onFocus = e => {
    e.target.classList.toggle("clicked-diff")
    setDifficulty(e.target.value);
  }

  const _onBlur = e => {
    e.target.classList.toggle("clicked-diff");
  }

  return (
    <>
      <p>Choose a difficulty:</p>
      <div className="difficulty">
        {difficulties.map(difficulty => (
          <button 
            className="diff-btn"
            value={difficulty} 
            onFocus={_onFocus}
            onBlur={_onBlur}>
              {difficulty}
          </button>
        ))}
      </div>

      <button className="start action-btn" onClick={start}>Start Game</button>
    </>
  );
}

export default LandingPage;