import moment from "moment";

export const getReadableDate = date => {
  date /= 1000;
  const now = moment().unix();
  const normalDate = moment.unix(date);
  const time = moment.unix(date).format("HH:mm");

  const years = moment().diff(normalDate, "years");
  const month = moment().diff(normalDate, "month");
  const days = moment().diff(normalDate, "days");

  if (years > 0) {
    return `${years} год(а) назад`;
  } else if (month > 0) {
    return `${month} месяц(ев) назад`;
  } else if (days > 0) {
    if (now > date) {
      if (days === 1) {
        return `${time}, вчера`;
      }
      return `${days} дня(ей) назад`;
    } else {
      return `через ${days} дня(ей)`;
    }
  } else {
    return `${time}, сегодня`;
  }
};
