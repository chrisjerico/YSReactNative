export class RedBagLogModel {
  clsName?: string = "RedBagLogModel";
  id?: string;  /**<  "id": "6856" */
  uid?: string;  /**<  "uid": "63408" */
  createTime?: string;  /**<  创建时间 "createTime": "1580885856",*/
  redBagId?: string;  /**<  "redBagId": "1850",*/
  genre?: string;  /**<  "genre": "2", */
  operate?: string;  /**<  操作类型1-发送红包，2-抢红包，3-过期退回，4-踩雷赔付，5-获得赔付，6-幸运奖励，7-多雷奖励 */
  amount?: string;  /**< "amount": "8.00", */
  genreTextid?: string;  /**<  "genreText": "扫雷红包",*/
  operateText?: string; /**<   类型名称：过期 */


}