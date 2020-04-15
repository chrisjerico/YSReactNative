import {applyMiddleware, combineReducers, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import {JDPromotionListProps, JDPromotionListReducer} from '../../pages/经典/JDPromotionListProps';
import {XBJHomeProps, XBJHomeReducer} from '../../pages/香槟金/XBJHomeProps';
import {XBJLoginProps, XBJLoginReducer} from '../../pages/香槟金/XBJLoginProps';
import {XBJMineProps, XBJMineReducer} from '../../pages/香槟金/XBJMineProps';
import {XBJRegisterProps, XBJRegisterReducer} from '../../pages/香槟金/XBJRegisterProps';
import UGSysConfModel from '../model/全局/UGSysConfModel';
import UGUserModel from '../model/全局/UGUserModel';
import {SysConfReducer, UserInfoReducer} from './Dispatch';
import {UGAction, ActionType} from './ActionTypes';
import {AsyncStorage} from 'react-native';
import {UpdateVersionProps, UpdateVersionReducer} from '../../pages/router/ios/UpdateVersionProps';
import {LoadingProps, LoadingReducer} from '../../pages/base/LoadingProps';

// 整个State的树结构
export interface IGlobalState {
  LoadingReducer: LoadingProps;
  // 经典
  JDPromotionListReducer: JDPromotionListProps; // 优惠活动

  // 香槟金
  XBJHomeReducer: XBJHomeProps; // 首页
  XBJMineReducer: XBJMineProps; // 我的页
  XBJLoginReducer: XBJLoginProps; // 登录
  XBJRegisterReducer: XBJRegisterProps; // 注册

  // 纯数据
  UserInfoReducer: UGUserModel;
  SysConfReducer: UGSysConfModel;

  // iOS 独有
  UpdateVersionReducer: UpdateVersionProps;
}

// 整合项目所有reducer
const rootReducer = combineReducers({
  // 经典
  JDPromotionListReducer, // 优惠活动页
  LoadingReducer, // 占位页面

  // 香槟金
  XBJHomeReducer, // 首页
  XBJMineReducer, // 我的页
  XBJLoginReducer, // 登录
  XBJRegisterReducer, // 注册

  // 纯数据
  UserInfoReducer, // 用户信息
  SysConfReducer, // 系统配置

  // iOS独有
  UpdateVersionReducer,
});

export class UGStore {
  // Store
  static store: Store<IGlobalState, UGAction> = createStore(rootReducer, {}, applyMiddleware(thunk));

  // 发送通知
  static dispatch<P>(act: UGAction<P>) {
    this.store.dispatch(act);
  }

  // 从本地获取所有数据，并刷新UI
  static refreshFromLocalData() {
    AsyncStorage.getItem('IGlobalState').then(value => {
      UGStore.dispatch({type: ActionType.UpdateAll, state: JSON.parse(value)});
    });
  }

  // 存储到本地
  static save() {
    AsyncStorage.setItem('IGlobalState', JSON.stringify(this.store.getState()));
  }
}
