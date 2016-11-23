import dispatcher from "../dispatcher";

export function getTeamInfo(team="hawks", season="2016-17") {
  dispatcher.dispatch({type: "FETCH_TEAM_INFO"});
  var myRequest = new Request(`http://localhost:5000/teaminfocommon?Season=${season}&Team=${team}`);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      dispatcher.dispatch({type: "RECEIVE_TEAM_INFO", team_info: responseJson });
      console.log(responseJson);
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECEIVE_TEAM_INFO_ERROR"});
      console.error(error);
    });
}

export function getTeamRoster(team="hawks", season="2016-17") {
  dispatcher.dispatch({type: "FETCH_TEAM_ROSTER"});
  var myRequest = new Request(`http://localhost:5000/commonteamroster?Season=${season}&Team=${team}`);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      dispatcher.dispatch({type: "RECEIVE_TEAM_ROSTER", team_roster: responseJson });
      console.log(responseJson);
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECEIVE_TEAM_ROSTER_ERROR"});
      console.error(error);
    });
}

export function getTeamNews(team="hawks") {
  dispatcher.dispatch({type: "FETCH_TEAM_NEWS"});
  var myRequest = new Request(`http://localhost:5000/get_team_news?Team=${team}`);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      dispatcher.dispatch({type: "RECEIVE_TEAM_NEWS", team_news: responseJson });
      console.log(responseJson);
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECEIVE_TEAM_NEWS_ERROR"});
      console.error(error);
    });
}

export function getPlayerNews(player) {
  dispatcher.dispatch({type: "FETCH_PLAYER_NEWS"});
  var myRequest = new Request(`http://localhost:5000/get_player_news?Player=${player}`);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      dispatcher.dispatch({type: "RECEIVE_PLAYER_NEWS", player_news: responseJson });
      console.log(responseJson);
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECEIVE_PLAYER_NEWS_ERROR"});
      console.error(error);
    });
}

export function getTeamPicture(team="hawks") {
  dispatcher.dispatch({type: "FETCH_TEAM_PICTURE"});
  var myRequest = new Request(`http://localhost:5000/teampic?Team=${team}`);
  fetch(myRequest)
    .then((response) => {
      dispatcher.dispatch({type: "RECEIVE_TEAM_PICTURE", team_picture_url: response});
      console.log(response);
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECEIVE_TEAM_PICTURE_ERROR"});
      console.error(error);
    });
}

export function getPlayerPicture(player) {
  dispatcher.dispatch({type: "FETCH_PLAYER_PICTURE"});
  var myRequest = new Request(`http://localhost:5000/playerpic?Player=${player}`);
  fetch(myRequest)
    .then((response) => {
      dispatcher.dispatch({type: "RECEIVE_PLAYER_PICTURE", player_picture_url: response});
      console.log(response);
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECEIVE_PLAYER_PICTURE_ERROR"});
      console.error(error);
    });
}

