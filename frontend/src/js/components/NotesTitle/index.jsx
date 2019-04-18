import React, { PureComponent } from "react";
import ColorBlock from "../ColorBlock";
import { connect } from "react-redux";
import { getNotes } from "../../actions";
import styles from "./index.module.scss";

class NotesTitle extends PureComponent {
  changeFilterStatus = id => {
    const { onChangeFilter, onGetFilteredData } = this.props;
    onChangeFilter(id);
    onGetFilteredData();
  };

  render() {
    const { colors, filters } = this.props;

    return (
      <div className={styles.title}>
        <div className={styles.title_text}>Заметки</div>
        <div className={styles.title_blocks}>
          {colors.map(color => {
            const { id } = color;
            let checked = false;
            if (filters.includes(id)) {
              checked = true;
            }
            return (
              <ColorBlock
                key={id}
                color={color}
                checked={checked}
                changeStatus={this.changeFilterStatus}
              />
            );
          })}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    colors: state.notes.colors,
    filters: state.notes.filters,
    isArchive: state.notes.isArchive
  }),
  dispatch => ({
    onChangeFilter: id => {
      dispatch({
        type: "ON_CHANGE_FILTERS",
        payload: {
          id
        }
      });
    },
    onGetFilteredData: () => {
      dispatch(getNotes());
    }
  })
)(NotesTitle);
