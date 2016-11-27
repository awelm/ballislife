import React from "react";

export default class Article extends React.Component {
  render() {
    const { title, body, url } = this.props;

    let newTitle = title.replace(/-.*$/,"");

    return (
      <div class="article">
        <h4><a href={url} target="_blank">{newTitle}</a></h4>
        <p>{body}</p>
      </div>
    );
  }
}
