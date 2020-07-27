export interface Datum {
  filename: string;
  url: string;
}

export interface SystemAvatarListModel {
  code: number;
  msg: string;
  data: Datum[];
}
