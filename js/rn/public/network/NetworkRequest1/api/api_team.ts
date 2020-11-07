import { CCSessionReq } from './../CCSessionModel';
import { UGAgentApplyInfo } from "../../../../redux/model/全局/UGSysConfModel";


export class api_team {
  c = 'c=item&a=';

  // 获取代理申请信息（推荐收益）
  agentApplyInfo() {
    return CCSessionReq.get<UGAgentApplyInfo>(this.c + arguments.callee.name);
  }

  // 推荐信息
  inviteInfo() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 下线信息
  inviteList() {//下线级别0(全部)，1(1级下线)、2(2级下线)、3(3级下线)
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 下线投注报表信息
  betStat(level: number, startDate?: string, endDate?: string, page = 1, rows: 20) {
    return CCSessionReq.get(this.c + arguments.callee.name, { level: level, startDate: startDate, endDate: endDate, page: page, rows: rows });
  }

  // 下线真人报表信息
  realBetStat(level: number, startDate?: string, endDate?: string, page = 1, rows: 20) {
    return CCSessionReq.get(this.c + arguments.callee.name, { level: level, startDate: startDate, endDate: endDate, page: page, rows: rows });
  }

  // 下线存款报表信息
  depositStat(level: number, startDate?: string, endDate?: string, page = 1, rows: 20) {
    return CCSessionReq.get(this.c + arguments.callee.name, { level: level, startDate: startDate, endDate: endDate, page: page, rows: rows });
  }

  // 下线提款报表信息
  withdrawStat(level: number, startDate?: string, endDate?: string, page = 1, rows: 20) {
    return CCSessionReq.get(this.c + arguments.callee.name, { level: level, startDate: startDate, endDate: endDate, page: page, rows: rows });
  }

  // 下线投注记录信息
  betList(level: number, startDate?: string, endDate?: string, page = 1, rows: 20) {
    return CCSessionReq.get(this.c + arguments.callee.name, { level: level, startDate: startDate, endDate: endDate, page: page, rows: rows });
  }

  // 代理域名信息
  inviteDomain(page = 1, rows = 20) {
    return CCSessionReq.get(this.c + arguments.callee.name, { page: page, rows: rows });
  }

  // 下线存款记录信息
  depositList(level: number, page = 1, rows = 20) {
    return CCSessionReq.get(this.c + arguments.callee.name, { level: level, page: page, rows: rows });
  }

  // 下线提款记录信息
  withdrawList(level: number, page = 1, rows = 20) {
    return CCSessionReq.get(this.c + arguments.callee.name, { level: level, page: page, rows: rows });
  }

  // 下线真人记录信息
  realBetList(level: number, page = 1, rows = 20) {
    return CCSessionReq.get(this.c + arguments.callee.name, { level: level, page: page, rows: rows });
  }

  // 给下线充值
  transfer(uid: string, coin: number) {
    return CCSessionReq.post(this.c + arguments.callee.name, { uid: uid, coin: coin });
  }

  // 给下级会员充值接口
  recharge(uid: string, money: number) {
    return CCSessionReq.post(this.c + arguments.callee.name, { uid: uid, money: money });
  }

  // 申请代理
  agentApply(qq: string, phone: string, content: string) {//QQ手机号二选一
    return CCSessionReq.post(this.c + arguments.callee.name, { qq: qq, phone: phone, content: content, action: 'apply' });
  }

}