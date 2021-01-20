import { CCSessionReq, SampleAPI } from "../CCSessionModel";


export class api_real {
  static c = new SampleAPI('c=real&a=');

  // 检查真人游戏是否存在余额未转出
  static checkTransferStatus() {
    return this.c.get('checkTransferStatus');
  }

  // 游戏中的余额自动转出
  static autoTransferOut() {
    return this.c.post('autoTransferOut');
  }

  // 手动额度转换
  static manualTransfer(fromId:string, toId:string, money:number) {
    return this.c.post('manualTransfer', {fromId:fromId, toId:toId, money:money});
  }

  // 手动额度转换记录
  static transferLogs(startTime?:string, endTime?:string, page=1, rows:number=20) {
    return this.c.get('transferLogs', {startTime:startTime, endTime:endTime, page:page, rows:rows});
  }

  // 额度一键转出，第一步：获取需要转出的真人ID
  static oneKeyTransferOut() {
    return this.c.post<{games:[{id:number, name:string}]}>('oneKeyTransferOut');
  }

  // 额度一键转出，第二步：根据真人ID并发请求单游戏快速转出
  static quickTransferOut(id:string) {
    return this.c.post<null>('quickTransferOut', {id:id});
  }

  // 真人余额查询
  static checkBalance(id:string) {
    return this.c.get('checkBalance', {id:id});
  }

  // 获取三方游戏跳转URL
  static gotoGame(id:string, game:string) {// 游戏ID、子游戏ID
    return this.c.get('gotoGame', {id:id, game:game});
  }
}