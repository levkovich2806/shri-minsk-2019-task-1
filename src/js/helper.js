import { includes } from 'lodash';

export function createRandomNote() {
  const types = [
    "list",
    "text",
    "image",
  ];
  const sizes = [
    "s",
    "m",
    "l",
  ];

  const attachments = [
    [
      { type: "link", url: "https://yandex.ru" },
    ],
    [
      { type: "image", url: "https://avatars.mds.yandex.net/get-pdb/1816426/93eab951-b130-4cf9-98d6-01e250be5530/orig" },
    ]
  ];

  const getRandomColor = () => {
    const length = 7;
    return Math.floor(Math.random() * (length - 0)) + 0;
  }

  const getRandomTags = () => {
    const length = 9;
    let tags = [];
    const tagsCount = Math.floor(Math.random() * (length - 0)) + 0;
    let i = 0;

    while (i < tagsCount) {
      const number = Math.floor(Math.random() * (length - 0)) + 0;
      if (!includes(tags, number)) {
        tags = tags.concat(number);
        i++;
      }
    }

    return tags;
  }

  const getRandomType = () => {
    const count = Math.floor(Math.random() * (3 - 0)) + 0;
    return types[count];
  }

  const getRandomSize = () => {
    //Выставляем максимум на 1 больше, чем кол-во, что бы иногда получать undefined и в этой связи вообще не передавать размер
    // для того, что бы тестировать getNoteSize
    const count = Math.floor(Math.random() * (4 - 0)) + 0;
    return sizes[count];
  }

  let note = {
    created: new Date().getTime(),
    color: getRandomColor(),
    tags: getRandomTags(),
  }

  const type = getRandomType();
  if (type === "list") {
    const items = [
      { text: "Оливочки", checked: false },
      { text: "Макароны", checked: false },
      { text: "Яйца", checked: true },
      { text: "Сливки", checked: false },
      { text: "Хлеб", checked: true },
      { text: "Чеснок", checked: false },
      { text: "Сыр", checked: true },
      { text: "Помидорки", checked: false },
      { text: "Ветчина", checked: true },
      { text: "Чай", checked: true },
      { text: "Огурец", checked: false },
      { text: "Масло сливочное", checked: true },
      { text: "Вино", checked: true },
      { text: "Камамбер", checked: true },
      { text: "Сыр фета", checked: true },
      { text: "Васаби", checked: true },
      { text: "Соевый соус", checked: true },
      { text: "Вкусняшки", checked: false },
      { text: "Красный имбирь", checked: true },
      { text: "Гвоздика", checked: true },
      { text: "Кардамон", checked: true },
      { text: "Овсяные хлопья", checked: true },
      { text: "Пельмени", checked: true },
      { text: "Сметана", checked: true },
    ];
    note.items = items;
  } else if (type === "image") {
    note.url = "https://avatars.mds.yandex.net/get-pdb/1534889/a869b7ef-32da-41e7-8703-326ae860e67f/orig";
  } else if (type === "text") {
    let resultText = "";
    const randomTextLength = Math.floor(Math.random() * (50 - 0)) + 0;
    const text = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    const worlds = text.split(" ");
    for (let i = 0; i < randomTextLength; i++) {
      resultText += ` ${worlds[i]}`;
    }
    note.text = resultText;
  }

  if (type !== "image") {
    note.title = "Название новой заметки";
  }

  note.type = type;

  const randomAttachment = Math.floor(Math.random() * (2 - 0)) + 0;
  if (randomAttachment) {
    let attachmentsList = [];
    const random = Math.floor(Math.random() * (2 - 0)) + 0;
    const attachmentsCount = Math.floor(Math.random() * (5 - 0)) + 0;
    const attachmentValue = attachments[random];
    for (let i = 0; i < attachmentsCount; i++) {
      attachmentsList = attachmentsList.concat(attachmentValue);
    }
    note.attachments = attachmentsList;
  }

  const randomReminder = Math.floor(Math.random() * (2 - 0)) + 0;;
  if (randomReminder) {
    note.reminder = new Date().getTime() - 5 * 68400 * 1000;
  }

  const size = undefined; //getRandomSize();
  if (size) {
    note.size = size;
  }

  return note;
}