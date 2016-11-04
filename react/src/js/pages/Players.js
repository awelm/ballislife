import React from 'react';

let ReactHeatmap = require('react-heatmap');
var RadarChart = require("react-chartjs-2").Radar;

let data = [{ x: 10, y: 15, value: 5}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}];

const heatMapDiv = {
    height: '521px',
    width: '808px',
    backgroundImage: 'url("./src/images/shot_chart.jpg")',
};

var radarData = {
    labels: ["Eating", "Drinking", "Sleeping", "Designing", "Coding", "Cycling", "Running"],
    datasets: [
        {
            label: "My First dataset",
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "rgba(179,181,198,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(179,181,198,1)",
            data: [65, 59, 90, 81, 56, 55, 40]
        },
        {
            label: "My Second dataset",
            backgroundColor: "rgba(255,99,132,0.2)",
            borderColor: "rgba(255,99,132,1)",
            pointBackgroundColor: "rgba(255,99,132,1)",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: "#fff",
            pointHoverBorderColor: "rgba(255,99,132,1)",
            data: [28, 48, 40, 19, 96, 27, 100]
        }
    ]
};

var radarOptions = {
    scale: {
                reverse: true,
                ticks: {
                    beginAtZero: true
                }
            }
}

const titleDiv = {
  marginTop: '0px',
}

import * as PlayerActions from "../actions/PlayerActions";
import PlayerStore from "../stores/PlayerStore";

export default class Players extends React.Component {
  constructor() {
    super();
    this.changePlayer = this.changePlayer.bind(this);
    this.state = {
      players: PlayerStore.getAll(),
      curPlayer: PlayerStore.getCurPlayer(),
      curPlayerInfo: PlayerStore.getCurPlayerInfo(),
      curPlayerHighlights: PlayerStore.getCurPlayerHighlights(),
      curPlayerShotChart: PlayerStore.getCurPlayerShotChart()
    };
  }

  componentWillMount() {
    PlayerStore.on("change", () => {
      this.setState({
        players: PlayerStore.getAll(),
        curPlayer: PlayerStore.getCurPlayer(),
        curPlayerInfo: PlayerStore.getCurPlayerInfo(),
        curPlayerHighlights: PlayerStore.getCurPlayerHighlights(),
        curPlayerShotChart: PlayerStore.getCurPlayerShotChart(),
      })
    })
    PlayerActions.getAllPlayers();
  };

  getPlayers() {
    PlayerActions.getAllPlayers();
  }

  changePlayer(event) {
    console.log(event.target.value);
    PlayerActions.getPlayerInfo(event.target.value);
    PlayerActions.getShotChart(event.target.value);
    this.setState({
      curPlayerHighlights: PlayerStore.getCurPlayerHighlights(),
      curPlayer: event.target.value,
      curPlayerInfo: PlayerStore.getCurPlayerInfo(),
      curPlayerShotChart: PlayerStore.getCurPlayerShotChart(),
     });
    console.log(this.state.curPlayerHighlights);
    console.log(PlayerStore.getCurPlayerHighlights());
  }

  render() {
    const { params } = this.props;
    const { players, curPlayer, curPlayerInfo, curPlayerShotChart } = this.state;
    console.log(curPlayerShotChart);
    const updatedShotChart = curPlayerShotChart.map((obj) => {
      obj.x += 300;
      obj.x /= 6;
      obj.y /= 4;

      var x = obj.x;
      if (obj.x < 30) {
        x = obj.x-10;
      }
      else if (obj.x > 70) {
        x = obj.x+10;
      }
      else {
        x = obj.x;
      }

      return {
        x: x,
        y: (100-obj.y-25)/.8,
        value: 1
      }
    });
    console.log(updatedShotChart);
    const playerHighlights = curPlayerInfo['resultSets'][1]['rowSet'][0];

    const playerList = players.map((player) => {
      return <option key={player.id} value={player.id}>{ player.name }</option>;
    });

    return (
      <div className="row">
        <div className="col-sm-12">
          <h1>Players</h1>
        </div>
        <div className="col-md-3">
           <div className="well">
              <h2 className="player-name">{ playerHighlights[1] }</h2>
              <div className="form-group">
                <label className="control-label" htmlFor="playerName">Player</label>
                  <select className="form-control" id="playerName" value={this.state.curPlayer}  onChange={this.changePlayer}>
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
                    <input type="radio" name="optionsRadios" id="radar" value="radar" />
                    Radar
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
        <h3 style={titleDiv}>Career Average</h3>
        <table className="table table-striped">
          <thead>
            <tr className="info">
              <th>Points</th>
              <th>Assists</th>
              <th>Rebounds</th>
              <th>All Star Appearances</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{ playerHighlights[3] }</td>
              <td>{ playerHighlights[4] }</td>
              <td>{ playerHighlights[5] }</td>
              <td>{ playerHighlights[6] }</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="col-md-9" style={heatMapDiv}>
        <ReactHeatmap max={100} data={updatedShotChart} />
      </div>
      <div className="col-md-9">
        <RadarChart data={radarData} options={radarOptions} />
      </div>
      <div className="col-md-9">
        <h3>2016-2017 Summary Stats</h3>
        <table className="table table-striped table-hover">
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
