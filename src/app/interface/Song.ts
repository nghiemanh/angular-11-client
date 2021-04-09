export interface Song{
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
  content: [Song];
}

export interface Data {
  data: Content;
  page: number;
  size: number;
}
