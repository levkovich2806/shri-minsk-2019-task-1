import React from "react";
import styles from "./index.module.scss";

function AttachmentsTypes(props) {
  const { attachmentType, onChange } = props;

  return (
    <div className={styles.types}>
      <div className={styles.types__title}>Приложения:</div>
      <div className={styles.types__item}>
        <input
          type="radio"
          value="link"
          id="att_type_link"
          name="attachmentType"
          onChange={onChange}
          checked={attachmentType === "link"}
        />
        <label htmlFor="att_type_link">Ссылки</label>
      </div>
      <div className={styles.types__item}>
        <input
          type="radio"
          value="image"
          id="att_type_image"
          name="attachmentType"
          className={styles.types__item}
          onChange={onChange}
          checked={attachmentType === "image"}
        />
        <label htmlFor="att_type_image">Изображения</label>
      </div>
    </div>
  );
}

export default AttachmentsTypes;
