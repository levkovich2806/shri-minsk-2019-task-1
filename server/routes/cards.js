const express = require("express");
const router = express.Router();
const utils = require("../utils/utils");
const cards = require("../service/cards.js");

module.exports = router;

/**
 * Обрабатываем GET запрос к маршруту /api/cards/ - отдаем список "неархивированных" заметок
 */
router.get("/", (req, res) => {
  const requestKeys = Object.keys(req.query);
  let query = "";

  if (requestKeys.length > 0) {
    const { color } = req.query;
    if (color) {
      if (!utils.checkColorCorrect(color)) {
        return res.status(400).send("Incorrect color");
      }
      query = {
        filter: {
          filterName: "color",
          filterValue: color
        }
      };
    }
  }

  cards
    .get_cards_list({ query })
    .then(({ data, status }) => {
      return res.status(status).json(data);
    })
    .catch(({ error, status }) => {
      return res.status(status).send(error);
    });
});

/**
 * Обрабатываем POST запрос к маршруту /api/cards/ - принимаем новую заметку
 */
router.post("/", (req, res) => {
  const { card } = req.body;
  const result = cards.addCard(card);
  if (result) {
    return res.status(200).send("Заметка добавлена");
  } else {
    return res.status(500).send("Ошибка добавления заметки");
  }
});

/**
 * Обрабатываем DELETE запрос к маршруту /api/cards/:id - удаляем
 */
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  cards
    .deleteCard(Number(id))
    .then(({ data, status }) => {
      return res.status(status).json(data);
    })
    .catch(({ error, status }) => {
      return res.status(status).send(error);
    });
});

/**
 * Обрабатываем PATCH запрос к маршруту /api/cards/:id - обновляем информацию в заметке
 */
router.patch("/:id", (req, res) => {
  const { id } = req.params;
  const { card } = req.body;

  cards
    .updateCard(Number(id), card)
    .then(({ data, status }) => {
      return res.status(status).json(data);
    })
    .catch(({ error, status }) => {
      return res.status(status).send(error);
    });
});

/**
 * Обрабатываем GET запрос к маршруту /api/cards/archive - отдаем список "архивных" заметок
 */
router.get("/archive", (req, res) => {
  cards
    .getCardArchive()
    .then(({ data, status }) => {
      return res.status(status).json(data);
    })
    .catch(({ error, status }) => {
      return res.status(status).send(error);
    });
});
