import React from "react";
import styles from "./index.module.scss";

function Description(props) {
  return (
    <div className={styles.description}>
      <span className={styles.description__title}>Описание: </span>
      <textarea
        className={styles.description__area}
        onChange={props.onChange}
      />
    </div>
  );
}

export default Description;
