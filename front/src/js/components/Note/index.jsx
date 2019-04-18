import React, { Component } from "react";
import classnames from "classnames";
import NoteReminder from "../NoteReminder";
import NoteContent from "../NoteContent";

import styles from "./index.module.scss";
import NoteBottom from "../NoteBottom";

class Note extends Component {
  getNoteSize = () => {
    const { size } = this.props;
    switch (size) {
      case "s":
        return "small";
      case "m":
        return "medium";
      case "l":
        return "large";
      default:
        return "small";
    }
  };

  render() {
    const { reminder, attachments } = this.props;
    const noteSize = this.getNoteSize();

    return (
      <div className={classnames(styles.main, noteSize && styles[noteSize])}>
        {reminder && <NoteReminder reminder={reminder} />}
        <NoteContent {...this.props} />
        {attachments && <NoteBottom attachments={attachments} />}
      </div>
    );
  }
}

export default Note;
