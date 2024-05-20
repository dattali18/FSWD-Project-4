import { useState } from "react"

import GameCell from "../../components/gameCell/gameCell"

export default function Game() {
    const [gamer, ] = useState([{name: "Daniel Attali", state: true, random: 43}])

    return <>
        <h1>Game</h1>
        <p>Game content</p>

        <div className="game-cell">
            {gamer.map((g, i) => <GameCell key={i} name={g.name} state={g.state} random={g.random} />)}
        </div>
    </>
}