import IGlobalProps from "../../../redux/store/IGlobalProps";
import {requestHomeDataParams} from "../../../redux/action/HomeAction";

/**
 * Arc
 *
 * redux的全局数据 以及 当前界面的操作Action
 */
export default interface IHomeProps extends IGlobalProps{
  requestHomeData?: (params: requestHomeDataParams) => ((dis)=>{});   //action方法 请求首页数据方法
  requestUserInfo?: (s: string) => ((dis)=>{});   //action方法 请求用户信息

}
