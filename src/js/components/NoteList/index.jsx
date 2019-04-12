import React, { Component } from "react";
import NoteListItem from "../NoteListItem";
import styles from "./index.module.scss";

class NoteList extends Component {
  render() {
    const { items, checkedState = false } = this.props;
    return (
      <div className={checkedState ? styles.listC : styles.listNB}>
        {items.map(item => {
          if (item.checked === checkedState) {
            return (
              <div className={styles.container} key={item.text}>
                <NoteListItem text={item.text} checked={checkedState} />{" "}
              </div>
            );
          }
        })}
      </div>
    );
  }
}

export default NoteList;
