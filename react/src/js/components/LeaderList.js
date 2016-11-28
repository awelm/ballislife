import React from "react";
import { Link } from 'react-router';

export default class LeaderList extends React.Component {
  render() {
    const { leaderList, stat } = this.props;

    const abbrv = {
      'pts': 'Points',
      'blk': 'Blocks',
      'reb': 'Rebounds',
      'ast': 'Assists',
      'fgp': 'Field Goal %',
      'ftp': 'Free Throw %',
      'fg3p': 'Three Point %',
      'stl': 'Steals'
    }
    let title = abbrv[stat];

    const curLeaders = leaderList.map((player, i) => {
      return <li key={player}> <Link to={`/players/${player[2]}`}>{ player[2] } </Link> <span class="pull-right"><strong>{ player[6] }</strong></span></li>
    });

    return (
      <div class="col-md-3">
        <div class="list-container">
          <h2 class="list-title">{ title }</h2>
          <ol class="list">
            { curLeaders }
          </ol>
        </div>
      </div>
    );
  }
}
