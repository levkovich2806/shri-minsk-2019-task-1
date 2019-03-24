import moment from 'moment';

export default function Parser({ colors, tags }) {

  this.createTagsHash = (tags) => {
    this.tags = {};
    tags.forEach(({ id, tag }) => {
      this.tags[id] = tag;
    });
  };

  this.createColorHash = (colors) => {
    this.colors = {};
    colors.forEach(({ id, color }) => {
      this.colors[id] = color;
    });
  };

  this.createNote = item => {
    this.currentNote = item;
    const { type } = this.currentNote;
    const classes = "main " + this.getNoteSize();

    this.currentNoteHtml = `<div class="${classes}">`;

    this.getReminder();

    switch (type) {
      case "text":
        this.getContentOpenDiv();
        this.getHeader();
        break;
      case "image":
        this.getContentOpenDiv({
          type: "image",
          value: "imageNote"
        });
        this.getHeader();
        this.getImage();
        break;
      case "list":
        this.getContentOpenDiv({
          type: "list",
          value: "listNotByu",
        });
        this.getHeader();
        this.getListContent();
        break;
    }
    this.getDescription();
    this.getFooter();
    this.currentNoteHtml += `</div>`;//Закрываем div открытый в content

    this.getBottom();

    return this.currentNoteHtml;
  };

  this.getNoteSize = () => {
    const { size } = this.currentNote;
    switch (size) {
      case "s":
        return "small";
      case "m":
        return "medium";
      case "l":
        return "large";
      default:
        return "small";
    }
  };

  this.getReminder = () => {
    const { reminder } = this.currentNote;
    if (reminder) {
      const text = this.getReadableReminder(reminder);
      this.currentNoteHtml +=
        `<div class="reminder">
            <div class="reminder__image"><img src="./images/reminder20.png"></div>
            <div class="reminder__text">${text}</div>
          </div>`;
    }
  };

  this.getHeader = () => {
    const { title } = this.currentNote;
    if (title) {
      this.currentNoteHtml += `<div class="content__header">${title}</div>`;
    }
  };

  this.getDescription = () => {
    const { text } = this.currentNote;
    if (text) {
      const stylingText = this.nl2br(text);
      this.currentNoteHtml += `<div class="content__description">${stylingText}</div>`;
    }
  };

  this.getImage = () => {
    const { url } = this.currentNote;
    if (url) {
      this.currentNoteHtml += `<div class="image"><img src="${url}"></div>`;
      this.currentNoteHtml += `</div>`;//Закрываем "первый" content
      this.getContentOpenDiv({
        type: "image",
        value: "withTopBlock listContainer",
      });
    }
  };

  this.getListContent = () => {
    this.getList(false);
    this.currentNoteHtml += `</div>`; //Закрываем "первый" content
    this.currentNote.color = undefined; //Убираем цвет для списка выбранных элементов
    this.getContentOpenDiv({
      type: "list",
      value: "withTopBlock listContainer",
    });
    this.getList(true);
  };

  this.getList = (checkedState) => {
    const { items } = this.currentNote;
    if (items) {
      this.currentNoteHtml += `<div class="list">`;
      items.forEach((item) => {
        if (item.checked === checkedState) {
          this.currentNoteHtml += this.getListItem(item);
        }
      });
      this.currentNoteHtml += `</div>`;
    }
  };

  this.getListItem = ({ text, checked }) => {
    const checkedState = checked ? "checked" : "";
    return `
      <label class="container">
        <input type="checkbox" ${checkedState}> <span>${text}</span>
        <span class="checkmark"></span>
      </label>
    `;
  };

  this.getFooter = () => {
    this.currentNoteHtml += `<div class="content__footer">`;
    this.getTags();
    this.getFooterBottom();
    this.currentNoteHtml += `</div>`;
  };

  this.getTags = () => {
    const { tags } = this.currentNote;
    if (tags) {
      this.currentNoteHtml += `<div class="tags">`;
      tags.forEach((index) => {
        const tag = this.testFormater(this.tags[index]);
        this.currentNoteHtml += `<div class="tag">${tag}</div>`;
      });
      this.currentNoteHtml += `</div>`;
    }
  };

  this.getFooterBottom = () => {
    this.currentNoteHtml += `<div class="content__footer_bottom">`;
    this.currentNoteHtml += this.getActions();
    this.currentNoteHtml += this.getTime();
    this.currentNoteHtml += `</div>`;
  };

  this.getActions = () => {
    return `
      <div class="actions">
        <i class='fas fa-check'></i>
        <i class='fas fa-pen'></i>
      </div>
    `;
  };

  this.getTime = () => {
    const { created } = this.currentNote;
    if (created) {
      const date = this.getReadableDate(created / 1000);
      return `<div class="date">${date}</div>`;
    }
  };

  this.getBottom = () => {
    const { attachments } = this.currentNote;
    if (attachments) {
      let isBottom = false;
      let links = "";
      let images = "";
      if (attachments[0] && attachments[0].type === "link") {
        links = this.getBottomLinks(attachments);
        isBottom = true;
      }
      if (attachments[0] && attachments[0].type === "image") {
        images = this.getBottomImages(attachments);
        isBottom = true;
      }
      if (isBottom) {
        this.currentNoteHtml += `<div class="bottom">`;
        this.currentNoteHtml += links;
        this.currentNoteHtml += images;
        this.currentNoteHtml += `</div>`;
      }
    }
  };

  this.getBottomLinks = (attachments) => {
    let html = `<div class="links">`;
    for (let i = 0; i < attachments.length; i++) {
      //attachments.forEach((item) => {
      let last = false;
      if (i + 1 === attachments.length) {
        last = true;
      }
      html += this.getLink(attachments[i], last);
    }
    html += `</div>`;
    return html;
  };

  this.getLink = ({ url }, last) => {
    let classes = "link";
    if (!last) {
      classes += " link__border";
    }
    return `
      <div class="${classes}">
        <img src="./images/link24.png" class="link__image"><a href="${url}" target="_blank" class="link__text">${url}</a>
      </div>
    `;
  };

  this.getBottomImages = (attachments) => {
    let html = `<div class="images">`;
    html += `
      <div class="images__static">
        <img src="./images/img24x20.png">
      </div>
      <div class="images__content">
    `;
    attachments.forEach((item) => {
      html += this.getImg(item);
    });
    html += `</div>`;
    html += `</div>`;
    return html;
  };

  this.getImg = ({ url }) => {
    return `
      <div class="images__content_image">
        <a href="${url}" target="_blank"><img src="${url}"></a>
      </div>
    `;
  };

  this.getContentOpenDiv = (modificator = { type: "", value: "" }) => {
    const { reminder } = this.currentNote;
    const colorValue = this.getBgStyle();
    let classes = "content";
    if (reminder) {
      classes += " withTopBlock";
    }
    if (modificator) {
      const { type, value } = modificator;
      if (type === "list") {
        classes += ` ${value}`;
      } else {
        classes += ` ${value}`;
      }
    }
    this.currentNoteHtml += `<div class="${classes}" style="background-color: ${colorValue}">`;
  };

  this.getBgStyle = () => {
    const { color } = this.currentNote;
    return this.colors[color] ? this.colors[color] : "#ffffff";
  };

  this.nl2br = (str, is_xhtml) => {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
  };

  this.getReadableReminder = (date) => {
    const normalDate = moment.unix(date);
    const time = moment.unix(date).format('HH:mm');
    const days = moment().diff(normalDate, 'days');
    if (days > 0) {
      if (days === 1) {
        return `Завтра в ${time}`;
      }
      return `Осталось ${days} дня(дней)`;
    } else {
      return `Сегодня в ${time}`;
    }
  };

  this.getReadableDate = (date) => {
    const now = moment().unix();
    const normalDate = moment.unix(date);
    const time = moment.unix(date).format('HH:mm');

    const years = moment().diff(normalDate, 'years');
    const month = moment().diff(normalDate, 'month');
    const days = moment().diff(normalDate, 'days');

    if (years > 0) {
      return `${years} год(а) назад`;
    } else if (month > 0) {
      return `${month} месяц(ев) назад`;
    } else if (days > 0) {
      if (now > date) {
        if (days === 1) {
          return `${time}, вчера`;
        }
        return `${days} дня(ей) назад`;
      } else {
        return `через ${days} дня(ей)`;
      }
    } else {
      return `${time}, сегодня`;
    }
  };

  this.testFormater = (text) => {
    if (text.length > 30) {
      return text.substring(0, 30) + "...";
    }
    return text;
  };

  this.createColorHash(colors);
  this.createTagsHash(tags);

}
