import {NativeModules, NativeEventEmitter} from 'react-native';

export class UGBridge {
  protected static core = NativeModules.ReactNativeHelper; // 原生桥梁
  protected static emitter = new NativeEventEmitter(UGBridge.core); // 原生事件监听器
  protected static setup() {}
}
