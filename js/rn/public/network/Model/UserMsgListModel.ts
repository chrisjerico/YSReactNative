export interface UserMsgListModel {
  code: number
  data: Data
  msg: string
}

export interface List {
  content: string
  id: string
  isPopup: boolean
  isRead: number
  readTime: string
  summary: string
  title: string
  updateTime: string
}

export interface RealTime {
  id: number
}

export interface Data {
  list: List[]
  readTotal: number
  realTime: RealTime
  total: number
}
