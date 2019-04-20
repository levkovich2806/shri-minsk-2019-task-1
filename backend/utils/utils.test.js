const utils = require("./utils");
const json = require("./cards.json");

describe("Server Utils", function () {

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

  test("createQueryFilter", () => {
    const filter = "2,3,6";

    expect(utils.createQueryFilter(filter)).toEqual({
      colors: ["2", "3", "6"],
      colorTest: true
    });
  });

  test("getColorsHash", () => {
    const colors = [
      {
        "id": 0,
        "color": "#E84747"
      },
      {
        "id": 1,
        "color": "#F2994A"
      },
      {
        "id": 2,
        "color": "#F2C94C"
      }
    ];

    expect(utils.getColorsHash(colors)).toEqual({
      0: {
        "id": 0,
        "color": "#E84747"
      },
      1: {
        "id": 1,
        "color": "#F2994A"
      },
      2: {
        "id": 2,
        "color": "#F2C94C"
      }
    });
  });

  test("getCardSequence", () => {
    global.cardSequence = 15;
    expect(utils.getCardSequence()).toEqual(16);
  });

  test("checkColorCorrect", () => {
    expect(utils.checkColorCorrect(3)).toEqual(true);
  });

  test("getCardSize", () => {
    const { notes } = json;
    expect(utils.getCardSize(notes[0])).toEqual("l");
    expect(utils.getCardSize(notes[1])).toEqual("s");
    expect(utils.getCardSize(notes[2])).toEqual("s");
    expect(utils.getCardSize(notes[3])).toEqual("s");
    expect(utils.getCardSize(notes[4])).toEqual("s");
    expect(utils.getCardSize(notes[5])).toEqual("s");
    expect(utils.getCardSize(notes[6])).toEqual("m");
    expect(utils.getCardSize(notes[7])).toEqual("m");
    expect(utils.getCardSize(notes[8])).toEqual("m");
    expect(utils.getCardSize(notes[9])).toEqual("s");
    expect(utils.getCardSize(notes[10])).toEqual("s");
  });

  test("createQueryFilter", () => {
    const color = "2,3,6";
    console.log(utils.createQueryFilter(color));
    expect(utils.createQueryFilter(color)).toEqual({
      colors: [
        "2",
        "3",
        "6"
      ],
      colorTest: true,
    });
  });

  test("createQueryFilter", () => {
    const color = "2,3,28";
    expect(utils.createQueryFilter(color)).toEqual({
      colors: [
        "2",
        "3",
        "28"
      ],
      colorTest: false,
    });
  });

});
