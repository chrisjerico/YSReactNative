export interface Datum {
  category: string
  gameCode: string
  hotIcon: string
  icon: string
  id: string
  levelType: string
  name: string
  openWay: string
  seriesId: string
  sort: string
  subId: number
  subtitle: string
  tipFlag: string
  url: string
}

export interface SystemMobileRight {
  code: number
  data: Datum[]
  msg: string
}
