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
      <Route path="games" component={Games} />
      <Route path="players(/:player)" component={Players} />
      <Route path="stats" component={Stats} />
      <Route path="teams" component={Teams} />
      <Route path="top-stories" component={TopStories} />
      <IndexRoute component={Home}/>
<<<<<<< HEAD
      <Route path="games" name="games" component={Games}></Route>
      <Route path="players" name="players" component={Players}></Route>
      <Route path="stats" name="stats" component={Stats}></Route>
      <Route path="teams" name="teams" component={Teams}></Route>
      <Route path="top-stories" name="topStories" component={TopStories}></Route>
=======
>>>>>>> f1f4b30f8ed46d573629bbf54fa8f6cb6174731d
    </Route>
  </Router>,
  app
);
