import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { Platform, AsyncStorage } from 'react-native';
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper';
import { UGStore } from '../../redux/store/UGStore';
import { ANHelper, NativeCommand } from '../define/ANHelper/ANHelper';
import AppDefine from '../define/AppDefine';
import { OCHelper } from '../define/OCHelper/OCHelper';
import { Toast } from '../tools/ToastUtils';
import moment from 'moment';
interface Dictionary {
  [x: string]: any;
}
export enum CachePolicyEnum {
  noCache,
  cacheOnly,
  cacheByTime,
}
interface CustomAxiosConfig extends AxiosRequestConfig {
  isEncrypt?: boolean;
  cachePolicy: CachePolicyEnum,
  expiredTime: number,
  noToken?: boolean
}
export const httpClient = axios.create({
  baseURL: AppDefine?.host,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json', }
});
const publicParams = {
  // 公共参数
  // able: "123"
};
const encryptParams = async (params: Dictionary, isEncrypt): Promise<Dictionary> => {
  if (!isEncrypt) {
    return params;
  }
  let temp = Object.assign({}, params);

  try {
    temp['checkSign'] = 1;

    if (Platform.OS == 'ios') {
      return OCHelper.call('CMNetwork.encryptionCheckSign:', [temp]);
    } else {
      return ANHelper.call(NativeCommand.ENCRYPTION_PARAMS, { params: params });
    }
  } catch (error) {
    console.warn(error);
    return null;
  }
};
httpClient.interceptors.response.use(
  response => {
    //@ts-ignore
    const { config }: { config: CustomAxiosConfig } = response

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
    return response;
  },
  err => {
    if (err && err?.response) {
      switch (err?.response?.status) {
        case 401:
          OCHelper.call('UGUserModel.setCurrentUser:', []).then((res) => {
            OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']).then((res) => {
              OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]).then((res) => {
                updateUserInfo()
                UGStore.dispatch({ type: 'reset', userInfo: {} })
                // Toast('帐号已被登出');
              })
            })
          })
          break;
        case 500:
          console.warn('500 : 伺服器出錯');
          break;
        case 503:
          console.warn('503 : 服務失效');
          break;
        default:
          console.warn("連接錯誤", err);
      }
    } else {
      console.warn('連接到服務器失敗');
    }
    return err?.response
  },
);
httpClient.interceptors.request.use(async (config: CustomAxiosConfig) => {
  if (!config.url.includes('wjapp')) {
    config.url = 'wjapp/api.php?' + config.url;
  }

  const params = Object.assign({}, publicParams, { ...config.params, ...config.data });
  const { isEncrypt = true } = config;
  let encryptData = await encryptParams(params, isEncrypt);
  //開始請求
  if (isEncrypt) {
    if (Platform.OS == 'ios') {
      if (config.method == 'get' || config.method == 'GET') {
        config.url += '&checkSign=1';
        Object.keys(encryptData).map(res => {
          if (!config.params) {
            config.params = {};
          }
          config.params[res] = encryptData[res];
        });
      } else if (config.method == 'post' || config.method == 'POST') {
        config.url += '&checkSign=1';

        if (!config.params) config.params = {};
        if (!config.data) config.data = {};
        if (encryptData["slideCode[nc_sid]"]) {
          config.data.slideCode = {}
          config.data.slideCode.nc_sid = `${encryptData["slideCode[nc_sid]"]}`;
          config.data.slideCode.nc_sig = `${encryptData["slideCode[nc_sig]"]}`;
          config.data.slideCode.nc_token = `${encryptData["slideCode[nc_token]"]}`;
          delete encryptData["slideCode[nc_sid]"]
          delete encryptData["slideCode[nc_sig]"]
          delete encryptData["slideCode[nc_token]"]
          delete config.data["slideCode[nc_token]"]
          delete config.data["slideCode[nc_sig]"]
          delete config.data["slideCode[nc_sid]"]
        }
        if (config.noToken == true) {
          delete encryptData?.token
        }
        debugger
        for (let paramsKey in encryptData) {
          // if (paramsKey.includes("slideCode")) {
          //   config.data[paramsKey] = config.data[paramsKey];
          // } else {

          config.data[paramsKey] = `${encryptData[paramsKey]}`;
          // }

        }
      }
    }
  }
  return config;
});
