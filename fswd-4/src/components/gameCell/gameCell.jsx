import { useState } from "react";

import { updateGamer } from "../../utils/gamers.js";

import PropTypes from "prop-types";

function handleGamePlay(
  setNumber,
  setStep,
  setIsDone,
  number,
  step,
  operation
) {
  if (number == 100) {
    setIsDone(true);
  }

  let n = operation(number);

  setNumber(n);
  setStep(step + 1);

  if (n == 100) {
    setIsDone(true);
  }
}

export default function GameCell({ gamer, random }) {
  const [number, setNumber] = useState(random);
  const [step, setStep] = useState(1);
  const [isDone, setIsDone] = useState(false);

  // when isDone is true, the game is over, and we should store the new game into the localStorage
  if (isDone) {
    updateGamer(gamer, step);
  }

  return (
    <div className="game-cell">
      <h2>{gamer.name}</h2>
      <p>{gamer.state ? "Active" : "Inactive"}</p>
      <p>{number}</p>
      <p>{step}</p>

      <div className="controller">
        <button
          onClick={() => {
            handleGamePlay(
              setNumber,
              setStep,
              setIsDone,
              number,
              step,
              (n) => n + 1
            );
          }}
          disabled={isDone || !gamer.state}
        >
          +1
        </button>
        <button
          onClick={() => {
            handleGamePlay(
              setNumber,
              setStep,
              setIsDone,
              number,
              step,
              (n) => n - 1
            );
          }}
          disabled={isDone || !gamer.state}
        >
          -1
        </button>
        <button
          onClick={() => {
            handleGamePlay(
              setNumber,
              setStep,
              setIsDone,
              number,
              step,
              (n) => n * 2
            );
          }}
          disabled={isDone || !gamer.state}
        >
          * 2
        </button>
        <button
          onClick={() => {
            handleGamePlay(setNumber, setStep, setIsDone, number, step, (n) =>
              Math.round(n / 2)
            );
          }}
          disabled={isDone || !gamer.state}
        >
          / 2
        </button>
      </div>
    </div>
  );
}

GameCell.propTypes = {
  gamer: PropTypes.object.isRequired,
  random: PropTypes.number.isRequired,
};
