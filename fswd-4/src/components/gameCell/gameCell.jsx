import { useState } from "react";

import PropTypes from "prop-types";

export default function GameCell({ name, state, random }) {
  const [number, setNumber] = useState(random);
  const [step, setStep] = useState(1);

  return (
    <div className="game-cell">
      <h2>{name}</h2>
      <p>{state ? "Active" : "Inactive"}</p>
      <p>{number}</p>
      <p>{step}</p>

      <div className="controller">
        <button
          onClick={() => {
            setNumber(number + 1);
            setStep(step + 1);
          }}
        >
          +1
        </button>
        <button
          onClick={() => {
            setNumber(number - 1);
            setStep(step + 1);
          }}
        >
          -1
        </button>
        <button
          onClick={() => {
            setNumber(number * 2);
            setStep(step + 1);
          }}
        >
          * 2
        </button>
        <button
          onClick={() => {
            setNumber(Math.round(number / 2));
            setStep(step + 1);
          }}
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
