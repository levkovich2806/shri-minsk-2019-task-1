import rootReducer from "./search";
import { ON_SEARCH_NOTE } from '../constants/action-types';

describe("ReadableDate", function () {
  test("Readable date", () => {

    const search = {
      type: ON_SEARCH_NOTE,
      payload: {
        text: "Заметка"
      }
    };

    expect(rootReducer(false, search)).toEqual({
      searchText: "Заметка"
    });
  });

});
