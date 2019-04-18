import React, { PureComponent } from "react";
import { ON_SEARCH_NOTE } from "../../constants/action-types";
import { connect } from "react-redux";
import styles from "./index.module.scss";

class Search extends PureComponent {
  searchInput = React.createRef();

  handleInputKeyDown = e => {
    if (e.key === "Enter") {
      this.onSearchChange();
    }
  };

  onClear = () => {
    this.searchInput.current.value = "";
    this.onSearchChange();
  };

  onSearchChange = () => {
    const { onSearchTextChange } = this.props;
    const searchText = this.searchInput.current.value;
    onSearchTextChange(searchText);
  };

  render() {
    return (
      <span className={styles.search}>
        <input
          type="text"
          className={styles.search__text}
          placeholder="Поиск"
          ref={this.searchInput}
          onKeyDown={this.handleInputKeyDown}
        />
        <span className={styles.search__clear} onClick={this.onClear}>
          &times;
        </span>
        <span className={styles.search__submit} onClick={this.onSearchChange}>
          Найти
        </span>
      </span>
    );
  }
}

export default connect(
  state => ({
    searchText: state.search.searchText
  }),
  dispatch => ({
    onSearchTextChange: text => {
      dispatch({
        type: ON_SEARCH_NOTE,
        payload: {
          text
        }
      });
    }
  })
)(Search);
