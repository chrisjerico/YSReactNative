import { AsyncStorage } from 'react-native';
import { applyMiddleware, combineReducers, compose, createStore, Store } from 'redux';
import thunk from 'redux-thunk';
import { TransitionProps, TransitionReducer } from '../../pages/base/TransitionProps';
import { UpdateVersionProps, UpdateVersionReducer } from '../../pages/router/UpdateVersionProps';
import { BZHSignInStore, BZHSignInReducer } from '../../pages/宝石红/BZHSignInProps';
import { JDPromotionListProps, JDPromotionListReducer } from '../../pages/经典/JDPromotionListProps';
import { ZHTYHomeProps, ZHTYHomeReducer } from '../../pages/综合体育/ZHTYHomeProps';
import { ZHTYLoginProps, ZHTYLoginReducer } from '../../pages/综合体育/ZHTYLoginProps';
import { ZHTYMineProps, ZHTYMineReducer } from '../../pages/综合体育/ZHTYMineProps';
import { ZHTYRegisterProps, ZHTYRegisterReducer } from '../../pages/综合体育/ZHTYRegisterProps';
import { XBJHomeProps, XBJHomeReducer } from '../../pages/香槟金/XBJHomeProps';
import { XBJLoginProps, XBJLoginReducer } from '../../pages/香槟金/XBJLoginProps';
import { XBJMineProps, XBJMineReducer } from '../../pages/香槟金/XBJMineProps';
import { XBJRegisterProps, XBJRegisterReducer } from '../../pages/香槟金/XBJRegisterProps';
import Reactotron from '../../public/config/ReactotronConfig';
import UGSysConfModel from '../model/全局/UGSysConfModel';
import UGUserModel from '../model/全局/UGUserModel';
import { ActionType, UGAction } from './ActionTypes';
import { AsyncStorageKey, SysConfReducer, UserInfoReducer } from './IGlobalStateHelper';
import BettingReducer, { BettingReducerProps } from '../reducer/BettingReducer';
// 整个State的树结构
export interface IGlobalState {
  // 寶石紅
  BZHSignInReducer: BZHSignInStore;
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
  BettingReducer: BettingReducerProps
}

// 整合项目所有reducer
export const rootReducer = combineReducers({
  // 寶石紅
  BZHSignInReducer,
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
  //下注資料
  BettingReducer,
});

export class UGStore {
  // Store
  static store: Store<IGlobalState, UGAction> = createStore(rootReducer, compose(applyMiddleware(thunk), Reactotron.createEnhancer()));

  // 发送通知
  static dispatch<P>(act: UGAction<P>) {
    this.store.dispatch(act);
  }

  // 从本地获取所有数据，并刷新UI
  static refreshFromLocalData() {
    AsyncStorage.getItem(AsyncStorageKey.IGlobalState).then(value => {
      UGStore.dispatch({ type: ActionType.UpdateAll, state: JSON.parse(value) });
    });
  }

  // 存储到本地
  static save() {
    AsyncStorage.setItem(AsyncStorageKey.IGlobalState, JSON.stringify(this.store.getState()));
  }
}
