import IGlobalProps from "../../../redux/store/IGlobalProps";
import {RequestGameDataParams} from "../../../redux/action/GameRoomAction";
import {RequestCouponDataParams} from "../../../redux/action/CouponAction";

/**
 * Arc
 *
 * redux的全局数据 以及 当前界面的操作Action
 */
export default interface ICouponProps extends IGlobalProps{
  requestCouponData?: (params: RequestCouponDataParams) => ((dis)=>{});   //action方法
}
