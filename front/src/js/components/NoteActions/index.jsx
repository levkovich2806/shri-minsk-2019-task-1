import React from "react";
import { DELETE_CONFIRM, TO_ARCHIVE_CONFIRM } from "../../constants/main";
import { isFunction } from "lodash";
import classnames from "classnames";
import styles from "./index.module.scss";

function actionConfirm(message, id, cb) {
  const result = window.confirm(message);
  if (result) {
    cb(id);
  }
}

function NoteActions(props) {
  const { id, moveToArchive, editNote, deleteNote } = props;

  return (
    <div className={styles.actions}>
      {moveToArchive && isFunction(moveToArchive) && (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="check"
          onClick={() => actionConfirm(TO_ARCHIVE_CONFIRM, id, moveToArchive)}
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
      )}
      {editNote && isFunction(editNote) && (
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
      )}
      {deleteNote && isFunction(deleteNote) && (
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="trash-alt"
          onClick={() => actionConfirm(DELETE_CONFIRM, id, deleteNote)}
          className={classnames(
            "svg-inline--fa",
            "fa-trash-alt",
            "fa-w-14",
            styles["fa-trash"]
          )}
          role="img"
          width={16}
          height={16}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="currentColor"
            d="M32 464a48 48 0 0 0 48 48h288a48 48 0 0 0 48-48V128H32zm272-256a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zm-96 0a16 16 0 0 1 32 0v224a16 16 0 0 1-32 0zM432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16z"
          />
        </svg>
      )}
    </div>
  );
}

export default NoteActions;
