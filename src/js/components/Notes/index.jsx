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
            {notes.map(data => {
              const { created, id } = data;
              const key = `${created}${id}`;
              return <Note key={key} {...data} />;
            })}
          </div>
        )}
      </div>
    );
  }
}

export default connect(
  state => ({
    data: state.notes,
    isLoadingNotes: state.notes.isLoadingNotes
  }),
  dispatch => ({
    onGetNotesData: () => {
      dispatch(getNotesData());
    }
  })
)(Notes);
