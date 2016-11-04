import dispatcher from "../dispatcher";

export function getAllPlayers() {
  dispatcher.dispatch({type: "FETCH_PLAYERS"});
  var myRequest = new Request('http://localhost:5000/commonallplayers');
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      dispatcher.dispatch({type: "RECIEVE_PLAYERS", players: responseJson });
      // console.log(responseJson);
      // console.log(playerList);
      // return responseJson;
    })
    .catch((error) => {
      dispatcher.dispatch({type: "FETCH_PLAYERS_ERROR"});
      console.error(error);
    });
}

export function getPlayerInfo(id) {
  dispatcher.dispatch({type: "FETCH_PLAYER_INFO"});
  var myRequest = new Request('http://localhost:5000/commonplayerinfo?PlayerID=' + id);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      dispatcher.dispatch({type: "RECIEVE_PLAYER_INFO", playerInfo: [
        responseJson,
        id ]});
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECIEVE_PLAYERS_ERROR"});
      console.error(error);
    });
}

export function getShotChart(id) {
  dispatcher.dispatch({type: "FETCH_SHOT_CHART"});
  var myRequest = new Request('http://localhost:5000/shotchartdetail?PlayerID=' + id);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      dispatcher.dispatch({type: "RECIEVE_SHOT_CHART", shotChart: responseJson });
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECIEVE_CHART_ERROR"});
      console.error(error);
    });
}
