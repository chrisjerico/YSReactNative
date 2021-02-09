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
  let siteHost = undefined //哪条速度最快用哪条
  const testSite = async (callback: (result?: boolean) => void) => {
    // 站点编号
    let siteId = ''
    switch (Platform.OS) {
      case 'ios':
        siteId = await OCHelper.call('AppDefine.shared.SiteId')
        // 在iOS测试环境直接返回成功
        OCHelper.ocTest && callback && callback(true)
        break
      case 'android':
        siteId = await ANHelper.callAsync(CMD.APP_SITE)
        break
    }

    //ugLog('site = siteId', siteId)
    let domains = MultiDomainUrls[siteId]
    //ugLog('site = domains 7 ', domains)

    for (let url of domains) {
      // ugLog('site = url', url)
      axios
        .create({
          baseURL: url,
          headers: { 'Content-Type': 'application/json' },
        })
        .get('/wjapp/api.php?c=system&a=onlineCount')
        .then((res) => {
          //ugLog('site = response 7 ', url, res?.data)
          //最快的那一条
          if (res?.status === 200 && res?.data?.code === 0 && anyEmpty(siteHost)) {
            callback && callback(true)
            siteHost = url
            recombineDomain({ [siteId]: siteHost })
            notifyDomainChanged(siteId)
            //ugLog('site = firstUrl 6', url)
          }
          return res
        })
        .catch((error) => {
          ugLog('site = error 6', url, error)
        })
    }

    setTimeout(() => {
      if (!siteHost) {
        testSite(callback)
      }
    }, 8 * 1000);
  }

  return {
    testNetwork,
    testSite,
    testCodePush,
  }
}

 /**
   * 查找最快的热更新域名
   * @param callback 是否有正常的域名
   */
let codePushHost = undefined
const testCodePush = async (callback: (ret?: string) => void) => {
  const hosts = [
    'https://push.cloudaliyun.com',//aws
    'https://push.cloudbaiidu.com',//aws
    'https://push.cloudtenccent.com',//aws
    'https://push.ujcloud.cc',//aws（建议）
    'http://ec2-18-163-2-208.ap-east-1.compute.amazonaws.com:3000',//源地址
    'https://push.qijun2099.com',//阿里云
  ];

  hosts.forEach(ele => {
    axios.create({
      baseURL: ele,
      headers: { 'Content-Type': 'application/json' },
    }).get('/v0.1/public/codepush/update_check?deployment_key=67f7hDao71zMjLy5xjilGx0THS4o4ksvOXqog&app_version=1.2&package_hash=ca914ea44ae7a0617b547a3b64498318ad43c0777efd2da5a1b82fb64364503a&label=v354&client_unique_id=2033EC9D-BCD9-4D53-B2DF-0DC8E407D4D6')
      .then((res) => {
        if (res?.status == 200 && res?.data?.update_info && anyEmpty(codePushHost)) {
          callback && callback(ele)
          codePushHost = ele
        }
      }).catch((err) => {
        console.log('err = ', err);
      })
  });

  setTimeout(() => {
    if (!codePushHost) {
      testCodePush(callback)
    }
  }, 8 * 1000);
}

export default UseVersion
