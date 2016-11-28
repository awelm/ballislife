import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

const abbr_to_team = {
  ATL: "hawks",
  BKN: "nets",
  BOS: "celtics",
  CHA: "hornets",
  CHI: "bulls",
  CLE: "cavaliers",
  DAL: "mavericks",
  DEN: "nuggets",
  DET: "pistons",
  GSW: "warriors",
  HOU: "rockets",
  IND: "pacers",
  LAC: "clippers",
  LAL: "lakers",
  MEM: "grizzlies",
  MIA: "heat",
  MIL: "bucks",
  MIN: "timberwolves",
  NOP: "pelicans",
  NYK: "knicks",
  OKC: "thunder",
  ORL: "magic",
  PHI: "76ers",
  PHX: "suns",
  POR: "blazers",
  SAC: "kings",
  SAS: "spurs",
  TOR: "raptors",
  UTA: "jazz",
  WAS: "wizards"
};

class GameStore extends EventEmitter {
  constructor() {
    super();
    //this.box_scores = [];
    this.games_for_day = [];
    //this.team_pics = [];
  }

  /*
  getBoxScores() {
    return this.box_scores;
  }
  */

  getGamesForDay() {
    return this.games_for_day; 
  }

  /*
  getTeamPics() {
    return this.team_pics; 
  }
  */

  handleActions(action) {
    switch(action.type) {
      /*
      case "RECEIVE_BOX_SCORE": {
        let team_one_pts = action.box_score.resultSets[5]['rowSet'][0][22];
        let team_two_pts = action.box_score.resultSets[5]['rowSet'][1][22];
        let score = {
          team_one: team_one_pts,
          team_two: team_two_pts
        };
        this.box_scores.push(score); 
        this.emit("change");
        break;
      }
      */
      case "RECEIVE_GAMES_FOR_DAY": {
        // reset games as we are receiving new games 
        // Reset box scores 
        this.games_for_day = action.games;
        /*
        this.box_scores = [];
        this.team_pics = [];
        */
        /*
        let games = action.games;
        for (let matchup in games) {
          if (!(games[matchup] in this.games_for_day)) {
            // key for gamesForDay action has 3-string format
            let tmp = matchup.split(" "); 
            let details = {
              team_one: abbr_to_team[tmp[0]],
              team_two: abbr_to_team[tmp[2]]
            }
            this.games_for_day[games[matchup]] = details; 
          }
          //console.log(this.games_for_day);
        }
        */
        this.emit("change");
        break;
      }

      /*
      case "RECEIVE_TEAM_PICTURE": {
        this.team_pics.push(action.team_picture["url"]); 
        this.emit("change");
        break;
      }
      */
    }
  }

}

const gameStore = new GameStore; 
dispatcher.register(gameStore.handleActions.bind(gameStore));

export default gameStore;