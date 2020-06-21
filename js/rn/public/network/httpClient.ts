import axios, { AxiosRequestConfig } from 'axios';
import { Platform } from 'react-native';
import { ActionType } from '../../redux/store/ActionTypes';
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper';
import { UGStore } from '../../redux/store/UGStore';
import { ANHelper, NativeCommand } from '../define/ANHelper/ANHelper';
import AppDefine from '../define/AppDefine';
import { OCHelper } from '../define/OCHelper/OCHelper';
import { Toast } from '../tools/ToastUtils';
interface Dictionary {
  [x: string]: any;
}
interface CustomAxiosConfig extends AxiosRequestConfig {
  isEncrypt?: boolean;
}
export const httpClient = axios.create({
  baseURL: `${AppDefine?.host}`,
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
  var temp = Object.assign({}, params);

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
    return response;
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 401:
          OCHelper.call('UGUserModel.setCurrentUser:', []).then((res) => {
            OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']).then((res) => {
              OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]).then((res) => {
                updateUserInfo()
                UGStore.dispatch({ type: ActionType.Clear_User })
                Toast('帐号已被登出');
              })
            })
          })


          break;
        case 500:
          console.warn('伺服器出錯');
          break;
        case 503:
          console.warn('服務失效');
          break;
        default:
          console.warn(`連接錯誤${err.response.status}`);
      }
    } else {
      console.warn('連接到服務器失敗');
    }
    return Promise.resolve(err.response);
  },
);
httpClient.interceptors.request.use(async (config: CustomAxiosConfig) => {
  if (!config.url.includes('wjapp')) {
    config.url = 'wjapp/api.php?' + config.url;
  }
  const params = Object.assign({}, publicParams, { ...config.params, ...config.data });
  const { isEncrypt = true } = config;
  const encryptData = await encryptParams(params, isEncrypt);
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
