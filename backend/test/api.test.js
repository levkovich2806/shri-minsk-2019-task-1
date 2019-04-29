const request = require("supertest");
const app = require("../index");
describe("Test call API", () => {

  test("api/cards/data GET ALL DATA", async (done) => {

    const response = await request(app).get('/api/cards/data');

    expect(response.status).toBe(200);

    const { body } = response;
    expect(body).toBeDefined();
    expect(body.colors).toBeTruthy();
    expect(body.tags).toBeTruthy();
    expect(body.notes).toBeTruthy();


    const { tags, colors, notes } = body;

    expect(tags).toBeInstanceOf(Array);
    expect(tags).toHaveLength(9);
    expect(colors).toBeInstanceOf(Array);
    expect(colors).toHaveLength(7);
    expect(notes).toBeInstanceOf(Array);
    //Один в архиве, так что 10, а не 11
    expect(notes).toHaveLength(10);
    done();
  });

  test("api/cards GET - statusCode equal 200", done => {
    request(app)
      .get("/api/cards")
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("api/cards POST - statusCode equal 200", done => {
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

  test("api/cards DELETE - statusCode equal 200", done => {
    const id = 2;

    request(app)
      .delete(`/api/cards/${id}`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("api/cards PATCH - statusCode equal 200", done => {
    const id = 10;
    const data = {
      "id": 10,
      "type": "text1",
      "title": "Не забыть1 выгулять Сиба-Ину",
      "color": 3,
      "size": "s",
      "created": 1520160803000
    }

    request(app)
      .patch(`/api/cards/${id}`)
      .send(data)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("api/cards/archive GET ARCHIVE - statusCode equal 200", done => {

    request(app)
      .get(`/api/cards/archive`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("api/cards/tags GET TAGS - statusCode equal 200", done => {

    request(app)
      .get(`/api/cards/tags`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("api/cards/colors GET TAGS - statusCode equal 200", done => {

    request(app)
      .get(`/api/cards/colors`)
      .then(response => {
        expect(response.statusCode).toBe(200);
        done();
      });
  });

  test("api/cards/any - check 404", done => {
    request(app)
      .get(`api/cards/any`)
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });

});
