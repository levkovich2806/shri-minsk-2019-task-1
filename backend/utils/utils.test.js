const utils = require("./utils");

describe("Server Utils", function() {
  test("createQueryFilter", () => {
    global.cardColorsHash = {
      2: {
        id: 2,
        color: "#000"
      },
      3: {
        id: 3,
        color: "#fff"
      },
      6: {
        id: 6,
        color: "#eee"
      }
    };

    const filter = "2,3,6";

    expect(utils.createQueryFilter(filter)).toEqual({
      colors: ["2", "3", "6"],
      colorTest: true
    });
  });
});
