import React, { Component } from "react";
import styles from "./index.module.scss";

import { AUTHOR, COPYRIGHT } from "./constants/main";
import {
  ON_SHOW_MODAL,
  ON_HIDE_MODAL,
  SET_ADD_NOTE_STATE
} from "./constants/action-types";
import { connect } from "react-redux";

import Header from "./components/Header";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

class App extends Component {
  render() {
    const { modalVisible, onShowAddModal, onHideModal } = this.props;

    return (
      <div className={styles.body}>
        <Header showModal={onShowAddModal} />
        <div className={styles.notesContainer}>
          <Notes />
        </div>
        <div className={styles.footer}>
          <Footer author={AUTHOR} copyright={COPYRIGHT} />
        </div>
        {modalVisible && <Modal hideModal={onHideModal} />}
      </div>
    );
  }
}

export default connect(
  state => ({
    modalVisible: state.notes.modalVisible
  }),
  dispatch => ({
    onShowAddModal: () => {
      dispatch({
        type: SET_ADD_NOTE_STATE
      });
      dispatch({
        type: ON_SHOW_MODAL
      });
    },
    onHideModal: () => {
      dispatch({
        type: ON_HIDE_MODAL
      });
    }
  })
)(App);
