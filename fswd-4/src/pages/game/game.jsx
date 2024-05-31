import "./game.css";

import { useState} from "react";

import GameCell from "../../components/gameCell/gameCell";

function getGamers() {
  const storedGamers = localStorage.getItem('gamers');
  if (storedGamers) {
    return JSON.parse(storedGamers);
  }
  return [];
}


export default function Game() {
  const [gamers, setGamers] = useState([...getGamers()]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [isGameActive, setIsGameActive] = useState(false);


  const handleAddPlayer = (name) => {
    let currentGamers  = getGamers();
    let gamerIndex = currentGamers.findIndex((g) => g.name === name);

    if (gamerIndex === -1) {
      let newGamer = {
        name: name,
        state: false,
        games: [],
        playing: true,
        joined:false,
        isTurn:false,
      };
      currentGamers .push(newGamer);
      localStorage.setItem('gamers', JSON.stringify(currentGamers ));
      setGamers([...currentGamers]);
    } else {
      currentGamers [gamerIndex].playing = true;
      localStorage.setItem('gamers', JSON.stringify(currentGamers ));
      setGamers([...currentGamers]);
    }
  };

  const handleStartGame = () => {
    const activePlayers = gamers.filter(g => g.joined && g.playing);
  if (activePlayers.length < 2) {
    window.alert("At least 2 players are required to start the game.");
    return;
  }
    setIsGameActive(true);
    if (activePlayers.length > 0) {
        setGamers(currentGamers => {
            const updatedGamers = currentGamers.map(gamer => ({
                ...gamer,
                isTurn: gamer.name === activePlayers[0].name,
                score: Math.floor(Math.random() * 99)+1 , 
                
            }));

            localStorage.setItem('gamers', JSON.stringify(updatedGamers));

            return updatedGamers;
        });
    }
};
  const handlePlayerTurnEnd = (name) => {
    const activePlayers = gamers.filter(g => g.joined && g.playing);
    let nextPlayerIndex = activePlayers.findIndex(g => g.name === name) + 1;
    if (nextPlayerIndex >= activePlayers.length) {
      nextPlayerIndex = 0;
    }
    setGamers((currentGamers) => currentGamers.map(gamer => ({
      ...gamer,
      isTurn: gamer.name === activePlayers[nextPlayerIndex].name
    })));
  };
  
  
  const handleEnd = (gamers) => {
    setIsGameActive(false);

    const updatedLeaderboard = gamers
      .map((g) => ({
        name: g.name,
        bestScore: Math.min(...g.games, Infinity),
      }))
      .sort((a, b) => a.bestScore - b.bestScore)
      .slice(0, 3);
    setLeaderboard(updatedLeaderboard);
  };

  const handleQuitPlayer = (name) => {
    setGamers((prevGamers) => {
      const updatedGamers = prevGamers.map((g) =>
        g.name === name ? { ...g, playing: false } : g
      );
      localStorage.setItem('gamers', JSON.stringify(updatedGamers));
      return updatedGamers;
    });
  };

  const handleJoinLeave = (name, joinStatus) => {
    setGamers((prevGamers) => {
      const updatedGamers = prevGamers.map((g) => 
        g.name === name ? { ...g, joined: joinStatus } : g
      );
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
          { !isGameActive && (
              <button
                className="green-button"
                onClick={handleStartGame}
              >
                Start Game
              </button>
            )}

        </div>
      </div>

      <div className="game-container">
        <div className="game-cell-container">
          {gamers.filter((g) => g.playing).map((g, i) => (
            <GameCell
              key={i}
              gamer={g}
              isGameActive={isGameActive}
              handleQuitPlayer={handleQuitPlayer}
              handleEnd={handleEnd}
              handleJoinLeave={handleJoinLeave}
              handlePlayerTurnEnd={handlePlayerTurnEnd}
              isPlaying={g.playing} 
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