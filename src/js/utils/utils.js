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

export const getBackgroundColor = color => {
  const opacity = 0.4;
  color = color.replace('#', '');

  let r = parseInt(color.substring(0, 2), 16);
  let g = parseInt(color.substring(2, 4), 16);
  let b = parseInt(color.substring(4, 6), 16);

  r = Math.round(r * opacity + 255 * (1 - opacity));
  g = Math.round(g * opacity + 255 * (1 - opacity));
  b = Math.round(b * opacity + 255 * (1 - opacity));

  return `rgb(${r},${g},${b})`;
}
