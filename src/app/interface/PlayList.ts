import {Song} from './Song';

export interface PlayList{
  id: number;
  name: string;
  createDate: string;
  updateDate: string;
  createBy: string;
  updateBy: string;
  song?: Song;
}

export interface Content {
  content: [PlayList];
}

export interface Data {
  data: Content;
}
