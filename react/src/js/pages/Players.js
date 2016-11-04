import React from "react";

import * as PlayerActions from "../actions/PlayerActions";
import PlayerStore from "../stores/PlayerStore";

export default class Players extends React.Component {
  constructor() {
    super();
    this.state = {
      players: PlayerStore.getAll(),
    };
  }

  componentWillMount() {
    PlayerStore.on("change", () => {
      this.setState({
        players: PlayerStore.getAll(),
      })
    })
    PlayerActions.getAllPlayers();
  };

  getPlayers() {
    PlayerActions.getAllPlayers();
  }

  render() {
    const { params } = this.props;
    const { players } = this.state;

    const playerList = players.map((player) => {
      return <option key={player.id} value={player.id}>{ player.name }</option>;
    });

    // var myURL = myRequest.url;
    // var myMethod = myRequest.method; // GET
    // var myMode = myRequest.mode;
    // console.log(myMode);

    // function getAllPlayers() {
    //   var myRequest = new Request('http://localhost:5000/commonallplayers');
    //   return fetch(myRequest)
    //     .then((response) => response.json())
    //     .then((responseJson) => {
    //       // console.log(responseJson);
    //       // console.log(playerList);
    //       return responseJson;
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });
    // }
    //
    //
    // const testList = getAllPlayers().then(function(results){
    //   console.log(results);
    //   return results;
    // });

    // const playerList = [
    //   {name: 'test name', id: '123'},
    //   {name: 'test name', id: '1'},
    //   {name: 'test name', id: '12'}
    // ].map((obj) => <option key={obj.id} value={obj.id}>{ obj.name }</option>);
    //
    // console.log(playerList);

    return (
      <div className="row">
        <div className="col-sm-12">
          <h1>Players</h1>
        </div>
        <div className="col-md-3">
           <div className="well">
              <h2 className="player-name">Player Name</h2>
              <div className="form-group">
                <label className="control-label" htmlFor="playerName">Player</label>
                  <select className="form-control" id="playerName">
                    { playerList }
                  </select>
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="season">Season</label>
                <select className="form-control" id="season">
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                </select>
              </div>
              <div className="form-group">
                 <label className="control-label" htmlFor="chartType">Chart Type</label>
                 <div className="radio">
                    <label>
                       <input type="radio" name="optionsRadios" id="hexagonal" value="hexagonal" checked="" />
                       Hexagonal
                    </label>
                 </div>
                 <div className="radio">
                   <label>
                    <input type="radio" name="optionsRadios" id="scatter" value="scatter" />
                    Scatter
                   </label>
                 </div>
                 <div className="radio">
                   <label>
                    <input type="radio" name="optionsRadios" id="heatMap" value="heatMap" />
                    Heat Map
                   </label>
                 </div>
              </div>
              <legend>Filters</legend>
              <div className="form-group">
                <label className="control-label" htmlFor="shotZone">Shot Zone</label>
                <select className="form-control" id="shotZone">
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="shotAngles">Shot Angles</label>
                <select className="form-control" id="shotAngles">
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="shotDistance">Shot Distance</label>
                <select className="form-control" id="shotDistance">
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label className="control-label" htmlFor="fg">FG Made/Missed</label>
                <select className="form-control" id="fg">
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                </select>
              </div>
           </div>
        </div>
        <div className="col-md-9">
           <h3>2016-2017 Summary Stats</h3>
           <table className="table table-striped table-hover ">
             <thead>
               <tr>
                 <th>Zone</th>
                 <th>FGM</th>
                 <th>FGA</th>
                 <th>FG%</th>
                 <th>Lg FG%</th>
                 <th>Pts/Shot</th>
                 <th>Lg Pts/Shot</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td>1</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
               </tr>
               <tr>
                 <td>2</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
               </tr>
               <tr>
                 <td>3</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
               </tr>
               <tr>
                 <td>4</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
               </tr>
               <tr>
                 <td>5</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
               </tr>
               <tr>
                 <td>6</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
               </tr>
               <tr>
                 <td>7</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
                 <td>Column content</td>
               </tr>
             </tbody>
           </table>
        </div>
      </div>
    );
  }
}
