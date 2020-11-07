import { CCSessionReq, SampleAPI } from "../CCSessionModel";


export class api_yuebao {
  static c = new SampleAPI('c=yuebao&a=');

  // 获取利息宝数据
  static stat() {
    return this.c.get('stat');
  }

  // 利息宝转入转出
  static transfer(money:number, inOrOut:'in'|'out', pwd:string) {
    return this.c.post('transfer', {money:money, inOrOut:inOrOut, pwd:pwd});
  }

  // 利息宝转入转出记录
  static transferLogs(startTime:string, endTime:string, page=1, rows=20) {
    return this.c.get('transferLogs', {startTime:startTime, endTime:endTime, page:page, rows:rows});
  }

  // 利息宝收益报表
  static profitReport(startTime:string, endTime:string, page=1, rows=20) {
    return this.c.get('profitReport', {startTime:startTime, endTime:endTime, page:page, rows:rows});
  }
}