import React, { Component } from "react";
import styles from "./index.module.scss";
import NoteLink from "../NoteBottomLink";
import NoteBottomImage from "../NoteBottomImage";

class NoteBottom extends Component {
  getBottomLinks = () => {
    const { attachments } = this.props;
    return attachments.map((item, index) => {
      let last = false;
      if (index + 1 === attachments.length) {
        last = true;
      }
      return <NoteLink key={item.url} url={item.url} last={last} />;
    });
  };

  getBottomImages = () => {
    const { attachments } = this.props;
    return attachments.map(item => {
      return <NoteBottomImage key={item.url} url={item.url} />;
    });
  };

  render() {
    const { attachments } = this.props;
    return (
      <div className={styles.bottom}>
        {attachments[0] && attachments[0].type === "link" && (
          <div className={styles.links}>{this.getBottomLinks()}</div>
        )}

        {attachments[0] && attachments[0].type === "image" && (
          <div className={styles.images}>
            <div className={styles.images__static}>
              <img src="./images/img24x20.png" alt="Приложение с картинками" />
            </div>
            <div className={styles.images__content}>
              {this.getBottomImages()}
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default NoteBottom;
