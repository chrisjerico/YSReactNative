import {Platform, ToastAndroid} from 'react-native';
import AppDefine from '../define/AppDefine';

/**
 * Toast 提示
 * @param s
 * @constructor
 */
export const Toast = (s?: string) => {
  if (Platform.OS == 'ios') {
    AppDefine.ocCall('HUDHelper.showMsg:', [s]);
  } else {
    ToastAndroid.show(s, ToastAndroid.SHORT);
  }
};
