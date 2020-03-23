import IBasePageProps from "../../pages/base/IBasePageProps";
import IReducerState from "../inter/IReducerState";
import IDemo2Bean from "../inter/bean/IDemo2Bean";
import IHomeBean from "../inter/bean/home/IHomeBean";
import ICouponBean from "../inter/bean/home/ICouponBean";
import IGameRoomBean from "../inter/bean/IGameRoomBean";

/**
 * Arc
 *
 * redux的全局数据
 */
export default interface IGlobalProps extends IBasePageProps{
  //redux相关
  demo2Reducer?: IReducerState<IDemo2Bean>;   //demo2Reducer 结果
  homeReducer?: IReducerState<IHomeBean>;   //homeReducer 结果
  gameRoomReducer?: IReducerState<IGameRoomBean>;   //gameRoomReducer 结果
  couponReducer?: IReducerState<ICouponBean>;   //couponReducer 结果
}
