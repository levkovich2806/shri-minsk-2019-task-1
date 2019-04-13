import React, { Component } from "react";
import { getNotesData } from '../../actions/index'
import Note from "../Note";
import NotesTitle from "../NotesTitle";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import { connect } from 'react-redux';

import styles from "./index.module.scss";

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
          <SkeletonTheme color="#fff" highlightColor="#444">
            <Skeleton width={300} height={42} />
          </SkeletonTheme>
        </div>
      );
    }

    return (
      <div className={styles.notes}>
        <NotesTitle />
        {isLoadingNotes
          ?
          <SkeletonTheme color="#fff" highlightColor="#444">
            <Skeleton width={300} height={42} />
          </SkeletonTheme>
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
