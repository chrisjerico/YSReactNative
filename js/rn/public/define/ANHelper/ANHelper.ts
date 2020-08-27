import AppDefine from '../AppDefine';
import {ANEvent} from './ANEvent';
import {httpClient} from "../../network/httpClient";
import {CMD} from "./hp/CmdDefine";

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
  static callSync(type: CMD, data?: {[x: string]: any}): any|null {
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
  static callAsync(type: CMD, data?: {[x: string]: any}): Promise<any|null> {
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
    this.callAsync(CMD.APP_HOST).then((host?: string) => {
      AppDefine.host = host;
      httpClient.defaults.baseURL = host
    });

    // 设置站点编号
    this.callAsync(CMD.APP_SITE).then((siteId?: string) => {
      AppDefine.siteId = siteId;
    });
  }
}
