import React, { Component } from "react";
import NoteTags from "../NoteTags";
import classnames from "classnames";
import { changeNoteStatus, getNotes } from '../../actions';
import styles from "./index.module.scss";
import NoteActions from "../NoteActions";
import moment from "moment";
import { connect } from 'react-redux';

class NoteBlock extends Component {

  moveToArchive = (id) => {
    const { onMoveToArchive } = this.props;
    onMoveToArchive(id);
  }

  editNote = () => {
    console.log("editNote");
  }

  getBgStyle = () => {
    const { color, colorsHash = { 0: "#ffffff" } } = this.props;
    return colorsHash[color] ? colorsHash[color].color : "#ffffff";
  };

  getReadableDate = date => {
    date /= 1000;
    const now = moment().unix();
    const normalDate = moment.unix(date);
    const time = moment.unix(date).format("HH:mm");

    const years = moment().diff(normalDate, "years");
    const month = moment().diff(normalDate, "month");
    const days = moment().diff(normalDate, "days");

    if (years > 0) {
      return `${years} год(а) назад`;
    } else if (month > 0) {
      return `${month} месяц(ев) назад`;
    } else if (days > 0) {
      if (now > date) {
        if (days === 1) {
          return `${time}, вчера`;
        }
        return `${days} дня(ей) назад`;
      } else {
        return `через ${days} дня(ей)`;
      }
    } else {
      return `${time}, сегодня`;
    }
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
      blockType
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
          backgroundColor: colorValue
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
                <NoteActions
                  id={id}
                  moveToArchive={this.moveToArchive}
                  editNote={this.editNote}
                />
              </div>
              {created && (
                <div className={styles.date}>
                  {this.getReadableDate(created)}
                </div>
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
  }),
  dispatch => ({
    onMoveToArchive: (id) => {
      dispatch(changeNoteStatus({
        payload: {
          id,
          inArchive: true,
        }
      }));
    },
  })
)(NoteBlock);
