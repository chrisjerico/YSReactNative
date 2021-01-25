import AppDefine from '../AppDefine'
import { ANEvent } from './ANEvent'
import { httpClient } from '../../network/httpClient'
import { CMD } from './hp/CmdDefine'
import { UGUserCenterItem } from '../../../redux/model/全局/UGSysConfModel'
import APIRouter from '../../network/APIRouter'
import { UGStore } from '../../../redux/store/UGStore'
import { NA_DATA } from './hp/DataDefine'
import { ugLog } from '../../tools/UgLog'
import { initDomain } from '../../config/MultiDomainUrls'
import { stringToNumber } from '../../tools/tars'

export class ANHelper extends ANEvent {
  // 监听安卓事件
  static addEvent = ANEvent.addEvent

  // 移除安卓事件
  static removeEvents = ANEvent.removeEvents

  /**
   * CallBack调用安卓函数
   *
   * @param type 当前类型
   * @param back 返回值
   * @param data 参数
   */
  static callSync(type: CMD, data?: { [x: string]: any }): any | null {
    return this.core.executeSync && this.core.executeSync(
      JSON.stringify({
        type: type,
        ...data,
      })
    )
  }

  /**
   * Promise 调用安卓函数
   *
   * @param type 当前类型
   * @param data 参数
   */
  static callAsync(type: CMD, data?: { [x: string]: any }): Promise<any | null> {
    return this.core.executeCmd && this.core.executeCmd(
      JSON.stringify({
        type: type,
        ...data,
      })
    )
  }

  /**
   * Promise 调用安卓函数
   *
   * @param type 当前类型
   * @param data 参数
   */
  static callAsyncObject(params?: any): Promise<any | null> {
    return this.core.executeCmdObject && this.core.executeCmdObject(params)  }

  static async setup() {
    super.setup()

    await initDomain()

    // await this.callAsync(CMD.INIT_PAGES, {
    //   'com.phoenix.lotterys.my.activity.LoginActivity': "LEFSignInPage",
    //
    // })

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
      this.callAsync(CMD.LOAD_DATA, { key: NA_DATA.CONFIG }).catch((error) => {
        ugLog('CONFIG=', error)
      }),

      //加载用户中心条目信息
      this.callAsync(CMD.ASK_MINE_ITEMS).catch((error) => {
        ugLog('ASK_MINE_ITEMS=', error)
      }),

      this.callAsync(CMD.AN_VERSION).catch((error) => {
        ugLog('AN_VERSION=', error)
      }),
    ])

    const host = res[0]
    const siteId = res[1]
    const sysConf_android = res[2] ?? {}
    const userCenterItems = JSON.parse(res[3])?.map((item: any) => new UGUserCenterItem(item)) ?? []
    const appVersion = res[4]?.version_name

    //ugLog('host=  =', host)
    AppDefine.host = host
    httpClient.defaults.baseURL = host
    AppDefine.siteId = siteId

    // net
    const apis = ['user_info', 'system_config', 'game_homeRecommend', 'system_banners', 'system_mobileRight'].map(async (router) => {
      try {
        return await APIRouter[router]()
      } catch (error) {
        console.log(error)
      }
    })
    const net_response = await Promise.all(apis)
    //@ts-ignore
    const userInfo = net_response[0]?.data?.data ?? {}
    //@ts-ignore
    const sysConf_net = net_response[1]?.data?.data ?? {}
    const { loginVCode, login_to, adSliderTimer, appDownloadUrl } = sysConf_net
    const sysConf = Object.assign({}, sysConf_net, sysConf_android, { loginVCode, login_to, adSliderTimer: stringToNumber(adSliderTimer), appDownloadUrl, userCenterItems })
    const gameLobby = net_response[2]?.data?.data ?? []
    const banner = net_response[3]?.data?.data ?? {}
    const rightMenu = net_response[4]?.data?.data ?? []
    //console.log('--------sysConf_net-------', sysConf_net)
    UGStore.dispatch({ type: 'merge', userInfo, sysConf, gameLobby, banner, rightMenu, sys: Object.assign({}, sysConf_net, { appVersion }) })
    //console.log('--------sysConf_android-------', sysConf_android)
    //console.log('--------sysConf-------', sysConf)
    UGStore.save()
  }

  /**
   * 刷新域名
   * @param host
   */
  static refreshHost(host?: string) {
    AppDefine.host = host
    httpClient.defaults.baseURL = host
  }
}
