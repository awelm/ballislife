import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './components/Layout';

import Games from './pages/Games';
import Home from './pages/Home';
import Players from './pages/Players';
import Stats from './pages/Stats';
import Teams from './pages/Teams';
import TopStories from './pages/TopStories';

const app = document.getElementById('app');

ReactDOM.render(
  <Router history={hashHistory}>
    <Route path="/" component={Layout}>
      <IndexRoute component={Home} />
      <Route path="games" name="games" component={Games} />
      <Route path="players(/:player)" name="players" component={Players} />
      <Route path="stats" name="stats" component={Stats} />
      <Route path="teams" name="teams" component={Teams} />
      <Route path="top-stories" name="topStories" component={TopStories} />
    </Route>
  </Router>,
  app
);
