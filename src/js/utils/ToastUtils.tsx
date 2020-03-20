import {Platform, ToastAndroid} from "react-native";

/**
 * Toast 提示
 * @param s
 * @constructor
 */
export const Toast = (s?: string) => {
  if (Platform.OS == 'ios') {

  } else {
    ToastAndroid.show(s, ToastAndroid.SHORT);
  }
};
