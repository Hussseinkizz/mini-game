import { html } from 'z-js-framework';
import { Header } from '../components/header';
import { Board } from '../components/board';

export default function Home() {
  let UI = html` <main class="flex container">${Header()} ${Board()}</main> `;

  return UI;
}
