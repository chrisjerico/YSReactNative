import { CCSessionReq, SampleAPI } from "../CCSessionModel";


export class api_moment {
  static c = new SampleAPI('c=moment&a=');

  // 发图文朋友圈
  static addMoment(msgType:number, content:string, images:string) {//朋友圈图片链接，多张图片链接以逗号隔开
    return this.c.post('addMoment', {msgType:msgType, content:content, images:images});
  }

  // 朋友圈评论
  static addComment(pid:string, mid:string, content:string) {// mid:朋友圈id
    return this.c.post('addComment', {pid:pid, mid:mid, content:content});
  }
}