import React from "react";

export default class Image extends React.Component {
  render() {
    // Title field is not currently passed anything
    const { title, img_url } = this.props;
    const widthStyle = {
      width: "100"
    };
    const heightStyle = {
      height: "220"
    };
    return (
      <div class="col-md-4">
        <h4>{title}</h4>
        <img class="img-responsive" src={img_url} height={heightStyle}/> 
      </div>
    );
  }
}
