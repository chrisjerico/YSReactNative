import IGlobalProps from "../../../redux/store/IGlobalProps";
import {RequestGameDataParams} from "../../../redux/action/GameRoomAction";

/**
 * Arc
 *
 * redux的全局数据 以及 当前界面的操作Action
 */
export default interface IGameRoomProps extends IGlobalProps{
  requestGameData?: (params: RequestGameDataParams) => ((dis)=>{});   //action方法
}
