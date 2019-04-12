import React, { Component } from "react";
import classnames from "classnames";
import styles from "./index.module.scss";

class NoteLink extends Component {
  render() {
    const { url, last } = this.props;
    return (
      <div className={classnames(styles.link, !last && styles.link__border)}>
        <img src="./images/link24.png" className={styles.link__image} />
        <a href={url} target="_blank" className={styles.link__text}>
          {url}
        </a>
      </div>
    );
  }
}

export default NoteLink;
