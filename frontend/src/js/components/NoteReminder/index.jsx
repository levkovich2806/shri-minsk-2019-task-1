import React from "react";

import styles from "./index.module.scss";
import { getReadableReminder } from '../../utils/utils';

function NoteReminder(props) {
  return (
    <div className={styles.reminder}>
      <div className={styles.reminder__image}>
        <img src="./images/reminder20.png" alt="Напоминание" />
      </div>
      <div className={styles.reminder__text}>
        {getReadableReminder(props.reminder)}
      </div>
    </div>
  );
}

export default NoteReminder;
