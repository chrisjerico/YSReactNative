import { scale } from '../../../public/tools/Scale'
import { BallType } from '../../../public/components/view/LotteryBall'

const LEFT_ITEM_HEIGHT = scale(52) //左侧栏单个高度
const BALL_CONTENT_HEIGHT = scale(720) //投注区域球的总体高度

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
 * 各大彩种
 */
const LCode = {
  lhc: 'lhc', //六合彩
  cqssc: 'cqssc', //秒秒彩
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
  Q1: 'Q1', //第1球
  Q2: 'Q2', //第2球
  Q3: 'Q3', //第3球
  Q4: 'Q4', //第4球
  Q5: 'Q5', //第5球
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

export {
  LEFT_ITEM_HEIGHT,
  BALL_CONTENT_HEIGHT,
  BallStyles,
  LCode,
  LhcCode,
  CqsscCode,
}
