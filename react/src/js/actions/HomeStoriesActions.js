import dispatcher from "../dispatcher";

export function getHomeStories() {
  var myRequest = new Request(`http://localhost:5000/get_user_news`);
  fetch(myRequest)
    .then((response) => response.json())
    .then((responseJson) => {
      dispatcher.dispatch({type: "RECEIVE_HOME_STORIES", news: responseJson });
      // console.log(responseJson);
      // return(responseJson);
    })
    .catch((error) => {
      dispatcher.dispatch({type: "RECEIVE_HOME_STORIES_ERROR"});
      console.log('error received')
      console.error(error);
    });
}
