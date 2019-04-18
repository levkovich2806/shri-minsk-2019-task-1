import React, { PureComponent } from "react";
import styles from "./index.module.scss";

class ColorBlock extends PureComponent {
  render() {
    const {
      color: { color = "orange", id },
      changeStatus,
      checked = false
    } = this.props;
    return (
      <label className={styles.container}>
        <input
          type="checkbox"
          defaultChecked={checked}
          onClick={() => changeStatus(id)}
        />
        <span className={styles.checkmark} style={{ backgroundColor: color }} />
      </label>
    );
  }
}

export default ColorBlock;
