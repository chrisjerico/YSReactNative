/**
 * 选中的球
 */
import { ugLog } from '../../../../public/tools/UgLog'

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
 * @param id 目标球id
 */
const isSelectedBallOnId = (arr?: Array<string>,
                            id?: string): boolean => arr?.includes(id)

export default ISelBall
export { isSelectedBall, isSelectedBallOnId }
