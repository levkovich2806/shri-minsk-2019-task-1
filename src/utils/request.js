//Экспортируем, что бы можно "из вне" проставить заранее какой-то header
export const headers = {};

/**
 * Функция для отправки и обработки ответа с сервера. 
 * url - ссылка не ресурс
 * params - объект с параметрами запроса
 * body - данные для передачи, 
 * method - метод по которому происходит запрос на сервер
 * header - дополнительные параметры заголовка запроса
 */
export default async function sendRequest({ url, params: { body, method, header } }) {
  let parameters = {
    method: method,
  };

  //Собираем воедино header
  parameters.headers = {
    ...headers,
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    ...header,
  };

  //Если GET запрос, то заголовка у нас нет (в нашем случае будет только GET без body)
  if (method !== "GET") {
    parameters.body = JSON.stringify(body);
  }

  const result = await window.fetch(url, parameters)
    .then(checkstatus)
    .then(text => {
      try {
        return JSON.parse(text);
      } catch (err) {
        return text ? text : true;
      }
    })
    .catch((error) => {
      return false;
    });
  return result;
}

//Проверяем статус и параметры ответа - в частности обработана ситуация, когда нам приходит не только JSON, но и обычный текст
const checkstatus = function (response) {
  return new Promise((resolved, rejected) => {
    if (response.status >= 400) {
      try {
        JSON.parse(response)
          .then((json) => {
            rejected(json);
          })
      } catch (err) {
        if (response) {
          response.text().then((text) => {
            rejected(text);
          });
        }
      }

    } else {
      resolved(response.text());
    }
  });
}