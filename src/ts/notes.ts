//import { Item } from './interfaces/index';
import Parser from '../js/parser';
import NotesCollection from './interfaces/NotesCollecion';
import Note from './interfaces/Note';

import { cloneDeep } from 'lodash';

//Будем хранить всё по заметкам здесь
let notesData: NotesCollection = {
  tags: [],
  colors: [],
  notes: [],
};

export default class Notes {

  private notesContainerClass: string = "notes__content";

  generateNotesHtml() {
    const { colors, tags, notes } = notesData;
    const parser = new Parser({
      colors,
      tags,
    });
    const notesContainer = document.getElementsByClassName(this.notesContainerClass);
    notesContainer[0].innerHTML = "";
    const notesForParse = cloneDeep(notes);
    notesForParse.forEach((item) => {
      const note = parser.createNote(item);
      notesContainer[0].innerHTML += note;
    });
  };

  private getNoteSize(note: Note): string {
    const { type, tags, text, attachment } = note;
    if (type === "list") {
      return "l";
    } else if (type === "image") {
      return "m";
    } else if (type === "text") {
      if (text && text.length > 150) {
        return "m";
      }
      if (tags && tags.length > 5) {
        return "m";
      }
      if (attachment && attachment.length > 3) {
        return "m";
      }
      return "s";
    }
    return "m";
  }

  addNote(note: Note): boolean {
    let { notes } = notesData;
    if (!note.size) {
      note.size = this.getNoteSize(note);
    }
    notes = notes.concat(note);
    this.generateNotesHtml();
    return true;
  }

  toArray(): Array<Note> {
    return cloneDeep(notesData.notes);
  }

  static factory(data: NotesCollection) {
    notesData = data;
  }
}