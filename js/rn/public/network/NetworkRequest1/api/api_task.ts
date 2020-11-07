import { CCSessionReq } from './../CCSessionModel';
import { Platform } from "react-native";
import { ANHelper } from "../../../define/ANHelper/ANHelper";
import { CMD } from "../../../define/ANHelper/hp/CmdDefine";
import { OCHelper } from "../../../define/OCHelper/OCHelper";
import { SalaryModel } from "../../Model/SalaryModel";


export class api_task {
  c = 'c=task&a=';

  // 获取俸禄列表
  getMissionBonusList() {
    return CCSessionReq.get<SalaryModel[]>(this.c + arguments.callee.name);
  }

  // 领取俸禄
  sendMissionBonus(bonsId: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { bonsId: bonsId });
  }

  // 修改头像
  changeAvatar(filename:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {filename:filename});
  }

  // 用户签到列表
  checkinList() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 用户签到
  checkin(
    type: boolean,//签到类型：0是签到，1是补签
    date:string,// 要签的日期2020-10-05
  ) {
    return CCSessionReq.post(this.c + arguments.callee.name, {type:type, date:date});
  }

  // 用户签到历史
  checkinHistory() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 任务大厅
  center(category:string, page=1, rows=20) {//排序ID（传返回结果的sortId字段）
    return CCSessionReq.get(this.c + arguments.callee.name, {category:category, page:page, rows:rows});
  }

  // 积分账变列表
  creditsLog(time:string, page=1,rows=20) {
    return CCSessionReq.get(this.c + arguments.callee.name, {time:time, page:page, rows:rows});
  }

  // vip等级
  levels() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 积分兑换
  creditsExchange(money:number) {
    return CCSessionReq.post(this.c + arguments.callee.name, {money:money});
  }

  // 领取连续签到奖励
  checkinBonus(type:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {type:type});
  }

  // 领取任务
  get(mid:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {mid:mid});
  }

  // 领取奖励
  reward(mid:string) {
    return CCSessionReq.post(this.c + arguments.callee.name, {mid:mid});
  }
}