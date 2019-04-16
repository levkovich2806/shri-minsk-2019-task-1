import React from "react";
import styles from "./index.module.scss";

function Title(props) {
  const { title = "", onChange } = props;

  return (
    <div className={styles.title}>
      <span className={styles.title__title}>Название: </span>
      <input
        name="title"
        type="text"
        className={styles.title__input}
        onChange={onChange}
        value={title}
      />
    </div>
  );
}

export default Title;
