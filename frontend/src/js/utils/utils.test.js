import { getReadableDate, getBackgroundColor, getReadableReminder } from "./utils";

describe("ReadableDate", function () {
  test("Readable date", () => {
    let d = new Date();
    d.setMonth(d.getMonth() - 3);

    expect(getReadableDate(d)).toBe("3 месяц(ев) назад");
  });

  test("Readable date", () => {
    let d = new Date();
    d.setDate(d.getDate() - 2);

    expect(getReadableDate(d)).toBe("2 дня(ей) назад");
  });

  test("Test create background color with opacity", () => {
    const color = "#AAFF00";

    expect(getBackgroundColor(color)).toBe("rgb(221,255,153)");
  });

  test("Readable reminder", () => {
    let d = new Date();
    d.setDate(d.getDate() - 2);

    expect(getReadableReminder(d)).toBe("Прошло 2 дня(дней)");
  });

  test("Readable reminder", () => {
    let d = new Date();
    d.setDate(d.getDate() + 2);

    expect(getReadableReminder(d)).toBe("Осталось 2 дня(дней)");
  });

});
