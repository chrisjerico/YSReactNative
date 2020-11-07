import { CCSessionReq } from "../CCSessionModel";


export class api_activity {
  c = 'c=activity&a=';

  // 获取首页转盘活动
  turntableList() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 获取首页砸金蛋活动
  goldenEggList() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 获取首页刮刮乐
  scratchList() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 红包详情
  redBagDetail() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 领红包
  getRedBag(id: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { id: id });
  }

  // 获取申请活动彩金列表（接口待完善）
  winApplyList() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 获取申请活动彩金记录
  applyWinLog() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 申请彩金
  applyWin(id: string, userComment: string, amount: string, imgCode: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { id: id, userComment: userComment, amount: amount, imgCode: imgCode });
  }

  // 获取申请活动彩金记录详情
  applyWinLogDetail(id: string) {
    return CCSessionReq.get(this.c + arguments.callee.name, { id: id });
  }

  // 获取大转盘该用户当天抽奖日志（最新10条）
  turntableLog(activityId: string) {// 大转盘ID
    return CCSessionReq.get(this.c + arguments.callee.name, { activityId: activityId });
  }

  // 抽奖接口
  turntableWin(activityId: string) {// 活动ID
    return CCSessionReq.post(this.c + arguments.callee.name, { activityId: activityId });
  }

  // 砸金蛋日志
  goldenEggLog(activityId: string) {
    return CCSessionReq.get(this.c + arguments.callee.name, { activityId: activityId });
  }

  // 砸金蛋
  goldenEggWin(activityId: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { activityId: activityId });
  }

  // 刮刮乐日志
  scratchLog(activityId: string) {
    return CCSessionReq.get(this.c + arguments.callee.name, { activityId: activityId });
  }

  // 刮一刮
  scratchWin(scratchId: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { scratchId: scratchId });
  }

}