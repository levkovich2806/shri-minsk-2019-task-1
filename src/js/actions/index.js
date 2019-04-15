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
 * Запрашиваем с сервера список заметок
 */
export const getNotes = ({ changeStatus = false } = {}) => async (
  dispatch,
  getState
) => {
  const { filters, isArchive } = getState().notes;

  let status = changeStatus ? !isArchive : isArchive;
  let url = `${API}/api/cards`;

  if (status) {
    dispatch({ type: "FETCH_ON_GET_ARCHIVE_START" });
    url += `/archive`;
  } else {
    dispatch({ type: "FETCH_ON_GET_NOTES_START" });
  }

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
 * Добавляем новую заметку
 */

export const addNote = ({ payload: { note = {} } }) => dispatch => {
  console.log(note);
  return sendRequest({
    url: `${API}/api/cards`,
    params: {
      method: "POST",
      body: {
        card: note
      }
    }
  });
};

/**
 * Удаляем заметку
 */
export const deleteNote = ({ payload: { id = 0 } }) => dispatch => {
  return sendRequest({
    url: `${API}/api/cards/${id}`,
    params: {
      method: "DELETE"
    }
  });
};

/**
 * Обновляем заметку
 */
export const updateNote = ({ payload: { note = {}, id = 0 } }) => dispatch => {
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
};

/**
 * Изменяем статус заметки - если inArchive - "отправлеям" в архив, иначе "восстанавливаем" из архива
 */
export const changeNoteStatus = ({
  payload: { id = 0, inArchive = true }
} = {}) => async (dispatch, getState) => {
  const { archive, inUse } = NOTE_STATUS;

  let status = archive;
  if (!inArchive) {
    status = inUse;
  }

  dispatch({ type: "FETCH_ON_MOVE_ARCHIVE_START" });

  await sendRequest({
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
  dispatch({ type: "FETCH_ON_MOVE_ARCHIVE_STOP" });
  dispatch(getNotes());
};
