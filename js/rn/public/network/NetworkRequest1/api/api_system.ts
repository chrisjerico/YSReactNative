import { AvatarModel } from './../../Model/SystemAvatarListModel';
import { CCSessionReq, SampleAPI } from './../CCSessionModel';
import { Platform } from "react-native";
import UGPromoteListModel from "../../../../redux/model/other/UGPromoteModel";
import UGSysConfModel from "../../../../redux/model/全局/UGSysConfModel";


export class api_system {
  static c = new SampleAPI('c=system&a=');

  // 获取头像列表
  static avatarList() {
    return this.c.get<AvatarModel[]>('avatarList');
  }

  // 获取首页优惠活动
  static promotions() {
    return this.c.get<UGPromoteListModel>('promotions');
  }

  // 获取系统配置信息
  static config() {
    return this.c.get<UGSysConfModel>('config');
  }

  // 获取首页排行榜
  static rankingList() {
    return this.c.get('rankingList');
  }

  // 获取首页浮动广告
  static floatAds() {
    return this.c.get('floatAds');
  }

  // 获取首页轮播图
  static banners() {
    return this.c.get('banners');
  }

  // 获取首页广告
  static homeAds() {
    return this.c.get('homeAds');
  }

  // 获取首页在线人数
  static onlineCount() {
    return this.c.get('onlineCount');
  }

  // 获取APP版本
  static version() {
    return this.c.get('version', { device: Platform.OS });
  }

  // 侧边栏数据
  static mobileRight() {
    return this.c.get('mobileRight');
  }

  // 提款渠道列表
  static bankList(type: number) {// 0全部, 1银行卡, 2支付宝, 3微信, 4虚拟币
    return this.c.get('bankList', { status: 0, type: type });
  }

}