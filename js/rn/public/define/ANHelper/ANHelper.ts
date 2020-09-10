import AppDefine from '../AppDefine';
import {ANEvent} from './ANEvent';
import {httpClient} from "../../network/httpClient";
import {CMD} from "./hp/CmdDefine";
import {UGUserCenterItem} from "../../../redux/model/全局/UGSysConfModel";
import APIRouter from "../../network/APIRouter";
import {UGStore} from "../../../redux/store/UGStore";
import {NA_DATA} from "./hp/DataDefine";
import {ugLog} from "../../tools/UgLog";

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

  static async setup() {
    super.setup();

    // 获取系统配置信息
    const res = await Promise.all([
      // 设置接口域名
      this.callAsync(CMD.APP_HOST).catch((error) => {
        ugLog('APP_HOST=', error)
      }),

    // 设置站点编号
    this.callAsync(CMD.APP_SITE).catch((error) => {
      ugLog('APP_SITE=', error)
    }),

    // 加载系统设置
    this.callAsync(CMD.LOAD_DATA, {key: NA_DATA.CONFIG}).catch((error) => {
      ugLog('CONFIG=', error)
    }),

      //加载用户中心条目信息
      ANHelper.callAsync(CMD.ASK_MINE_ITEMS).catch((error) => {
        ugLog('ASK_MINE_ITEMS=', error)
      })
    ])

    const host = res[0]
    const siteId = res[1]
    const sysConf_ios = res[2] ?? {}
    const userCenterItems = JSON.parse(res[3])?.map((item: any) => new UGUserCenterItem(item)) ?? []

    ugLog('ANHelper userCenterItems=', userCenterItems)

    AppDefine.host = host;
    httpClient.defaults.baseURL = host
    AppDefine.siteId = siteId;
    // net
    const sysResponse = await Promise.all([APIRouter.user_info().catch(
      (error) => {
        ugLog('user response =', error)
      }
    ), APIRouter.system_config().catch(
      (error) => {
        ugLog('user response =', error)
      }
    )])

    const userInfo = sysResponse[0]?.data?.data ?? {}
    const sysConf_net = sysResponse[1]?.data?.data ?? {}
    const { loginVCode, login_to, adSliderTimer, appDownloadUrl } = sysConf_net
    const sysConf = Object.assign({}, sysConf_ios, { loginVCode, login_to, adSliderTimer, appDownloadUrl, userCenterItems })

    UGStore.dispatch({ type: 'merge', userInfo, sysConf });
    UGStore.save();


  }
}
