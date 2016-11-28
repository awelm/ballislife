import dispatcher from "../dispatcher";

// TODO: Get rid of console logs and comments  
/*
export function getBoxScore(date, first_team, second_team) {
  // dispatcher.dispatch({type: "FETCH_TEAM_INFO"});
  var myRequest = new Request(`http://localhost:5000/getboxscore?Date=${date}&TeamOne=${first_team}&TeamTwo=${second_team}`);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      dispatcher.dispatch({type: "RECEIVE_BOX_SCORE", box_score: responseJson });
      //console.log(responseJson.resultSets[5]);
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECEIVE_BOX_SCORE_ERROR"});
      console.error(error);
    });
}
*/

export function getGames(date) {
  // dispatcher.dispatch({type: "FETCH_TEAM_INFO"});
  var myRequest = new Request(`http://localhost:5000/getgamesforday?Date=${date}`);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      dispatcher.dispatch({type: "RECEIVE_GAMES_FOR_DAY", games: responseJson });
      //console.log(responseJson);
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECEIVE_GAMES_FOR_DAY_ERROR"});
      console.error(error);
    });
}

/*
export function getTeamPicture(team) {
  // dispatcher.dispatch({type: "FETCH_TEAM_PICTURE"});
  var myRequest = new Request(`http://localhost:5000/teampic?Team=${team}`);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      dispatcher.dispatch({type: "RECEIVE_TEAM_PICTURE", team_picture: responseJson});
      //console.log(responseJson);
      //return(responseJson); 
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECEIVE_TEAM_PICTURE_ERROR"});
      console.error(error);
    });
}
*/
