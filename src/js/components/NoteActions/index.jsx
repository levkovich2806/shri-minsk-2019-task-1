import React, { Component } from "react";
import classnames from "classnames";
import styles from "./index.module.scss";

class NoteActions extends Component {

  render() {
    const { id, moveToArchive, editNote } = this.props;

    return (
      <div className={styles.actions}>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="check"
          onClick={() => moveToArchive(id)}
          className={classnames(
            "svg-inline--fa",
            "fa-check",
            "fa-w-16",
            styles["fa-check"]
          )}
          role="img"
          width={16}
          height={16}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"
          />
        </svg>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="pen"
          onClick={() => editNote(id)}
          className={classnames(
            "svg-inline--fa",
            "fa-pen",
            "fa-w-16",
            styles["fa-pen"]
          )}
          role="img"
          width={16}
          height={16}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <path
            fill="currentColor"
            d="M290.74 93.24l128.02 128.02-277.99 277.99-114.14 12.6C11.35 513.54-1.56 500.62.14 485.34l12.7-114.22 277.9-277.88zm207.2-19.06l-60.11-60.11c-18.75-18.75-49.16-18.75-67.91 0l-56.55 56.55 128.02 128.02 56.55-56.55c18.75-18.76 18.75-49.16 0-67.91z"
          />
        </svg>
      </div>
    );
  }
}

export default NoteActions;
