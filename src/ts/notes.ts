//import { Item } from './interfaces/index';

export default class Notes {

  getNoteSize(): string {
    console.log("getNoteSize");
    return "m";
  }
  addNote(): boolean {

    return true;
  }

  toArray(): Array<string> {
    return [];
  }

  static factory() {

  }
}