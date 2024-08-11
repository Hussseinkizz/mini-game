import { css, html, reactive, useState } from '../z-js-framework';
import { Header } from '../components/header';
import { Board } from '../components/board';

const ruleStyles = css`
  width: 350px;
  height: 540px;
  border: 4px solid #fff;
  color: #fff;
  font-weight: 600;
  background: green;
  margin-top: 1rem;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;
`;

export default function Home() {
  const [score, setScore] = useState(0);

  let UI = () => html`
    <main class="flex container">
      ${Header(score)}
      <section class="flex">
        <div class="${ruleStyles}">
          <h1>How To Play</h1>
          <p>
            Whack a mole game is so easy, tap the monty mole and gain score, tap
            the piranha plant and its game over!
          </p>
          <br />
          <br />
          <h3>🔥 Tip: Double tapping mole gives score X2</h3>
          <br />
          <br />
          <br />
          <br />
          <div class="flex-col">
            <h6>Made By Hussein Kizz</h6>
            <h6 class="flex-row">
              With 💛 Using
              <a href="https://github.com/Z-Js-Framework/z-js">
                Z Js Framework</a
              >
            </h6>
          </div>
        </div>
        ${Board(score, setScore)}
      </section>
    </main>
  `;

  return reactive(UI);
}
