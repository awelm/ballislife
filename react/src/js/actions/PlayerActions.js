import dispatcher from "../dispatcher";
/*
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
*/
export function getPlayersSeason(season) {
    dispatcher.dispatch({type: "FETCH_PLAYERS"});
    var myRequest = new Request('http://localhost:5000/playersseason?Season=' + season);
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
  var myRequest = new Request('http://localhost:5000/commonplayerinfo?Player=' + id);
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

export function getShotChart(player, season) {
  dispatcher.dispatch({type: "FETCH_SHOT_CHART"});
  var myRequest = new Request('http://localhost:5000/shotchartdetail?Player=' + player + '&Season=' + season);
  console.log(myRequest);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      var newScatterChart = responseJson.map((obj) => { 
        var curType = 'made';
        if (obj.made == 0) {
          curType = 'missed';
        }
        return {
          x: obj.x,
          y: obj.y,
          type: curType  
        }
      });
      var newShotChart = responseJson.map((obj) => {
        obj.x += 220;
        obj.x /= 4.4;
        obj.y /= 3;

        var x = obj.x;

        return {
          x: x,
          y: (90 - obj.y),
          value: 1
        }
      });
      dispatcher.dispatch({type: "RECIEVE_SHOT_CHART", shotChart: newShotChart, scatterChart: newScatterChart});
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECIEVE_CHART_ERROR"});
      console.error(error);
    });
}

export function getRadar(id, season) {
  dispatcher.dispatch({type: "FETCH_RADAR"});
  var myRequest = new Request('http://localhost:5000/playerradar?Season=' + season + '&Player=' + id);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      console.log(responseJson);
      dispatcher.dispatch({type: "RECIEVE_RADAR", radar: responseJson });
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECIEVE_RADAR_ERROR"});
      console.error(error);
    });
}
