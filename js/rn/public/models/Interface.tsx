export interface Game {
  id?: string;
  icon?: string;
  name?: string;
  url?: string;
  category?: string;
  levelType?: string;
  sort?: string;
  seriesId?: string | number;
  subId?: string | number;
  tipFlag?: string;
  openWay?: string;
  hotIcon?: string;
  gameCode?: string;
  subtitle?: string;
  subType?: SubType[];
  gameId?: string | number;
  realName?: string;
  title?: string;
  type?: string;
  admin_uid?: string;
  enable?: string;
  headadd?: string;
  footadd?: string;
  domain?: string;
  docType?: number;
  gameType?: string;
  logo?: string;
  isInstant?: string;
  isSeal?: string;
  isClose?: string;
  supportTrial?: number;
  isPopup?: number;
  gameTypeName?: string;
  isHot?: string;
  pic?: string;
}

export interface PushHomeGame {
  seriesId: string | number;
  gameId: string | number;
  subId: string | number;
  [key: string]: any;
  // keys<T>(o: T): any
}

export interface PushAnnouncement {
  clsName: 'UGNoticeModel';
  hiddenBottomLine?: string;
}

export interface PushWheel {
  end: string;
  id: string;
  param: any;
  start: string;
  type: string;
}

export interface SlideCode {
  nc_csessionid?: string;
  nc_token?: string;
  nc_sig?: string;
}

export interface SubType {
  id: string;
  levelType: string;
  name: string;
  openWay: string;
  tipFlag: string;
  sort: string;
  seriesId: string;
  subId: string;
  parentId: string;
  isDelete: string;
  icon: string;
  url: string;
  category: string;
  hot_icon?: any;
  game_code: string;
  is_plus: string;
  site_ids: string;
  site_id: string;
  subtitle: string;
  gameId: string;
  realName: string;
  title: string;
  isInstant: string;
  isSeal: string;
  isClose: string;
  gameType: string;
  logo: string;
}