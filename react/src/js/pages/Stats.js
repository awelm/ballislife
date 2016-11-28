import React from 'react';
import { Bar } from 'react-chartjs-2';

import * as StatsActions from '../actions/StatsActions';
import StatsStore from '../stores/StatsStore';

import Image from "../components/Image";
import LeaderList from "../components/LeaderList"


export default class Stats extends React.Component {
  constructor() {
    super();
    this.getLeaders = this.getLeaders.bind(this);
    this.state = {
      curLeaders: StatsStore.getCurLeaders(),
      allTimeLeaders: StatsStore.getAllTimeLeaders()
    }
  }

  componentWillMount() {
    StatsStore.on("change", this.getLeaders);
    StatsActions.getAllLeaders();
  }

  componentWillUnmount() {
    StatsStore.removeListener("change", this.getLeaders);
  }

  getLeaders() {
    this.setState({
      curLeaders: StatsStore.getCurLeaders(),
      allTimeLeaders: StatsStore.getAllTimeLeaders()
    });
  }

  render() {
    /* Const values for now */
    const Images = [
      "http://thesource.com/wp-content/uploads/2015/03/James-Harden1.jpg",
      "http://www.knbr.com/wp-content/uploads/sites/82/2015/11/CURRY-PROF.jpg",
      "http://nutsandboltssports.com/wp-content/uploads/2016/10/westbrook.jpg"
    ].map((img_url, i) => <Image key={i} img_url={img_url} />);

    const { curLeaders, allTimeLeaders } = this.state;

    const curLeadersPts = curLeaders['pts'];
    const curLeadersReb = curLeaders['reb'];
    const curLeadersAst = curLeaders['ast'];
    const curLeadersFgp = curLeaders['fgp'].map((player, i) => {
      return <p key={i}>{player[2]} - {player[6]}</p>
    });
    const curLeadersFtp = curLeaders['ftp'].map((player, i) => {
      return <p key={i}>{player[2]} - {player[6]}</p>
    });
    const curLeadersFg3p = curLeaders['fg3p'].map((player, i) => {
      return <p key={i}>{player[2]} - {player[6]}</p>
    });
    const curLeadersStl = curLeaders['stl'].map((player, i) => {
      return <p key={i}>{player[2]} - {player[6]}</p>
    });
    const curLeadersBlk = curLeaders['blk'].map((player, i) => {
      return <p key={i}>{player[2]} - {player[6]}</p>
    });

    return (
      <div class="container">
        <h1>Current Leaders</h1>
          <div class="row">
            {Images}
          </div>
          <div class="row">
            <LeaderList leaderList={curLeaders['pts']} stat='pts' />
            <LeaderList leaderList={curLeaders['reb']} stat='reb' />
            <LeaderList leaderList={curLeaders['ast']} stat='ast' />
            <LeaderList leaderList={curLeaders['fgp']} stat='fgp' />
            <LeaderList leaderList={curLeaders['ftp']} stat='ftp' />
            <LeaderList leaderList={curLeaders['fg3p']} stat='fg3p' />
            <LeaderList leaderList={curLeaders['stl']} stat='stl' />
            <LeaderList leaderList={curLeaders['blk']} stat='blk' />

          </div>
      </div>
      );
  }
}
