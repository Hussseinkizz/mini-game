import { css, html, reactive } from '../z-js-framework';

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

export const Header = (score) => {
  let header = () => html`
    <header class="${headerStyles}">
      <h1>🤓 Whack A Mole!</h1>
      <h2>
        Score:
        <span class="score">${score}</span>
      </h2>
    </header>
  `;

  return reactive(header);
};
