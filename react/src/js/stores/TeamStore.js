import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class TeamStore extends EventEmitter {
  constructor() {
    super();
    this.team_info = {};
    this.team_roster = {}; 
    this.team_news = {};
    this.player_news = {}; 
    this.team_picture = {}; 
    this.roster_pictures = {}; 
  }

  getTeamInfo() {
    return this.team_info;
  }

  getTeamRoster() {
    return this.team_roster;
  }

  getTeamNews() {
    return this.team_news; 
  }

  getPlayerNews() {
    return this.player_news; 
  }

  getTeamPicture() {
    return this.team_picture; 
  }

  getRosterPictures() {
    return this.roster_pictures; 
  }

  handleActions(action) {
    switch(action.type) {
      // TODO: Handle Errors
      case "RECEIVE_TEAM_INFO": {
        let tmp1 = action.team_info['resultSets'][0]['rowSet'][0];
        let tmp2 = action.team_info['resultSets'][1]['rowSet'][0];
        this.team_info = {
          'Conference': tmp1[5],
          'Division': tmp1[6],
          'Win/Loss Record': tmp1[8] + "-" + tmp1[9], 
          'Win Percentage': tmp1[10], 
          'Points Per Game Rank': tmp2[3],
          'Points Per Game': tmp2[4],
          'Rebounds Per Game Rank': tmp2[5],
          'Rebounds Per Game': tmp2[6], 
          'Assists Per Game Rank': tmp2[7],
          'Assists Per Game': tmp2[8], 
          'Opponent PPG Rank': tmp2[9],
          'Opponent PPG': tmp2[10]
        };
        this.emit("change");
        break;
      }
      case "RECEIVE_TEAM_ROSTER": {
        this.team_roster = action.team_roster; 
        this.emit("change"); 
        break;
      }
      case "RECEIVE_TEAM_NEWS": {
        this.team_news = action.team_news; 
        this.emit("change"); 
        break;
      }
      case "RECEIVE_PLAYER_NEWS": {
        this.player_news = action.player_news; 
        this.emit("change"); 
        break;
      }
      case "RECEIVE_TEAM_PICTURE": {
        this.team_picture = action.team_picture['url'];
        this.emit("change");
        break;
      }
      // FIX THIS LATER 
      case "RECEIVE_PLAYER_PICTURE": {
        this.roster_pictures = action.player_picture; 
        this.emit("change");
        break;
      }      
    }
  }

}

const teamStore = new TeamStore; 
dispatcher.register(teamStore.handleActions.bind(teamStore));

export default teamStore;