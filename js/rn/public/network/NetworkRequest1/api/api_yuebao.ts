import { CCSessionReq } from "../CCSessionModel";


export class api_yuebao {
  c = 'c=yuebao&a=';

  // 获取利息宝数据
  stat() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 利息宝转入转出
  transfer(money:number, inOrOut:'in'|'out', pwd:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {money:money, inOrOut:inOrOut, pwd:pwd});
  }

  // 利息宝转入转出记录
  transferLogs(startTime:string, endTime:string, page=1, rows=20) {
    return CCSessionReq.get(this.c + arguments.callee.name, {startTime:startTime, endTime:endTime, page:page, rows:rows});
  }

  // 利息宝收益报表
  profitReport(startTime:string, endTime:string, page=1, rows=20) {
    return CCSessionReq.get(this.c + arguments.callee.name, {startTime:startTime, endTime:endTime, page:page, rows:rows});
  }
}