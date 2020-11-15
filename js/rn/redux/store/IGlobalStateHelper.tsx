import APIRouter from '../../public/network/APIRouter'
import { UGStore } from './UGStore'
import { Platform } from "react-native";
import { ANHelper } from "../../public/define/ANHelper/ANHelper";
import { CMD } from "../../public/define/ANHelper/hp/CmdDefine";
import { NA_DATA } from "../../public/define/ANHelper/hp/DataDefine";
import { setProps } from '../../pages/base/UGPage';
import { api } from '../../public/network/NetworkRequest1/NetworkRequest1';

export const AsyncStorageKey = {
  IGlobalState: 'IGlobalState',
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
