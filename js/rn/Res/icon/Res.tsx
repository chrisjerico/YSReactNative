// 图片服务器域名：
// https://appstatic.guolaow.com
// https://appstatic.guolaow.com

import { UGImageHost, useHtml5Image } from "../../public/tools/tars"
const { getHtml5Image, img_platform, img_home, img_assets, img_mobileTemplate } = useHtml5Image(UGImageHost.test5)

/**
 * 全局资源统一管理
 *
 */
export const ROULETTE_LOGO = img_assets('c018dzp', 'gif') //大转盘
export const icon_砸金蛋 = img_home('zjd/zjd')    //大转盘
export const icon_刮刮乐 = img_assets('gyg')    //大转盘
export const icon_任务弹窗 = img_assets('task_home')    //任务弹框

export const Res = {
  bankhl1: img_assets('bankhl1'),
  btc: img_assets('btc'),
  empty: img_assets('empty'),
  edit: img_assets('szxxhdpi'),

  //球类:
  red_ball: img_assets('ball/ball_red'),
  green_ball: img_assets('ball/ball_green'),
  blue_ball: img_assets('ball/ball_blue'),

  //骰子
  sz1: img_assets('ball/sz1'),
  sz2: img_assets('ball/sz2'),
  sz3: img_assets('ball/sz3'),
  sz4: img_assets('ball/sz4'),
  sz5: img_assets('ball/sz5'),
  sz6: img_assets('ball/sz6'),

  //彩票分类图标
  c11x5: img_assets('lottery/c11x5'),
  car: img_assets('lottery/car'),
  ft: img_assets('lottery/ft'),
  happy: img_assets('lottery/happy'),
  hot: img_assets('lottery/hot'),
  js: img_assets('lottery/js'),
  k3: img_assets('lottery/k3'),
  lh: img_assets('lottery/lh'),
  nn: img_assets('lottery/nn'),
  pcdd: img_assets('lottery/pcdd'),
  qxc: img_assets('lottery/qxc'),
  shishi: img_assets('lottery/shishi'),
  other: img_assets('lottery/other'),
  game_select: img_assets('lottery/game_select'),
  gameListjrsy: img_assets('lottery/gameListjrsy'),
  gameListlskj: img_assets('lottery/gameListlskj'),
  gameListyhhd: img_assets('lottery/gameListyhhd'),

  //存款图标
  zfb_icon: img_assets('bank/zfb_icon'),
  wechat_online: img_assets('bank/wechat_online'),
  wechatpay_icon: img_assets('bank/wechatpay_icon'),
  weixinhaoyou: img_assets('bank/weixinhaoyou'),
  wx_zfb: img_assets('bank/wx_zfb'),
  yxsm_transfer: img_assets('bank/yxsm_transfer'),
  bank_online: img_assets('bank/bank_online'),
  transfer: img_assets('bank/transfer'),
  cft_icon: img_assets('bank/cft_icon'),
  yunshanfu: img_assets('bank/yunshanfu'),
  qq_online: img_assets('bank/qq_online'),
  baidu: img_assets('bank/baidu'),
  jd: img_assets('bank/jd'),
  quick_online: img_assets('bank/quick_online'),
  xnb_icon: img_assets('bank/xnb_icon'),
  dingding: img_assets('bank/dingding'),
  duosan: img_assets('bank/duosan'),
  xlsm: img_assets('bank/xlsm'),
  aliyin: img_assets('bank/aliyin'),
  ht: img_assets('bank/ht'),
  btc_deposit_icon: img_assets('bank/btc_deposit_icon'),
  aliyin2: img_assets('bank/aliyin2'),

  //虚拟币教程
  hbjc_img: img_assets('tutorial/hbjc_img', 'jpg'),
  c012_virtualcoin_icon: img_assets('tutorial/c012_virtualcoin_icon', 'jpg'),

  //农场
  xync_num_01: img_assets('ball/xync_num_01'),
  xync_num_02: img_assets('ball/xync_num_02'),
  xync_num_03: img_assets('ball/xync_num_03'),
  xync_num_04: img_assets('ball/xync_num_04'),
  xync_num_05: img_assets('ball/xync_num_05'),
  xync_num_06: img_assets('ball/xync_num_06'),
  xync_num_07: img_assets('ball/xync_num_07'),
  xync_num_08: img_assets('ball/xync_num_08'),
  xync_num_09: img_assets('ball/xync_num_09'),
  xync_num_10: img_assets('ball/xync_num_10'),
  xync_num_11: img_assets('ball/xync_num_11'),
  xync_num_12: img_assets('ball/xync_num_12'),
  xync_num_13: img_assets('ball/xync_num_13'),
  xync_num_14: img_assets('ball/xync_num_14'),
  xync_num_15: img_assets('ball/xync_num_15'),
  xync_num_16: img_assets('ball/xync_num_16'),
  xync_num_17: img_assets('ball/xync_num_17'),
  xync_num_18: img_assets('ball/xync_num_18'),
  xync_num_19: img_assets('ball/xync_num_19'),
  xync_num_20: img_assets('ball/xync_num_20'),

  // 游戏大厅
  lottery_ticket: img_assets('lottery/lo'),
  game: img_assets('lottery/ga'),
  fish: img_assets('lottery/fi'),
  chess: img_assets('lottery/chess'),
  dj: img_assets('lottery/d'),
  real_person: img_assets('lottery/re'),
  sports: img_assets('lottery/sp'),
}
