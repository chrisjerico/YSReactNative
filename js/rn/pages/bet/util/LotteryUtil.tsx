import { anyEmpty } from '../../../public/tools/Ext'
import { ZodiacNum } from '../../../public/network/Model/lottery/PlayOddDetailModel'

/**
 * 根据名字或别名找出生肖
 * @param num
 * @param item
 */
const findZodiacByName = (num?: ZodiacNum[], item?: INameOrAlias): ZodiacNum =>
  num?.find((zodiac) => ((!anyEmpty(item?.name) && zodiac?.name == item?.name)
    || (!anyEmpty(item?.alias) && zodiac?.alias == item?.alias)))

interface INameOrAlias {
  name: string; //鼠
  alias?: string;//鼠
}

export { findZodiacByName }
