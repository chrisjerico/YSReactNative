import {UGBridge} from './UGBridge';
import AppDefine from '../AppDefine';
import {ANEvent} from './ANEvent';
import {httpClient} from "../../network/httpClient";

export enum NativeCommand {
  OPEN_PAGE = 'OPEN_PAGE', //打开界面
  UNIVERSAL = 'UNIVERSAL', //万能函数
  MOVE_TO_BACK = 'MOVE_TO_BACK', //移动当前 Activity 到后台
  APP_THEME_COLOR = 'UGSkinManagers.currentSkin.navBarBgColor.hexString', //设置主题色
  RN_PAGES = 'AppDefine.shared.setRnPageInfos:', //rn的界面
  CURRENT_PAGE = 'CURRENT_PAGE', //当前的界面
  APP_HOST = 'AppDefine.shared.Host', //交互，拿到 host
  APP_SITE = 'AppDefine.shared.SiteId', //交互，拿到 site
  ENCRYPTION = 'CMNetwork.encryptionCheckSign:', //加密参数
  ENCRYPTION_PARAMS = 'ENCRYPTION_PARAMS', //加密参数
  ASK_FOR_TOKEN = 'ASK_FOR_TOKEN', //得到 token
  ASK_FOR_TOKEN_AND_RSA = 'ASK_FOR_TOKEN_AND_RSA', //得到 token和rsa
}

export class ANHelper extends ANEvent {
  // 监听安卓事件
  static addEvent = ANEvent.addEvent;

  // 移除安卓事件
  static removeEvents = ANEvent.removeEvents;

  /**
   * CallBack调用安卓函数
   *
   * @param type 当前类型
   * @param back 返回值
   * @param data 参数
   */
  static callSync(type: NativeCommand, data?: {[x: string]: any}): string {
    return this.core.executeSync(
      JSON.stringify({
        type: type,
        ...data,
      })
    );
  }

  /**
   * Promise 调用安卓函数
   *
   * @param type 当前类型
   * @param data 参数
   */
  static call(type: NativeCommand, data?: {[x: string]: any}): Promise<any> {
    return this.core.executeCmd(
      JSON.stringify({
        type: type,
        ...data,
      }),
    );
  }

  static setup() {
    super.setup();

    // 设置接口域名
    this.call(NativeCommand.APP_HOST).then((host: string) => {
      AppDefine.host = host;
      httpClient.defaults.baseURL = host
    });

    // 设置站点编号
    this.call(NativeCommand.APP_SITE).then((siteId: string) => {
      AppDefine.siteId = siteId;
    });
  }
}
