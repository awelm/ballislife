import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

import Layout from './pages/Layout';

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
      <IndexRoute component={Home}/>
      <Route path="games" name="games" component={Games}></Route>
      <Route path="players" name="players" component={Players}></Route>
      <Route path="stats" name="stats" component={Stats}></Route>
      <Route path="teams" name="teams" component={Teams}></Route>
      <Route path="top-stories" name="topStories" component={TopStories}></Route>
    </Route>
  </Router>,
  app
);
