import IGlobalProps from "../../../redux/store/IGlobalProps";
import {requestHomeDataParams} from "../../../redux/action/HomeAction";
import IBasePageState from "../../base/IBasePageState";

/**
 * Arc
 *
 * redux的全局数据 以及 当前界面的操作Action
 */
export default interface IHomeProps extends IBasePageState{
  scrollEnable?: boolean, // scrollView 是否可以滑动
  gameTabIndex?: number, // 选中的gameTab
}
