import { css, getRef, html, useEffect, useState } from 'z-js-framework';
import { scoreStore } from '../store';

const boardStyles = css`
  width: 540px;
  height: 540px;
  background: green;
  border: 4px solid #fff;
  border-radius: 10px;
  margin-inline: auto;
  position: relative;
  overflow: hidden;
  display: grid;
  margin-top: 2rem;
  grid-template-columns: repeat(3, 1fr);
  background: url('../public/soil.png');
  background-size: cover;
`;

const tileStyles = css`
  width: 180px;
  height: 180px;
  background: url('../public/pipe.png');
  background-size: cover;
`;

export const Board = () => {
  const [currentMoleTile, setCurrentMoleTile] = useState(null);
  const [currentPlantTile, setCurrentPlantTile] = useState(null);
  const [score, setScore] = useState(scoreStore);

  const setGame = (gridCount = 9, parent = null) => {
    for (let i = 0; i < gridCount; i++) {
      let el = html`<div ref="${i}" class="${tileStyles}"></div>`;
      parent?.appendChild(el);
    }

    startGame();
  };

  const getRandomIndex = () => {
    let index = Math.floor(Math.random() * 9);
    return index;
  };

  const setMole = () => {
    let mole = html`<img
      src="${'../public/monty-mole.png'}"
      onClick="${() => setScore((current) => current + 10)}" />`;

    let indexId = getRandomIndex().toString();

    if (currentMoleTile.current()) {
      let _target = getRef(currentMoleTile.current());
      _target.innerHTML = '';
    }
    if (currentMoleTile.current() === indexId) {
      return;
    }
    let target = getRef(indexId);
    target.appendChild(mole);
    setCurrentMoleTile(indexId);
  };

  const startGame = () => {
    setInterval(setMole, 1000);
    setInterval(setPlant, 1000);
  };

  const setPlant = () => {
    let plant = html`<img src="${'../public/piranha-plant.png'}" />`;
    let indexId = getRandomIndex().toString();
    if (currentPlantTile.current()) {
      let _target = getRef(currentPlantTile.current());
      _target.innerHTML = '';
    }
    if (currentPlantTile.current() === indexId) {
      return;
    }
    let target = getRef(indexId);
    target.appendChild(plant);
    setCurrentPlantTile(indexId);
  };

  let board = html`
    <section class="${boardStyles}" ref="boardElement"></section>
  `;

  useEffect(() => {
    setGame(9, board);
  }, []);

  return board;
};
