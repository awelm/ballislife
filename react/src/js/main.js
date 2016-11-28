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
import Login from './pages/Login';
import Logout from './pages/Logout';

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
      <Route path="login" name="login" component={Login}></Route>
      <Route path="logout" name="logout" component={Logout}></Route>
    </Route>
  </Router>,
  app
);
