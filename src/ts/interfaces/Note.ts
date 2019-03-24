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
}