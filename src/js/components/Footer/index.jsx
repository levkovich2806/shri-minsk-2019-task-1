import React, { PureComponent } from "react";
import styles from "./index.module.scss";

class Footer extends PureComponent {
  render() {
    return (
      <div className={styles.footer}>
        <div className={styles.footer__author}>Сергей Левкович</div>
        <div className={styles.footer__copyright}>&copy; Яндекс ШРИ</div>
      </div>
    );
  }
}

export default Footer;
