import { GoldenEggModel } from '../../Model/GoldenEggModel';
import { ScratchDataModel } from '../../Model/ScratchDataModel';
import { SampleAPI } from './../CCSessionModel';




export class api_activity {
  static c = new SampleAPI('c=activity&a=');

  // 获取首页转盘活动
  static turntableList() {
    return this.c.get('turntableList');
  }

  // 获取首页砸金蛋活动
  static goldenEggList() {
    return this.c.get<GoldenEggModel[]>('goldenEggList');
  }

  // 获取首页刮刮乐
  static scratchList() {
    return this.c.get<ScratchDataModel>('scratchList');
  }

  // 红包详情
  static redBagDetail() {
    return this.c.get('redBagDetail');
  }

  // 领红包
  static getRedBag(id: string) {
    return this.c.post('getRedBag', { id: id });
  }

  // 获取申请活动彩金列表（接口待完善）
  static winApplyList() {
    return this.c.get('winApplyList');
  }

  // 获取申请活动彩金记录
  static applyWinLog() {
    return this.c.get('applyWinLog');
  }

  // 申请彩金
  static applyWin(id: string, userComment: string, amount: string, imgCode: string) {
    return this.c.post('applyWin', { id: id, userComment: userComment, amount: amount, imgCode: imgCode });
  }

  // 获取申请活动彩金记录详情
  static applyWinLogDetail(id: string) {
    return this.c.get('applyWinLogDetail', { id: id });
  }

  // 获取大转盘该用户当天抽奖日志（最新10条）
  static turntableLog(activityId: string) {// 大转盘ID
    return this.c.get('turntableLog', { activityId: activityId });
  }

  // 抽奖接口
  static turntableWin(activityId: string) {// 活动ID
    return this.c.post('turntableWin', { activityId: activityId });
  }

  // 砸金蛋日志
  static goldenEggLog(activityId: string) {
    return this.c.get('goldenEggLog', { activityId: activityId });
  }

  // 砸金蛋
  static goldenEggWin(activityId: string) {
    return this.c.post('goldenEggWin', { activityId: activityId });
  }

  // 刮刮乐日志
  static scratchLog(activityId: string) {
    return this.c.get('scratchLog', { activityId: activityId });
  }

  // 刮一刮
  static scratchWin(scratchId: string) {
    return this.c.post('scratchWin', { scratchId: scratchId });
  }

}