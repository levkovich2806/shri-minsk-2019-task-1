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
    const { notes, isLoadingNotes } = this.props;

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
    searchText: state.search.searchText,
    notes: state.notes.notes.filter(note => {
      let { searchText } = state.search;

      if (searchText.length === 0) {
        return note;
      }

      searchText = searchText.toLowerCase();

      if (note.title) {
        let { title } = note;
        title = title.toLowerCase();
        if (title.includes(searchText)) {
          return note;
        }
      }

      if (note.text) {
        let { text } = note;
        text = text.toLowerCase();
        if (text.includes(searchText)) {
          return note;
        }
      }

      return false;
    }),
    isLoadingNotes: state.notes.isLoadingNotes
  }),
  dispatch => ({
    onGetNotesData: () => {
      dispatch(getNotesData());
    }
  })
)(Notes);
