import { AsyncStorage } from 'react-native';
import { Action, Unsubscribe } from 'redux';
import { UGBasePageProps } from '../../pages/base/UGPage';
import { PageName } from '../../public/navigation/Navigation';
import UGSysConfModel from '../model/全局/UGSysConfModel';
import UGUserModel from '../model/全局/UGUserModel';
import BettingReducer, { BettingReducerActions, BettingReducerProps } from '../reducer/BettingReducer';
import { AsyncStorageKey } from './IGlobalStateHelper';
import SignModel from '../model/全局/SignModel';
// 整个State的树结构

export interface IGlobalState {
  // 纯数据
  userInfo?: UGUserModel;
  sysConf?: UGSysConfModel;
  sign?: SignModel;
  BettingReducer?: BettingReducerProps;
  value?: any;
}

// 更新Props到全局数据
function RootReducer(prevState: IGlobalState, act: UGAction): IGlobalState {
    const state: IGlobalState = Object.assign({}, prevState);

  if (act.type == 'reset') {
    act.sysConf && (state.sysConf = act.sysConf);
    act.userInfo && (state.userInfo = act.userInfo);
    act.page && (state[act.page] = act.props);
  } else if (act.type == 'merge') {
    state.sysConf = { ...state.sysConf, ...act.sysConf };
    state.userInfo = { ...state.userInfo, ...act.userInfo };
    state.sign = { ...state.sign, ...act.sign };
    // state.value = { ...state.value, ...act.value }; // 其他  example
    act.page && (state[act.page] = { ...state[act.page], ...act.props });
  } else {
    // 自定义Reducer写在这里。。。
    state.BettingReducer = BettingReducer(state.BettingReducer, act as any);
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
  sign?: SignModel; // 登入註冊訊息 
  // value?: any;// 其他 example
}

export class UGStore {
  // Store
  static globalProps: IGlobalState = { userInfo: {} as any, sysConf: {} as any, sign: {} as any };

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
        const cb = {page: page, callback: callback};
        this.callbacks.push(cb);
        return () => {
            UGStore.callbacks.remove(cb);
        };
    }

  // 获取当前页面Props
  static getPageProps<P extends UGBasePageProps>(page: PageName): P {
    return this.globalProps[page] ?? {};
  }

    // 从本地获取所有数据，并刷新UI
    static refreshFromLocalData() {
        AsyncStorage.getItem(AsyncStorageKey.IGlobalState).then(value => {
            const gs: IGlobalState = JSON.parse(value)
            UGStore.dispatch({type: 'reset', sysConf: gs.sysConf, userInfo: gs.userInfo});
        });
    }

    // 存储到本地
    static save() {
        AsyncStorage.setItem(AsyncStorageKey.IGlobalState, JSON.stringify(this.globalProps));
    }
}
