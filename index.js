'use strict';

import { render } from './z-js-framework';
import Home from './pages/home';

const root = document.getElementById('root');

// define your routes here
const routes = [
  {
    route: '/',
    component: Home,
  },
];

render(root, routes);
