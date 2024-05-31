import { useState, useEffect } from "react";


import PropTypes from "prop-types";

function handleGamePlay(
  setNumber,
  setStep,
  setIsDone,
  number,
  step,
  operation,
  handleGameEnd,
  handlePlayerTurnEnd,
  gamerName
) {
  // find the gamer in the local storage for update
  const storedGamers = JSON.parse(localStorage.getItem('gamers')) || [];
  const gamerIndex = storedGamers.findIndex(g => g.name === gamerName);
  const gamer = storedGamers[gamerIndex];

  if (!gamer) return;

  let n = operation(gamer.score);
  setNumber(n);
  setStep(step + 1);

  gamer.score = n; 
 
  if (n === 100) {
    handleGameEnd(gamer);
  } else {
    handlePlayerTurnEnd(gamer.name);
  }
  storedGamers[gamerIndex] = gamer;
  localStorage.setItem('gamers', JSON.stringify(storedGamers));
}

export default function GameCell({
  gamer,
  isGameActive,
  handleQuitPlayer,
  handleEnd,
  handleJoinLeave,
  handlePlayerTurnEnd,
  isPlaying
}) {
  const [number, setNumber] = useState(0);
  const [step, setStep] = useState(1);
  const [isDone, setIsDone] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [isTurn, setIsTurn] = useState(gamer.isTurn);

//updates with the buttons
  useEffect(() => {
    setIsTurn(gamer.isTurn);
  }, [gamer.isTurn]);

  useEffect(() => {
    setNumber(gamer.score);
  }, [gamer.score]);

  useEffect(() => {
    setIsJoined(gamer.joined);
  }, [gamer.joined]);

  useEffect(() => {
    if (isGameActive) {
      setIsTurn(gamer.isTurn)
      setStep(0);
    }
}, [isGameActive]);


  const handleJoin = () => {
    setIsJoined(true);
    handleJoinLeave(gamer.name, true);
  };

  const handleLeave = () => {
    setIsJoined(false);
    handleJoinLeave(gamer.name, false);
  };

  const handleGameEnd = () => {
    window.alert(`${gamer.name} has won`);
    setIsTurn(false);
    gamer.games.push(step); //update for history
    const storedGamers = JSON.parse(localStorage.getItem('gamers')) || [];
    const updatedGamers = storedGamers.map((storedGamer) =>
      storedGamer.name === gamer.name ? gamer : storedGamer
    );
    localStorage.setItem('gamers', JSON.stringify(updatedGamers));

    handleEnd(updatedGamers);
  };

  return (
    <div className="game-cell">
      <h2>{gamer.name}</h2>
      <p>Score: {number}</p>
      <p>Number of Turns: {step}</p>
      <p>Status: {isPlaying ? "Active" : "Inactive"}</p>

      <div className="action-buttons">
        {isPlaying && isJoined && isTurn ? (
          <>
            <button className="action-button" onClick={() => handleGamePlay(setNumber, setStep, setIsDone, number, step, n => n + 1, handleGameEnd, handlePlayerTurnEnd, gamer.name)} disabled={isDone}>+1</button>
            <button className="action-button" onClick={() => handleGamePlay(setNumber, setStep, setIsDone, number, step, n => n - 1, handleGameEnd, handlePlayerTurnEnd, gamer.name)} disabled={isDone}>-1</button>
            <button className="action-button" onClick={() => handleGamePlay(setNumber, setStep, setIsDone, number, step, n => n * 2, handleGameEnd, handlePlayerTurnEnd, gamer.name)} disabled={isDone}>*2</button>
            <button className="action-button" onClick={() => handleGamePlay(setNumber, setStep, setIsDone, number, step, n => Math.floor(n / 2), handleGameEnd, handlePlayerTurnEnd, gamer.name)} disabled={isDone}>/2</button>
          </>
        ) : isGameActive && (!isTurn || !isJoined) ? (
          <>
            <button className="disabled-button" disabled>Waiting...</button>
          </>
        ) : (
          <>
            {isJoined ? (
              <>
                <button className="orange-button" onClick={() => handleLeave()}>Leave Game</button>
                <button className="red-button" onClick={() => handleQuitPlayer(gamer.name)}>Quit Game</button>
              </>
            ) : (
              <>
                <button className="green-button" onClick={() => handleJoin(gamer.name, true)}>Join Game</button>
                <button className="red-button" onClick={() => handleQuitPlayer(gamer.name)}>Quit Game</button>
              </>
            )}
          </>
        )}
      </div>
      <div className="game-history">
        <p>Previous games: {gamer.games.join(", ")}</p>
      </div>
    </div>
  );
}

GameCell.propTypes = {
  gamer: PropTypes.object.isRequired,
  isGameActive: PropTypes.bool.isRequired,
  handleQuitPlayer: PropTypes.func.isRequired,
  handleEnd: PropTypes.func.isRequired,
  handleJoinLeave: PropTypes.func.isRequired,
  handlePlayerTurnEnd: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
};

