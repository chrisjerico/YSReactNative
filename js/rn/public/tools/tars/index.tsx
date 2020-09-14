import AppDefine from '../../define/AppDefine'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import { scale } from '../Scale'
import { PasswordStrength } from '../../models/Enum'
import {Platform} from "react-native";
import {Toast} from "../ToastUtils";
import {ANHelper} from "../../define/ANHelper/ANHelper";
import {CMD} from "../../define/ANHelper/hp/CmdDefine";
import {NA_DATA} from "../../define/ANHelper/hp/DataDefine";
import {logoutAndroid} from "../../define/ANHelper/InfoHelper";
import {ugLog} from "../UgLog";

export const validPassword = (password: string, pass_limit: PasswordStrength) => {
  if (password) {
    if (pass_limit) {
      if (pass_limit == PasswordStrength.数字字母) {
        return /^(?=.*\d)(?=.*[a-zA-Z])/.test(password)
      } else if ([pass_limit == PasswordStrength.数字字母字符]) {
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

export const stringToNumber = (x: string) => {
  const parsed = parseInt(x);
  if (isNaN(parsed)) { return 0; }
  return parsed
}

