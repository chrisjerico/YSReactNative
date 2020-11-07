import { CCSessionReq } from "../CCSessionModel";


export class api_notice {
  c = 'c=notice&a=';

  // 获取首页公告
  latest() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }
}