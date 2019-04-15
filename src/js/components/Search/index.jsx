import React, { PureComponent } from "react";
import styles from "./index.module.scss";

class Search extends PureComponent {
  searchInput = React.createRef();

  onClear = () => {
    this.searchInput.current.value = "";
  };

  render() {
    return (
      <span className={styles.search}>
        <input
          type="text"
          className={styles.search__text}
          placeholder="Поиск"
          ref={this.searchInput}
        />
        <span className={styles.search__clear} onClick={this.onClear}>
          &times;
        </span>
        <span className={styles.search__submit}>Найти</span>
      </span>
    );
  }
}

export default Search;
