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
  console.log(gamers);

  let gamer = gamers.find((g) => g.name === name);

  console.log(gamer);
  if (gamer) {
    gamers.remove(gamer);
    gamer.games.push(step);

    gamers.push(gamer);
  }

  console.log(gamers);

  localStorage.setItem("gamers", JSON.stringify(gamers));
}

export { saveGamers, saveGamer, getGamers, updateGamer };