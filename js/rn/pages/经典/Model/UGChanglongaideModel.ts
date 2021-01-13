
export class UGChanglongaideModel {
  clsName?: string = "UGChanglongaideModel";
  count?: string; /**<    */
  endtime?: string; /**<    */
  fengpanCountdown?: string; /**<    */
  gameId?: string; /**<    */
  issue?: string; /**<    */
  roomId?: string;  /**<   房间id*/
  logo?: string; /**<    */
  lotteryCountdown?: string; /**<    */
  closeCountdown?: string; /**<    */
  lotteryTime?: string; /**<    */
  playCateId?: string; /**<    */
  playCateName?: string; /**<    */
  playName?: string; /**<    */
  serverTime?: string; /**<    */
  closeTime?: string; /**<    */
  openTime?: string; /**<    */
  sort?: string; /**<    */
  title?: string; /**<    */
  displayNumber?: string; /**<  开奖期数  自营优先使用  */

  isSeal?: boolean;  /**<   */
  preIsOpen?: boolean;  /**<   */
  betList?: Array<UGBetItemModel>; 

  //自定义参数
  diffsecond?:number;/**<  服务器时间比开奖时间相差多少秒  */
  currentSecond?:number ;/**<  当前多少秒  默认为1 */
}


export class UGBetItemModel {
  clsName?: string = "UGBetItemModel";
  playId?: string; /**<    */
  odds?: string; /**<    */
  playName?: string;/**<    */
  select?: boolean;  /**<   */
}


export class UGbetListModel {
  clsName?: string = "UGbetListModel";
  betMoney?: string; /**<   下注金额*/
  index?: string; /**<  索引*/
  name?: string;/**<   鼠,牛 */
  odds?: string;/**<   赔率*/
}

export class UGbetParamModel {
  clsName?: string = "UGbetParamModel";
  money?: string; /**<   下注金额*/
  playId?: string; /**<  */
  name?: string;/**<   鼠,牛 */
  odds?: string;/**<   赔率*/
}


export class UGplayNameModel {
  clsName?: string = "UGplayNameModel";
  playName1?: string;/**<   二连肖-鼠,牛*/
  playName2?: string;/**<   鼠,牛*/
}

export class UGselectSubModel {
  clsName?: string = "UGselectSubModel";
  id?: string;/**玩法id*/
  max?: string;/**<   最大选择数*/
  min?: string;/**<   最小选择数*/
  text?: string;/**<   玩法名称*/
  type?: string; /**<   连码*/

}


export class UGbetModel {
  clsName?: string = "UGbetModel";
  gameName?: string;  /**<   游戏名称*/
  gameId?: string;  /**<   游戏id*/
  code?: string;/**<   游戏icode  */
  ftime?: string; /**<   当期期封盘时间  时间挫*/
  roomId?: string; /**<   房间id*/
  totalMoney?: string;  /**<   下注金额*/
  totalNums?: string;  /**<   下注数量*/
  turnNum?: string; /**<   当前期号*/
  displayNumber?: string; /**<    开奖期数  自营优先使用*/
  activeReturnCoinRatio?: string; /**<   */
  specialPlay?: boolean; /**<   */
  betParams?: Array<UGbetParamModel>; /**<   */
  playNameArray?:  Array<UGplayNameModel>; /**<   */
  selectSub?: UGselectSubModel;/**<   用于电脑版*/

}

export class jsDic {
  
  betModel?: any;  /**<   */
  list?: any;  /**<   */
  jsonStr?: any;  /**<   */
}