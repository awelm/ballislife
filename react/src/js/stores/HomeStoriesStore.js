import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class HomeStoriesStore extends EventEmitter {
  constructor() {
    super();
    this.stories = [];
  }

  getStories() {
    return this.stories;
  }

  handleActions(action) {
    switch(action.type) {
      case "RECEIVE_HOME_STORIES": {
        this.stories = action.news['news'];
        this.emit("change");
        break;
      }
    }
  }

}

const homeStoriesStore = new HomeStoriesStore;
dispatcher.register(homeStoriesStore.handleActions.bind(homeStoriesStore));

export default homeStoriesStore;
