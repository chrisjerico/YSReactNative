export class UGBetsRecordListModel {
  clsName?: string = "UGBetsRecordListModel";
  total?: number; /**<   数据总数 */
  totalBetAmount?: string;  /**<   总下注金额 */
  totalWinAmount?: string;  /**<   输赢总金额 */
  totalBetCount?: string; /**<   总下注笔数 */

  list?: Array<UGBetsRecordModel>; 
  tickets?: Array<UGBetsRecordModel>; 

}

export class UGBetsRecordModel {
  clsName?: string = "UGBetsRecordModel";
  id?: string; /**<   注单ID */
  gameType?: string; /**<    */
  gameTypeName?: string; /**<    */
  gameName?: string; /**<   游戏名称（彩种） */
  playGroupName?: string; /**<   游戏分类名称（彩票） */
  playName?: string; /**<   游戏玩法（彩票） */
  amount?: string; /**<    */
  betAmount?: string; /**<   下注金额 */
  betTime?: string; /**<   下注时间 */
  validBetAmount?: string; /**<   有效投注金额（真人） */
  winAmount?: string; /**<   输赢金额 */
  settleAmount?: string;  /**<   结算金额 （彩票） */
  lotteryNo?: string; /**<   开奖号（彩票） */
  status?: string; /**<   注单状态 1=待开奖，2=已中奖，3=未中奖，4=已撤单 */
  playCateId?: string; /**<    */
  statusName?: string; /**<    */
  odds?: string; /**<   赔率（彩票） */
  bet_detail?: string;  /**<   详情跳转url */
  betInfo?: string;  /**<   下注号码 */
  expectAmount?: string; /**<   可赢金额 */
  isAllowCancel?: boolean;  /**<   是否允许撤单 */
  issue?: string; /**<   彩票期号（彩票） */
  displayNumber?: string;  //开奖期数  自营优先使用
  date?: string;/**<  时间  */
  dayOfWeek?: string;  /**<   星期 */
  winCount?: string; /**<   中奖笔数 */
  winLoseAmount?: string;  /**<  输赢 */
  title?: string; /**<  彩種  */
  betCount?: string;  /**<  笔数*/
  betMoney?: string;  /**<   下注金额*/
  rewardRebate?: string; /**<  輸贏*/
  ticketNo?: string; /**<   笔数*/



}


