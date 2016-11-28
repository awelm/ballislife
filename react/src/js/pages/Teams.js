import React from 'react';
import * as TeamActions from '../actions/TeamActions';
import TeamStore from '../stores/TeamStore';
import { Link } from 'react-router';
import * as PlayerActions from "../actions/PlayerActions";
import PlayerStore from "../stores/PlayerStore";

export default class Teams extends React.Component {
	constructor(props) {
		super(props);
		this.handleTeamInput = this.handleTeamInput.bind(this);
		this.handleYearInput = this.handleYearInput.bind(this); 
		this.getNewTeam = this.getNewTeam.bind(this);
		this.state = {
			team: "hawks",
			year: "2016-17",
			team_info: {},
			team_roster: [],
			team_news: {},
			team_picture: "http://i.ytimg.com/vi/uzPgP3XXDhg/maxresdefault.jpg",
			roster_pictures: []
		}
	}

	componentWillMount() {
		TeamStore.on("change", this.getNewTeam);
		TeamActions.getTeamInfo(this.state.team);
		TeamActions.getTeamPicture(this.state.team);
		TeamActions.getTeamRoster(this.state.team);
	}

	componentWillUnmount() {
		TeamStore.removeListener("change", this.getNewTeam);
	}

	handleTeamInput(new_team) {
		this.setState({
			team: new_team
		});
	}

	handleYearInput(new_year) {
		this.setState({
			year: new_year
		});
	}

	getNewTeam() {
		this.setState({
			team_info: TeamStore.getTeamInfo(),
			team_roster: TeamStore.getTeamRoster(),
			team_news: TeamStore.getTeamNews(),
			team_picture: TeamStore.getTeamPicture(),
			roster_pictures: TeamStore.getRosterPictures()
		});
	}

	render() {
		return (
			<div class="row">
				<SearchBar pic={this.state.team_picture} onTeamInput={this.handleTeamInput} 
				onYearInput={this.handleYearInput} team={this.state.team} year={this.state.year} />
				<TeamDetails info={this.state.team_info} />
				<Roster roster={this.state.team_roster} />
			</div>
		);
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleTeamChange = this.handleTeamChange.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);
	}

	handleTeamChange(event) {
		this.props.onTeamInput(event.target.value);
		TeamActions.getTeamInfo(event.target.value, this.props.year);
		TeamActions.getTeamPicture(event.target.value);
		TeamActions.getTeamRoster(event.target.value, this.props.year);
	}

	handleYearChange(event) {
		this.props.onYearInput(event.target.value);
		TeamActions.getTeamInfo(this.props.team, event.target.value);
		TeamActions.getTeamRoster(this.props.team, event.target.value);
	}

	render() {
		return (
			<div className="col-md-3">
			  <form>
			  <fieldset class="fieldset">
			  	<legend> Choose a team: </legend>
				    <label>
					    <select value={this.props.team} onChange={this.handleTeamChange} class="form-control" id="team-select">
					    	<option value ="hawks">Atlanta Hawks</option>
							<option value ="celtics">Boston Celtics</option>
							<option value ="nets">Brooklyn Nets</option>
							<option value ="hornets">Charlotte Hornets</option>
							<option value ="bulls">Chicago Bulls</option>
							<option value ="cavaliers">Cleveland Cavaliers</option>
							<option value ="mavericks">Dallas Mavericks</option>
							<option value ="nuggets">Denver Nuggets</option>
							<option value ="pistons">Detroit Pistons</option>
							<option value ="warriors">Golden State Warriors</option>
							<option value ="rockets">Houston Rockets</option>
							<option value ="pacers">Indiana Pacers</option>
							<option value ="clippers">LA Clippers</option>
							<option value ="lakers">Los Angeles Lakers</option>
							<option value ="grizzlies">Memphis Grizzlies</option>
							<option value ="heat">Miami Heat</option>
							<option value ="bucks">Milwaukee Bucks</option>
							<option value ="timberwolves">Minnesota Timberwolves</option>
							<option value ="pelicans">New Orleans Pelicans</option>
							<option value ="knicks">New York Knicks</option>
							<option value ="thunder">Oklahoma City Thunder</option>
							<option value ="magic">Orlando Magic</option>
							<option value ="76ers">Philadelphia 76ers</option>
							<option value ="suns">Phoenix Suns</option>
							<option value ="blazers">Portland Trail Blazers</option>
							<option value ="kings">Sacramento Kings</option>
							<option value ="spurs">San Antonio Spurs</option>
							<option value ="raptors">Toronto Raptors</option>
							<option value ="jazz">Utah Jazz</option>
				    	</select>
				    </label>
				    <img class="img-responsive" src={this.props.pic} />
			  </fieldset>
			  </form>
			  <form>
			  <fieldset class="fieldset">
			  	<legend> Choose a year: </legend>
				    <label>
					    <select value={this.props.year} onChange={this.handleYearChange} class="form-control" id="year-select">
					    	<option value ="2016-17">2016-17</option>
							<option value ="2015-16">2015-16</option>
							<option value ="2014-15">2014-15</option>
							<option value ="2013-14">2013-14</option>
							<option value ="2012-13">2012-13</option>
							<option value ="2011-12">2011-12</option>
							<option value ="2010-11">2010-11</option>
							<option value ="2009-10">2009-10</option>
							<option value ="2008-09">2008-09</option>
							<option value ="2007-08">2007-08</option>
							<option value ="2006-07">2006-07</option>
							<option value ="2005-06">2005-06</option>
							<option value ="2004-05">2004-05</option>
							<option value ="2003-04">2003-04</option>
							<option value ="2002-03">2002-03</option>
							<option value ="2001-02">2001-02</option>
							<option value ="2000-01">2000-01</option>
							<option value ="1999-00">1999-00</option>
							<option value ="1998-99">1998-99</option>
							<option value ="1997-98">1997-98</option>
							<option value ="1996-97">1996-97</option>
							<option value ="1995-96">1995-96</option>
							<option value ="1994-95">1994-95</option>
							<option value ="1993-94">1993-94</option>
							<option value ="1992-93">1992-93</option>
							<option value ="1991-92">1991-92</option>
							<option value ="1990-91">1990-91</option>
							<option value ="1989-90">1989-90</option>
							<option value ="1988-89">1988-89</option>
							<option value ="1987-88">1987-88</option>
							<option value ="1986-87">1986-87</option>
							<option value ="1985-86">1985-86</option>
							<option value ="1984-85">1984-85</option>
							<option value ="1983-84">1983-84</option>
							<option value ="1982-83">1982-83</option>
							<option value ="1981-82">1981-82</option>
							<option value ="1980-81">1980-81</option>
				    	</select>
				    </label>
			  </fieldset>
			  </form>
        	</div>
		);
	}
}

