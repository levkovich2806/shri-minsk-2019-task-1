import React, { Component } from "react";
import Tag from "../Tag";

class Tags extends Component {
  render() {
    const { tags } = this.props;
    return <div>{tags && tags.map(tag => <Tag tag={tag} key={tag} />)}</div>;
  }
}

export default Tags;
