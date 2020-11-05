import { CCSessionReq } from './../CCSessionModel';
import { Platform } from "react-native";
import UGPromoteListModel from "../../../../redux/model/other/UGPromoteModel";
import UGSysConfModel from "../../../../redux/model/全局/UGSysConfModel";
import { ANHelper } from "../../../define/ANHelper/ANHelper";
import { CMD } from "../../../define/ANHelper/hp/CmdDefine";
import { OCHelper } from "../../../define/OCHelper/OCHelper";


export class api_system {
  c = 'c=system&a=';

  // 获取头像列表
  avatarList() {
    return CCSessionReq.get<{ filename: string; url: string; }[]>(this.c + arguments.callee.name);
  }

  // 获取首页优惠活动
  promotions() {
    return CCSessionReq.get<UGPromoteListModel>(this.c + arguments.callee.name);
  }
  // 获取系统配置信息
  config() {
    return CCSessionReq.get<UGSysConfModel>(this.c + arguments.callee.name);
  }

}