export interface PushHomeGame {
  id?: string; // 游戏ID
  icon?: string; // 资料logo
  name?: string; // 资料标题
  url?: string; // 外部链接
  category?: string; // 图标分类
  levelType?: string; // 分类层级：1 无子类 2 有子类一级分类 3 子类
  sort?: string; // 排序（数字小排前面）
  seriesId: string | number; // 系列ID：1 普通彩票 2 真人视讯 3 捕鱼游戏 4 电子游戏 5 棋牌游戏 6 体育赛事 7导航链接
  subId: string | number; // 1存取款 2APP下载 3聊天室 4在线客服 5长龙助手 6推广收益 7开奖网 8利息宝 9优惠活动 10游戏记录 11QQ客服 13任务大厅 14站内信 15站内信 16投诉中心
  tipFlag?: string; // 标记：0 无 1 热门 2 活动 3 大奖
  openWay?: string; // 打开方式：0 本窗口 1 新窗口
  hotIcon?: string; // 热门图标url
  gameCode?: string; // 第三级游戏ID
  gameId: string | number; // 游戏ID
  title?: string; // 游戏名称
  isInstant?: string; // 是否是即开彩：1=是，0=否
  isSeal?: string; // 是否封盘:1=是，0=否
  isClose?: string;
  gameType?: string; // 彩种类型，例：gd11x5（广东11选5）
  logo?: string; // 游戏LOGO
  docType?: string; // 是否是资料。1=是；0=否
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