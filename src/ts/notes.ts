import Note from './interfaces/Note';
import { cloneDeep, includes } from 'lodash';

export default class Notes {

  private notes: Note[] = [];

  private constructor(notes: Note[]) {
    this.notes = notes;
  }

  static factory(notes: Note[]): Notes {
    return new Notes(notes);
  }

  [Symbol.iterator]() {
    return this.notes.values();
  }

  /**
   * Вычисляет размер заметки по данным заметки
   * @param note - объект заметки
   */

  private getNoteSize(note: Note): string {
    const { type, tags, text, attachment, items } = note;

    //l = 2, m = 1, s = 1

    let sizes: number[] = [0];

    if (type === "list") {
      if (items) {
        const itemLength = items.length;
        if (itemLength > 20) {
          sizes.push(2);
        } else {
          sizes.push(1);
        }
      }
    }
    if (type === "image") {
      sizes.push(1);
    }
    if (type === "text") {
      if (text) {
        let textLength = text.length;
        if (textLength > 450) {
          sizes.push(2);
        } else if (textLength > 150) {
          sizes.push(1);
        }
      }
    }

    if (tags && tags.length > 5) {
      sizes.push(1);
    }
    if (attachment && attachment.length > 3) {
      sizes.push(1);
    }

    let max = 0;
    let mediumCount = 0;
    for (let i = 0; i < sizes.length; i++) {
      if (max < sizes[i]) {
        max = sizes[i];
      }
      if (sizes[i] === 1) {
        mediumCount++;
      }
    }

    if (mediumCount > 2) {
      return 'l';
    }

    switch (max) {
      case 0:
        return "s";
      case 1:
        return "m";
      case 2:
        return "l";
      default:
        return "m";
    }
  }

  /**
   * Добавление заметки
   * @param note - объект заметки
   */
  addNote(note: Note): void {
    if (!note.size) {
      note.size = this.getNoteSize(note);
    }
    this.notes = this.notes.concat(note);
  }

  toArray(): Array<Note> {
    return cloneDeep(this.notes);
  }

  /**
   * Фильтр массива заметок
   * @param filterName - имя "ключа" заметки (Note)
   * @param value - значение фильтра
   */
  filter(filterName: string, value: string | number): Array<Note> {
    const array = this.toArray();
    const result = array.filter((item: Note) => {
      // Если типом фильтра является строка, то ищем ее вхождение
      if (typeof value === "string") {
        switch (filterName) {
          case "type":
            if (item.type.includes(value)) {
              return item;
            }
          case "title":
            if (item.title && item.title.includes(value)) {
              return item;
            }
          case "size":
            if (item.size && item.size.includes(value)) {
              return item;
            }
          case "text":
            if (item.text && item.text.includes(value)) {
              return item;
            }
        }
      }
      // Если типом фильтра является число, то применяем строгое сравнение или вхождение в массив
      else {
        switch (filterName) {
          case "color":
            if (item.color && item.color === value) {
              return item;
            }
          case "created":
            if (item.created && item.created === value) {
              return item;
            }
          case "reminder":
            if (item.reminder && item.reminder === value) {
              return item;
            }
          case "tag":
            if (item.tags && includes(item.tags, value)) {
              return item;
            }
        }
      }
    });
    return result;
  }

  /**
   * Удалить заметку
   * @param num - номер заметки для удаления
   */
  remove(num: number) {
    if (this.notes[num]) {
      this.notes.splice(num, 1);
    }
  }

  /**
   * Переместить заметку в архив
   * @param num - номер заметки для изменения ее статус
   */
  toArchive(num: number) {
    this.notes[num].status = 0;
  }
}