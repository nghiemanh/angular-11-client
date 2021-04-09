export interface SongList{
  id: number;
  name: string;
  single: string;
  url: string;
  plays?: number;
  category: string;
  createDate: string;
  updateDate: string;
  createBy: string;
  updateBy: string;
  file: File;
}

export interface Content {
  content: [CustomSong];
}
export interface CustomSong {
  song: [SongList];
}

export interface DataList {
  data: Content;
}
