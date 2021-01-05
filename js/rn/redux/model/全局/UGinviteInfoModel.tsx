interface UGinviteInfoModel {
  username: string;
  rid: string;
  link_i: string;/**<   首页推广地址 */
  link_r: string; /**<   注册推广地址 */
  month_earn: string; /**<   本月推荐收益 */
  month_member: string;/**<   本月推荐会员 */

  total_member: string; /**<   推荐会员总计 */
  fandian: string; /**<   一级下线比例 */

  fandian_intro: string; /**<   彩票佣金比例 */
  game_fandian_intro: string;/**<   游戏佣金比例 */
  esport_fandian_intro: string;/**<   电竞佣金比例 */
  fish_fandian_intro: string; /**<   捕鱼佣金比例 */
  card_fandian_intro: string;/**<   棋牌佣金比例 */
  real_fandian_intro: string;/**<   真人佣金比例 */
  sport_fandian_intro: string; /**<   体育佣金比例 */
}
}

export default UGinviteInfoModel