import { CCSessionReq } from './../CCSessionModel';
import { httpClient } from '../../httpClient';
import { Platform } from "react-native";
import { ANHelper } from "../../../define/ANHelper/ANHelper";
import { CMD } from "../../../define/ANHelper/hp/CmdDefine";
import { OCHelper } from "../../../define/OCHelper/OCHelper";


export class api_lhcdoc {
  c = 'c=lhcdoc&a=';

  // 获取帖子详情
  contentDetail(id: string) {
    return CCSessionReq.get(this.c + arguments.callee.name, { id: id });
  }

  // 获取评论列表
  contentReplyList(
    contentId: string, // 帖子ID
    replyPId: string = '', // 回复ID
    page: number = 1, // 页码
    rows: number = 20, // 每页条数
  ) {

    return CCSessionReq.get(this.c + arguments.callee.name, { contentId: contentId, replyPId: replyPId, page: page, rows: rows });
  }
}