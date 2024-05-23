function saveGamers(gamers) {
  localStorage.setItem("gamers", JSON.stringify(gamers));
}

function saveGamer(gamer) {
  let gamers = JSON.parse(localStorage.getItem("gamers")) || [];
  gamers.push(gamer);
  localStorage.setItem("gamers", JSON.stringify(gamers));
}


function getGamers() {
  const gamers = localStorage.getItem("gamers");
  return JSON.parse(gamers) || [];
}

function updateGamer(name, step) {
  let gamers = JSON.parse(localStorage.getItem("gamers")) || [];

  // let gamer = gamers.find((g) => g.name === name);
  let gamer = gamers.find((g) => g.name === name);

  if (gamer) {
    gamer.games = [...gamer.games, step];
  } else {
    gamers.push({ name, step });
  }

  localStorage.setItem("gamers", JSON.stringify(gamers));
}

export { saveGamers, saveGamer, getGamers, updateGamer };