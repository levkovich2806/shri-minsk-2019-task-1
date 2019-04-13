import React, { PureComponent } from "react";
import ColorBlock from "../ColorBlock";
import { connect } from 'react-redux';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import styles from "./index.module.scss";

class NotesTitle extends PureComponent {
  render() {
    const { colors, isLoading } = this.props;

    if (isLoading) {
      return (
        <div className={styles.title}>
          <SkeletonTheme color="#fff" highlightColor="#444">
            <Skeleton width={300} height={42} />
          </SkeletonTheme>
        </div>
      );
    }

    return (
      <div className={styles.title}>
        <div className={styles.title_text}>Заметки</div>
        <div className={styles.title_blocks}>
          {colors.map(({ color }) => <ColorBlock key={color} color={color} />)}
        </div>
      </div>
    );
  }
}

export default connect(
  state => ({
    colors: state.notes.colors,
    isLoading: state.notes.isLoadingMainData,
  }),
)(NotesTitle);
