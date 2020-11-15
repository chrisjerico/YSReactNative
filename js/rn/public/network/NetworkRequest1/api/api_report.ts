import { CCSessionReq, SampleAPI } from "../CCSessionModel";


export class api_report {
  static c = new SampleAPI('c=report&a=');

  // 我的长龙助手投注记录
  static getUserRecentBet() {
    return this.c.get('getUserRecentBet', {tag:1});
  }
}