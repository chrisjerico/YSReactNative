import { CCSessionReq } from "../CCSessionModel";


export class api_chat {
  c = 'c=chat&a=';

  // 聊天室列表
  getToken() {
    return CCSessionReq.post(this.c + arguments.callee.name, { t: new Date().getTime() / 1000 });
  }

  // 红包日志
  redBagLogPage(params: {
    type: number, // 1-普通红包 2-扫雷红包
    page: number,
    startTime?: string,
    endTime?: string,
    operate?: number,// 1-发送红包，2-抢红包，3-过期退回，4-踩雷赔付，5-获得赔付，6-幸运奖励，7-多雷奖励
  }) {
    return CCSessionReq.post(this.c + arguments.callee.name, Object.assign({ rows: 20 }, params))
  }

  // 会话列表
  conversationList(scope:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {scope:scope});
  }
}