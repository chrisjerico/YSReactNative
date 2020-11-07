import { CCSessionReq } from './../CCSessionModel';
import { Platform } from "react-native";
import UGPromoteListModel from "../../../../redux/model/other/UGPromoteModel";
import UGSysConfModel from "../../../../redux/model/全局/UGSysConfModel";


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

  // 获取首页排行榜
  rankingList() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 获取首页浮动广告
  floatAds() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 获取首页轮播图
  banners() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 获取首页广告
  homeAds() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 获取首页在线人数
  onlineCount() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 获取APP版本
  version() {
    return CCSessionReq.get(this.c + arguments.callee.name, { device: Platform.OS });
  }

  // 侧边栏数据
  mobileRight() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 提款渠道列表
  bankList(type:number) {// 0全部, 1银行卡, 2支付宝, 3微信, 4虚拟币
    return CCSessionReq.get(this.c + arguments.callee.name, {status:0, type:type});
  }

}