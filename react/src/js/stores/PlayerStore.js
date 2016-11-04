import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PlayerStore extends EventEmitter {
  constructor() {
    super()
    this.players = [
      {
        "id": 76001,
        "name": "Alaa Abdelnaby"
      },
      {
        "id": 76002,
        "name": "Zaid Abdul-Aziz"
      },
      {
        "id": 76003,
        "name": "Kareem Abdul-Jabbar"
      },
      {
        "id": 51,
        "name": "Mahmoud Abdul-Rauf"
      },
      {
        "id": 1505,
        "name": "Tariq Abdul-Wahad"
      },
    ];
    this.curPlayer = 76001,
    this.curPlayerInfo =
      {
    "parameters": [
      {
        "PlayerID": 76001
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
          "GAMES_PLAYED_FLAG"
        ],
        "name": "CommonPlayerInfo",
        "rowSet": [
          [
            76001,
            "Alaa",
            "Abdelnaby",
            "Alaa Abdelnaby",
            "Abdelnaby, Alaa",
            "A. Abdelnaby",
            "1968-06-24T00:00:00",
            "Duke",
            "USA",
            "Duke/US",
            "6-10",
            "240",
            4,
            "30",
            "Forward",
            "Active",
            1610612755,
            "76ers",
            "PHL",
            "sixers",
            "Philadelphia",
            "HISTADD_alaa_abdelnaby",
            1990,
            1994,
            "N",
            "Y"
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
          "ALL_STAR_APPEARANCES"
        ],
        "name": "PlayerHeadlineStats",
        "rowSet": [
          [
            76001,
            "Alaa Abdelnaby",
            "career",
            5.7,
            0.3,
            3.3,
            0
          ]
        ]
      }
    ]
  },
    this.curPlayerShotChart = [],
    this.curPlayerRadar = []
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

  getCurPlayerHighlights() {
    return this.curPlayerInfo['resultSets'][1]['rowSet'][0];
  }

  getCurPlayerShotChart() {
    return this.curPlayerShotChart;
  }

  getCurPlayerRadar() {
    return this.curPlayerRadar;
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
      // this.emit("change");
      break;
    }
    case "RECIEVE_RADAR": {
      this.curPlayerRadar = action.radar;
      this.emit("change");
      break;
    }
  }
}


}

const playerStore = new PlayerStore;
dispatcher.register(playerStore.handleActions.bind(playerStore));

export default playerStore;
