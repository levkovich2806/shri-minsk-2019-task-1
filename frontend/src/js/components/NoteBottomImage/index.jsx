import React, { Component } from "react";
import styles from "./index.module.scss";

class NoteBottomImage extends Component {
  render() {
    const { url } = this.props;
    return (
      <div className={styles.content}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          <img src={url} alt={url} />
        </a>
      </div>
    );
  }
}

export default NoteBottomImage;
