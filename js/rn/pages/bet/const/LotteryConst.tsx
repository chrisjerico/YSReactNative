import { scale } from '../../../public/tools/Scale'
import { anyEmpty } from '../../../public/tools/Ext'

const LEFT_ITEM_HEIGHT = scale(52) //左侧栏单个高度
const BALL_CONTENT_HEIGHT = scale(720) //投注区域球的总体高度

/**
 * 单式复式玩法
 */
enum SingleOption {
  SINGLE, //单式
  COMPLEX, //复式
}

/**
 * 球的种类
 */
const BallType = {
  'round': '圆球', //彩色
  'square': '方球', //彩色
  'colorful': '花球', //多种图片
  'pure': '纯色球', //纯色
  'vegetable': '蔬菜', //蔬菜
  'sz': '骰子', //骰子
}
/**
 * 球的样式
 */
const BallStyles = {
  'lhc': BallType.round, //六合彩
  'qxc': BallType.pure, //"七星彩系列"
  'cqssc': BallType.pure, //"时时彩系列"
  'pk10': BallType.square, //"赛车系列"
  'xyft': BallType.square, //"飞艇系列"
  'yncp': BallType.pure, //"越南彩系列"
  'fc3d': BallType.pure, //"3D系列"
  'gdkl10': BallType.pure, //"快乐10分系列"
  'pk10nn': BallType.square, //"牛牛系列"
  'xync': BallType.vegetable, //"幸运农场系列"
  'bjkl8': BallType.pure, //"快乐8系列"
  'dlt': BallType.round, //"大乐透系列"
  'pcdd': BallType.pure, //"蛋蛋系列"
  'jsk3': BallType.sz, //"快三系列"
  'gd11x5': BallType.pure, //"11选5系列"
}

/**
 * 根据彩种返回球风格
 * @param gameType
 */
const lotteryBallStyle = (gameType?: string): string => {
  let ballStyle = BallStyles[gameType] //球的样式
  ballStyle = anyEmpty(ballStyle) ? BallStyles[LCode.lhc] : ballStyle
  return ballStyle
}

/**
 * 各大彩种
 */
const LCode = {
  lhc: 'lhc', //六合彩
  cqssc: 'cqssc', //秒秒彩
  dlt: 'dlt', //大乐透系列
  pk10nn: 'pk10nn', //牛牛系列
  xyft: 'xyft', //飞艇系列
  xync: 'xync', //幸运农场系列
  pk10: 'pk10', //赛车系列
  bjkl8: 'bjkl8', //北京快8 快乐8系列
  qxc: 'qxc', //七星彩系列
  yncp: 'yncp', //越南彩系列
  fc3d: 'fc3d', //3D系列
  gdkl10: 'gdkl10', //快乐10分系列
  pcdd: 'pcdd', //蛋蛋系列
  jsk3: 'jsk3', //快三系列
  gd11x5: 'gd11x5', //11选5系列
}

/**
 * 六合彩
 */
const LhcCode = {
  TM: 'TM', //特码
  LM: 'LM', //两面
  ZM: 'ZM', //正码
  ZM1_6: 'ZM1-6', //正码1T6
  ZT: 'ZT', //正特
  LMA: 'LMA', //连码
  SB: 'SB', //色波
  YX: 'YX', //平特一肖
  WS: 'WS', //平特尾数
  TWS: 'TWS', //头尾数
  ZOX: 'ZOX', //总肖
  TX: 'TX', //特肖
  LX: 'LX', //连肖
  HX: 'HX', //合肖
  LW: 'LW', //连尾
  ZX: 'ZX', //正肖
  WX: 'WX', //五行
  ZXBZ: 'ZXBZ', //自选不中
}

/**
 * 秒秒彩
 */
const CqsscCode = {
  LM: 'LM', //两面
  ALL: 'ALL', //1-5球
  Q1: 'Q1', //第1球/名
  Q2: 'Q2', //第2球/名
  Q3: 'Q3', //第3球/名
  Q4: 'Q4', //第4球/名
  Q5: 'Q5', //第5球/名
  Q6: 'Q6', //第6球/名
  Q7: 'Q7', //第7球/名
  Q8: 'Q8', //第8球/名
  Q9: 'Q9', //第9球/名
  Q10: 'Q10', //第10球/名
  QZH: 'QZH', //前中后
  DN: 'DN', //斗牛
  SH: 'SH', //梭哈
  LHD: 'LHD', //龙虎斗
  YZDW: 'YZDW', //一字定位
  EZDW: 'EZDW', //二字定位
  SZDW: 'SZDW', //三字定位
  WX: 'WX', //五星
  BDW: 'BDW', //不定位
  DWD: 'DWD', //定位胆
}

/**
 * 赛车
 */
const Pk10Code = {
  GFWF: 'GFWF', //官方玩法
  HE: 'HE', //"冠亚和"
  P1_5: '1-5', //"1-5名"
  P6_10: '6-10', //"6-10"
}

/**
 * 快三
 */
const K3Code = {
  SJ: 'SJ', //三军
  DS: 'DS', //点数
}

/**
 * 广东 11选5
 */
const GD11x5 = {
  ZX: 'ZX', //直选
  G1Z1: '1Z1', //1中1
  KD: 'KD', //跨度
  DD: 'DD', //独胆
  HS: 'HS', //和数
  HSWS: 'HSWS', //和数尾数
}

/**
 * 福彩3D
 */
const FC3d = {
  QIU1: 'QIU1', //第1球/名
  QIU2: 'QIU2', //第2球/名
  QIU3: 'QIU3', //第3球/名
}

/**
 * 当前TAB是 彩票0 还是 聊天室1
 */
enum GameTab {
  LOTTERY,//彩票0
  CHAT //聊天室1
}

export {
  LEFT_ITEM_HEIGHT,
  BALL_CONTENT_HEIGHT,
  SingleOption,
  BallStyles,
  BallType,
  lotteryBallStyle,
  LCode,
  LhcCode,
  CqsscCode,
  Pk10Code,
  K3Code,
  GD11x5,
  FC3d,
  GameTab,
}
