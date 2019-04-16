import React, { PureComponent } from "react";
import {
  ON_SEARCH_NOTE,
} from "../../constants/action-types";
import { connect } from "react-redux";
import styles from "./index.module.scss";

class Search extends PureComponent {
  searchInput = React.createRef();

  onClear = () => {
    this.searchInput.current.value = "";
  };

  onSearchChange = e => {
    const searchText = e.target.value;
    const { onSearchTextChange } = this.props;
    onSearchTextChange(searchText);
  }

  render() {
    return (
      <span className={styles.search}>
        <input
          type="text"
          className={styles.search__text}
          placeholder="Поиск"
          ref={this.searchInput}
          onChange={this.onSearchChange}
        />
        <span className={styles.search__clear} onClick={this.onClear}>
          &times;
        </span>
        <span className={styles.search__submit}>Найти</span>
      </span>
    );
  }
}

export default connect(
  state => ({
    searchText: state.search.searchText,
  }),
  dispatch => ({
    onSearchTextChange: text => {
      dispatch({
        type: ON_SEARCH_NOTE,
        payload: {
          text,
        }
      });
    },
  })
)(Search);
