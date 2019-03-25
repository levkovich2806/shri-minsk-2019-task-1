let cardsList = ["test", "test1"];

function get_cards_list() {
  console.log("get_cards_list");
  return new Promise((resolve, reject) => {
    // Иммитируем долгий ответ сервер - 2 сек
    setTimeout(() => {
      resolve(cardsList);
    }, 2000);
  });
}

function setCardsList(list = []) {
  cardsList = list;
}

module.exports = { get_cards_list, setCardsList };