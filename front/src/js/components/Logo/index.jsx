import React, { PureComponent } from "react";
import styles from "./index.module.scss";

class Logo extends PureComponent {
  render() {
    return (
      <a href="ya.ru" className={styles.logo}>
        <img src="images/logo.svg" alt="Логотоп" />
      </a>
    );
  }
}

export default Logo;
