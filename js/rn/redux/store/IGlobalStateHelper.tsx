import { Platform } from 'react-native'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import { setRnPageInfo } from '../../public/define/OCHelper/SetRnPageInfo'
import APIRouter from '../../public/network/APIRouter'
import NetworkRequest1 from '../../public/network/NetworkRequest1'
import UGSkinManagers from '../../public/theme/UGSkinManagers'
import UGSysConfModel from '../model/全局/UGSysConfModel'
import { UGStore } from './UGStore'

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
  // 获取系统配置信息
  static updateSysConf(sysConf: UGSysConfModel) {
    function refreshUI(sysConf: UGSysConfModel) {
      // 设置当前配置
      UGStore.dispatch({ type: 'merge', sysConf: sysConf });

      if (Platform.OS == 'ios') {
        // 设置皮肤
        UGSkinManagers.updateSkin(sysConf)
        // 配置替换rn的页面
        setRnPageInfo()
        // 初始配置完毕，可以进入主页
        setTimeout(() => {
          OCHelper.launchFinish();
        }, 1000);
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

export async function updateUserInfo() {
  // if (
  //   httpClient.defaults.baseURL == 'undefined' ||
  //   !httpClient.defaults.baseURL
  // )
  //   return
  try {
    const { data } = await APIRouter.user_info()
    if (data.data) {
      UGStore.dispatch({ type: 'merge', userInfo: data?.data });
      UGStore.save();
    } else {
      throw { message: data?.msg }
    }
  } catch (error) {
    UGStore.dispatch({ type: 'reset' })
    UGStore.save()
    console.log("-------------updateUserInfo error-------------", error)
    // await OCHelper.call('UGUserModel.setCurrentUser:', []);
    // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
    // await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]);
  }
}

export async function updateSysConf() {
  try {
    const { data } = await APIRouter.system_config()
    if (data?.data) {
      UGStore.dispatch({ type: 'merge', props: data?.data })
      UGStore.save()
    } else {
      throw { message: data?.msg }
    }
  } catch (error) {

  }
}
