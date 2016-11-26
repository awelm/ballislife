import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class TopStoriesStore extends EventEmitter {
  constructor() {
    super();
    this.stories = [];
  }

  getStories() {
    return this.stories;
  }

  handleActions(action) {
    switch(action.type) {
      case "RECEIVE_PLAYER_STORIES": {
        // console.log("player stories received");
        this.stories = action.news['news'];
        this.emit("change");
        break;
      }
    }
  }

}

const topStoriesStore = new TopStoriesStore;
dispatcher.register(topStoriesStore.handleActions.bind(topStoriesStore));

export default topStoriesStore;
