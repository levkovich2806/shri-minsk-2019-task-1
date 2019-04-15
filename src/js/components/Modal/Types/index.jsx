import React from "react";
import styles from "./index.module.scss";

function Types(props) {
  return (
    <div className={styles.types}>
      <div className={styles.types__title}>Тип: </div>
      <div className={styles.types__item}>
        <input
          onChange={props.onChange}
          type="radio"
          id="text"
          name="type"
          value="text"
          defaultChecked
        />
        <label htmlFor="text">Текст</label>
      </div>
      <div className={styles.types__item}>
        <input
          onChange={props.onChange}
          type="radio"
          id="image"
          name="type"
          value="image"
        />
        <label htmlFor="image">Изображение</label>
      </div>
      <div className={styles.types__item}>
        <input
          onChange={props.onChange}
          type="radio"
          id="list"
          name="type"
          value="list"
        />
        <label htmlFor="list">Список</label>
      </div>
    </div>
  );
}

export default Types;
