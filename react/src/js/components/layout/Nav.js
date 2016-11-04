import React from 'react';
import { Link, IndexLink } from 'react-router';

export default class Nav extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default">
        <div className="container-fluid">
          <div className="navbar-header">
            <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
              <span className="sr-only">Toggle navigation</span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
              <span className="icon-bar"></span>
            </button>
            <IndexLink to="/" activeClassName="active" className="navbar-brand">Ball Is Life</IndexLink>
          </div>

          <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul className="nav navbar-nav navbar-right">
              <li><Link to="games" activeClassName="active">Games</Link></li>
              <li><Link to="top-stories" activeClassName="active">Top Stories</Link></li>
              <li><Link to="stats" activeClassName="active">Stats</Link></li>
              <li><Link to="players" activeClassName="active">Players</Link></li>
              <li><Link to="teams" activeClassName="active">Teams</Link></li>
            </ul>
          </div>
      </div>
    </nav>
  );
}
}
