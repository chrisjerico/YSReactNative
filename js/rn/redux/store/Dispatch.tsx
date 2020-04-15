import UGUserModel from '../model/全局/UGUserModel';
import {UGAction, ActionType} from './ActionTypes';
import UGSysConfModel from '../model/全局/UGSysConfModel';
import {UGStore} from './UGStore';
import NetworkRequest1 from '../../public/network/NetworkRequest1';

export class Dispatch {
  // 获取用户信息
  static updateUserInfo() {
    NetworkRequest1.user_info().then((user) => {
      UGStore.dispatch({type: ActionType.UpdateUserInfo, props: user});
    });
  }

  // 获取系统配置信息
  static updateSysConf() {}
}

// 更新用户信息
export function UserInfoReducer(prevState: UGUserModel | any = {}, act: UGAction<UGUserModel>): UGUserModel {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.UserInfoReducer};
  if (act.type === ActionType.UpdateUserInfo) return {...prevState, ...act.props};

  return prevState;
}

// 更新系统配置信息
export function SysConfReducer(prevState: UGSysConfModel | any = {}, act: UGAction<UGSysConfModel>): UGSysConfModel {
  if (act.type === ActionType.UpdateAll) return {...prevState, ...act.state.SysConfReducer};
  if (act.type === ActionType.UpdateSysConf) return {...prevState, ...act.props};

  return prevState;
}
