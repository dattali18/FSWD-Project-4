import { useState } from "react";

import GameCell from "../../components/gameCell/gameCell";

import { getGamers, saveGamer } from "../../utils/gamers";

// const gamers = [{ name: "Gamer 1", state: false, games: [8, 40, 12] }];

/*
The gamer will be stored in the localStorage
write a function to save the gamer in the localStorage
write a function to get the gamer from the localStorage

gamer = {
  name: string,
  state: boolean, : playing not playing
  games: [number] : history of games
}
*/

function handleAddGamer(name) {
  let newGamer = {
    name: name,
    state: false,
    games: [],
  };

  let gamers = getGamers();

  let gamerIndex = gamers.findIndex((g) => g.name === name);

  if (gamerIndex === -1) {
    saveGamer(newGamer);
  } else {
    newGamer = gamers[gamerIndex];
  }

  return newGamer;
}



export default function Game() {
  // get the gamers using the getGamers function
  let gamers = getGamers();

  const [gamer, setGamer] = useState([...gamers]);

  return (
    <>
      <h1>Game</h1>
      <p>Game content</p>

      <div className="controller">
        <div className="new-gamer">
          <input type="text" placeholder="Gamer Name" id="gamer-name"/>
          <button
            onClick={() => {
              // get the value of the input
              // call the handleAddGamer function
              // pass the value of the input and the setGamer function
              let input = document.getElementById("gamer-name");
              let newGamer = handleAddGamer(input.value);

              setGamer([...gamer, newGamer]);
            }}
          >Add New Gamer</button>
        </div>
        <div className="start-game">
          <button
            onClick={() => {
              // change the state of the gamer to true

              let newGamer = gamer.map((g) => {
                return {
                  ...g,
                  state: true,
                };
              });

              setGamer(newGamer);
            }}
          >
            Start Game
          </button>
        </div>
      </div>

      <div className="game-cell">
        {gamer.map((g, i) => (
          <GameCell
            key={i}
            gamer={g}
            random={Math.floor(Math.random() * 100)}
          />
        ))}
        <div className="game-history">
          <ul>
            {gamer.map((g, i) => (
              <li key={i}>
                <ul>
                  {g.games.map((game, j) => (
                    <li key={j}>{game}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
