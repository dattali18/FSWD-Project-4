import { useState, useEffect } from "react";

import { updateGamer } from "../../utils/gamers.js";

import PropTypes from "prop-types";

function handleGamePlay(
  setNumber,
  setStep,
  setIsDone,
  number,
  step,
  operation,
  handleNextTurn,
  handleGameEnd
) {
  if (number === 100) {
    setIsDone(true);
    handleGameEnd();
  }

  let n = operation(number);

  setNumber(n);
  setStep(step + 1);

  if (n === 100) {
    setIsDone(true);
    handleGameEnd();
  }
  handleNextTurn();
}

export default function GameCell({
  gamer,
  handleQuitPlayer,
  updateLeaderboard,
  gamers,
}) {
  const [number, setNumber] = useState(0);
  const [step, setStep] = useState(1);
  const [isDone, setIsDone] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleStartGame = () => {
    setIsPlaying(true);
    setNumber(Math.floor(Math.random() * 100));
    setStep(1);
    setIsDone(false);
  };

  const handleQuitGame = () => {
    handleQuitPlayer(gamer.name);
  };

  const handleGameEnd = () => {
    setIsPlaying(false);
    gamer.games.push(step);
    updateGamer(gamer);
    updateLeaderboard(gamers);
  };

  return (
    <div className="game-cell">
      <h2>{gamer.name}</h2>
      <p>Score: {number}</p>
      <p>Number of Turns: {step}</p>
      <p>Status: {isPlaying ? "Active" : "Inactive"}</p>

      <div className="action-buttons">
        {isPlaying ? (
          <>
            <button
              className="action-button"
              onClick={() => {
                handleGamePlay(
                  setNumber,
                  setStep,
                  setIsDone,
                  number,
                  step,
                  (n) => n + 1,
                  () => {},
                  handleGameEnd
                );
              }}
              disabled={isDone}
            >
              +1
            </button>
            <button
              className="action-button"
              onClick={() => {
                handleGamePlay(
                  setNumber,
                  setStep,
                  setIsDone,
                  number,
                  step,
                  (n) => n - 1,
                  () => {},
                  handleGameEnd
                );
              }}
              disabled={isDone}
            >
              -1
            </button>
            <button
              className="action-button"
              onClick={() => {
                handleGamePlay(
                  setNumber,
                  setStep,
                  setIsDone,
                  number,
                  step,
                  (n) => n * 2,
                  () => {},
                  handleGameEnd
                );
              }}
              disabled={isDone}
            >
              *2
            </button>
            <button
              className="action-button"
              onClick={() => {
                handleGamePlay(
                  setNumber,
                  setStep,
                  setIsDone,
                  number,
                  step,
                  (n) => Math.round(n / 2),
                  () => {},
                  handleGameEnd
                );
              }}
              disabled={isDone}
            >
              /2
            </button>
          </>
        ) : (
          <>
            <button className="green-button" onClick={handleStartGame}>
              Start Game
            </button>
            <button className="red-button" onClick={handleQuitGame}>
              Quit Game
            </button>
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
  handleQuitPlayer: PropTypes.func.isRequired,
  updateLeaderboard: PropTypes.func.isRequired,
  gamers: PropTypes.array.isRequired,
};