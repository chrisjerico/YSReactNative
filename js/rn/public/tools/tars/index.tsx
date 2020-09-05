import { UGStore } from '../../../redux/store/UGStore'
import AppDefine from '../../define/AppDefine'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import { scale } from '../Scale'
import {Platform} from "react-native";
import {Toast} from "../ToastUtils";
import {ANHelper} from "../../define/ANHelper/ANHelper";
import {CMD} from "../../define/ANHelper/hp/CmdDefine";
import {NA_DATA} from "../../define/ANHelper/hp/DataDefine";
import {logoutAndroid} from "../../define/ANHelper/InfoHelper";

interface SaveNativeUser {
  currentUser: any[];
  isRememberPsd?: boolean;
  userName: string;
  userPsw: string;
  notification?: string;
}


export const validPassword = (password: string, pass_limit: number) => {
  if (password) {
    if (pass_limit) {
      if (pass_limit == 1) {
        return /^(?=.*\d)(?=.*[a-zA-Z])/.test(password)
      } else if ([pass_limit == 2]) {
        return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/.test(password)
      } else {
        return false
      }
    } else {
      return true
    }
  } else {
    return false
  }
}

export const saveNativeUser = async ({
  currentUser,
  isRememberPsd = false,
  userName,
  userPsw,
}:
  SaveNativeUser) => {
  try {

    switch (Platform.OS) {
      case 'ios':
        await OCHelper.call('UGUserModel.setCurrentUser:', currentUser)
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [
          isRememberPsd,
          'isRememberPsd',
        ])
        await OCHelper.call(
          'NSUserDefaults.standardUserDefaults.setObject:forKey:',
          [userName, 'userName']
        )
        await OCHelper.call(
          'NSUserDefaults.standardUserDefaults.setObject:forKey:',
          [userPsw, 'userPsw']
        )
        break;
      case 'android':
        const accountData = {
          account: userName,
          pwd: userPsw,
          isRemember: isRememberPsd
        }
        await ANHelper.callAsync(CMD.SAVE_DATA,
          {
            key: NA_DATA.LOGIN_INFO,
            ...accountData,
          });
        break;
    }

    // await OCHelper.call(
    //   'NSNotificationCenter.defaultCenter.postNotificationName:object:',
    //   ['UGNotificationLoginComplete']
    // )
    // await OCHelper.call(
    //   'UGNavigationController.current.popToRootViewControllerAnimated:',
    //   [true]
    // )
  } catch (error) {
    throw error ?? 'SaveNativeUser Error'
  }
}

export const cleanNativeUser = async () => {
  try {
    switch (Platform.OS) {
      case 'ios':
        const user = await OCHelper.call('UGUserModel.currentUser')
        if (user) {
          const sessid = await OCHelper.call('UGUserModel.currentUser.sessid')
          await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [
            { token: sessid },
          ])
          await OCHelper.call('UGUserModel.setCurrentUser:')
          await OCHelper.call(
            'NSNotificationCenter.defaultCenter.postNotificationName:object:',
            ['UGNotificationUserLogout']
          )
        }
        break;
      case 'android':
        await logoutAndroid();
        break;
    }

    UGStore.dispatch({ type: 'reset', userInfo: {} })
  } catch (error) {
    throw error ?? 'cleanNativeUser Error'
  }
}

export const ToastSuccess = (msg: any) => {
  console.log('--------ToastSuccess--------', msg)
  const m = msg?.toString()
  switch (Platform.OS) {
    case 'ios':
      OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [
        typeof m === 'string' ? m : '',
      ])
      break;
    case 'android':
      Toast(m === 'string' ? m : '');
      break;
  }
}

export const ToastError = (msg: any) => {
  console.log('--------ToastError--------', msg)
  const m = msg?.toString()
  switch (Platform.OS) {
    case 'ios':
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
        typeof m === 'string' ? m : '',
      ])
      break;
    case 'android':
      Toast(m === 'string' ? m : '');
      break;
  }
}

export const ToastStatus = (msg: any) => {
  console.log('--------ToastStatus--------', msg)
  const m = msg?.toString()
  switch (Platform.OS) {
    case 'ios':
      OCHelper.call('SVProgressHUD.showWithStatus:', [
        typeof m === 'string' ? m : '',
      ])
      break;
    case 'android':
      Toast(m === 'string' ? m : '');
      break;
  }
}

export const useHtml5Image = (host: string = AppDefine.host) => {
  const getHtml5Image = (
    id: number,
    path: string,
    type: 'png' | 'jpg' | 'gif' = 'png',
  ) => {
    if (id) {
      return (host +
        '/views/mobileTemplate/' +
        id?.toString() +
        '/images/' +
        path +
        '.' +
        type)
    } else {
      return (host +
        '/images/' +
        path +
        '.' +
        type)
    }

  }
  return { getHtml5Image }
}

export const getIbbImage = (path: string) => {
  return 'https://i.ibb.co/' + path + '.png'
}


export const getActivityPosition = (position: number) => {
  if (position == 1) {
    return { left: 0, top: scale(100) }
  } else if (position == 2) {
    return { left: 0, bottom: scale(100) }
  } else if (position == 3) {
    return { right: 0, top: scale(100) }
  } else if (position == 4) {
    return { right: 0, bottom: scale(100) }
  } else {
    return {}
  }
}
