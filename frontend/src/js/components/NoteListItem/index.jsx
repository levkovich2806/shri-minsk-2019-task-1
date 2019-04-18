import React, { Component } from "react";
import styles from "./index.module.scss";

class NoteListItem extends Component {
  render() {
    const { text, checked } = this.props;
    return (
      <label className={styles.container}>
        <input type="checkbox" defaultChecked={checked} />{" "}
        {text && <span>{text}</span>}
        <span className={styles.checkmark} />
      </label>
    );
  }
}

export default NoteListItem;
