import React from "react"

export default function NewGameButton({onClick}){
    return(
        <>
            <button className="new-game-button" onClick={onClick} >New Game</button>
        </>
    )
}