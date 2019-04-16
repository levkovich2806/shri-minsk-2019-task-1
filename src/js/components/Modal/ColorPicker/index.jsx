import React from "react";
import styles from "./index.module.scss";

function ColorPicker(props) {
  const { colors, checkedColor } = props;

  return (
    <div className={styles.colorlist}>
      <span className={styles.colorlist__title}>Цвет заметки: </span>
      <select
        size="3"
        className={styles.colorlist__list}
        onChange={props.onChange}
        value={checkedColor}
      >
        <option value="" style={{ backgroundColor: "#FFFFFF" }}>
          #FFFFFF
        </option>
        {colors.map(({ id, color }) => (
          <option
            key={color}
            value={id}
            style={{ backgroundColor: color }}
            checked={checkedColor === id}
          >
            {color}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ColorPicker;
