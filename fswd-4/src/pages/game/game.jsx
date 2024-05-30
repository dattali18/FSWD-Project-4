/* eslint-disable react/prop-types */
import "./game.css";

import { useEffect, useState } from "react";

import GameCell from "../../components/gameCell/gameCell";

import { getGamers } from "../../utils/gamers";

export default function Game() {
  const [gamer, setGamer] = useState([...getGamers()]);
  const [leaderboard, setLeaderboard] = useState([]);

  const updateLeaderboard = updateLeaderboardF(setLeaderboard);
  const handleAddPlayer = handleAddPlayerF(setGamer);
  const handleQuitPlayer = handleQuitPlayerF(setGamer);

  useEffect(() => {
    updateLeaderboard(gamer);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gamer]);

  const handleInput = () => {
    let input = document.getElementById("gamer-name");
    if (input.value.trim() === "") {
      alert("Name is required to create a new player.");
      return;
    }
    handleAddPlayer(input.value);
  };

  return (
    <>
      <div className="header">
        <h1 className="center-title">Get to 100!</h1>
        <div className="controller">
          <div className="new-gamer">
            <input type="text" placeholder="Gamer Name" id="gamer-name" />
            <button className="orange-button" onClick={handleInput}>
              Add New Gamer
            </button>
          </div>
        </div>
      </div>

      <div className="game-container">
        <div className="game-cell-container">
          {gamer
            .filter((g) => g.playing)
            .map((g, i) => (
              <GameCell
                key={i}
                gamer={g}
                handleQuitPlayer={handleQuitPlayer}
                updateLeaderboard={updateLeaderboard}
                gamers={gamer}
              />
            ))}
        </div>

        {LeaderBoard(leaderboard)}
      </div>
    </>
  );
}

function LeaderBoard(leaderboard) {
  return (
    <div className="leaderboard">
      <h2>Leaderboard</h2>
      <ol>
        {leaderboard.map((player, index) => (
          <li key={index} className={`leaderboard-item rank-${index + 1}`}>
            {player.name}:{" "}
            {player.bestScore === Infinity ? "N/A" : player.bestScore} turns
          </li>
        ))}
      </ol>
    </div>
  );
}

function updateLeaderboardF(setLeaderboard) {
  return (gamers) => {
    const updatedLeaderboard = gamers
      .map((g) => ({
        name: g.name,
        bestScore: Math.min(...g.games, Infinity),
      }))
      .sort((a, b) => a.bestScore - b.bestScore)
      .slice(0, 3);
    setLeaderboard(updatedLeaderboard);
  };
}

function handleQuitPlayerF(setGamer) {
  return (name) => {
    setGamer((prevGamers) => {
      const updatedGamers = prevGamers.map((g) =>
        g.name === name ? { ...g, playing: false } : g
      );
      localStorage.setItem("gamers", JSON.stringify(updatedGamers));
      return updatedGamers;
    });
  };
}

function handleAddPlayerF(setGamer) {
  return (name) => {
    let gamers = getGamers();
    let gamerIndex = gamers.findIndex((g) => g.name === name);

    if (gamerIndex === -1) {
      let newGamer = {
        name: name,
        state: false,
        games: [],
        playing: true,
      };
      gamers.push(newGamer);
      localStorage.setItem("gamers", JSON.stringify(gamers));
      setGamer([...gamers]);
    } else {
      gamers[gamerIndex].playing = true;
      localStorage.setItem("gamers", JSON.stringify(gamers));
      setGamer([...gamers]);
    }
  };
}
