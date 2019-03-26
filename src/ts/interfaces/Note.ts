import { Item, Attachment } from './index';

export default interface Note {
  type: string;
  title?: string;
  items?: Item[];
  color?: number;
  tags?: number[];
  size?: string;
  text?: string;
  attachment?: Attachment[];
  created: number;
  reminder?: number;
  status?: number; //Задел на 3 домашку - если 1, то активная, если 0, то архивная
}