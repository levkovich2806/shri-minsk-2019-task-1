import React, { Component } from "react";
import Note from "../Note";
import NotesTitle from "../NotesTitle";

import styles from "./index.module.scss";

const test = [
  {
    type: "text",
    title: "Скидки в Виталюре",
    text:
      "Реферат до 2 апреля (300 терминов, аннотация, основная, заключение, список литературы)\nПеревод 40к знаков к зачету, 40к к экзамену\nТест 1 и 2\n\nПодготовка кадров зарубежом (юнит 2)\nНаучно исследовательская работа магистранта (юнит 2)\nРоль науки (юнит 1)\n10-15 предложений минимум",
    tags: [0, 2],
    size: "m",
    reminder: 1552640400000,
    created: 1550653200000,
    attachments: [
      {
        type: "image",
        url:
          "https://avatars.mds.yandex.net/get-pdb/1816426/93eab951-b130-4cf9-98d6-01e250be5530/orig"
      },
      {
        type: "image",
        url:
          "https://avatars.mds.yandex.net/get-pdb/1823123/fc6cf893-91b5-4e80-9f02-82acfc6fe30c/orig"
      },
      {
        type: "image",
        url:
          "https://avatars.mds.yandex.net/get-pdb/1816426/c68f1a18-f763-4a98-8a17-f7d7725753b6/orig"
      }
    ]
  },
  {
    type: "list",
    title: "Список покупок",
    tags: [0],
    color: 0,
    items: [
      {
        text: "Оливочки",
        checked: false
      },
      {
        text: "Макароны",
        checked: false
      },
      {
        text: "Яйца",
        checked: true
      },
      {
        text: "Сливки",
        checked: false
      },
      {
        text: "Хлеб",
        checked: true
      },
      {
        text: "Чеснок",
        checked: false
      },
      {
        text: "Сыр",
        checked: true
      },
      {
        text: "Помидорки",
        checked: false
      },
      {
        text: "Ветчина",
        checked: true
      },
      {
        text: "Чай",
        checked: true
      },
      {
        text: "Огурец",
        checked: false
      },
      {
        text: "Масло сливочное",
        checked: true
      },
      {
        text: "Вино",
        checked: true
      },
      {
        text: "Камамбер",
        checked: true
      },
      {
        text: "Сыр фета",
        checked: true
      },
      {
        text: "Васаби",
        checked: true
      },
      {
        text: "Соевый соус",
        checked: true
      },
      {
        text: "Вкусняшки",
        checked: false
      },
      {
        text: "Красный имбирь",
        checked: true
      },
      {
        text: "Гвоздика",
        checked: true
      },
      {
        text: "Кардамон",
        checked: true
      },
      {
        text: "Овсяные хлопья",
        checked: true
      },
      {
        text: "Пельмени",
        checked: true
      },
      {
        text: "Сметана",
        checked: true
      }
    ],
    size: "l",
    created: 1551780000000
  },
  {
    type: "image",
    url:
      "https://avatars.mds.yandex.net/get-pdb/1534889/a869b7ef-32da-41e7-8703-326ae860e67f/orig",
    tags: [3],
    size: "m",
    created: 1548969900000,
    attachments: [
      {
        type: "link",
        url: "https://yandex.ru"
      },
      {
        type: "link",
        url: "https://ya.ru"
      }
    ]
  }
];

class Notes extends Component {
  render() {
    return (
      <div className={styles.notes}>
        <NotesTitle />
        <div className={styles.notes__content}>
          {test.map(data => (
            <Note key={data.created} {...data} />
          ))}
        </div>
      </div>
    );
  }
}

export default Notes;
