import {Platform, ToastAndroid} from 'react-native';
import {OCHelper} from '../define/OCHelper/OCHelper';
import {anyEmpty} from "./Ext";

/**
 * Toast 提示
 * @param s
 * @constructor
 */
export const Toast = (s?: string) => {
  //空字符串不弹
  if(anyEmpty(s)) return

  if (Platform.OS == 'ios') {
    OCHelper.call('HUDHelper.showMsg:', [s]);
  } else {
    ToastAndroid.show(s, ToastAndroid.SHORT);
  }
};
