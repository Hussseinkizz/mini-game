'use strict';

import { render } from './z-js-framework/dist/z.js';
import Home from './pages/home.js';

const root = document.getElementById('root');

// define your routes here
const routes = [
  {
    route: '/',
    component: Home,
  },
];

render(root, routes);
