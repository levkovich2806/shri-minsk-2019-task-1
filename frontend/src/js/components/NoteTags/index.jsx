import React, { Component } from "react";
import { connect } from "react-redux";
import Tag from "../Tag";

class NoteTags extends Component {
  getTagName = tag => {
    const { tagsHash } = this.props;
    return tagsHash && tagsHash[tag] ? tagsHash[tag].tag : "";
  };

  render() {
    const { tags } = this.props;

    return (
      <div>
        {tags &&
          tags.map(tag => {
            const tagName = this.getTagName(tag);
            return <Tag key={tag} tagName={tagName} />;
          })}
      </div>
    );
  }
}

export default connect(state => ({
  tagsHash: state.notes.tagsHash
}))(NoteTags);
