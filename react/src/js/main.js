import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './components/Layout';

import Games from './pages/Games';
import Players from './pages/Players';
import Stats from './pages/Stats';
import Teams from './pages/Teams';
import TopStories from './pages/TopStories';

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <Route path="games" component={Games} />
      <Route path="players(/:player)" component={Players} />
      <Route path="stats" component={Stats} />
      <Route path="teams" component={Teams} />
      <Route path="top-stories" component={TopStories} />
    </Route>
  </Router>,
  app
);
