import { useState } from "react";

import PropTypes from "prop-types";

function handleGamePlay(setNumber, setStep, setIsDone, number, step, operation) {
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

export default function GameCell({ name, state, random }) {
  const [number, setNumber] = useState(random);
  const [step, setStep] = useState(1);
  const [isDone, setIsDone] = useState(false);

  return (
    <div className="game-cell">
      <h2>{name}</h2>
      <p>{state ? "Active" : "Inactive"}</p>
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
          disabled={isDone || !state}
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
          disabled={isDone || !state}
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
          disabled={isDone || !state}
        >
          * 2
        </button>
        <button
          onClick={() => {
            handleGamePlay(setNumber, setStep, setIsDone, number, step, (n) =>
              Math.round(n / 2)
            );
          }}
          disabled={isDone || !state}
        >
          / 2
        </button>
      </div>
    </div>
  );
}

GameCell.propTypes = {
  name: PropTypes.string.isRequired,
  state: PropTypes.bool.isRequired,
  random: PropTypes.number.isRequired,
};
