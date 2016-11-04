import React, { PropTypes } from 'react';

export default function Players({ player }) {
  return (
    <div className="row">
      <div className="col-sm-12">
        <h1>Players ({ player })</h1>
      </div>
      <div className="col-md-3">
        <div className="well">
          <h2 className="player-name">Player Name</h2>
          <div className="form-group">
            <label className="control-label" htmlFor="playerName">Player</label>
            <input type="text" className="form-control" id="playerName" />
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
                <input
                  type="radio"
                  name="optionsRadios"
                  id="hexagonal"
                  value="hexagonal"
                  checked=""
                />
                  Hexagonal
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="optionsRadios"
                  id="scatter"
                  value="scatter"
                />
                Scatter
              </label>
            </div>
            <div className="radio">
              <label>
                <input
                  type="radio"
                  name="optionsRadios"
                  id="heatMap"
                  value="heatMap"
                />
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

Players.propTypes = {
  player: PropTypes.string
};
