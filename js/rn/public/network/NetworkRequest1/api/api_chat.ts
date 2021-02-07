import { CCSessionReq, SampleAPI } from "../CCSessionModel";
import { LotteryResultModel } from '../../Model/lottery/result/LotteryResultModel'
import { ChatRoomModel } from '../../Model/chat/ChatRoomModel'


export class api_chat {
  static c = new SampleAPI('c=chat&a=');

  // 聊天室列表
  static chatList() {
    // return this.c.post('getToken', { t: new Date().getTime() / 1000 });
    return this.c.post<ChatRoomModel>('getToken', { t: new Date().getTime() });
  }

  // 红包日志
  static redBagLogPage(params: {
    type: number, // 1-普通红包 2-扫雷红包
    page: number,
    startTime?: string,
    endTime?: string,
    operate?: number,// 1-发送红包，2-抢红包，3-过期退回，4-踩雷赔付，5-获得赔付，6-幸运奖励，7-多雷奖励
  }) {
    return this.c.post('redBagLogPage', Object.assign({ rows: 20 }, params))
  }

  // 会话列表
  static conversationList(scope:string) {
    return this.c.post('conversationList', {scope:scope});
  }
}
