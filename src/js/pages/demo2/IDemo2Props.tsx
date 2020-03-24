import IBasePageProps from "../base/IBasePageProps";
import IGlobalProps from "../../redux/store/IGlobalProps";

/**
 * Arc
 *
 * redux的全局数据 以及 当前界面的操作Action
 */
export default interface IDemo2Props extends IGlobalProps {
  requestDemo2?: (s: string) => ((dis)=>{});   //action方法
}
