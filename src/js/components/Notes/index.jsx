import React, { Component } from "react";
import { getNotes } from '../../actions/index'
import Note from "../Note";
import NotesTitle from "../NotesTitle";
import { connect } from 'react-redux';

import styles from "./index.module.scss";

class Notes extends Component {

  componentDidMount = () => {
    const { onGetNotes } = this.props;
    onGetNotes();
  }

  render() {
    const { notes: { list } } = this.props;
    console.log(list);
    return (
      <div className={styles.notes}>
        <NotesTitle />
        <div className={styles.notes__content}>
          {list.map(data => (
            <Note key={data.created} {...data} />
          ))}
        </div>
      </div>
    );
  }
}

//this.props.onAddNote();

export default connect(
  state => ({
    notes: state.notes,
  }),
  dispatch => ({
    onAddNote: (note) => {
      dispatch({
        type: "ADD_NOTE",
        payload: note,
      })
    },
    onGetNotes: () => {
      dispatch(getNotes());
    }
  })
)(Notes);
