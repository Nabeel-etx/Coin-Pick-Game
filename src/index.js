import React, { useState } from "react";
import ReactDOM from "react-dom";
import Gold from "../src/Gold.png";
import "./styles.scss";

function App() {
  const array = [1, 2, 3, 4, 5];
  const utils = {
    range: (min, max) =>
      Array.from({ length: max - min + 1 }, (_, i) => min + i),
    random: (min, max) => min + Math.floor(Math.random() * (max - min + 1))
  };
  const [playerA, setplayerA] = useState(true);
  const [playerB, setPlayerB] = useState(false);
  const [gold, setGold] = useState(utils.random(10, 50));

  const gameState = gold <= 0 ? "end" : "active";

  const clickHandler = number => {
    setGold(gold - number);

    if (gameState === "end") {
      return;
    }
    if (gameState === "active") {
      setplayerA(!playerA);
      setPlayerB(!playerB);
    }
  };

  const resetGame = () => {
    setGold(utils.random(10, 50));
    setplayerA(true);
    setPlayerB(false);
  };

  const colorstate = {
    colorA: playerA ? "light" : "dark",
    colorB: playerB ? "light" : "dark"
  };

  const PlayAgain = props => (
    <div className="game-done">
      <div className="message">
        {props.gameState === "end" ? "Game Over!" : "Nada"}
      </div>
      <button className="playagain" onClick={props.resetGame}>
        Play Again
      </button>
    </div>
  );
  const PlayNumber = props => (
    <button className="numbers" onClick={() => props.onClick(props.number)}>
      {props.number}
    </button>
  );
  return (
    <div className="App">
      <div className="outer">
        <h1>Coin-Game</h1>
        <h3>Last to pick loses!</h3>
        <div className="logo">
          <img src={Gold} alt="gold-img" />
        </div>
        {gameState === "end" ? (
          <PlayAgain gameState={gameState} resetGame={resetGame} />
        ) : (
          <div>
            <button className="gold">{gold}</button>
          </div>
        )}
        <div className="players">
          <button className={`color ${colorstate.colorA}`}>A</button>

          {array.map(number => (
            <PlayNumber key={number} number={number} onClick={clickHandler} />
          ))}

          <button className={`color ${colorstate.colorB}`}>B</button>
        </div>
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
