import React, { Component } from "react";
import styles from "./index.module.scss";

class NoteBottomImage extends Component {
  render() {
    const { url } = this.props;
    return (
      <div className={styles.content}>
        <a href={url} target="_blank">
          <img src={url} />
        </a>
      </div>
    );
  }
}

export default NoteBottomImage;
