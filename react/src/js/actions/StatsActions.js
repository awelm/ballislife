import dispatcher from "../dispatcher";

export function getAllLeaders() {
  // dispatcher.dispatch({type: "FETCH_PLAYER_NEWS"});
  var myRequest = new Request(`http://localhost:5000/allleaders`);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      dispatcher.dispatch({type: "RECEIVE_ALL_LEADERS", leaders: responseJson });
      // console.log(responseJson);
      // return(responseJson);
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECEIVE_ALL_LEADERS_ERROR"});
      console.log('error received')
      console.error(error);
    });
}
