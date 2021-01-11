
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

}


export class UGBetItemModel {
  clsName?: string = "UGBetItemModel";
  playId?: string; /**<    */
  odds?: string; /**<    */
  playName?: string;/**<    */
  select?: boolean;  /**<   */
}
