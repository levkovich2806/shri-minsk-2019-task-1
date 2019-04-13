import React, { Component } from "react";
import { getNotesData } from '../../actions/index'
import Note from "../Note";
import NotesTitle from "../NotesTitle";
import { connect } from 'react-redux';

import styles from "./index.module.scss";
import Loader from "../Loader";

class Notes extends Component {

  componentDidMount = () => {
    const { onGetNotesData } = this.props;
    onGetNotesData();
  }

  render() {
    const { data: { notes }, isLoadingMainData, isLoadingNotes } = this.props;

    if (isLoadingMainData) {
      return (
        <div className={styles.notes}>
          <Loader />
        </div>
      );
    }

    return (
      <div className={styles.notes}>
        <NotesTitle />
        {isLoadingNotes
          ?
          <Loader />
          :
          <div className={styles.notes__content}>
            {notes.map(data => (
              <Note key={data.created} {...data} />
            ))}
          </div>
        }
      </div>
    );
  }
}

export default connect(
  state => ({
    data: state.notes,
    isLoadingMainData: state.notes.isLoadingMainData,
    isLoadingNotes: state.notes.isLoadingNotes,
  }),
  dispatch => ({
    onAddNote: (note) => {
      dispatch({
        type: "ADD_NOTE",
        payload: note,
      })
    },
    onGetNotesData: () => {
      dispatch(getNotesData());
    }
  })
)(Notes);
