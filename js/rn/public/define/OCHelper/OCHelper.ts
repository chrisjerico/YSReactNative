import { IGlobalStateHelper, updateUserInfo } from './../../../redux/store/IGlobalStateHelper';
import { UGBridge } from '../ANHelper/UGBridge';
import AppDefine from '../AppDefine';
import { OCCall } from './OCBridge/OCCall';
import { OCEvent } from './OCBridge/OCEvent';
import UGSysConfModel from '../../../redux/model/全局/UGSysConfModel';
import { httpClient } from '../../network/httpClient';
import { UGStore } from '../../../redux/store/UGStore';

export class OCHelper extends OCEvent {
  static CodePushKey = UGBridge.core.CodePushKey;

  // 调用OC函数
  static call = OCCall.call;

  // 监听oc事件
  static addEvent = OCEvent.addEvent;

  // 移除oc事件
  static removeEvents = OCEvent.removeEvents;

  // 通知原生代码RN已初始化完毕
  static launchFinish() {
    UGBridge.core.launchFinish();
  }

  // 配置
  static async setup() {
    super.setup();

    // 设置接口域名
    await OCHelper.call('AppDefine.shared.Host').then((host: string) => {
      AppDefine.host = host;
      httpClient.defaults.baseURL = host
      updateUserInfo()
    });
    // 设置站点编号
    await OCHelper.call('AppDefine.shared.SiteId').then((siteId: string) => {
      AppDefine.siteId = siteId;
    });
    // 获取系统配置信息
    await OCHelper.call('UGSystemConfigModel.currentConfig').then((sysConf: UGSysConfModel) => {
      UGStore.dispatch({ type: 'merge', sysConf: sysConf });
    });
    // 修正旧版本原生代码版本号逻辑问题（1.60.xx以前）
    OCHelper.call('NSBundle.mainBundle.infoDictionary.valueForKey:', ['CFBundleShortVersionString']).then(ver => {
      OCHelper.call('AppDefine.shared.setVersion:', [ver]);
    });
  }
}
