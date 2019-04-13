const utils = require('../utils/utils');

/**
 * Получаем список заметок. Если в query есть параметр filter, то список будет отфильтрован по нему
 */
const get_cards_list = ({ query }) => {
  let data = getUsedCards();
  if (query && query.filter) {
    data = getFilteredData(query.filter);
  }

  return new Promise((resolve, reject) => {
    setTimeout(() => {
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
    }, 1000);
  });
}

/**
 * Возвращаем отфильтрованный список заметок
 */
const getFilteredData = ({ filterName = "", filterValue = "" }) => {
  const cards = getUsedCards();
  const valueType = getFilterValueType(filterName);
  return cards.filter((item) => {
    if (valueType === "string") {
      return item[filterName].include(filterValue);
    } else if (valueType === "number") {
      return item[filterName] === Number(filterValue);
    }
  });
}

/**
 * Получаем список только "неархивных" заметок
 */
const getUsedCards = () => {
  const cards = getCards();
  return cards.filter(item => item.status !== 0);
}

/**
 * Получаем полный список заметок (вне зависимости от статуса)
 */
const getCards = () => {
  return global.cardsData.notes;
}

/**
 * По имени фильтра возвращаем тип его значения
 */
const getFilterValueType = (filterName) => {
  switch (filterName) {
    case "color":
      return "number";
    case "text":
      return "string";
    default:
      return "number";
  }
}

/**
 * Добавляем заметку в массив заметок
 */
const addCard = (card) => {
  if (!card.size) {
    card.size = utils.getCardSize(card);
  }
  return global.cardsData.notes.push(card);
}

/**
 * Удаляем заметку из массива заметок
 */
const deleteCard = (id) => {
  let isDelete = false;
  global.cardsData.notes = global.cardsData.notes.filter((item) => {
    if (item.id !== id) {
      return item;
    } else {
      isDelete = true;
    }
  });
  return new Promise((resolve, reject) => {
    setTimeout(() => {
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
    }, 1000);
  });
}

/**
 * Обновляем инфомрацию по заметке
 */
const updateCard = (id, card) => {
  let isModify = false;
  global.cardsData.notes = global.cardsData.notes.map((item) => {
    if (item.id === id) {
      isModify = true;
      return { ...item, ...card };
    }
    return item;
  });

  return new Promise((resolve, reject) => {
    setTimeout(() => {
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
    }, 1000);
  });
}

/**
 * Получаем список "архивных" заметок
 */
const getCardArchive = () => {
  const cards = getCards();
  const archive = cards.filter(card => card.status === 0);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
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
    }, 1000);
  });
}

module.exports = { get_cards_list, deleteCard, addCard, updateCard, getCardArchive };
