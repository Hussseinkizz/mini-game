import {
  css,
  getRef,
  html,
  reactive,
  useEffect,
  useState,
} from '../z-js-framework/dist/z.js';
import { Header } from '../components/header.js';
import { Board } from '../components/board.js';

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
  const [backgroundMusic, setBackgroundMusic] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  let UI = html`
    <main class="flex container">
      ${Header(score, setIsPlaying)}
      <section class="flex">
        <div class="${ruleStyles} mobile:hidden">
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
            <h6 class="flex-row">
              Project On Github:
              <a href="https://github.com/Hussseinkizz/mini-game"> Mini Game</a>
            </h6>
          </div>
        </div>
        ${Board(score, setScore, setBackgroundMusic, isPlaying)}
      </section>
      <audio loop id="audioPlayer" style="display: none" ref="audioPlayer">
        <source
          src="../public/music/mixkit-game-level-music-689.wav"
          type="audio/wav" />
      </audio>
      <audio id="tapAudioPlayer" style="display: none" ref="tapAudioPlayer">
        <source
          src="../public/music/mixkit-player-jumping-in-a-video-game-2043.wav"
          type="audio/wav" />
      </audio>
    </main>
  `;

  const playMusic = () => {
    let audioPlayer = getRef('audioPlayer');
    if (backgroundMusic.current()) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  };

  const playTapMusic = () => {
    let tapAudioPlayer = getRef('tapAudioPlayer');
    tapAudioPlayer.play();
  };

  useEffect(() => {
    playMusic();
  }, [backgroundMusic]);

  useEffect(() => {
    playTapMusic();
  }, [score]);

  return reactive(() => UI);
}
