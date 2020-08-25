import APIRouter from '../../public/network/APIRouter'
import NetworkRequest1 from '../../public/network/NetworkRequest1'
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
}

export async function updateUserInfo() {
  try {
    const { data } = await APIRouter.user_info()
    if (data?.data) {
      UGStore.dispatch({ type: 'merge', userInfo: data?.data });
      UGStore.save();
    } else {
      throw { message: data?.msg ?? '更新使用者失败' }
    }
  } catch (error) {
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