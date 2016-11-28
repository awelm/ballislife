import React from 'react';
import { Bar } from 'react-chartjs-2';

import * as StatsActions from '../actions/StatsActions';
import StatsStore from '../stores/StatsStore';

import Image from "../components/Image";


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

    const curLeadersPts = curLeaders['pts'].map((player, i) => {
      return <li key={i}>{player[2]} - {player[6]}</li>
    });
    const curLeadersReb = curLeaders['reb'].map((player, i) => {
      return <li key={i}>{player[2]} - {player[6]}</li>
    });
    const curLeadersAst = curLeaders['ast'].map((player, i) => {
      return <li key={i}>{player[2]} - {player[6]}</li>
    });
    const curLeadersFgp = curLeaders['fgp'].map((player, i) => {
      return <li key={i}>{player[2]} - {player[6]}</li>
    });
    const curLeadersFtp = curLeaders['ftp'].map((player, i) => {
      return <li key={i}>{player[2]} - {player[6]}</li>
    });
    const curLeadersFg3p = curLeaders['fg3p'].map((player, i) => {
      return <li key={i}>{player[2]} - {player[6]}</li>
    });
    const curLeadersStl = curLeaders['stl'].map((player, i) => {
      return <li key={i}>{player[2]} - {player[6]}</li>
    });
    const curLeadersBlk = curLeaders['blk'].map((player, i) => {
      return <li key={i}>{player[2]} - {player[6]}</li>
    });

    return (
      <div>
        <h1>2016 Statistics Leaders</h1>
          <div class="row">
            {Images}
          </div>
          <h2>Points</h2>
          <ol> 
            {curLeadersPts}
          </ol>
          <h2>Rebounds</h2>
          <ol> 
            {curLeadersReb}
          </ol> 
          <h2>Assists</h2>
          <ol> 
            {curLeadersAst}
          </ol>  
          <h2>Field Goal Percentage</h2>
          <ol> 
            {curLeadersFgp}
          </ol> 
          <h2>Free Throw Percentage</h2>
          <ol> 
            {curLeadersFtp}
          </ol> 
          <h2>3-Point Percentage</h2>
          <ol> 
            {curLeadersFg3p}
          </ol> 
          <h2>Steals</h2>
          <ol> 
            {curLeadersStl}
          </ol> 
          <h2>Blocks</h2>
          <ol> 
            {curLeadersBlk}
          </ol>   
      </div>
      );
  }
}
