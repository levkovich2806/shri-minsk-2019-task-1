import React, { Component } from "react";
import NoteListItem from "../NoteListItem";
import styles from "./index.module.scss";

class NoteList extends Component {
  render() {
    const { items, checkedState = false } = this.props;
    return (
      <div className={checkedState ? styles.listC : styles.listNB}>
        {items.map((item, index) => {
          if (item.checked === checkedState) {
            const key = `${item.text}${index}`;
            return (
              <div className={styles.container} key={key}>
                <NoteListItem text={item.text} checked={checkedState} />{" "}
              </div>
            );
          }
          return false;
        })}
      </div>
    );
  }
}

export default NoteList;
