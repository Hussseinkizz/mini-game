import { css, html, reactive } from '../z-js-framework/dist/z.js';

const headerStyles = css`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: green;
  color: #fff;
  padding: 1rem;
  border-radius: 6px;
`;

const stopButtonStyles = css`
  margin-right: 1rem;
  border: 2px solid #fff;
  border-radius: 10px;
  padding: 0.25rem 0.5rem;
  margin-top: 1rem;
  color: #fff;
  background: #6b7b12;
  &:hover {
    background: #454f0e;
    color: #fff;
  }
  &:active {
    transform: scale(0.9);
  }
`;

export const Header = (score, setIsPlaying) => {
  let stopGameButton = html`<button
    class="${stopButtonStyles}"
    onClick="${() => setIsPlaying(false)}">
    Pause Game
  </button>`;

  let header = () => html`
    <header class="${headerStyles}">
      <h1 class="medium:visible">🤓 Whack A Mole!</h1>
      <h1 class="medium:hidden">🤓</h1>
      <div class="flex-row items-center nowrap">
        ${stopGameButton}
        <h2>
          Score:
          <span class="score">${score}</span>
        </h2>
      </div>
    </header>
  `;

  return reactive(header);
};
