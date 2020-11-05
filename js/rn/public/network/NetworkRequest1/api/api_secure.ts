import { CCSessionReq } from './../CCSessionModel';
import { Platform } from "react-native";
import { ANHelper } from "../../../define/ANHelper/ANHelper";
import { CMD } from "../../../define/ANHelper/hp/CmdDefine";
import { OCHelper } from "../../../define/OCHelper/OCHelper";


export class api_secure {
  c = 'c=secure&a=';

  // 发送短信验证码
  smsCaptcha(phone: string) {
    return CCSessionReq.post(this.c + arguments.callee.name, { phone: phone });
  }
}