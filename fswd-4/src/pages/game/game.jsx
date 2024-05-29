import "./game.css";

import { useState, useEffect } from "react";

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
  let gamers = getGamers();

  const [gamer, setGamer] = useState([...gamers]);
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    updateLeaderboard(gamer);
  }, [gamer]);

  const updateLeaderboard = (gamers) => {
    const updatedLeaderboard = gamers
      .map((g) => ({
        name: g.name,
        bestScore: Math.min(...g.games, Infinity),
      }))
      .sort((a, b) => a.bestScore - b.bestScore)
      .slice(0, 3);
    setLeaderboard(updatedLeaderboard);
  };

  const handleAddPlayer = (name) => {
    if (gamer.some((g) => g.name === name.trim())) {
      alert("A player with this name already exists.");
      return;
    }
    let newGamer = handleAddGamer(name.trim());
    setGamer([...gamer, newGamer]);
  };

  const handleQuitPlayer = (name) => {
    setGamer((prevGamers) => {
      const updatedGamers = prevGamers.filter((g) => g.name !== name);
      localStorage.setItem('gamers', JSON.stringify(updatedGamers));
      return updatedGamers;
    });
  };

  return (
    <>
      <div className="header">
        <h1 className="center-title">Get to 100!</h1>
        <div className="controller">
          <div className="new-gamer">
            <input type="text" placeholder="Gamer Name" id="gamer-name" />
            <button
              className="orange-button"
              onClick={() => {
                let input = document.getElementById("gamer-name");
                if (input.value.trim() === "") {
                  alert("Name is required to create a new player.");
                  return;
                }
                handleAddPlayer(input.value);
              }}
            >
              Add New Gamer
            </button>
          </div>
        </div>
      </div>

      <div className="game-container">
        <div className="game-cell-container">
          {gamer.map((g, i) => (
            <GameCell
              key={i}
              gamer={g}
              handleQuitPlayer={handleQuitPlayer}
              updateLeaderboard={updateLeaderboard}
              gamers={gamer}
            />
          ))}
        </div>

        <div className="leaderboard">
          <h2>Leaderboard</h2>
          <ol>
            {leaderboard.map((player, index) => (
              <li key={index} className={`leaderboard-item rank-${index + 1}`}>
                {player.name}: {player.bestScore === Infinity ? "N/A" : player.bestScore} turns
              </li>
            ))}
          </ol>
        </div>
      </div>
    </>
  );
}