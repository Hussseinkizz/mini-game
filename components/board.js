import {
  css,
  getRef,
  html,
  reactive,
  useEffect,
  useState,
} from '../z-js-framework/dist/z.js';

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
  place-items: center;
  background: url('../public/soil.png');
  background-size: cover;
`;

const tileStyles = css`
  width: 180px;
  height: 180px;
  background: url('../public/pipe.png');
  background-size: cover;
`;

const popupStyles = css`
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #ff7979;
  font-weight: 600;
  font-size: 3rem;
  z-index: 100;
  display: none;
  & > button {
    border: 2px solid #fff;
    border-radius: 10px;
    padding: 0.5rem 1rem;
    margin-top: 1rem;
    color: #fff;
    background: #d93939;
    &:hover {
      background: #ff7979;
      color: #d93939;
    }
    &:active {
      transform: scale(0.9);
    }
  }
`;

const playButtonStyles = css`
  border: 4px solid #fff;
  border-radius: 10px;
  padding: 0.5rem 1rem;
  height: 3rem;
  width: 10rem;
  color: #fff;
  position: absolute;
  z-index: 1000;
  font-weight: 700;
  background: #3b6b38;
  &:hover {
    background: #50934c;
    color: #3b6b38;
  }
  &:active {
    transform: scale(0.9);
  }
`;

export const Board = (score, setScore, setBackgroundMusic) => {
  const [currentMoleTile, setCurrentMoleTile] = useState(null);
  const [currentPlantTile, setCurrentPlantTile] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const restartGame = () => {
    setScore(0);
    setGameOver(false);
    startGame();
    popup.style.display = 'none';
  };

  let playButton = html`<button
    class="${playButtonStyles}"
    onClick="${startGame}">
    Play
  </button>`;

  let popup = html`<div class="${popupStyles}" ref="popupRef">
    😳
    <h1>Game Over!</h1>
    <button onClick="${restartGame}">Restart</button>
  </div>`;

  let board = html`
    <section class="${boardStyles}" ref="boardElement">
      ${popup} ${playButton}
    </section>
  `;

  let _interval1 = null;
  let _interval2 = null;

  const getRandomIndex = () => {
    let index = Math.floor(Math.random() * 9);
    return index;
  };

  function endGame() {
    console.log('game over');
    setGameOver(true);
    clearInterval(_interval1);
    clearInterval(_interval2);
    let _target1 = getRef(currentMoleTile.current());
    let _target2 = getRef(currentPlantTile.current());
    _target1.style.pointerEvents = 'none';
    _target2.style.pointerEvents = 'none';
    popup.style.display = 'flex';
    setBackgroundMusic(false);
  }

  const handleScore = () => {
    console.log('score');
    setScore((current) => current + 10);
  };

  const setMole = () => {
    let mole = html`<img
      src="${'../public/monty-mole.png'}"
      class="character"
      onClick="${handleScore}" />`;

    let indexId = getRandomIndex().toString();
    if (currentMoleTile.current() === indexId) {
      indexId = getRandomIndex().toString();
    }

    if (currentMoleTile.current() && !gameOver.current()) {
      let _target = getRef(currentMoleTile.current());
      _target.innerHTML = '';
    }

    let target = board.querySelector(`[ref="${indexId}"]`);
    target.appendChild(mole);
    setCurrentMoleTile(indexId);
  };

  const setPlant = () => {
    let plant = html`<img
      src="${'../public/piranha-plant.png'}"
      class="character"
      onClick="${endGame}" />`;

    let indexId = getRandomIndex().toString();
    if (
      currentPlantTile.current() === indexId ||
      currentPlantTile.current() === currentMoleTile.current()
    ) {
      indexId = getRandomIndex().toString();
    }

    if (currentPlantTile.current() && !gameOver.current()) {
      let _target = getRef(currentPlantTile.current());
      _target.innerHTML = '';
    }

    let target = board.querySelector(`[ref="${indexId}"]`);
    target.appendChild(plant);
    setCurrentPlantTile(indexId);
  };

  function startGame() {
    _interval1 && clearInterval(_interval1); // clear any old intervals
    _interval1 = setInterval(setMole, 1000);

    _interval2 && clearInterval(_interval2);
    _interval2 = setInterval(setPlant, 1000);
    playButton.style.display = 'none';
    setBackgroundMusic(true);
  }

  function setGame(gridCount = 9, parent = null) {
    for (let i = 0; i < gridCount; i++) {
      let el = html`<div ref="${i}" class="${tileStyles}"></div>`;
      parent?.appendChild(el);
    }
  }

  useEffect(() => {
    setGame(9, board);
  }, []);

  return reactive(() => board);
};
