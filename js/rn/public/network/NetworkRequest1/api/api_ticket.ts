import { CCSessionReq } from "../CCSessionModel";


export class api_ticket {
  c = 'c=ticket&a=';

  // 获取彩票统计数据
  lotteryStatistics(startDate: string, endDate: string) {// 2020-09-25
    return CCSessionReq.get(this.c + arguments.callee.name, { startDate: startDate, endDate: endDate });
  }

  // 获取注单列表
  history(
    category: string,//游戏分类：lottery=彩票，real=真人，card=棋牌，game=电子游戏，sport=体育
    status: number,// 注单状态：1=待开奖，2=已中奖，3=未中奖，4=已撤单
    startDate: string,
    endDate?: string,
    page = 1,
    rows = 20,
  ) {
    return CCSessionReq.get(this.c + arguments.callee.name, { category: category, status: status, startDate: startDate, endDate: endDate, page: page, rows: rows });
  }
}