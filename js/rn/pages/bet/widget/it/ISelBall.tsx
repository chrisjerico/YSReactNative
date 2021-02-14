/**
 * 选中的球
 */
import { ugLog } from '../../../../public/tools/UgLog'
import { PlayData, ZodiacNum } from '../../../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty } from '../../../../public/tools/Ext'

interface ISelBall {
  id?: string //唯一识别的ID
  type?: string //当前球的种类
  title?: string //球的名字/编号
}

/**
 * 是否选中某个球
 *
 * @param arr 数组
 * @param tar 目标球
 */
const isSelectedBall = (arr?: Array<ISelBall>,
                        tar?: ISelBall): boolean =>
  arr?.find((item) => {
    // ugLog('item?.id == tar?.id', item?.id, tar?.id, item?.id == tar?.id)
    // ugLog('item?.title == tar?.title', item?.title, tar?.title, item?.title == tar?.title)
    // ugLog('item?.type == tar?.type', item?.type, tar?.type, item?.type == tar?.type)
    return item?.id == tar?.id &&
      item?.title == tar?.title &&
      item?.type == tar?.type
  }) != null

/**
 * 是否选中某个球
 *
 * @param arr 数组
 * @param ball 当前的球
 */
const isSelectedBallOnId = (arr?: Array<PlayData | ZodiacNum>, ball?: PlayData | ZodiacNum): boolean =>
  !anyEmpty(arr?.find((item) => isSameBall(item, ball)))

/**
 * 判断2个球是不是相同
 * @param ball1
 * @param ball2
 */
const isSameBall = (ball1?: PlayData | ZodiacNum, ball2?: PlayData | ZodiacNum): boolean =>
  (!anyEmpty(ball1?.exId) && ball1?.exId == ball2?.exId) || (!anyEmpty(ball1?.id) && ball1?.id == ball2?.id)

export default ISelBall
export {
  isSelectedBall,
  isSelectedBallOnId,
  isSameBall,
}
