import {Platform} from "react-native";
import {OCHelper} from "../OCHelper/OCHelper";
import {ANHelper} from "./ANHelper";
import {CMD} from "./hp/CmdDefine";
import {NA_DATA} from "./hp/DataDefine";
import {UGStore} from "../../../redux/store/UGStore";

/**
 * 退出登录, 保留 account, pwd, isRemember，下载登录的时候使用
 */
export const logoutAndroid = async () => {
  try {
    let result: string = await ANHelper.callAsync(CMD.LOAD_DATA, { key: NA_DATA.LOGIN_INFO })
    let loginInfo = JSON.parse(result);

    //退出登录, 保留 account, pwd, isRemember，下载登录的时候使用
    await ANHelper.callAsync(CMD.SAVE_DATA,
      {
        key: NA_DATA.LOGIN_INFO,
        account: loginInfo?.account,
        pwd: loginInfo?.pwd,
        isRemember: loginInfo?.isRemember,
      });

    await ANHelper.callAsync(CMD.SAVE_DATA,
      { key: NA_DATA.USER_INFO, });
  } catch (error) {
    throw error ?? 'cleanNativeUser Error'
  }
}
