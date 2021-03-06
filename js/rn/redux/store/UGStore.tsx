import AsyncStorage from '@react-native-community/async-storage'
import { Platform } from 'react-native'
import { Action, Unsubscribe } from 'redux'
import { setProps, UGBasePageProps } from '../../pages/base/UGPage'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import UGBannerModel from '../model/全局/UGBannerModel'
import UGGameLobbyModel from '../model/全局/UGGameLobbyModel'
import UGRightMenuModel from '../model/全局/UGRightMenuModel'
import UGSignModel from '../model/全局/UGSignModel'
import UGSysConfModel from '../model/全局/UGSysConfModel'
import UGSystemModel from '../model/全局/UGSystemModel'
import UGUserModel from '../model/全局/UGUserModel'
import BettingReducer, { BettingReducerActions, BettingReducerProps } from '../reducer/BettingReducer'
import { AsyncStorageKey } from './IGlobalStateHelper'
import { SelectedPlayModel } from '../model/game/SelectedLotteryModel'
import { PlayOddDetailData } from '../../public/network/Model/lottery/PlayOddDetailModel'
import { anyEmpty, anyNull, arrayEmpty, mergeObject } from '../../public/tools/Ext'
import { NextIssueData } from '../../public/network/Model/lottery/NextIssueModel'
import { BetShareModel } from '../model/game/bet/BetShareModel'
import { ChatRoomData } from '../../public/network/Model/chat/ChatRoomModel'
import { GameTab, HcmTabOption, SingleOption } from '../../pages/bet/const/LotteryConst'
import { IMiddleMenuItem } from '../../public/components/menu/MiddleMenu'
import { ShareChatRoomModel } from '../../public/network/Model/chat/ShareChatRoomModel'
import { ugLog } from '../../public/tools/UgLog'

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

  sys?: UGSystemModel
  // value?: any;

  //下注彩票信息相关数据
  lotteryId?: string //当前的彩咱ID，六合彩 秒秒彩
  lotteryTabIndex?: number //当前的彩种处于TAB哪一页
  singleTabIndex?: SingleOption //当前的彩种处于TAB的单式还是复式
  fastTabIndex?: HcmTabOption //当前的越南彩种处于 选择 输入 还是 快速玩法
  gameTabIndex?: GameTab //GameTab 当前TAB是 彩票0 还是 聊天室1
  currentColumnIndex?: number //当前彩种栏目索引
  betShareModel?: BetShareModel //下注数据结构
  nextIssueData?: NextIssueData //下一期的数据数据
  playOddDetailData?: PlayOddDetailData //彩票数据 六合彩 秒秒彩
  selectedData?: Map<string, Map<string, Map<string, SelectedPlayModel>>> //选中了哪些数据，3层结构(code -> code -> value), 如 TM -> 特码B/特码A -> 特码/两面/色波 -> GroupData

  //附加数据
  betChaseMap?: Map<string, BetShareModel> //追号的存档数据
  inputMoney?: number //输入的游戏金额
  betCount?: number //注数，比如越南彩有该项
  sliderValue?: number //退水拉条数据

  //聊天室相关数据
  chatRoomIndex?: number //当前聊天室索引
  chatRoomData?: ChatRoomData //聊天数据
  chatArray?: Array<IMiddleMenuItem> //聊天室列表
  shareChatModel?: ShareChatRoomModel //聊天室待分享数据

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
    act.lotteryId && (state.lotteryId = act.lotteryId)
    act.lotteryTabIndex >= 0 && (state.lotteryTabIndex = act.lotteryTabIndex)
    act.singleTabIndex >= 0 && (state.singleTabIndex = act.singleTabIndex)
    !anyEmpty(act.fastTabIndex) && (state.fastTabIndex = act.fastTabIndex)
    act.gameTabIndex >= 0 && (state.gameTabIndex = act.gameTabIndex)
    act.currentColumnIndex >= 0 && (state.currentColumnIndex = act.currentColumnIndex)
    act.betShareModel && (state.betShareModel = act.betShareModel)
    act.nextIssueData && (state.nextIssueData = act.nextIssueData)
    act.playOddDetailData && (state.playOddDetailData = act.playOddDetailData)
    act.chatRoomIndex >= 0 && (state.chatRoomIndex = act.chatRoomIndex)
    act.chatRoomData && (state.chatRoomData = act.chatRoomData)
    act.chatArray && (state.chatArray = act.chatArray)
    act.shareChatModel && (state.shareChatModel = act.shareChatModel)

    act.selectedData && (state.selectedData = act.selectedData)
    act.betChaseMap && (state.betChaseMap = act.betChaseMap)
    act.inputMoney >= 0 && (state.inputMoney = act.inputMoney)
    act.betCount >= 0 && (state.betCount = act.betCount)
    act.sliderValue >= 0 && (state.sliderValue = act.sliderValue)

  } else if (act.type == 'merge') {
    state.sysConf = { ...state.sysConf, ...act.sysConf }
    state.userInfo = { ...state.userInfo, ...act.userInfo }
    state.sign = { ...state.sign, ...act.sign }
    state.banner = { ...state.banner, ...act.banner }

    //彩票数据
    state.betShareModel = { ...state.betShareModel, ...act.betShareModel }
    state.nextIssueData = { ...state.nextIssueData, ...act.nextIssueData }
    state.playOddDetailData = { ...state.playOddDetailData, ...act.playOddDetailData }
    state.chatRoomData = { ...state.chatRoomData, ...act.chatRoomData }
    state.betChaseMap = { ...state.betChaseMap, ...act.betChaseMap }

    state.selectedData = mergeObject(state.selectedData, act.selectedData)

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
export interface UGAction<P = {}> extends Action, IGlobalState {
  type: 'reset' | 'merge' | BettingReducerActions // reset替换整个对象，merge只改变指定变量
  page?: string // 配合props使用
  props?: P // 配合page使用

  // 纯数据
  BettingReducer?: BettingReducerProps

}

export class UGStore {
  // Store
  static globalProps: IGlobalState = { userInfo: {} as any, sysConf: {} as any, sign: {} as any, gameLobby: [], sys: {} as any }

  // 发送通知
  private static callbacks: { key: string; callback: () => void }[] = []

  static dispatch<P>(act: UGAction<P>, willRender = true) {
    this.globalProps = RootReducer(this.globalProps, act)
    if (!willRender) return
    if (act.page) {
      for (const cb of this.callbacks) {
        cb.key == act.page && cb.callback()
      }
    } else {
      setProps()
    }
  }

  // 添加监听
  static subscribe(key: string, callback: () => void): Unsubscribe {
    const cb = { key: key, callback: callback }
    this.callbacks.push(cb)
    return () => {
      //@ts-ignore
      UGStore.callbacks.remove(cb)
    }
  }

  // 获取当前页面Props
  static getPageProps<P extends UGBasePageProps>(pageKey: string): P {
    return this.globalProps[pageKey]
  }

  // 从本地获取所有数据，并刷新UI
  static async refreshFromLocalData() {
    const gs = await this.loadValueForKey<IGlobalState>(AsyncStorageKey.IGlobalState)
    gs && UGStore.dispatch({ type: 'reset', sysConf: gs?.sysConf, userInfo: gs?.userInfo })
  }

  // 存储到本地
  static async save() {
    return this.saveValueAndKey(AsyncStorageKey.IGlobalState, this.getPageProps)
  }

  // 存储到本地
  static async saveValueAndKey(key: AsyncStorageKey, value: any): Promise<any> {
    ugLog('save key = ', key)
    value = JSON.stringify(value)
    if (Platform.OS == 'ios') {
      await OCHelper.call('NSUserDefaults.standardUserDefaults[setObject:forKey:]', [value, key])
    } else {
      await AsyncStorage.setItem(key, value)
    }
  }

  // 获取本地缓存
  static async loadValueForKey<T>(key: AsyncStorageKey | string): Promise<T> {
    ugLog('load key = ', key)
    let value = undefined
    if (Platform.OS == 'ios') {
      value = await OCHelper.call('NSUserDefaults.standardUserDefaults.stringForKey:', [key])
    } else {
      value = await AsyncStorage.getItem(key)
    }
    return JSON.parse(value)
  }
}
