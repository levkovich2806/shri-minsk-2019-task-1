import sendRequest from "../utils/request";

const API = "http://localhost:8000";
const NOTE_STATUS = {
  archive: 0,
  inUse: 1
};

/**
 * Запрашиваем с сервера список заметок, тэгов, цветов (заметки - все кроме архивных)
 */
export const getNotesData = () => async dispatch => {
  dispatch({ type: "FETCH_ON_GET_NOTES_DATA_START" });

  const data = await sendRequest({
    url: `${API}/api/cards/data`,
    params: {
      method: "GET"
    }
  });
  dispatch({ type: "FETCH_ON_GET_NOTES_DATA_SUCCESS", payload: data });
  dispatch({ type: "FETCH_ON_GET_NOTES_DATA_STOP" });
};

/**
 * Запрашиваем с сервера список заметок (все кроме архивных)
 */
export const getNotes = (filters) => async dispatch => {
  dispatch({ type: "FETCH_ON_GET_NOTES_START" });

  let url = `${API}/api/cards`;
  if (filters && filters.length > 0) {
    let filterList = filters.join(",");
    url += `?color=${filterList}`;
  }

  const data = await sendRequest({
    url,
    params: {
      method: "GET"
    }
  });
  dispatch({ type: "FETCH_ON_GET_NOTES_SUCCESS", payload: data });
  dispatch({ type: "FETCH_ON_GET_NOTES_STOP" });
};

/**
 * Запрашиваем с сервера только "архивированные" карточки
 */
export const getArchiveNotes = (filters) => async dispatch => {
  dispatch({ type: "FETCH_ON_GET_ARCHIVE_START" });

  let url = `${API}/api/cards/archive`;
  if (filters && filters.length > 0) {
    let filterList = filters.join(",");
    url += `?color=${filterList}`;
  }

  const data = await sendRequest({
    url,
    params: {
      method: "GET"
    }
  });

  dispatch({ type: "FETCH_ON_GET_ARCHIVE_SUCCESS", payload: data });
  dispatch({ type: "FETCH_ON_GET_ARCHIVE_STOP" });
};

/**
 * Добавляем новую заметку
 */

export function addNote({ payload: { card = {} } }) {
  return sendRequest({
    url: `${API}/api/cards`,
    params: {
      method: "POST",
      body: {
        card
      }
    }
  });
}

/**
 * Удаляем заметку
 */
export function deleteNote({ payload: { id = 0 } }) {
  return sendRequest({
    url: `${API}/api/cards/${id}`,
    params: {
      method: "DELETE"
    }
  });
}

/**
 * Обновляем заметку
 */
export function updateNote({ payload: { note = {}, id = 0 } }) {
  console.log(note, id);
  return sendRequest({
    url: `${API}/api/cards/${id}`,
    params: {
      method: "PATCH",
      body: {
        card: note
      }
    }
  });
}

/**
 * Изменяем статус заметки - если inArchive - "отправлеям" в архив, иначе "восстанавливаем" из архива
 */
export function changeNoteStatus({ payload: { id = 0, inArchive = true } }) {
  console.log(id, inArchive);
  const { archive, inUse } = NOTE_STATUS;

  let status = archive;
  if (!inArchive) {
    status = inUse;
  }

  return sendRequest({
    url: `${API}/api/cards/${id}`,
    params: {
      method: "PATCH",
      body: {
        card: {
          status
        }
      }
    }
  });
}
