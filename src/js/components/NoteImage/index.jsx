import React, { Component } from "react";
import styles from "./index.module.scss";

class NoteImage extends Component {
  render() {
    const { url } = this.props;
    return (
      <div className={styles.image}>
        <img src={url} alt={url} />
      </div>
    );
  }
}
export default NoteImage;
