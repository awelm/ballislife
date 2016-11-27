import dispatcher from "../dispatcher";

export function getPlayerStories() {
  // dispatcher.dispatch({type: "FETCH_PLAYER_NEWS"});
  var myRequest = new Request(`http://localhost:5000/get_player_news`);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      dispatcher.dispatch({type: "RECEIVE_PLAYER_STORIES", news: responseJson });
      // console.log(responseJson);
      // return(responseJson);
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECEIVE_PLAYER_STORIES_ERROR"});
      console.log('error received')
      console.error(error);
    });
}
