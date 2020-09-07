import APIRouter from '../../public/network/APIRouter'
import NetworkRequest1 from '../../public/network/NetworkRequest1'
import { UGStore } from './UGStore'
import {Platform} from "react-native";
import {ANHelper} from "../../public/define/ANHelper/ANHelper";
import {CMD} from "../../public/define/ANHelper/hp/CmdDefine";
import {NA_DATA} from "../../public/define/ANHelper/hp/DataDefine";

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

      switch (Platform.OS) {
        case "android":
          await ANHelper.callAsync(CMD.SAVE_DATA,
            {
              key: NA_DATA.USER_INFO,
              ...data
            })
          break;
      }

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
    const data = response?.data?.data ?? {}
    const msg = response?.data?.msg
    if (data) {
      UGStore.dispatch({ type: 'merge', sysConf: data as any })
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
