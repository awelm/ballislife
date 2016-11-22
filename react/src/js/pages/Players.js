import React from 'react';

let ReactHeatmap = require('react-heatmap');
var RadarChart = require("react-chartjs-2").Radar;

// let data = [{ x: 10, y: 15, value: 5}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}, { x: 50, y: 50, value: 2}];

const heatMapDiv = {
    height: '521px',
    width: '808px',
    backgroundImage: 'url("./src/images/shot_chart.jpg")',
};

const radarOptions = {
    scale: {
      xAxes: [{
        display: false
      }],
      yAxes: [{
        display: false
      }],
                reverse: false,
                ticks: {
                    beginAtZero: false
                },
            },
    scaleShowLabels : false,
    showTooltips: false,
    scaleStartValue: 0
}

const graphOptions = [
    "Hexagon", "Radar", "Heatmap"
]

const titleDiv = {
  marginTop: '0px',
}


var GraphComponent = React.createClass({ 
    
  render: function() {
    var curGraph = this.props.curGraph;
  if (curGraph == graphOptions[0]) {
    return (
      <div>No Graph</div>
    );
  }
  else if (curGraph == graphOptions[1]) {
    return (      
      <div className="col-md-9">
        <RadarChart data={this.props.radarData} options={radarOptions} />
      </div>
    );
  }
  else {
    return (  
      <div className="col-md-9" style={heatMapDiv}>
        <ReactHeatmap max={100} data={this.props.shotChart} />
      </div>
    );
  }
  }
});

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
      curPlayerShotChart: PlayerStore.getCurPlayerShotChart(),
      curPlayerRadar: PlayerStore.getCurPlayerRadar(),
      curGraph: graphOptions[0]
    };
  }

  setGraphOptions(option) {
    this.setState( {curGraph: graphOptions[option]});
  }
  

  componentWillMount() {
    PlayerStore.on("change", () => {
      this.setState({
        players: PlayerStore.getAll(),
        curPlayer: PlayerStore.getCurPlayer(),
        curPlayerInfo: PlayerStore.getCurPlayerInfo(),
        curPlayerHighlights: PlayerStore.getCurPlayerHighlights(),
        curPlayerShotChart: PlayerStore.getCurPlayerShotChart(),
        curPlayerRadar: PlayerStore.getCurPlayerRadar(),
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
    PlayerActions.getRadar(event.target.value);
    this.setState({
      curPlayerHighlights: PlayerStore.getCurPlayerHighlights(),
      curPlayer: event.target.value,
      curPlayerInfo: PlayerStore.getCurPlayerInfo(),
      curPlayerShotChart: PlayerStore.getCurPlayerShotChart(),
      curPlayerRadar: PlayerStore.getCurPlayerRadar(),
     });
    console.log(this.state.curPlayerHighlights);
    console.log(PlayerStore.getCurPlayerHighlights());
  }

  render() {
    const { params } = this.props;
    const { players, curPlayer, curPlayerInfo, curPlayerShotChart, curPlayerRadar, curGraph } = this.state;
    const playerHighlights = curPlayerInfo['resultSets'][1]['rowSet'][0];
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

    const radarInput = curPlayerRadar.map((num) => {
      return 10*num;
    });
    console.log(radarInput);

    var radarData = {
        labels: ["Bball IQ", "Efficiency", "Interior D", "Interior Scoring", "Outside Scoring", "Perimeter D", "Rebounds", "Stamina"],
        datasets: [
            {
                label: playerHighlights[1],
                backgroundColor: "rgba(179,181,198,0.2)",
                borderColor: "rgba(179,181,198,1)",
                pointBackgroundColor: "rgba(179,181,198,1)",
                pointBorderColor: "#fff",
                pointHoverBackgroundColor: "#fff",
                pointHoverBorderColor: "rgba(179,181,198,1)",
                data: radarInput
            },
        ]
    };

    console.log(updatedShotChart);

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
                       <input type="radio" name="optionsRadios" id="hexagonal" value="hexagonal" checked="" onClick={() => this.setGraphOptions(0)}/>
                       Hexagonal
                    </label>
                 </div>
                 <div className="radio">
                   <label>
                    <input type="radio" name="optionsRadios" id="radar" value="radar" onClick={() => this.setGraphOptions(1)}/>
                    Radar
                   </label>
                 </div>
                 <div className="radio">
                   <label>
                    <input type="radio" name="optionsRadios" id="heatMap" value="heatMap" onClick={() => this.setGraphOptions(2)}/>
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
      <GraphComponent radarData={radarData} shotChart={updatedShotChart} curGraph={curGraph}/>
    </div>
  );
}
}
