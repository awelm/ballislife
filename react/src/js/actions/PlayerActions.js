import dispatcher from "../dispatcher";

export function getAllPlayers() {
  dispatcher.dispatch({type: "FETCH_PLAYERS"});
  var myRequest = new Request('http://localhost:5000/commonallplayers');
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      dispatcher.dispatch({type: "RECIEVE_PLAYERS", players: responseJson });
      console.log(responseJson);
      // console.log(playerList);
      // return responseJson;
    })
    .catch((error) => {
      dispatcher.dispatch({type: "FETCH_PLAYERS_ERROR"});
      console.error(error);
    });
}
