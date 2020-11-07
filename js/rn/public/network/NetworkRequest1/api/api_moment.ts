import { CCSessionReq } from "../CCSessionModel";


export class api_moment {
  c = 'c=moment&a=';

  // 发图文朋友圈
  addMoment(msgType:number, content:string, images:string) {//朋友圈图片链接，多张图片链接以逗号隔开
    return CCSessionReq.post(this.c + arguments.callee.name, {msgType:msgType, content:content, images:images});
  }

  // 朋友圈评论
  addComment(pid:string, mid:string, content:string) {// mid:朋友圈id
    return CCSessionReq.post(this.c + arguments.callee.name, {pid:pid, mid:mid, content:content});
  }
}