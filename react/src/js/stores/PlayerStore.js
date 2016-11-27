import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PlayerStore extends EventEmitter {
  constructor() {
    super()
    this.players = [
        "Alaa Abdelnaby",
        "Zaid Abdul-Aziz",
        "Kareem Abdul-Jabbar",
        "Mahmoud Abdul-Rauf",
        "Tariq"
    ];
    this.curPlayer = "AJ Hammons",
    this.curPlayerInfo = {
  "parameters": [
    {
      "PlayerID": 1627773
    }, 
    {
      "LeagueID": null
    }
  ], 
  "resource": "commonplayerinfo", 
  "resultSets": [
    {
      "headers": [
        "PERSON_ID", 
        "FIRST_NAME", 
        "LAST_NAME", 
        "DISPLAY_FIRST_LAST", 
        "DISPLAY_LAST_COMMA_FIRST", 
        "DISPLAY_FI_LAST", 
        "BIRTHDATE", 
        "SCHOOL", 
        "COUNTRY", 
        "LAST_AFFILIATION", 
        "HEIGHT", 
        "WEIGHT", 
        "SEASON_EXP", 
        "JERSEY", 
        "POSITION", 
        "ROSTERSTATUS", 
        "TEAM_ID", 
        "TEAM_NAME", 
        "TEAM_ABBREVIATION", 
        "TEAM_CODE", 
        "TEAM_CITY", 
        "PLAYERCODE", 
        "FROM_YEAR", 
        "TO_YEAR", 
        "DLEAGUE_FLAG", 
        "GAMES_PLAYED_FLAG", 
        "DRAFT_YEAR", 
        "DRAFT_ROUND", 
        "DRAFT_NUMBER"
      ], 
      "name": "CommonPlayerInfo", 
      "rowSet": [
        [
          1627773, 
          "AJ", 
          "Hammons", 
          "AJ Hammons", 
          "Hammons, AJ", 
          "A. Hammons", 
          "1992-08-27T00:00:00", 
          "Purdue", 
          "United States", 
          "Purdue/US", 
          "7-0", 
          "260", 
          0, 
          "20", 
          "Center", 
          "Active", 
          1610612742, 
          "Mavericks", 
          "DAL", 
          "mavericks", 
          "Dallas", 
          "aj_hammons", 
          2016, 
          2016, 
          "Y", 
          "Y", 
          "2016", 
          "2", 
          "46"
        ]
      ]
    }, 
    {
      "headers": [
        "PLAYER_ID", 
        "PLAYER_NAME", 
        "TimeFrame", 
        "PTS", 
        "AST", 
        "REB", 
        "PIE"
      ], 
      "name": "PlayerHeadlineStats", 
      "rowSet": [
        [
          1627773, 
          "AJ Hammons", 
          "2016-17", 
          1.3, 
          0.3, 
          1.1, 
          0.098
        ]
      ]
    }
  ]
},
    this.curPlayerShotChart = [],
    this.curPlayerScatterChart = [],
    this.curPlayerRadar = [],
    this.curPlayerCareerStats = [0, 0, 0, 0],
    this.curPlayerImgUrl = 'http://stats.nba.com/media/players/230x185/1627773.png'
  }

  getAll() {
    return this.players;
  }

  getCurPlayer() {
    return this.curPlayer;
  }

  getCurPlayerInfo() {
    return this.curPlayerInfo;
  }

  getCurPlayerShotChart() {
    return this.curPlayerShotChart;
  }

  getCurPlayerRadar() {
    return this.curPlayerRadar;
  }
    
  getCurPlayerCareerStats() {
    return this.curPlayerCareerStats;
  }

  getCurPlayerScatterChart() {
    return this.curPlayerScatterChart;
  }

  getCurPlayerImgUrl() {
    return this.curPlayerImgUrl
  }

  handleActions(action) {
  switch(action.type) {
    case "RECIEVE_PLAYERS": {
      this.players = action.players;
      this.emit("change");
      break;
    }
    case "RECIEVE_PLAYER_INFO": {
      this.curPlayer = action.playerInfo[1];
      this.curPlayerInfo = action.playerInfo[0];
      // this.emit("change");
      break;
    }
    case "RECIEVE_SHOT_CHART": {
      this.curPlayerShotChart = action.shotChart;
      this.curPlayerScatterChart = action.scatterChart;
      this.emit("change");
      break;
    }
    case "RECIEVE_RADAR": {
      this.curPlayerRadar = action.radar;
      this.emit("change");
      break;
    }
    case "RECIEVE_IMG": {
      this.curPlayerImgUrl = action.url;
      break; 
    }
  }
}


}

const playerStore = new PlayerStore;
dispatcher.register(playerStore.handleActions.bind(playerStore));

export default playerStore;
