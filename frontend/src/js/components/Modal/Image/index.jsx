import React from "react";
import styles from "./index.module.scss";

function Image(props) {
  const { url = "", onChange } = props;

  return (
    <div className={styles.image}>
      <span className={styles.image__title}>Изображение (ссылка): </span>
      <input
        type="text"
        className={styles.image__input}
        onChange={onChange}
        value={url}
      />
    </div>
  );
}

export default Image;
