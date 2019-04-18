import React from "react";
import moment from "moment";

import styles from "./index.module.scss";

function getReadableData(date) {
  const normalDate = moment.unix(date);
  const time = moment.unix(date).format("HH:mm");
  const days = moment().diff(normalDate, "days");
  if (days > 0) {
    if (days === 1) {
      return `Завтра в ${time}`;
    }
    return `Осталось ${days} дня(дней)`;
  } else {
    return `Сегодня в ${time}`;
  }
}

function NoteReminder(props) {
  return (
    <div className={styles.reminder}>
      <div className={styles.reminder__image}>
        <img src="./images/reminder20.png" alt="Напоминание" />
      </div>
      <div className={styles.reminder__text}>
        {getReadableData(props.reminder)}
      </div>
    </div>
  );
}

export default NoteReminder;
