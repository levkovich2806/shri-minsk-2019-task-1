import { Item, Attachment } from './index';

export interface Note {
  type: string;
  title?: string;
  items?: Item[];
  color?: number;
  tags?: number[];
  attachment?: Attachment[];
  created: number;
  reminder?: number;
}