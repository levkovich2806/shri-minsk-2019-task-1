import React, { PureComponent } from "react";
import ColorBlock from "../ColorBlock";
import styles from "./index.module.scss";

class NotesTitle extends PureComponent {
  render() {
    return (
      <div className={styles.title}>
        <div className={styles.title_text}>Заметки</div>
        <div className={styles.notes__title_blocks}>
          <ColorBlock />
        </div>
      </div>
    );
  }
}

export default NotesTitle;
