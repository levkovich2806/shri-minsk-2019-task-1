import React, { PureComponent } from "react";
import ColorBlock from "../ColorBlock";
import { connect } from 'react-redux';
import { getNotes, getArchiveNotes } from '../../actions';
import styles from "./index.module.scss";

class NotesTitle extends PureComponent {

  changeFilterStatus = async (id) => {
    const { onChangeFilter } = this.props;
    await onChangeFilter(id);
    await this.getFilteredData();
  }

  getFilteredData = () => {
    const { filters, onGetFilteredData, isArchive } = this.props;
    onGetFilteredData(filters, isArchive);
  }

  render() {
    const { colors } = this.props;

    return (
      <div className={styles.title}>
        <div className={styles.title_text}>Заметки</div>
        <div className={styles.title_blocks}>
          {colors.map(color =>
            <ColorBlock
              key={color.id}
              color={color}
              changeStatus={this.changeFilterStatus}
            />
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    colors: state.notes.colors,
    filters: state.notes.filters,
    isArchive: state.notes.isArchive,
  }),
  dispatch => ({
    onChangeFilter: (id) => {
      dispatch({
        type: "ON_CHANGE_FILTERS",
        payload: {
          id
        }
      })
    },
    onGetFilteredData: (filters, isArchive) => {
      if (isArchive) {
        dispatch(getArchiveNotes(filters));
      } else {
        dispatch(getNotes(filters));
      }
    }
  })
)(NotesTitle);
