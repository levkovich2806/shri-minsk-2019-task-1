import React from "react";
import styles from "./index.module.scss";

function TagList(props) {
  const { tags, checkedTags } = props;
  console.log(checkedTags);
  return (
    <div className={styles.taglist}>
      <span className={styles.taglist__title}>Тэги: </span>
      <select
        multiple
        size="3"
        className={styles.taglist__list}
        onChange={props.onChange}
        value={checkedTags}
      >
        {tags.map(({ id, tag }) => (
          <option key={tag} value={id} className={styles.taglist__list_item}>
            {tag}
          </option>
        ))}
      </select>
    </div>
  );
}

export default TagList;
