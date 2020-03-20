/**
 * 滑动tab对应的标签属性
 */
import IBaseWidgetProps from "../../base/IBaseWidgetProps";

export interface IUGTopTabBarData {
  title: string,    //tab标题
  page: any,     //tab界面
}


export default interface IUGTopTabBarProps extends IBaseWidgetProps{
  tabs: Array<IUGTopTabBarData>, //所有的界面
}
