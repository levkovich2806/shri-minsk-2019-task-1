import React, { PureComponent } from "react";
import styles from "./index.module.scss";

class ColorBlock extends PureComponent {
  render() {
    const { color = "orange", checked = true } = this.props;
    return (
      <label className={styles.container}>
        <input type="checkbox" defaultChecked={checked} />
        <span className={styles.checkmark} style={{ backgroundColor: color }} />
      </label>
    )
  }
}

export default ColorBlock;
