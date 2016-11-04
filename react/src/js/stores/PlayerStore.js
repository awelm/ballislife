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
  }

  getAll() {
    return this.players;
  }

  handleActions(action) {
  switch(action.type) {
    case "RECIEVE_PLAYERS": {
      this.players = action.players;
      this.emit("change");
      break;
    }
  }
}


}

const playerStore = new PlayerStore;
dispatcher.register(playerStore.handleActions.bind(playerStore));

export default playerStore;
