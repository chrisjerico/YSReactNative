import { OCHelper } from './../define/OCHelper/OCHelper';

import { PushNotificationIOSStatic } from '@react-native-community/push-notification-ios/index';

(async function iosLoadModules() {
  async function canLoad(clsName: string) {
    return await OCHelper.call(clsName + '.className') == clsName
  }

  await canLoad('RNCPushNotificationIOS') && (PushNotificationIOS = require('@react-native-community/push-notification-ios'))
})()





/**
 * 动态加载模块
 * （主要是为了兼容旧版本，当旧版本APP不支持时就不加载）
 */

// iOS通知权限管理
export let PushNotificationIOS: PushNotificationIOSStatic