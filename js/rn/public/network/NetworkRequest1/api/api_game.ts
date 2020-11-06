import { CCSessionReq } from './../CCSessionModel';
import { Platform } from "react-native";
import { ANHelper } from "../../../define/ANHelper/ANHelper";
import { CMD } from "../../../define/ANHelper/hp/CmdDefine";
import { OCHelper } from "../../../define/OCHelper/OCHelper";


export class api_game {
  c = 'c=game&a=';

    // 获取首页游戏列表
    homeGames() {
      return CCSessionReq.get(this.c + arguments.callee.name);
    }
  
  
}