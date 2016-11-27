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
    this.curPlayerInfo = [],
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
   //   this.emit("change");
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
