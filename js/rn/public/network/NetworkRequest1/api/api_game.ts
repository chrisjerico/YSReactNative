import { CCSessionReq } from './../CCSessionModel';


export class api_game {
  c = 'c=game&a=';

  // 获取首页游戏列表
  homeGames() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 获取游戏大厅数据
  homeRecommend() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 获取游戏大厅数据
  lotteryGames() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 获取下一期开奖数据
  nextIssue(id: string) {
    return CCSessionReq.get(this.c + arguments.callee.name, { id: id });
  }

  // 长龙助手
  changlong() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 彩票规则
  lotteryRule(id: string) {// 彩种ID
    return CCSessionReq.get(this.c + arguments.callee.name, { id: id });
  }

  // 彩票开奖记录
  lotteryHistory(id: string, date: string) {// 彩种ID、日期2020-10-02
    return CCSessionReq.get(this.c + arguments.callee.name, { id: id, date: date });
  }

  // 额度转换真人列表
  realGames() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 真人游戏分类列表（二级游戏列表）
  realGameTypes() {// 一级游戏ID、搜索的关键字
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 彩票分组列表
  lotteryGroupGames() {
    return CCSessionReq.get(this.c + arguments.callee.name);
  }

  // 获取彩票号码和赔率
  playOdds(id:number) {// 游戏ID
    return CCSessionReq.get(this.c + arguments.callee.name, {id:id});
  }
}