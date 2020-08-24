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
    const response = await APIRouter.user_info()
    const data = response?.data?.data
    const msg = response?.data?.msg
    if (data) {
      UGStore.dispatch({ type: 'merge', userInfo: data });
      UGStore.save();
      return data
    } else {
      throw { message: msg ?? '更新使用者失败' }
    }
  } catch (error) {
    console.log("-------------updateUserInfo error-------------", error)
    throw error
  }
}

export async function updateSysConf() {
  try {
    const response = await APIRouter.system_config()
    const data = response?.data?.data
    const msg = response?.data?.msg
    if (data) {
      UGStore.dispatch({ type: 'merge', props: data })
      UGStore.save()
      return data
    } else {
      throw { message: msg }
    }
  } catch (error) {
    console.log("-------------updateSysConf error-------------", error)
    throw error
  }
}