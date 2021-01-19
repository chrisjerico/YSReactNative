import APIRouter from '../../../public/network/APIRouter'
import { ugLog } from '../../../public/tools/UgLog'
import { CMD } from '../../../public/define/ANHelper/hp/CmdDefine'
import { ANHelper } from '../../../public/define/ANHelper/ANHelper'
import axios from 'axios'
import AppDefine from '../../../public/define/AppDefine'
import { anyEmpty, anyLength } from '../../../public/tools/Ext'
import {
  DomainUrls,
  MultiDomainUrls,
  notifyDomainChanged,
  recombineDomain,
} from '../../../public/config/MultiDomainUrls'
import { OCHelper } from '../../../public/define/OCHelper/OCHelper'
import { Platform } from 'react-native'

interface UseVersion {
  testResult?: (str: string) => void //测试网速结果
}

/**
 * 版本页 辅助类
 * @param testResult
 * @constructor
 */
const UseVersion = ({
                      testResult,
                    }: UseVersion) => {

  //测试网络情况
  const testNetwork = () => {
    let lastTime = new Date().getTime()
    APIRouter.system_onlineCount()
      .then((res) => {
        let curTime = new Date().getTime()
        let div = curTime - lastTime
        //ugLog('try div=', div);

        const status = res?.status + ',' + res?.data?.code + ',' + res?.data?.msg
        if (div < 500) {
          testResult && testResult('网络很好,' + status)
        } else if (div < 1000) {
          testResult && testResult('网络一般,' + status)
        } else if (div < 1500) {
          testResult && testResult('网络很差,' + status)
        } else {
          testResult && testResult('网络极差,' + status)
        }
        //ugLog('try res=', res?.data);
      })
      .catch((err) => {
        //ugLog('try err=', err)
        testResult && testResult('网络异常:' + JSON.stringify(err?.message))
      })
  }

  /**
   * 查找最快的域名
   * @param callback 是否有正常的域名
   */
  const testSite = async (callback: (result?: boolean) => void) => {
    // 站点编号
    let siteId = ''
    switch (Platform.OS) {
      case 'ios':
        siteId = await OCHelper.call('AppDefine.shared.SiteId')
        OCHelper.ocTest && callback && callback(true)
        break
      case 'android':
        siteId = await ANHelper.callAsync(CMD.APP_SITE)
        break
    }

    //ugLog('site = siteId', siteId)
    let domains = MultiDomainUrls[siteId]
    //ugLog('site = domains 7 ', domains)

    let firstUrl = '' //哪条速度最快用哪条
    for (let url of domains) {
      // ugLog('site = url', url)
      axios
        .create({
          baseURL: url,
          timeout: 3000,
          headers: { 'Content-Type': 'application/json' },
        })
        .get('/wjapp/api.php?c=system&a=onlineCount')
        .then((res) => {
          //ugLog('site = response 7 ', url, res?.data)
          //最快的那一条
          if (res?.status === 200 && res?.data?.code === 0 && anyEmpty(firstUrl)) {
            callback && callback(true)
            firstUrl = url
            recombineDomain({ [siteId]: firstUrl })
            notifyDomainChanged(siteId)
            //ugLog('site = firstUrl 6', url)
          }
          return res
        })
        .catch((error) => {
          ugLog('site = error 6', url, error)
        })
    }
  }

  return {
    testNetwork,
    testSite,
  }
}

export default UseVersion
