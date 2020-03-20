/**
 * 滑动tab对应的标签属性
 */
import IBaseWidgetProps from "../../base/IBaseWidgetProps";

export interface IUGBottomTabBarBean {
  title: string,    //tab标题
  icon: object,    //tab图标
  page: any,     //tab界面
}


export default interface IUGBottomTabBarProps extends IBaseWidgetProps{
  tabs: Array<IUGBottomTabBarBean>, //所有的界面
}
