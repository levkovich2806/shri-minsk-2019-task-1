import React from "react";
import styles from "./index.module.scss";

function Title(props) {
  return (
    <div className={styles.title}>
      <span className={styles.title__title}>Название: </span>
      <input
        type="text"
        className={styles.title__input}
        onChange={props.onChange}
        required
      />
    </div>
  );
}

export default Title;
