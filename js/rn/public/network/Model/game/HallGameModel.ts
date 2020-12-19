/**
 * 游戏大厅数据
 */

export interface HallGameModel {
  code?: number
  msg?: string
  data?: HallGameData
}

export interface HallGameData {
  hallGameListData?: HallGameListData[]
  id?: string //
  uid?: string //
  type?: string //
  admin?: string //
  enable?: string //
  bankId?: string //
  editEnable?: string //
  xgtime?: string //
  bdtime?: string //
  ownerName?: string //
  bankCard?: string //
  bankAddr?: string //
  bankName?: string //
  bankCode?: string //
  bankBackgroundImage?: string //
}

export interface HallGameListData {
  type?: number
  name?: string
  isshow?: boolean
  ismore?: boolean
  number?: string
  minWithdrawMoney?: string
  maxWithdrawMoney?: string

  data?: HallGameResultListData[]
}

export interface HallGameResultListData {
  id?: string //
  uid?: string //
  type?: string //
  admin?: string //
  enable?: string //
  bankId?: string //
  editEnable?: string //
  xgtime?: string //
  bdtime?: string //
  ownerName?: string //
  bankCard?: string //
  bankAddr?: string //
  bankName?: string //
  bankCode?: string //
  bankBackgroundImage?: string //
}
