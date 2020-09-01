

export interface UserInfoModel {
  code: number;
  data: UserInfoData;
  msg: string;
}

export interface UserInfoData {
  allowMemberCancelBet: boolean;
  avatar: string;
  balance: string;
  chatRoomNickname: string;
  chatRoomSwitch: boolean;
  clientIp: string;
  curLevelGrade: string;
  curLevelInt: string;
  curLevelTitle: string;
  email: string;
  fullName: string;
  googleVerifier: boolean;
  hasActLottery: boolean;
  hasBankCard: boolean;
  hasFundPwd: boolean;
  isAgent: boolean;
  isBindGoogleVerifier: boolean;
  isLhcdocVip: string;
  isTest: boolean;
  nextLevelGrade: string;
  nextLevelInt: string;
  nextLevelTitle: string;
  phone: string;
  playedRealGames: any[];
  qq: string;
  taskReward: string;
  taskRewardTitle: string;
  taskRewardTotal: string;
  todayWinAmount: string;
  uid: string;
  unreadFaq: number;
  unreadMsg: number;
  unsettleAmount: string;
  usr: string;
  wx: string;
  yuebaoSwitch: boolean;
}