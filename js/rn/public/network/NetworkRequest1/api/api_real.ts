import { CCSessionReq } from "../CCSessionModel";


export class api_real {
  c = 'c=real&a=';

  // 检查真人游戏是否存在余额未转出
  checkTransferStatus() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 游戏中的余额自动转出
  autoTransferOut() {
    return CCSessionReq.post(this.c + arguments.callee.name);
  }

  // 手动额度转换
  manualTransfer(fromId:string, toId:string, money:number) {
    return CCSessionReq.post(this.c + arguments.callee.name, {fromId:fromId, toId:toId, money:money});
  }

  // 手动额度转换记录
  transferLogs(startTime?:string, endTime?:string, page=1, rows:number=20) {
    return CCSessionReq.get(this.c + arguments.callee.name, {startTime:startTime, endTime:endTime, page:page, rows:rows});
  }

  // 额度一键转出，第一步：获取需要转出的真人ID
  oneKeyTransferOut() {
    return CCSessionReq.post(this.c + arguments.callee.name);
  }

  // 额度一键转出，第二步：根据真人ID并发请求单游戏快速转出
  quickTransferOut(id:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {id:id});
  }

  // 真人余额查询
  checkBalance(id:string) {
    return CCSessionReq.get(this.c + arguments.callee.name, {id:id});
  }

  // 获取三方游戏跳转URL
  gotoGame(id:string, game:string) {// 游戏ID、子游戏ID
    return CCSessionReq.get(this.c + arguments.callee.name, {id:id, game:game});
  }
}