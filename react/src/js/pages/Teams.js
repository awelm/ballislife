import React from 'react';
import * as TeamActions from '../actions/TeamActions';
import TeamStore from '../stores/TeamStore';

export default class Teams extends React.Component {
	constructor(props) {
		super(props);
		this.handleUserInput = this.handleUserInput.bind(this); 
		this.getNewTeam = this.getNewTeam.bind(this);
		this.state = {
			team: "hawks",
			team_info: {},
			team_roster: {},
			team_news: {},
			team_picture: "http://stats.nba.com/media/img/teams/logos/ATL_logo.svg",
			roster_pictures: {}
		}

	}

	componentWillMount() {
		TeamStore.on("change", this.getNewTeam);
	}

	componentWillUnmount() {
		TeamStore.removeListener("change", this.getNewTeam); 
	}

	handleUserInput(new_team) {
		this.setState({
			team: new_team
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
				<SearchBar pic={this.state.team_picture} onUserInput={this.handleUserInput} team={this.state.team} /> 
				<TeamDetails info={this.state.team_info} />
				<Roster />
				<TeamNews /> 
			</div> 
		);
	}
}

class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleChange = this.handleChange.bind(this);
	}

	handleChange(event) {
		this.props.onUserInput(event.target.value);
		TeamActions.getTeamInfo(event.target.value);
		TeamActions.getTeamPicture(event.target.value);
	}

	render() {
		console.log(this.props.pic);
		// TeamActions.getTeamInfo("hawks");
		/*
		TeamActions.getTeamInfo();
		TeamActions.getTeamRoster();
		TeamActions.getTeamNews();
		TeamActions.getPlayerNews("Stephen Curry");
		TeamActions.getTeamPicture();
		TeamActions.getPlayerPicture("Stephen Curry");
		*/
		return (
			<div className="col-md-3">
			  <form> 
			  <fieldset class="fieldset"> 
			  	<legend> Choose a team: </legend>
				    <label>
					    <select value={this.props.team} onChange={this.handleChange} class="form-control" id="team-select">
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
							<option value ="trail blazers">Portland Trail Blazers</option>
							<option value ="kings">Sacramento Kings</option>
							<option value ="spurs">San Antonio Spurs</option>
							<option value ="raptors">Toronto Raptors</option>
							<option value ="jazz">Utah Jazz</option>
				    	</select>
				    </label> 
				    <img class="img-responsive" src={this.props.pic} />
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
	render() {
		return (
			<div class="col-md-9">
				<h1>Team Roster</h1> 
			</div>
		);

	}
}

class TeamNews extends React.Component {
	render() {
		return (
			<div class="col-md-9">
				<h1>Team News</h1> 
			</div>
		);
	}
}
