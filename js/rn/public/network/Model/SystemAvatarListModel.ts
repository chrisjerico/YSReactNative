export interface OldAvatarModel {
  filename: string;
  url: string;
}

export interface SystemAvatarListModel {
  code: number;
  msg: string;
  data: Data[];
}

export type Data = OldAvatarModel;






// ———————————— 以下是新的头像接口 ————————————
export interface AvatarModel {
  id: string;
  url: string;
}
export interface AvatarSettingModel {
  isAcceptUpload: boolean;// 是否允许上传头像
  isReview: boolean; // 上传的头像是否需要审核
  publicAvatarList:AvatarModel[]// 头像列表
}
