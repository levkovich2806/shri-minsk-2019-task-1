import { getReadableDate } from "./utils";

describe("ReadableDate", function() {
  test("Readable date", () => {
    var d = new Date();
    d.setMonth(d.getMonth() - 3);

    expect(getReadableDate(d)).toBe("3 месяц(ев) назад");
  });

  test("Readable date", () => {
    var d = new Date();
    d.setDate(d.getDate() - 2);

    expect(getReadableDate(d)).toBe("2 дня(ей) назад");
  });
});
