
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
