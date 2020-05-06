import {applyMiddleware, combineReducers, createStore, Store} from 'redux';
import thunk from 'redux-thunk';
import {JDPromotionListProps, JDPromotionListReducer} from '../../pages/经典/JDPromotionListProps';
import {XBJHomeProps, XBJHomeReducer} from '../../pages/香槟金/XBJHomeProps';
import {XBJLoginProps, XBJLoginReducer} from '../../pages/香槟金/XBJLoginProps';
import {XBJMineProps, XBJMineReducer} from '../../pages/香槟金/XBJMineProps';
import {XBJRegisterProps, XBJRegisterReducer} from '../../pages/香槟金/XBJRegisterProps';
import UGSysConfModel from '../model/全局/UGSysConfModel';
import UGUserModel from '../model/全局/UGUserModel';
import {SysConfReducer, UserInfoReducer, AsyncStorageKey} from './IGlobalStateHelper';
import {UGAction, ActionType} from './ActionTypes';
import {AsyncStorage} from 'react-native';
import {UpdateVersionProps, UpdateVersionReducer} from '../../pages/router/UpdateVersionProps';
import {TransitionProps, TransitionReducer} from '../../pages/base/TransitionProps';
import {ZHTYHomeProps, ZHTYHomeReducer} from '../../pages/综合体育/ZHTYHomeProps';
import {ZHTYRegisterProps, ZHTYRegisterReducer} from '../../pages/综合体育/ZHTYRegisterProps';
import {ZHTYLoginProps, ZHTYLoginReducer} from '../../pages/综合体育/ZHTYLoginProps';
import {ZHTYMineProps, ZHTYMineReducer} from '../../pages/综合体育/ZHTYMineProps';

// 整个State的树结构
export interface IGlobalState {
  // 综合体育
  ZHTYRegisterReducer: ZHTYRegisterProps;
  ZHTYLoginReducer: ZHTYLoginProps;
  ZHTYMineReducer: ZHTYMineProps;
  ZHTYHomeReducer: ZHTYHomeProps;

  // 经典
  JDPromotionListReducer: JDPromotionListProps; // 优惠活动

  // 香槟金
  XBJHomeReducer: XBJHomeProps; // 首页
  XBJMineReducer: XBJMineProps; // 我的页
  XBJLoginReducer: XBJLoginProps; // 登录
  XBJRegisterReducer: XBJRegisterProps; // 注册

  // 过渡页
  TransitionReducer: TransitionProps;

  // 纯数据
  UserInfoReducer: UGUserModel;
  SysConfReducer: UGSysConfModel;

  // iOS 独有
  UpdateVersionReducer: UpdateVersionProps;
}

// 整合项目所有reducer
const rootReducer = combineReducers({
  // 综合体育
  ZHTYHomeReducer,
  ZHTYLoginReducer,
  ZHTYRegisterReducer,
  ZHTYMineReducer,

  // 经典
  JDPromotionListReducer, // 优惠活动页
  TransitionReducer, // 占位页面

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
    AsyncStorage.getItem(AsyncStorageKey.IGlobalState).then(value => {
      UGStore.dispatch({type: ActionType.UpdateAll, state: JSON.parse(value)});
    });
  }

  // 存储到本地
  static save() {
    AsyncStorage.setItem(AsyncStorageKey.IGlobalState, JSON.stringify(this.store.getState()));
  }
}
