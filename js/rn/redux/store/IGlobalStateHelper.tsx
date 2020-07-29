import UGUserModel from '../model/全局/UGUserModel'
import { ActionType, UGAction } from './ActionTypes'
import UGSysConfModel from '../model/全局/UGSysConfModel'
import { UGStore } from './UGStore'
import NetworkRequest1 from '../../public/network/NetworkRequest1'
import UGSkinManagers from '../../public/theme/UGSkinManagers'
import { Platform } from 'react-native'
import { setRnPageInfo } from '../../public/define/OCHelper/SetRnPageInfo'
import APIRouter from '../../public/network/APIRouter'
import { httpClient } from '../../public/network/httpClient'

export const AsyncStorageKey = {
  IGlobalState: 'IGlobalState',
}

export class IGlobalStateHelper {
  static updateUserInfo() {
    NetworkRequest1.user_info().then((user) => {
      UGStore.dispatch({ type: ActionType.UpdateUserInfo, props: user })
      UGStore.save()
    })
  }
  // 获取系统配置信息
  static updateSysConf(sysConf: UGSysConfModel) {
    function refreshUI(sysConf: UGSysConfModel) {
      // 设置当前配置
      UGStore.dispatch({ type: ActionType.UpdateSysConf, props: sysConf })

      if (Platform.OS == 'ios') {
        // 设置皮肤
        UGSkinManagers.updateSkin(sysConf)
        // 配置替换rn的页面
        setRnPageInfo()
      } else {
        // TODO 安卓
      }

      UGStore.save()
    }

    if (sysConf) {
      refreshUI(sysConf)
    } else {
      NetworkRequest1.system_config().then((sysConf) => {
        sysConf && refreshUI(sysConf)
      })
    }
  }
}

// 更新用户信息
export function UserInfoReducer(
  prevState: UGUserModel | any = {},
  act: UGAction<UGUserModel>
): UGUserModel {
  if (act.type === ActionType.UpdateAll)
    return { ...prevState, ...act.state.UserInfoReducer }
  if (act.type === ActionType.UpdateUserInfo)
    return { ...prevState, ...act.props }
  //@ts-ignore
  if (act.type === ActionType.Clear_User) return {}
  return prevState
}

// 更新系统配置信息
export function SysConfReducer(
  prevState: UGSysConfModel | any = {},
  act: UGAction<UGSysConfModel>
): UGSysConfModel {
  if (act.type === ActionType.UpdateAll)
    return { ...prevState, ...act.state.SysConfReducer }
  if (act.type === ActionType.UpdateSysConf)
    return { ...prevState, ...act.props }

  return prevState
}

export async function updateUserInfo() {
  // if (
  //   httpClient.defaults.baseURL == 'undefined' ||
  //   !httpClient.defaults.baseURL
  // )
  //   return
  try {
    const { data } = await APIRouter.user_info()
    if (data?.data) {
      UGStore.dispatch({ type: ActionType.UpdateUserInfo, props: data?.data })
      UGStore.save()
      console.log('-------------updateUserInfo success-------------')
    } else {
      throw { message: data?.msg }
    }
  } catch (error) {
    UGStore.dispatch({ type: ActionType.Clear_User })
    UGStore.save()
    console.log("-------------updateUserInfo error-------------", error)
    // await OCHelper.call('UGUserModel.setCurrentUser:', []);
    // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
    // await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]);
  }
}
