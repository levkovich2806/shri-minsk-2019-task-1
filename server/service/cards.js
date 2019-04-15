const utils = require("../utils/utils");

/**
 * Получаем список заметок. Если в query есть параметр filter, то список будет отфильтрован по нему
 */
const get_cards_list = ({ query }) => {
  let colors;
  if (query && query.colors) {
    colors = query.colors;
  }

  let data = getFilteredData({
    colors,
    isArchive: false
  });

  return new Promise((resolve, reject) => {
    if (data) {
      resolve({
        status: 200,
        data: data
      });
    }
    reject({
      status: 500,
      error: "Ошибка получения данных"
    });
  });
};

/**
 * Получаем список "архивных" заметок
 */
const getCardArchive = ({ query }) => {
  let colors;
  if (query && query.colors) {
    colors = query.colors;
  }

  let archive = getFilteredData({
    colors,
    isArchive: true
  });

  return new Promise((resolve, reject) => {
    //Пустой архив тоже хорошо, его так же возвращаем с 200 кодом
    if (archive) {
      resolve({
        status: 200,
        data: archive
      });
    }

    reject({
      status: 500,
      error: "Ошибка получения архива"
    });
  });
};

/**
 * Возвращаем отфильтрованный список заметок
 */
const getFilteredData = ({ colors = false, isArchive = false } = {}) => {
  const cards = getCards();
  return cards.filter(
    item =>
      (colors ? colors.includes(String(item.color)) : true) &&
      (isArchive ? item.status === 0 : item.status !== 0)
  );
};

/**
 * Получаем полный список заметок (вне зависимости от статуса)
 */
const getCards = () => {
  return global.cardsData.notes;
};

/**
 * Добавляем заметку в массив заметок
 */
const addCard = card => {
  if (!card.size) {
    card.size = utils.getCardSize(card);
  }
  return global.cardsData.notes.push(card);
};

/**
 * Удаляем заметку из массива заметок
 */
const deleteCard = id => {
  let isDelete = false;
  global.cardsData.notes = global.cardsData.notes.filter(item => {
    if (item.id !== id) {
      return item;
    } else {
      isDelete = true;
      return false;
    }
  });
  return new Promise((resolve, reject) => {
    if (isDelete) {
      resolve({
        status: 200,
        data: "Заметка удалена"
      });
    }
    reject({
      status: 500,
      error: "Ошибка удаления заметки или такой заметки не существует"
    });
  });
};

/**
 * Обновляем инфомрацию по заметке
 */
const updateCard = (id, card) => {
  let isModify = false;
  global.cardsData.notes = global.cardsData.notes.map(item => {
    if (item.id === id) {
      isModify = true;
      return { ...item, ...card };
    }
    return item;
  });

  return new Promise((resolve, reject) => {
    if (isModify) {
      resolve({
        status: 200,
        data: "Заметка обновлена"
      });
    }
    reject({
      status: 500,
      error: "Ошибка обновления заметки или такой заметки не существует"
    });
  });
};

const getCardTags = () => {
  return new Promise((resolve, reject) => {
    const tags = global.cardsData.tags;
    if (tags) {
      resolve({
        status: 200,
        data: tags
      });
    }
    reject({
      status: 500,
      error: "Ошибка получения архива"
    });
  });
};

const getCardColors = () => {
  return new Promise((resolve, reject) => {
    const colors = global.cardsData.colors;
    if (colors) {
      resolve({
        status: 200,
        data: colors
      });
    }
    reject({
      status: 500,
      error: "Ошибка получения архива"
    });
  });
};

const getData = () => {
  return new Promise((resolve, reject) => {
    let cardsData = {};
    cardsData.colors = global.cardsData.colors;
    cardsData.tags = global.cardsData.tags;
    cardsData.notes = getFilteredData();
    if (cardsData) {
      resolve({
        status: 200,
        data: cardsData
      });
    }
    reject({
      status: 500,
      error: "Ошибка получения архива"
    });
  });
};

module.exports = {
  get_cards_list,
  deleteCard,
  addCard,
  updateCard,
  getCardArchive,
  getCardTags,
  getCardColors,
  getData
};
