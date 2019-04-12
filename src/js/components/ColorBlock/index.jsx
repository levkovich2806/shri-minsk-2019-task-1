import React, { PureComponent } from "react";
import styles from "./index.module.scss";

class ColorBlock extends PureComponent {
  render() {
    const { color = "orange" } = this.props;
    return <div className={styles.block} style={{ backgroundColor: color }} />;
  }
}

export default ColorBlock;
