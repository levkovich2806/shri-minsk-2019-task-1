import React, { PureComponent } from "react";
import styles from "./index.module.scss";

class Footer extends PureComponent {
  render() {
    const { author, copyright } = this.props;
    return (
      <div className={styles.footer}>
        <div className={styles.footer__author}>{author}</div>
        <div className={styles.footer__copyright}>&copy; {copyright}</div>
      </div>
    );
  }
}

export default Footer;
