import { CCSessionReq, SampleAPI } from "../CCSessionModel";


export class api_notice {
  static c = new SampleAPI('c=notice&a=');

  // 获取首页公告
  static latest() {
    return this.c.get('latest');
  }
}