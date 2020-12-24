import { UGStore } from '../../../redux/store/UGStore'
import APIRouter from '../../network/APIRouter'
import { httpClient } from '../../network/httpClient'
import { UGBridge } from '../ANHelper/UGBridge'
import AppDefine from '../AppDefine'
import { OCCall } from './OCBridge/OCCall'
import { OCEvent } from './OCBridge/OCEvent'
import { UGUserCenterItem } from '../../../redux/model/全局/UGSysConfModel'
import { stringToNumber } from '../../tools/tars'
import { DomainUrls, initDomain } from '../../config/MultiDomainUrls'

export class OCHelper extends OCEvent {
  static CodePushKey = UGBridge.core.CodePushKey ?? ''

  // 调用OC函数
  static call = OCCall.call

  // 监听oc事件
  static addEvent = OCEvent.addEvent

  // 移除oc事件
  static removeEvents = OCEvent.removeEvents

  // 通知原生代码RN已初始化完毕
  static launchFinish() {
    UGBridge.core.launchFinish && UGBridge.core.launchFinish()
  }

  // 配置
  static async setup() {
    try {
      super.setup()
      // 设置接口域名
      // 获取系统配置信息
      const ios_response = await Promise.all([
        OCHelper.call('AppDefine.shared.SiteId').catch((error) => {
          console.log(error)
        }),
        OCHelper.call('AppDefine.shared.Host').catch((error) => {
          console.log(error)
        }),
        OCHelper.call('UGSystemConfigModel.currentConfig').catch((error) => {
          console.log(error)
        }),
        OCHelper.call('UGSystemConfigModel.currentConfig.userCenter').catch((error) => {
          console.log(error)
        }),
        OCHelper.call('AppDefine.shared.Version').catch((error) => {
          console.log(error)
        }),
      ])
      const siteId = ios_response[0]
      const host = DomainUrls[siteId] ?? ios_response[1]
      const sysConf_ios = ios_response[2] ?? {}
      const userCenterItems = ios_response[3]?.map((item: any) => new UGUserCenterItem(item)) ?? []
      const appVersion = ios_response[4]
      AppDefine.host = host
      httpClient.defaults.baseURL = host
      AppDefine.siteId = siteId

      // 配置iOS的域名
      initDomain(siteId)

      // 处理原生iOS第三方日志服务器拒绝导致报错（清空本地未翻译的日志）2020-12-24添加（大概一两个月后可以删除）
      await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [{}, 'LanguageNotFoundStrings'])
      await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [{ selectors: 'NSDate.date' }, 'LanguageUpdateTime'])
      await OCHelper.call('NSUserDefaults.standardUserDefaults.synchronize')
      await OCHelper.call('LanguageHelper.shared.setNotFoundStrings:')

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
      const sysConf = Object.assign({}, sysConf_ios, { loginVCode, login_to, adSliderTimer: stringToNumber(adSliderTimer), appDownloadUrl, userCenterItems })
      const gameLobby = net_response[2]?.data?.data ?? []
      const banner = net_response[3]?.data?.data ?? {}
      const rightMenu = net_response[4]?.data?.data ?? []
      UGStore.dispatch({ type: 'merge', userInfo, sysConf, gameLobby, banner, rightMenu, sys: Object.assign({}, sysConf_net, { appVersion }) })
      UGStore.save()
    } catch (error) {
      console.log('-----error-----', error)
    }
  }
}
