import React from 'react';
import * as GameActions from '../actions/GameActions';
import GameStore from '../stores/GameStore';

export default class Games extends React.Component {
	constructor() {
		super();
		this.handleMonthInput = this.handleMonthInput.bind(this);
		this.handleDayInput = this.handleDayInput.bind(this);
		this.handleYearInput = this.handleYearInput.bind(this); 
		this.getNewGames = this.getNewGames.bind(this); 
		this.state = {
			month: "1",
			day: "1",
			year: "2014",
			games: {},
			scores: [],
			team_pics: []
		}
	}

	componentWillMount() {
		GameStore.on("change", this.getNewGames);
	}

	componentWillUnmount() {
		GameStore.removeListener("change", this.getNewGames);
	}

	handleMonthInput(new_month) {
		this.setState({
			month: new_month
		})
	}

	handleDayInput(new_day) {
		this.setState({
			day: new_day
		})
	}

	handleYearInput(new_year) {
		this.setState({
			year: new_year
		})
	}

	getNewGames() {
		this.setState({
			games: GameStore.getGamesForDay(),
			scores: GameStore.getBoxScores(),
			team_pics: GameStore.getTeamPics()
		});
	}

	render() {
		/*
		const month = "11";
		const day = "25";
		const year = "2016";
		GameActions.getGames(`${year}-${month}-${day}`);
		*/
		return (
			<div className="row">
				<h1>Games</h1>
				<SearchBar month={this.state.month}
						   day={this.state.day}
						   year={this.state.year}
						   games={this.state.games}
						   onMonthInput={this.handleMonthInput}
						   onDayInput={this.handleDayInput}
						   onYearInput={this.handleYearInput} />
				<GameDisplay games={this.state.games}
							 scores={this.state.scores} 
							 team_pics={this.state.team_pics} />
			</div> 
		);
	}
}

/* Beware of the very similar function names between
 * GameStore and GameActions
 */ 
class SearchBar extends React.Component {
	constructor(props) {
		super(props);
		this.handleMonthChange = this.handleMonthChange.bind(this);
		this.handleDayChange = this.handleDayChange.bind(this);
		this.handleYearChange = this.handleYearChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this); 
	}

	handleMonthChange(event) {
		this.props.onMonthInput(event.target.value);
		GameActions.getGames(`${this.props.year}-${event.target.value}-${this.props.day}`);
	}

	handleDayChange(event) {
		this.props.onDayInput(event.target.value);
		GameActions.getGames(`${this.props.year}-${this.props.month}-${event.target.value}`);
	}

	handleYearChange(event) {
		this.props.onYearInput(event.target.value);
		GameActions.getGames(`${event.target.value}-${this.props.month}-${this.props.day}`);
	}

	handleSubmit(event) {
		// Get all box scores for the specified day 
		const games = this.props.games; 
		for(var matchup in games) {
			GameActions.getBoxScore(`${this.props.year}-${this.props.month}-${this.props.day}`, games[matchup]['team_one'], games[matchup]['team_two']);
			GameActions.getTeamPicture(games[matchup]['team_one']);
			GameActions.getTeamPicture(games[matchup]['team_two']);
		}
		// console.log(games);
	}
	render() {
		var months = [];
		var days = [];
		for(let i = 1; i <= 12; i++) {
			months.push(<option key={i} value={i}>{i}</option>);
		}
		for(let j = 1; j <= 31; j++) {
			days.push(<option key={j} value={j}>{j}</option>);
		}
		return( 
			<div className="col-md-3"> 
				<legend>Choose a date:</legend>

				<h3>Month</h3> 
				<form> 
				<fieldset class="fieldset">
						<label> 
							<select onChange={this.handleMonthChange} value={this.props.month}> 
								{months}
							</select> 
						</label>
				</fieldset> 
				</form> 

				<h3>Day</h3>
				<form> 
				<fieldset class="fieldset">
					<label> 
						<select onChange={this.handleDayChange} value={this.props.day}> 
							{days}
						</select> 
					</label>
				</fieldset> 
				</form> 

				<h3>Year</h3>
				<form> 
				<fieldset class="fieldset">
					<label> 
						<select onChange={this.handleYearChange} value={this.props.year}> 
							<option value="2014">2014</option> 
							<option value="2015">2015</option> 
							<option value="2016">2016</option> 
						</select> 
					</label>
				</fieldset> 
				</form> 
				<br></br>
				<form onSubmit={this.handleSubmit}>
					<input type="submit" value="Go!" />
				</form>
			</div>
		);
	}
}


class GameDisplay extends React.Component {
	constructor(props) {
		super(props); 
	}

	render() {
		const matchups = []
		const {games, scores, team_pics} = this.props;
		//console.log(games);
		//console.log(team_pics);
		var i = 0; 
		for (let matchup in games) {
			// Type check here 
			if (games[matchup] !== undefined) {
				let team1 = games[matchup]['team_one'];
				let team2 = games[matchup]['team_two'];
				matchups.push(<Matchup key={i} first={team1} second={team2} 
								score={scores[i]}
								firstpic={team_pics[2*i]} secondpic={team_pics[2*i+1]} />)
			}
			i++; 
			// console.log(games[matchup]['team_one']);
			// console.log(games[matchup]['team_two']);
		}
		return (
			<div className="col-md-9">
				{matchups}
			</div>
		);
	}
}

class Matchup extends React.Component {
	constructor(props) {
		super(props); 
	}

	render() {
		const divStyle = {
			borderStyle: "solid",
		};
		const headerStyle = {
			"text-align": "center"
		}
		return(
			<div>
				<div className="matchup">
					<div className="row">
						<div className="col-md-3">
							<img class="img-responsive" src={this.props.firstpic} />
						</div>
						<div className="col-md-3">
							<h2 style={headerStyle} > VS. </h2> 
						</div>
						<div className="col-md-3">
							<img class="img-responsive" src={this.props.secondpic} />
						</div>
					</div>
					<div className="row">
						<div className="col-md-3">
							<h1 style={headerStyle}>{this.props.score['team_one']}</h1>
						</div>
						<div className="col-md-3">
							
						</div>
						<div className="col-md-3">
							<h1 style={headerStyle}>{this.props.score['team_two']}</h1>
						</div>
					</div>
				</div>
				<br></br>
			</div>
		);
	}
}