import { GroupGameData } from '../../Model/game/HallGameModel';
import { CCSessionReq, SampleAPI } from './../CCSessionModel';


export class api_game {
  static c = new SampleAPI('c=game&a=');

  // 获取首页游戏列表
  static homeGames() {
    return this.c.get('homeGames');
  }

  // 获取游戏大厅数据
  static homeRecommend() {
    return this.c.get('homeRecommend');
  }

  // 获取游戏大厅数据
  static lotteryGames() {
    return this.c.get('lotteryGames');
  }

  // 获取下一期开奖数据
  static nextIssue(id: string) {
    return this.c.get('nextIssue', { id: id });
  }

  // 长龙助手
  static changlong(id: string) {
    return this.c.get('changlong',{ id: id });
  }

  // 彩票规则
  static lotteryRule(id: string) {// 彩种ID
    return this.c.get('lotteryRule', { id: id });
  }

  // 彩票开奖记录
  static lotteryHistory(id: string, date: string) {// 彩种ID、日期2020-10-02
    return this.c.get('lotteryHistory', { id: id, date: date });
  }

  // 额度转换真人列表
  static realGames() {
    return this.c.get('realGames');
  }

  // 真人游戏分类列表（二级游戏列表）
  static realGameTypes(id: string) {// 一级游戏ID、搜索的关键字
    return this.c.get('realGameTypes', { id: id });
  }

  // 彩票分组列表
  static lotteryGroupGames() {
    return this.c.get<GroupGameData[]>('lotteryGroupGames');
  }

  // 获取彩票号码和赔率
  static playOdds(id:number) {// 游戏ID
    return this.c.get('playOdds', {id:id});
  }
}