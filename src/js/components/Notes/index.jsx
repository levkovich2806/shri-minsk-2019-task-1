import React, { Component } from "react";
import { getNotesData } from "../../actions/index";
import Note from "../Note";
import NotesTitle from "../NotesTitle";
import { connect } from "react-redux";

import styles from "./index.module.scss";

class Notes extends Component {
  componentDidMount = () => {
    const { onGetNotesData } = this.props;
    onGetNotesData();
  };

  render() {
    const {
      data: { notes },
      isLoadingNotes
    } = this.props;

    return (
      <div className={styles.notes}>
        <NotesTitle />
        {!isLoadingNotes && (
          <div className={styles.notes__content}>
            {notes.map(data => (
              <Note key={data.created} {...data} />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    data: state.notes,
    isLoadingMainData: state.notes.isLoadingMainData,
    isLoadingNotes: state.notes.isLoadingNotes
  }),
  dispatch => ({
    onAddNote: note => {
      dispatch({
        type: "ADD_NOTE",
        payload: note
      });
    },
    onGetNotesData: () => {
      dispatch(getNotesData());
    }
  })
)(Notes);
