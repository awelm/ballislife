import React from "react";

export default class Players extends React.Component {
  render() {
    const { params } = this.props;

    return (
      <div className="row">
        <div className="col-sm-12">
          <h1>Players ({ params.player })</h1>
        </div>
        <div className="col-md-3">
           <div className="well">
              <h2 className="player-name">Player Name</h2>
              <div className="form-group">
                <label className="control-label" for="inputDefault">Player</label>
                <input type="text" className="form-control" id="inputDefault" />
              </div>
              <div className="form-group">
                <label className="control-label" for="inputDefault">Season</label>
                <select className="form-control" id="select">
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                </select>
              </div>
              <div className="form-group">
                 <label className="control-label" for="inputDefault">Chart Type</label>
                 <div className="radio">
                    <label>
                       <input type="radio" name="optionsRadios" id="optionsRadios1" value="option1" checked="" />
                       Hexagonal
                    </label>
                 </div>
                 <div className="radio">
                   <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" />
                    Scatter
                   </label>
                 </div>
                 <div className="radio">
                   <label>
                    <input type="radio" name="optionsRadios" id="optionsRadios2" value="option2" />
                    Heat Map
                   </label>
                 </div>
              </div>
              <legend>Filters</legend>
              <div className="form-group">
                <label className="control-label" for="inputDefault">Shot Zone</label>
                <select className="form-control" id="select">
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label className="control-label" for="inputDefault">Shot Angles</label>
                <select className="form-control" id="select">
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label className="control-label" for="inputDefault">Shot Distance</label>
                <select className="form-control" id="select">
                   <option>1</option>
                   <option>2</option>
                   <option>3</option>
                   <option>4</option>
                   <option>5</option>
                </select>
              </div>
              <div className="form-group">
                <label className="control-label" for="inputDefault">FG Made/Missed</label>
                <select className="form-control" id="select">
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
