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
}