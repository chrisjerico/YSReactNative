import { CCSessionReq, SampleAPI } from './../CCSessionModel';
import { UGAgentApplyInfo } from "../../../../redux/model/全局/UGSysConfModel";
import UGinviteInfoModel from '../../../../redux/model/全局/UGinviteInfoModel';


export class api_team {
  static c = new SampleAPI('c=team&a=');

  // 获取代理申请信息（推荐收益）
  static agentApplyInfo() {
    return this.c.get<UGAgentApplyInfo>('agentApplyInfo');
  }

  // 推荐信息
  static inviteInfo() {
    return this.c.get<UGinviteInfoModel>('inviteInfo');
  }

  // 下线信息
  static inviteList(level: number, page = 1, rows = 20) {//下线级别0(全部)，1(1级下线)、2(2级下线)、3(3级下线)
    return this.c.get('inviteList', { level: level, page: page, rows: rows });
  }

  // 下线投注报表信息
  static betStat(level: string, startDate?: string, endDate?: string, page = 1, rows = 20) {
    return this.c.get('betStat', { level: level, startDate: startDate, endDate: endDate, page: page, rows: rows });
  }

  // 下线真人报表信息
  static realBetStat(level: number, startDate?: string, endDate?: string, page = 1, rows = 20) {
    return this.c.get('realBetStat', { level: level, startDate: startDate, endDate: endDate, page: page, rows: rows });
  }

  // 下线存款报表信息
  static depositStat(level: number, startDate?: string, endDate?: string, page = 1, rows = 20) {
    return this.c.get('depositStat', { level: level, startDate: startDate, endDate: endDate, page: page, rows: rows });
  }

  // 下线提款报表信息
  static withdrawStat(level: number, startDate?: string, endDate?: string, page = 1, rows = 20) {
    return this.c.get('withdrawStat', { level: level, startDate: startDate, endDate: endDate, page: page, rows: rows });
  }

  // 下线投注记录信息
  static betList(level: number, startDate?: string, endDate?: string, page = 1, rows = 20) {
    return this.c.get('betList', { level: level, startDate: startDate, endDate: endDate, page: page, rows: rows });
  }

  // 代理域名信息
  static inviteDomain(page = 1, rows = 20) {
    return this.c.get('inviteDomain', { page: page, rows: rows });
  }

  // 下线存款记录信息
  static depositList(level: number, page = 1, rows = 20) {
    return this.c.get('depositList', { level: level, page: page, rows: rows });
  }

  // 下线提款记录信息
  static withdrawList(level: number, page = 1, rows = 20) {
    return this.c.get('withdrawList', { level: level, page: page, rows: rows });
  }

  // 下线真人记录信息
  static realBetList(level: number, page = 1, rows = 20) {
    return this.c.get('realBetList', { level: level, page: page, rows: rows });
  }

  // 给下线充值
  static transfer(uid: string, coin: number) {
    return this.c.post('transfer', { uid: uid, coin: coin });
  }

  // 给下级会员充值接口
  static recharge(uid: string, money: number) {
    return this.c.post('recharge', { uid: uid, money: money });
  }

  // 申请代理
  static agentApply(qq: string, phone: string, content: string) {//QQ手机号二选一
    return this.c.post('agentApply', { qq: qq, phone: phone, content: content, action: 'apply' });
  }

  //邀请码列表
  static inviteCodeList(page = 1, rows = 10) {
    return this.c.get('inviteCodeList', { page: page, rows: rows });
  }
  // 生成邀请码
  static generateInviteCode(params: {
    length: number, // 长度
    count: number,//数量
    user_type: number,//类型
    randomCheck?: number,//是否随机
  }) {
    return this.c.post('createInviteCode', params)
  }

    // 停用开启邀请码
    static updateInviteCodeStatus(params: {
      id: number, // 邀请码id
      status: number,//状态 ： 0 关闭  1 开启

    }) {
      return this.c.post('updateInviteCodeStatus', params)
    }
}