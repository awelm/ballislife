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
      <Route path="games" component={Games}></Route>
      <Route path="players(/:player)" component={Players}></Route>
      <Route path="stats" component={Stats}></Route>
      <Route path="teams" component={Teams}></Route>
      <Route path="top-stories" component={TopStories}></Route>
    </Route>
  </Router>,
  app
);
