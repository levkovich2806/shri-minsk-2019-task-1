import React, { Component } from "react";
import styles from "./index.module.scss";

import { AUTHOR, COPYRIGHT } from "./constants/main";

import Header from "./components/Header";
import Notes from "./components/Notes";
import Footer from "./components/Footer";
import Modal from "./components/Modal";

class App extends Component {
  state = {
    modalVisible: false
  };

  showModal = () => {
    this.setState({
      modalVisible: true
    });
  };

  hideModal = () => {
    this.setState({
      modalVisible: false
    });
  };

  render() {
    const { modalVisible } = this.state;

    return (
      <div className={styles.body}>
        <Header showModal={this.showModal} />
        <div className={styles.notesContainer}>
          <Notes />
        </div>
        <div className={styles.footer}>
          <Footer author={AUTHOR} copyright={COPYRIGHT} />
        </div>
        {modalVisible && (
          <Modal
            hideModal={this.hideModal}
            addNote={this.addNote}
            editNote={this.editNote}
          />
        )}
      </div>
    );
  }
}

export default App;
