import UGUserModel from '../model/全局/UGUserModel'
import UGSysConfModel from '../model/全局/UGSysConfModel'
import { UGStore } from './UGStore'
import NetworkRequest1 from '../../public/network/NetworkRequest1'
import UGSkinManagers from '../../public/theme/UGSkinManagers'
import { Platform } from 'react-native'
import { setRnPageInfo } from '../../public/define/OCHelper/SetRnPageInfo'
import APIRouter from '../../public/network/APIRouter'
import { httpClient } from '../../public/network/httpClient'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'

export const AsyncStorageKey = {
  IGlobalState: 'IGlobalState',
}

export class IGlobalStateHelper {
  static updateUserInfo() {
    NetworkRequest1.user_info().then(user => {
      UGStore.dispatch({ type: 'merge', userInfo: user })
      UGStore.save();
    });
  }
}

export async function updateUserInfo() {
  console.log('-------------updateUserInfo-------------')
  if (
    httpClient.defaults.baseURL == 'undefined' ||
    !httpClient.defaults.baseURL
  )
    return
  try {
    const { data } = await APIRouter.user_info()
    if (data.data) {
      UGStore.dispatch({ type: 'merge', userInfo: data?.data });
      UGStore.save();
    } else {
      throw { message: data.msg }
    }
  } catch (error) {
    console.log(error)
    // await OCHelper.call('UGUserModel.setCurrentUser:', []);
    // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
    // await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]);
    // UGStore.dispatch({ type: 'reset', userInfo: {} });
    // UGStore.save();
  }
}
