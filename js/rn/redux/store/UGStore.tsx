import AsyncStorage from '@react-native-community/async-storage'
import { Platform } from 'react-native'
import { Action, Unsubscribe } from 'redux'
import { setProps, UGBasePageProps } from '../../pages/base/UGPage'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import { PageName } from '../../public/navigation/Navigation'
import UGBannerModel from '../model/全局/UGBannerModel'
import UGGameLobbyModel from '../model/全局/UGGameLobbyModel'
import UGRightMenuModel from '../model/全局/UGRightMenuModel'
import UGSignModel from '../model/全局/UGSignModel'
import UGSysConfModel from '../model/全局/UGSysConfModel'
import UGSystemModel from '../model/全局/UGSystemModel'
import UGUserModel from '../model/全局/UGUserModel'
import BettingReducer, { BettingReducerActions, BettingReducerProps } from '../reducer/BettingReducer'
import { AsyncStorageKey } from './IGlobalStateHelper'
import SelectedLotteryModel from '../model/game/SelectedLotteryModel'
import LotteryListModel, {LotteryListData} from '../model/game/LotteryListModel'

// 整个State的树结构

export interface IGlobalState {
  // 纯数据
  BettingReducer?: BettingReducerProps
  userInfo?: UGUserModel
  sysConf?: UGSysConfModel
  sign?: UGSignModel
  gameLobby?: UGGameLobbyModel[] // 遊戲大廳 陣列
  rightMenu?: UGRightMenuModel[] // 又選單 陣列
  banner?: UGBannerModel

  //下注
  selectedLotteryData?: SelectedLotteryModel //选中的游戏数据，如 特码B的第1个、第2个
  lotteryModel?: LotteryListModel //游戏列表数据
  // lotteryColumnIndex?: number //彩种索引

  sys?: UGSystemModel
  // value?: any;
}

// 更新Props到全局数据
function RootReducer(prevState: IGlobalState, act: UGAction): IGlobalState {
  const state: IGlobalState = Object.assign({}, prevState)

  if (act.type == 'reset') {
    //@ts-ignore
    act.sysConf && (state.sysConf = act.sysConf ?? {})
    act.userInfo && (state.userInfo = act.userInfo ?? {})
    act.sign && (state.sign = act.sign ?? {})
    act.banner && (state.banner = act.banner)
    act.sys && (state.sys = act.sys)
    act.page && (state[act.page] = act.props)
    // 陣列
    act.gameLobby && (state.gameLobby = act.gameLobby)
    act.rightMenu && (state.rightMenu = act.rightMenu)

    //彩票数据
    act.selectedLotteryData && (state.selectedLotteryData = act.selectedLotteryData)
    act.lotteryModel && (state.lotteryModel = act.lotteryModel)
    // act.lotteryColumnIndex && (state.lotteryColumnIndex = act.lotteryColumnIndex)

  } else if (act.type == 'merge') {
    state.sysConf = { ...state.sysConf, ...act.sysConf }
    state.userInfo = { ...state.userInfo, ...act.userInfo }
    state.sign = { ...state.sign, ...act.sign }
    state.banner = { ...state.banner, ...act.banner }

    //彩票数据
    state.selectedLotteryData = {selectedData: { ...state.selectedLotteryData?.selectedData, ...act.selectedLotteryData?.selectedData }}
    state.lotteryModel = { ...state.lotteryModel, ...act.lotteryModel }

    state.sys = { ...state.sys, ...act.sys }
    act.page && (state[act.page] = { ...state[act.page], ...act.props })
    // 陣列
    act.gameLobby && (state.gameLobby = act.gameLobby)
    act.rightMenu && (state.rightMenu = act.rightMenu)
  } else {
    // 自定义Reducer写在这里。。。
    state.BettingReducer = BettingReducer(state.BettingReducer, act as any)
    act.page && (state[act.page] = { ...state[act.page], ...act.props })
  }
  return state
}

// 声明UGAction
export interface UGAction<P = {}> extends Action {
  type: 'reset' | 'merge' | BettingReducerActions // reset替换整个对象，merge只改变指定变量
  page?: PageName // 配合props使用
  props?: P // 配合page使用
  sysConf?: UGSysConfModel // 修改系统配置
  userInfo?: UGUserModel // 修改用户信息
  sign?: UGSignModel // 登入註冊訊息
  gameLobby?: UGGameLobbyModel[] // 遊戲大廳
  banner?: UGBannerModel

  //彩票数据
  selectedLotteryData?: SelectedLotteryModel //选中的游戏数据，如 特码B的第1个、第2个
  lotteryModel?: LotteryListModel //游戏列表数据
  // lotteryColumnIndex?: number //彩种索引

  sys?: UGSystemModel
  rightMenu?: UGRightMenuModel[]
  // value?: any;// 其他 example
}

export class UGStore {
  // Store
  static globalProps: IGlobalState = { userInfo: {} as any, sysConf: {} as any, sign: {} as any, gameLobby: [], sys: {} as any }

  // 发送通知
  private static callbacks: { page: PageName; callback: () => void }[] = []

  static dispatch<P>(act: UGAction<P>, willRender = true) {
    this.globalProps = RootReducer(this.globalProps, act)
    if (!willRender) return
    if (act.page) {
      for (const cb of this.callbacks) {
        cb.page == act.page && cb.callback()
      }
    } else {
      setProps()
    }
  }

  // 添加监听
  static subscribe(page: PageName, callback: () => void): Unsubscribe {
    const cb = { page: page, callback: callback }
    this.callbacks.push(cb)
    return () => {
      //@ts-ignore
      UGStore.callbacks.remove(cb)
    }
  }

  // 获取当前页面Props
  static getPageProps<P extends UGBasePageProps>(page: PageName): P {
    return this.globalProps[page] ?? {}
  }

  // 从本地获取所有数据，并刷新UI
  static async refreshFromLocalData() {
    const str = await this.load(AsyncStorageKey.IGlobalState)
    const gs: IGlobalState = JSON.parse(str)
    gs && UGStore.dispatch({ type: 'reset', sysConf: gs?.sysConf, userInfo: gs?.userInfo })
  }

  // 存储到本地
  static async save(key = AsyncStorageKey.IGlobalState, value: any = this.globalProps) {
    if (Platform.OS == 'ios') {
      await OCHelper.call('NSUserDefaults.standardUserDefaults[setObject:forKey:]', [JSON.stringify(value), key])
    } else {
      await AsyncStorage.setItem(AsyncStorageKey.IGlobalState, JSON.stringify(value))
    }
  }

  // 获取本地缓存
  static async load(key: AsyncStorageKey): Promise<string> {
    if (Platform.OS == 'ios') {
      return OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', [key])
    } else {
      return AsyncStorage.getItem(key)
    }
  }
}
