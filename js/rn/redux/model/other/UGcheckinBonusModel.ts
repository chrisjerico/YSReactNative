
export class UGcheckinBonusModel {
  clsName?: string = "UGcheckinBonusModel";
  BonusInt?: string;  /**<   20趣味豆 */
  BonusSwitch?: string; /**<   签到开关，1显示0隐藏 */
  isComplete?: boolean; /**<   是否已经领取  true   是，   false  否 */
  isCheckin?: boolean;    /**<   是否可以领取  true   是，   false  否 */

}



export class UGCheckinListModel {
  clsName?: string = "UGCheckinListModel";
  week?: string;  /**<   星期一 */
  whichDay?: string; /**<   日期 //2019-09-02 */
  integral?: number; /**<   10 金币 */
  isCheckin?: boolean; /**<   是否已经签到  true 已经签到   false 还没有签到 */
  isMakeup?: boolean;  /**<   是否可以补签   true 可以   false 不可以 */
  serverTime?: string; /**<   服务器时间==>本地 */
  mkCheckinSwitch?: boolean;  /**<   补签总开关  true  开，   false  关 */
}


export class UGSignInModel {
  clsName?: string = "UGSignInModel";
  serverTime?: string; /**<   服务器时间 */
  checkinTimes?: number; /**<   连续签到多少天 */
  checkinMoney?: string; /**<   积分 */
  checkinSwitch?: boolean; /**<   签到总开关  true   开，   false  关 */
  mkCheckinSwitch?: boolean;  /**<   补签总开关  true  开，   false  关 */
  checkinList?: Array<UGCheckinListModel>; 
  checkinBonus?: Array<UGcheckinBonusModel>; 
}
