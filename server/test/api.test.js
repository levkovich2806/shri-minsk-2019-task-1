const request = require("supertest");
const app = require("../index");
describe("Test call API", () => {
  test("api/cars GET - statusCode equal 200", done => {
    request(app)
      .get("/api/cards")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("api/cars POST - statusCode equal 200", done => {
    const data = {
      card: {
        id: 5,
        type: "text",
        title: "Скидки в Виталюре",
        text: "На филе лосося и картоху",
        tags: [0],
        size: "m",
        reminder: 1552640400000,
        created: 1550653200000
      }
    };

    request(app)
      .post("/api/cards")
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });
});
