import React, { Component } from "react";
import NoteTags from "../NoteTags";
import classnames from "classnames";
import { changeNoteStatus, deleteNote } from "../../actions";
import styles from "./index.module.scss";
import NoteActions from "../NoteActions";
import { connect } from "react-redux";
import {
  SET_EDIT_NOTE_STATE,
  ON_SHOW_MODAL
} from "../../constants/action-types";
import { getReadableDate, getBackgroundColor } from "../../utils/utils";

class NoteBlock extends Component {
  moveToArchive = id => {
    const { onMoveToArchive } = this.props;
    onMoveToArchive(id);
  };

  editNote = id => {
    const { onEditNote } = this.props;
    onEditNote(id);
  };

  deleteNote = id => {
    const { onDeleteNote } = this.props;
    onDeleteNote(id);
  };

  getBgStyle = () => {
    const { color, colorsHash = { 0: "#ffffff" } } = this.props;
    return colorsHash[color] ? colorsHash[color].color : "#ffffff";
  };

  render() {
    const {
      id,
      title,
      text,
      tags,
      reminder,
      created,
      modificator,
      content,
      blockType,
      isArchive
    } = this.props;
    const colorValue = this.getBgStyle();

    return (
      <div
        className={classnames(
          styles.content,
          reminder && styles.withTopBlock,
          modificator && modificator.map(item => styles[item])
        )}
        style={{
          backgroundColor: getBackgroundColor(colorValue)
        }}
      >
        {title && <div className={styles.content__header}>{title}</div>}
        {content && content}
        {text && <div className={styles.content__description}>{text}</div>}
        <div className={styles.content__footer}>
          {tags && <NoteTags tags={tags} />}
          {blockType !== "top" && (
            <div className={styles.content__footer_bottom}>
              <div>
                {!isArchive ? (
                  <NoteActions
                    id={id}
                    moveToArchive={this.moveToArchive}
                    editNote={this.editNote}
                  />
                ) : (
                  <NoteActions id={id} deleteNote={this.deleteNote} />
                )}
              </div>
              {created && (
                <div className={styles.date}>{getReadableDate(created)}</div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    colorsHash: state.notes.colorsHash,
    isArchive: state.notes.isArchive
  }),
  dispatch => ({
    onMoveToArchive: id => {
      dispatch(
        changeNoteStatus({
          payload: {
            id,
            inArchive: true
          }
        })
      );
    },
    onEditNote: id => {
      dispatch({
        type: SET_EDIT_NOTE_STATE,
        payload: {
          id
        }
      });
      dispatch({
        type: ON_SHOW_MODAL
      });
    },
    onDeleteNote: id => {
      dispatch(
        deleteNote({
          payload: {
            id
          }
        })
      );
    }
  })
)(NoteBlock);
