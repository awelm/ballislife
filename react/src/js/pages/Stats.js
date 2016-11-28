import React from 'react';
import { Bar } from 'react-chartjs-2';

import * as StatsActions from '../actions/StatsActions';
import StatsStore from '../stores/StatsStore';

import Image from "../components/Image";
import LeaderList from "../components/LeaderList"

var Loader = require('react-loader');

export default class Stats extends React.Component {
  constructor() {
    super();
    this.getLeaders = this.getLeaders.bind(this);
    this.getSeasonLeaders = this.getSeasonLeaders.bind(this);
    this.handleSeasonInput = this.handleSeasonInput.bind(this);
    this.state = {
      loaded: false,
      seasonLoaded: true,
      curLeaders: StatsStore.getCurLeaders(),
      season: "2015-16",
      seasonInfo: StatsStore.getSeasonLeaders(),
      curLeadersPics: StatsStore.getCurLeadersPics()
    }
  }

  componentWillMount() {
    StatsStore.on("change", this.getLeaders);
    StatsStore.on("changeSeason", this.getSeasonLeaders);
    StatsStore.on("changePics", this.getCurLeadersPics);
    StatsActions.getAllLeaders();
    StatsActions.getSeasonLeaders(this.state.season);
  }

  componentWillUnmount() {
    StatsStore.removeListener("change", this.getLeaders);
    StatsStore.removeListener("changeSeason", this.getSeasonLeaders);
  }

  getLeaders() {
    this.setState({
      curLeaders: StatsStore.getCurLeaders(),
      loaded: true
    });
  }

  getCurLeadersPics() {
    this.setState({
      curLeadersPics: StatsStore.getCurLeadersPics(),
    });
  }

  getSeasonLeaders() {
    // console.log('getting season leaders');
    this.setState({
      seasonInfo: StatsStore.getSeasonLeaders(),
      seasonLoaded: true
    });
  }

  handleSeasonInput(season) {
    // console.log('handling season input');
    this.setState({
      seasonLoaded: false,
      season: season
    });
  }

  render() {
    const { curLeaders, seasonInfo,curLeadersPics } = this.state;

    /* Const values for now */
    /*
    const Images = [
      "http://thesource.com/wp-content/uploads/2015/03/James-Harden1.jpg",
      "http://www.knbr.com/wp-content/uploads/sites/82/2015/11/CURRY-PROF.jpg",
      "http://nutsandboltssports.com/wp-content/uploads/2016/10/westbrook.jpg"
    ].map((img_url, i) => <Image key={i} img_url={img_url} />);
    */
    const leaderPics = curLeadersPics.map((img_url, i) => <Image key={i} img_url={img_url} />);


    return (
      <Loader loaded={this.state.loaded}>
        <div class="container">
          <h1>Current Leaders</h1>
          <div class="row">
            <div class="col-md-12">
              <img class="img-responsive" src="http://www.hdwallpapersnews.com/wp-content/uploads/2015/03/Russell-Westbrook-HD-Wallpapers.jpg"/>
            </div>
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

          <hr class="spacer" />
          <h1>Past Leaders</h1>
          <SearchBar onSeasonInput={this.handleSeasonInput} season={this.state.season} />
          <div class="row">
            <Loader loaded={this.state.seasonLoaded}>
              <LeaderList leaderList={seasonInfo['pts']} stat='pts' />
              <LeaderList leaderList={seasonInfo['reb']} stat='reb' />
              <LeaderList leaderList={seasonInfo['ast']} stat='ast' />
              <LeaderList leaderList={seasonInfo['fgp']} stat='fgp' />
              <LeaderList leaderList={seasonInfo['ftp']} stat='ftp' />
              <LeaderList leaderList={seasonInfo['fg3p']} stat='fg3p' />
              <LeaderList leaderList={seasonInfo['stl']} stat='stl' />
              <LeaderList leaderList={seasonInfo['blk']} stat='blk' />
            </Loader>
          </div>
        </div>
      </Loader>
      );
  }
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleSeasonChange = this.handleSeasonChange.bind(this);
	}

	handleSeasonChange(event) {
		this.props.onSeasonInput(event.target.value);
    console.log(event.target.value);
    StatsActions.getSeasonLeaders(event.target.value);
	}

	render() {
		return (
      <div class="row">
        <div class="col-md-12">
  		    <form>
    			  <fieldset class="fieldset">
    			  	<legend class="season-legend">Choose a Season:</legend>
    				    <label>
    					    <select value={this.props.season} onChange={this.handleSeasonChange} class="form-control" id="season-select">
      							<option value="2015-16">2015-16</option>
      							<option value="2014-15">2014-15</option>
      							<option value="2013-14">2013-14</option>
      							<option value="2012-13">2012-13</option>
      							<option value="2011-12">2011-12</option>
      							<option value="2010-11">2010-11</option>
      							<option value="2009-10">2009-10</option>
      							<option value="2008-09">2008-09</option>
      							<option value="2007-08">2007-08</option>
      							<option value="2006-07">2006-07</option>
      							<option value="2005-06">2005-06</option>
      							<option value="2004-05">2004-05</option>
      							<option value="2003-04">2003-04</option>
      							<option value="2002-03">2002-03</option>
      							<option value="2001-02">2001-02</option>
      							<option value="2000-01">2000-01</option>
      							<option value="1999-00">1999-00</option>
      							<option value="1998-99">1998-99</option>
      							<option value="1997-98">1997-98</option>
      							<option value="1996-97">1996-97</option>
    				    	</select>
    				    </label>
    			  </fieldset>
  			  </form>
        </div>
      </div>
		);
	}
}
