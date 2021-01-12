export enum RankingListType {
  不顯示 = 0,
  中奖排行榜 = 1,
  投注排行榜 = 2,
}

export enum LoginTo {
  首页 = '1',
  我的页 = '0',
}

export enum Necessity {
  隱藏 = '0',
  选填 = '1',
  必填 = '2',
}

export enum SeriesId {
  彩票 = 1,
  真人 = 2,
  捕鱼 = 3,
  电子 = 4,
  棋牌 = 5,
  体育 = 6,
  导航链接 = 7,
  // 1 普通彩票 2 真人视讯 3 捕鱼游戏 4 电子游戏 5 棋牌游戏 6 体育赛事 7导航链接
}

export enum SeriesIdEn {
  lottery = 1,
  real = 2,
  fish = 3,
  game = 4,
  card = 5,
  sport = 6,
  导航链接 = 7,
  // ["lottery", "game", "fish", "real", "card", "esport", "sport"]
  // ["彩票", "电子", "捕鱼", "真人", "棋牌", "电竞", "体育"]
}

export enum PasswordStrength {
  不限制 = '0',
  数字字母 = '1',
  数字字母字符 = '2',
}

export enum AgentType {
  用户注册 = 'user',
  代理注册 = 'agent',
}

export enum AnnouncementType {
  直接弹出 = '直接弹出',
  登录后弹出 = '登录后弹出',
}

export enum GameType {
  大厅 = 0,
  游戏大厅 = 19,
  登出 = 31,
  APP版本号 = 27,
  优惠活动 = 9,
}
