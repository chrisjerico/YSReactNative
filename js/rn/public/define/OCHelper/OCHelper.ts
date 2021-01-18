import { UGStore } from '../../../redux/store/UGStore'
import APIRouter from '../../network/APIRouter'
import { httpClient } from '../../network/httpClient'
import { UGBridge } from '../ANHelper/UGBridge'
import AppDefine from '../AppDefine'
import { OCCall } from './OCBridge/OCCall'
import { OCEvent } from './OCBridge/OCEvent'
import { UGUserCenterItem } from '../../../redux/model/全局/UGSysConfModel'
import { stringToNumber } from '../../../Res/icon'
import { DomainUrls, initDomain } from '../../config/MultiDomainUrls'
import { setRnPageInfo } from './SetRnPageInfo'

export class OCHelper extends OCEvent {
  static CodePushKey = UGBridge.core.CodePushKey ?? ''

  static ocTest: boolean

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

      // 获取系统配置信息
      this.ocTest = await OCHelper.call('AppDefine.shared.Test')
      const siteId = await OCHelper.call('AppDefine.shared.SiteId')
      const host = DomainUrls[siteId] ?? await OCHelper.call('AppDefine.shared.Host')
      const appVersion = await OCHelper.call('AppDefine.shared.Version')
      AppDefine.host = host
      httpClient.defaults.baseURL = host
      console.log('AppDefine.siteId =', siteId);
      
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
      const gameLobby = net_response[2]?.data?.data ?? []
      const banner = net_response[3]?.data?.data ?? {}
      const rightMenu = net_response[4]?.data?.data ?? []
      UGStore.dispatch({ type: 'merge', userInfo, sysConf: sysConf_net, gameLobby, banner, rightMenu, sys: Object.assign({}, sysConf_net, { appVersion }) })
      UGStore.save()

      // 配置原生页面
      setRnPageInfo()
    } catch (error) {
      console.log('-----error-----', error)
    }
  }
}
