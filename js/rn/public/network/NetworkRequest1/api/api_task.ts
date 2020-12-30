import { CCSessionReq, SampleAPI } from './../CCSessionModel';
import { Platform } from "react-native";
import { ANHelper } from "../../../define/ANHelper/ANHelper";
import { CMD } from "../../../define/ANHelper/hp/CmdDefine";
import { OCHelper } from "../../../define/OCHelper/OCHelper";
import { SalaryModel } from "../../Model/SalaryModel";
import { UGSignInModel } from '../../../../redux/model/other/UGcheckinBonusModel';
import { UGSignInHistoryModel } from '../../../../redux/model/other/UGSignInHistoryModel';


export class api_task {
  static c = new SampleAPI('c=task&a=');

  // 获取俸禄列表
  static getMissionBonusList() {
    return this.c.get<SalaryModel[]>('getMissionBonusList');
  }

  // 领取俸禄
  static sendMissionBonus(bonsId: string) {
    return this.c.post('sendMissionBonus', { bonsId: bonsId });
  }

  // 修改头像
  static changeAvatar(filename:string) {
    return this.c.post('changeAvatar', {filename:filename});
  }

  // 用户签到列表
  static checkinList() {
    return this.c.get<UGSignInModel>('checkinList');
  }

  // 用户签到
  static checkin(
    type: string,//签到类型：0是签到，1是补签
    date:string,// 要签的日期2020-10-05
  ) {
    return this.c.post('checkin', {type:type, date:date});
  }

  // 用户签到历史
  static checkinHistory() {
    return this.c.get<UGSignInHistoryModel[]>('checkinHistory');
  }

  // 任务大厅
  static center(category:string, page=1, rows=20) {//排序ID（传返回结果的sortId字段）
    return this.c.get('center', {category:category, page:page, rows:rows});
  }

  // 积分账变列表
  static creditsLog(time:string, page=1,rows=20) {
    return this.c.get('creditsLog', {time:time, page:page, rows:rows});
  }

  // vip等级
  static levels() {
    return this.c.get('levels');
  }

  // 积分兑换
  static creditsExchange(money:number) {
    return this.c.post('creditsExchange', {money:money});
  }

  // 领取连续签到奖励
  static checkinBonus(type:string) {
    return this.c.post('checkinBonus', {type:type});
  }

  // 领取任务
  static get(mid:string) {
    return this.c.post('get', {mid:mid});
  }

  // 领取奖励
  static reward(mid:string) {
    return this.c.post('reward', {mid:mid});
  }
}