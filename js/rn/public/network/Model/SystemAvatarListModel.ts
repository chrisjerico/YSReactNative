export interface Data {
  filename: string;
  url: string;
}

export interface SystemAvatarListModel {
  code: number;
  msg: string;
  data: Data[];
}
