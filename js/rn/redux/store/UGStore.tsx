import { AsyncStorage } from 'react-native';
import { applyMiddleware, compose, createStore, Store, Action, Unsubscribe } from 'redux';
import thunk from 'redux-thunk';
import { XBJHomeProps } from '../../pages/香槟金/XBJHomePage';
import { XBJMineProps } from '../../pages/香槟金/XBJMinePage';
import { XBJLoginProps } from '../../pages/香槟金/XBJLoginPage';
import { XBJRegisterProps } from '../../pages/香槟金/XBJRegisterPage';
import { TransitionProps } from 'react-native-reanimated';
import { UpdateVersionProps } from '../../pages/router/UpdateVersionPage';
import Reactotron from '../../public/config/ReactotronConfig';
import UGSysConfModel from '../model/全局/UGSysConfModel';
import UGUserModel from '../model/全局/UGUserModel';
import { AsyncStorageKey } from './IGlobalStateHelper';
import { PageName } from '../../public/navigation/Navigation';
import { BZHSignInStore } from '../../pages/宝石红/BZHSignInPage';
import { JDPromotionListProps } from '../../pages/经典/JDPromotionListPage';
import BettingReducer, { BettingReducerProps, BettingReducerActions } from '../reducer/BettingReducer';

// 整个State的树结构
export interface IGlobalState {
  // 页面Props
  BZHSignInProps?: BZHSignInStore;
  XBJHomeProps?: XBJHomeProps;
  XBJMineProps?: XBJMineProps;
  XBJLoginProps?: XBJLoginProps;
  XBJRegisterProps?: XBJRegisterProps;
  JDPromotionListProps?: JDPromotionListProps; // 优惠活动
  TransitionProps?: TransitionProps;// 过渡页
  UpdateVersionProps?: UpdateVersionProps; // 版本更新

  // 纯数据
  userInfo?: UGUserModel;
  sysConf?: UGSysConfModel;
  BettingReducer?: BettingReducerProps;
}

// 更新Props到全局数据
function RootReducer(prevState: IGlobalState, act: UGAction): IGlobalState {
  const state: IGlobalState = Object.assign({}, prevState);

  if (act.type == 'reset') {
    act.sysConf && (state.sysConf = act.sysConf);
    act.userInfo && (state.userInfo = act.userInfo);
    act.page && (state[act.page + 'Props'] = act.props);
  } else if (act.type == 'merge') {
    state.sysConf = { ...state.sysConf, ...act.sysConf };
    state.userInfo = { ...state.userInfo, ...act.userInfo };
    act.page && (state[act.page + 'Props'] = { ...state[act.page + 'Props'], ...act.props });
  } else {

    // 其他类型Reducer
    state.BettingReducer = BettingReducer(state.BettingReducer, act);
  }
  return state;
}

// 声明UGAction
export interface UGAction<P = {}> extends Action {
  type: 'reset' | 'merge' | BettingReducerActions; // reset替换整个对象，merge只改变指定变量
  page?: PageName;  // 配合props使用
  props?: P;      // 配合page使用
  sysConf?: UGSysConfModel;// 修改系统配置
  userInfo?: UGUserModel;// 修改用户信息
  value?: any;// 其他
}

export class UGStore {
  // Store
  static globalProps: IGlobalState = { userInfo: {}, sysConf: {} };

  // 发送通知
  private static callbacks: { page: PageName, callback: () => void }[] = [];
  static dispatch<P>(act: UGAction<P>) {
    this.globalProps = RootReducer(this.globalProps, act);
    if (act.page) {
      for (const cb of this.callbacks) {
        cb.page == act.page && cb.callback();
      }
    }
  }

  // 添加监听
  static subscribe(page: PageName, callback: () => void): Unsubscribe {
    const cb = { page: page, callback: callback };
    this.callbacks.push(cb);
    return () => {
      UGStore.callbacks.remove(cb);
    };
  }

  // 从本地获取所有数据，并刷新UI
  static refreshFromLocalData() {
    AsyncStorage.getItem(AsyncStorageKey.IGlobalState).then(value => {
      const gs: IGlobalState = JSON.parse(value)
      UGStore.dispatch({ type: 'reset', sysConf: gs.sysConf, userInfo: gs.userInfo });
    });
  }

  // 存储到本地
  static save() {
    AsyncStorage.setItem(AsyncStorageKey.IGlobalState, JSON.stringify(this.globalProps));
  }
}
