import { Platform, ToastAndroid } from 'react-native';
import { OCHelper } from '../define/OCHelper/OCHelper';

/**
 * Toast 提示
 * @param s
 * @constructor
 */
export const Toast = (s?: string) => {
  if (Platform.OS == 'ios') {
    OCHelper.call('HUDHelper.showMsg:', [s]);
  } else {
    ToastAndroid.show(s, ToastAndroid.SHORT);
  }
};
