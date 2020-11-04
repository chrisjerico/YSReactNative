import axios, { AxiosRequestConfig } from 'axios'
import { Platform } from 'react-native'
import { UGStore } from '../../redux/store/UGStore'
import { ANHelper } from '../define/ANHelper/ANHelper'
import { CMD } from '../define/ANHelper/hp/CmdDefine'
import AppDefine from '../define/AppDefine'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { anyEmpty } from '../tools/Ext'
import { ugLog } from '../tools/UgLog'

interface Dictionary {
  [x: string]: any
}
export enum CachePolicyEnum {
  noCache,
  cacheOnly,
  cacheByTime,
}
interface CustomAxiosConfig extends AxiosRequestConfig {
  isEncrypt?: boolean
  cachePolicy: CachePolicyEnum
  expiredTime: number
  noToken?: boolean
}
export const httpClient = axios.create({
  baseURL: AppDefine?.host,
  timeout: 3000, // 0 no limit
  headers: { 'Content-Type': 'application/json' },
})
const publicParams = {
  // 公共参数
  // able: "123"
}
const encryptParams = async (params: Dictionary, isEncrypt): Promise<Dictionary> => {
  // for (let key in params ) {
  //   if (anyEmpty(params[key])) {
  //     params[key] = null
  //   }
  // }
  let temp = {}
  //过滤掉 null 或 "",
  for (let paramsKey in params) {
    if (!anyEmpty(params[paramsKey])) {
      temp[paramsKey] = params[paramsKey]
    }
  }

  if (!isEncrypt) {
    return temp
  }

  try {
    temp['checkSign'] = 1

    switch (Platform.OS) {
      case 'ios':
        return OCHelper.call('CMNetwork.encryptionCheckSign:', [temp])
      case 'android':
        return ANHelper.callAsync(CMD.ENCRYPTION_PARAMS, { params: temp })
    }
  } catch (error) {
    console.warn(error)
    return null
  }
}
httpClient.interceptors.response.use(
  (response) => {
    //@ts-ignore
    const { config }: { config: CustomAxiosConfig } = response

    // ugLog("http ful filled res = ", JSON.stringify(response))

    // if (config.method == 'GET' || 'get') {
    //   if (config?.expiredTime < 1000000000000000) {
    //     if (config.cachePolicy == CachePolicyEnum.cacheByTime) {
    //       const expiredTime = (moment().unix() + config.expiredTime) * 1000
    //       config.expiredTime = expiredTime
    //       try {
    //         AsyncStorage.setItem(config.baseURL + config.url, JSON.stringify(response))
    //       } catch (error) {
    //       }
    //     }
    //   }

    // }
    return response
  },
  (err) => {
    if (err && err.response) {
      ugLog('http error res = ', JSON.stringify(err.response))
      switch (err.response.status) {
        case 401: //请登录后再访问, 帐号已被登出
          switch (Platform.OS) {
            case 'ios':
              Promise.all([
                OCHelper.call('UGUserModel.setCurrentUser:', []),
                OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'roomName']),
                OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'roomId']),
                OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]),
              ])
                .then(() => {
                  UGStore.dispatch({ type: 'reset', userInfo: {} })
                  UGStore.save()
                })
                .catch(() => {})
              break
            case 'android':
              ANHelper.callAsync(CMD.LOG_OUT)
              break
          }
          break
        case 500:
          console.warn('500', err)
          break
        case 503:
          console.warn('503', err)
          break
        default:
          console.warn('連接錯誤', err)
      }
    } else {
      // console.warn('連接到服務器失敗', err);
    }
    if (err?.toString()?.indexOf('timeout') != -1) {
      return Promise.reject('伺服器回应超时')
    } else {
      return Promise.reject(err?.response ?? err)
    }
  }
)
httpClient.interceptors.request.use(async (config: CustomAxiosConfig) => {
  if (!config.url.includes('wjapp')) {
    config.url = 'wjapp/api.php?' + config.url
  }

  const params = Object.assign({}, publicParams, { ...config.params, ...config.data })
  let { isEncrypt = true } = config

  let encryptData = await encryptParams(params, isEncrypt);

  //ugLog('http isEncrypt encryptData 1 =', isEncrypt, config.url, encryptData)

  if (config?.method?.toLowerCase() == 'get') {
    if (isEncrypt) {
      config.url += '&checkSign=1'
    }

    Object.keys(encryptData).map((res) => {
      if (!config.params) {
        config.params = {}
      }
      config.params[res] = encryptData[res]
    })
  } else if (config?.method?.toLowerCase() == 'post') {
    if (isEncrypt) {
      config.url += '&checkSign=1'
    }

    if (!config.params) config.params = {}
    if (!config.data) config.data = {}
    if (encryptData['slideCode[nc_sid]']) {
      config.data.slideCode = {}
      config.data.slideCode.nc_sid = `${encryptData['slideCode[nc_sid]']}`
      config.data.slideCode.nc_sig = `${encryptData['slideCode[nc_sig]']}`
      config.data.slideCode.nc_token = `${encryptData['slideCode[nc_token]']}`
      delete encryptData['slideCode[nc_sid]']
      delete encryptData['slideCode[nc_sig]']
      delete encryptData['slideCode[nc_token]']
      delete config.data['slideCode[nc_token]']
      delete config.data['slideCode[nc_sig]']
      delete config.data['slideCode[nc_sid]']
    }
    if (config.noToken == true) {
      delete encryptData?.token
    }
    debugger
    for (let paramsKey in encryptData) {
      // if (paramsKey.includes("slideCode")) {
      //   config.data[paramsKey] = config.data[paramsKey];
      // } else {

      config.data[paramsKey] = `${encryptData[paramsKey]}`
      // }
    }
  }

  // ugLog('http url 1 =', config.method, config.baseURL, config.url)
  // ugLog('http params 1 =', params)
  // ugLog('http encryptData 1 =', encryptData)
  // ugLog('http config.data 1 =', config.data)

  return config
})
