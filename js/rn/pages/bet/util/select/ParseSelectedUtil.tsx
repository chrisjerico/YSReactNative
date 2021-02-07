import { CqsscCode, LhcCode } from '../../const/LotteryConst'
import { SelectedPlayModel } from '../../../../redux/model/game/SelectedLotteryModel'
import { ugLog } from '../../../../public/tools/UgLog'

/**
 * 展开选中的数据为一维数据
 * @param selectedData
 */
const expandSelectedData = (selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>>): Array<SelectedPlayModel> => {
  const flatArr: Array<SelectedPlayModel> = Object.values(selectedData).map((data) => Object.values(data)?.map((data2) => Object.values(data2))).flat(Infinity)
  ugLog('expandSelectedData = ', JSON.stringify(flatArr))
  return flatArr
}

/**
 * 计算当前彩种至少需要选择多少数据
 * @param code 特码 二字定位 等等
 * @param tabAlias TAB的名字，如 连肖里的 二连肖 三连肖
 */
const calculateLimitCount = (code?: string, tabAlias?: string): number => {
  let limitCount = -1
  switch (code) {
    case LhcCode.TM:  //特码
    case LhcCode.LM: //两面
    case LhcCode.ZM: //正码
    case LhcCode.ZT:  //正特
    case LhcCode.ZM1_6: //正码1T6
    case LhcCode.SB: //色波
    case LhcCode.ZOX://总肖
    case LhcCode.WX:  //五行 或 五星
    case LhcCode.YX: //平特一肖 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
    case LhcCode.TX: //特肖
    case LhcCode.ZX: //正肖
    case LhcCode.WS://平特尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
    case LhcCode.TWS://头尾数 平特一肖 和 平特尾数 只有1个数组，头尾数有2个
    case CqsscCode.ALL:  //1-5球
    case CqsscCode.Q1:  //第1球
    case CqsscCode.Q2:  //第2球
    case CqsscCode.Q3:  //第3球
    case CqsscCode.Q4:  //第4球
    case CqsscCode.Q5:  //第5球
    case CqsscCode.QZH:  //前中后
    case CqsscCode.DN:  //斗牛
    case CqsscCode.SH:  //梭哈
    case CqsscCode.LHD:  //龙虎斗
    case CqsscCode.YZDW:  //一字定位
    case CqsscCode.BDW:  //不定位
    case CqsscCode.DWD:  //定位胆
      limitCount = 1
      break
    case LhcCode.LX: //连肖
      switch (tabAlias) {
        case '二连肖':
          limitCount = 2
          break
        case '三连肖':
          limitCount = 3
          break
        case '四连肖':
          limitCount = 4
          break
        case '五连肖':
          limitCount = 5
          break
      }
      break
    case LhcCode.LW: //连尾
      switch (tabAlias) {
        case '二连尾':
          limitCount = 2
          break
        case '三连尾':
          limitCount = 3
          break
        case '四连尾':
          limitCount = 4
          break
        case '五连尾':
          limitCount = 5
          break

      }
      break

    case CqsscCode.EZDW:  //二字定位
    case CqsscCode.SZDW:  //三字定位
      limitCount = 1
      break

    case LhcCode.HX://合肖
      limitCount = 2
      break
    case LhcCode.LMA:  //连码
      switch (tabAlias) {
        case '二全中':
        case '二中特':
        case '特串':
          limitCount = 2
          break
        case '三全中':
        case '三中二':
          limitCount = 3
          break
        case '四全中':
          limitCount = 4
          break

      }
      break

    case LhcCode.ZXBZ:  //自选不中
      limitCount = 5
      break
  }

  return limitCount

}

export {
  calculateLimitCount,
  expandSelectedData,
}


