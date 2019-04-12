import React from "react";
import styles from "./index.module.scss";

function Tag(props) {
  return <div className={styles.tag}>{props.tag}</div>;
}

export default Tag;
