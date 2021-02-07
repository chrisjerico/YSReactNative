import { UGBetsRecordListModel } from "../../../../pages/经典/Model/UGBetsRecordModel";
import { CCSessionReq, SampleAPI } from "../CCSessionModel";


export class api_ticket {
  static c = new SampleAPI('c=ticket&a=');

  // 获取彩票统计数据
  static lotteryStatistics(startDate: string, endDate: string) {// 2020-09-25
    return this.c.get('lotteryStatistics', { startDate: startDate, endDate: endDate });
  }

  // 获取注单列表
  static history(
    category: string,//游戏分类：lottery=彩票，real=真人，card=棋牌，game=电子游戏，sport=体育
    status: number,// 注单状态：1=待开奖，2=已中奖，3=未中奖，4=已撤单 5：已结
    startDate: string,
    endDate?: string,
    gameId?:string,//彩种id参数
    page = 1,
    rows = 20,
  ) {
    return this.c.get<UGBetsRecordListModel>('history', { category: category, status: status, startDate: startDate, endDate: endDate, page: page, rows: rows ,gameId:gameId,});
  }
}