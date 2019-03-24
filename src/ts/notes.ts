//import { Item } from './interfaces/index';
import { Note } from './interfaces/Note';

export default class Notes {

  notes: Array<Note> = [];

  getNoteSize(): string {
    console.log("getNoteSize", this.notes);
    return "m";
  }
  addNote(): boolean {
    return true;
  }

  toArray(): Array<string> {
    return [];
  }

  static factory(data: Notes) {
    console.log(data);
  }
}