import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { scale } from '../../../public/tools/Scale'
import AppDefine from '../../../public/define/AppDefine'

/**
 * 某个站点有特殊要求，就特殊处理
 */
const _c213 = AppDefine.isSite('c213') ? {} : {}

/**
 * 彩票下注配置
 *
 * @constructor
 */
const LCF = {
  pressedColor: `${Skin1.themeColor}dd`,//彩票球选中颜色
  pressedTextColor: UGColor.TextColor6,//彩票球选中文字颜色
  unpressedTextColor: UGColor.TextColor7,//彩票球选中文字颜色
  ball_container_width: scale(126),//彩票球宽度，相对单位，任何屏幕不会变形
  react_container_width: scale(196),//彩票格式宽度，相对单位，任何屏幕不会变形

  // ..._c213,
}

export default LCF
