const json = require("./cards.json");

/**
 * Получаем список заметок и ложим их в глобальную переменную.
 * Так же, для быстрого доступа к элементам цветов, кладем их в hash, что бы при, минимум, проверке цвета на корректность делать это без постоянного прохода циклом по массиву
 */
const getCardsData = () => {
  global.cardsData = json;
  global.cardSequence = setCardSequence();
  global.cardColorsHash = getColorsHash(global.cardsData.colors);
};

/**
 * Кладем цвета в хэш
 */
const getColorsHash = colors => {
  let hash = {};
  colors.forEach(item => {
    const { id } = item;
    hash[id] = item;
  });
  return hash;
};
/**
 * Получаем начальное значение счетчика id заметок
 */
const setCardSequence = () => {
  const { notes } = global.cardsData;
  return notes.reduce((max, item) => {
    if (item.id > max) {
      max = item.id;
    }
    return max;
  }, 0);
};

/**
 * Возвращаем увеличенный на 1 ID карты (в боевых условиях этот счетчик лежал бы в отдельной коллекции (таблице) БД)
 */

const getCardSequence = () => {
  return ++global.cardSequence;
};

/**
 * Проверяем, что цвет есть в хэше цветов
 */
const checkColorCorrect = color => {
  return !!global.cardColorsHash[color];
};

/**
 * Получаем размер заметки исходя из ее содержимого
 */
const getCardSize = note => {
  const { type, tags, text, attachment, items } = note;

  let mediumCount = 0;

  if (type === "list") {
    if (items) {
      const itemLength = items.length;
      if (itemLength > 20) {
        return "l";
      } else {
        mediumCount++;
      }
    }
  }

  if (type === "image") {
    mediumCount++;
  }

  if (type === "text") {
    if (text) {
      let textLength = text.length;
      if (textLength > 450) {
        return "l";
      } else if (textLength > 150) {
        mediumCount++;
      }
    }
  }

  if (tags && tags.length > 5) {
    mediumCount++;
  }

  if (attachment && attachment.length > 3) {
    mediumCount++;
  }

  if (mediumCount > 2) {
    return "l";
  } else if (mediumCount > 0) {
    return "m";
  } else {
    return "s";
  }
};

const createQueryFilter = color => {
  const colors = color.split(",");
  const colorTest = colors.every(color => checkColorCorrect(color));
  return {
    colors,
    colorTest
  };
};

module.exports = {
  getCardsData,
  checkColorCorrect,
  getCardSequence,
  getCardSize,
  createQueryFilter
};