class TeamDetails extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const info = this.props.info;
		// console.log(info);
		var headers = [];
		var data = [];
		for (var stat in info) {
			headers.push(<th key={stat} >{stat}</th>);
			data.push(<th key={stat} >{info[stat]}</th>);
		}
		return (
			<div class="col-md-9">
				<h1>Team Statistics Breakdown</h1>
				<table className="table table-striped">
					<thead>
						<tr>
							{headers}
						</tr>
					</thead>
					<tbody>
						<tr>
							{data}
						</tr>
					</tbody>
				</table>
			</div>
		);
	}
}

class Roster extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const roster = this.props.roster;
		const profiles = [];
		for(var i = 0; i < roster.length; i++) {
			let tmp = (<PlayerProfile key={i} player={roster[i]} />);
			profiles.push(tmp);
		}
		return (
			<div class="col-md-9">
				<h1>Team Roster</h1>
				{profiles}
			</div>
		);

	}
}

class PlayerProfile extends React.Component {
	constructor(props) {
		super(props);
	}

	render() {
		const player = this.props.player;
		const profileStyle= {
			height: "400px"
		}
		const imgStyle = {
			borderStyle: "solid",
		};
		return (
			<div style={profileStyle} class="col-md-4">
				<div style={imgStyle}> 
					<img src={player['Picture']} /> 
				</div>
				<Link to={`/players/${player['Name']}`} ><h4>{player['Name']}</h4></Link>
				<h4>Age: {player['Age']}</h4> 
				<h4>Position: {player['Position']}</h4>
				<h4>Height: {player['Height']}</h4>
				<h4>Weight: {player['Weight']} lbs</h4>
				<h4>Years in NBA: {player['Years in NBA']}</h4>
			</div>
		);
	}
}

/*
class TeamNews extends React.Component {
	render() {
		return (
			<div class="col-md-9">
				<h1>Team News</h1>
			</div>
		);
	}
}
*/
