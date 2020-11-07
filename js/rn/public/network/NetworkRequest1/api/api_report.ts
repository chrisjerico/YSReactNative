import { CCSessionReq } from "../CCSessionModel";


export class api_report {
  c = 'c=report&a=';

  // 我的长龙助手投注记录
  getUserRecentBet() {
    return CCSessionReq.get(this.c + arguments.callee.name, {tag:1});
  }
}