import { BallType } from '../../../public/components/view/LotteryBall'


/**
 * 彩种
 */
const LotteryConst = {
  TM: 'TM', //特码
  LM: 'LM', //两面
  ZM: 'ZM', //正码
  ZM1_6: 'ZM1-6', //正码1T6
  ZT: 'ZT', //正特
  LMA: 'LMA', //连码
  SB: 'SB', //色波
}

/**
 * tab选中 特码A 特码B
 */
const LHC_Tab = {
  TM_A: 0, //特码A
  TM_B: 1, //特码B
}

export default LotteryConst
export { LHC_Tab }
