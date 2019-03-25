const express = require('express');
const router = express.Router();
const url = require('url');
const cards = require('../service/cards.js');

module.exports = router;

router.get('/', (req, res) => {
  console.log(req.query.color);

  cards.get_cards_list()
    .then((data) => {
      return res.json(data);
    })
});

