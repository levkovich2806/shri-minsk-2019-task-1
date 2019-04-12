import React, { Component } from "react";
import styles from "./index.module.scss";

import Header from "./Header";
import Notes from "./Notes";
import Footer from "./Footer";

class App extends Component {
  render() {
    return (
      <div className={styles.body}>
        <Header />
        <div className={styles.notesContainer}>
          <Notes />
        </div>
        <div className={styles.footer}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
