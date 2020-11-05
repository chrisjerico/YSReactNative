import { CCSessionReq } from './../CCSessionModel';
import { Platform } from "react-native";
import { UGAgentApplyInfo } from "../../../../redux/model/全局/UGSysConfModel";
import { ANHelper } from "../../../define/ANHelper/ANHelper";
import { CMD } from "../../../define/ANHelper/hp/CmdDefine";
import { OCHelper } from "../../../define/OCHelper/OCHelper";


export class api_team {
  c = 'c=item&a=';

  // 获取代理申请信息（推荐收益）
  agentApplyInfo() {
    return CCSessionReq.get<UGAgentApplyInfo>(this.c + arguments.callee.name);
  }

}