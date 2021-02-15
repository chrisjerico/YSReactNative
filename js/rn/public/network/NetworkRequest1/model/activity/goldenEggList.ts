

interface GoldenEggModel {
  id: string,
  start: string,
  end: string,
  type: string,
  param: GoldenEggParam,

}

interface GoldenEggParam {
  content_turntable: string[];   // 活动藐视 每个逗号前代表一行
  membergame: string, // 可以参与的游戏
  buy: string,   // 消耗抽奖的货币类型 1为积分 2为彩金
  check_in_user_levels: string,  // 可以参与的层级 没有则是全部
  chassis_img: string,   // 网络大转盘背景图 chassis_img
  buy_amount: number,
  golden_egg_times: number,
  prizeArr: GoldenEggPrize[]
}

interface GoldenEggPrize {
  prizeId: number   // 奖品id
  prizeIcon: string,   // 奖品图标
  prizeIconName: string,   // 图标名字
  prizeName: string,   // 奖品名字
  prizeAmount: string,   // 奖品金额
  prizeType: string,   // 奖品类型 1为彩金 2为积分 3为其他 4为 未中奖

  prizeMsg: string,   // 信息
  prizeflag: number   // 是否中奖标识 0为未中奖 1为中奖
  integralOld: number   // 抽奖前积分
  integral: number   // 抽奖后积分（算上中奖的）
}


type Data = GoldenEggModel[]
export default Data