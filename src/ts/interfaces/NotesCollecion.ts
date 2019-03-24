import Note from './Note';
import Tag from './Tag';
import Color from './Color';


export default interface NotesCollection {
  tags: Array<Tag>;
  colors: Array<Color>;
  notes: Array<Note>;
} 