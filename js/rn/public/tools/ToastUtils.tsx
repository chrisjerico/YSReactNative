import { Platform, ToastAndroid } from 'react-native';
import { OCHelper } from '../define/OCHelper/OCHelper';

/**
 * Toast 提示
 * @param s
 * @constructor
 */
export const Toast = (msg?: string) => {
  const m = msg?.toString()
  if (Platform.OS == 'ios') {
    OCHelper.call('HUDHelper.showMsg:', [typeof m === 'string' ? m : '']);
  } else {
    ToastAndroid.show(msg, ToastAndroid.SHORT);
  }
};


export const ToastSuccess = (msg: any) => {
  console.log("--------ToastSuccess--------", msg)
  const m = msg?.toString()
  OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [typeof m === 'string' ? m : ''])
}

export const ToastError = (msg: any) => {
  console.log("--------ToastError--------", msg)
  const m = msg?.toString()
  OCHelper.call('SVProgressHUD.showErrorWithStatus:', [typeof m === 'string' ? m : ''])
}


export const ToastStatus = (msg: any) => {
  console.log("--------ToastStatus--------", msg)
  const m = msg?.toString()
  OCHelper.call('SVProgressHUD.showWithStatus:', [typeof m === 'string' ? m : ''])
}

