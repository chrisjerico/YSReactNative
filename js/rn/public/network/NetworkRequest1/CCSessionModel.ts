import { UGStore } from './../../../redux/store/UGStore';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ANHelper } from '../../define/ANHelper/ANHelper';
import { Platform } from 'react-native';
import AppDefine from '../../define/AppDefine';
import { OCHelper } from '../../define/OCHelper/OCHelper';
import { CMD } from "../../define/ANHelper/hp/CmdDefine";
import { string } from 'prop-types';
import { showError } from '../../widget/UGLoadingCP';
import { CheckError } from './NetworkRequest1';
import { ugLog } from '../../tools/UgLog'


// 返回结果类型
export interface ResponseObject<T = {} | [] | string> {
  code: number;
  msg: string;
  data: T;
  info: object
}

export class CCSessionModel<T = {} | [] | string> {
  // 只读
  url: string;
  params: { [x: string]: any };
  res: ResponseObject<T>;
  err: Error;
  status: number;
  promise: Promise<AxiosResponse<T>>;

  // 只写
  noShowErrorHUD: boolean;
  success: (res: ResponseObject<T>, sm: CCSessionModel<T>) => void;
  failure: (err: Error, sm: CCSessionModel<T>) => void;
  completion: (res: ResponseObject<T>, err: Error, sm: CCSessionModel<T>) => void
  useCompletion(completion: (res: ResponseObject<T>, err: Error, sm: CCSessionModel<T>) => void) {
    this.completion = completion
    return this
  }
  useSuccess(success: (res: ResponseObject<T>, sm: CCSessionModel<T>) => void) {
    this.success = success
    return this
  }
  useFailure(failure: (err: Error, sm: CCSessionModel<T>) => void) {
    this.failure = failure
    return this
  }
}



// ____________________________________________________________________________________________________________
// ____________________________________________________________________________________________________________

export class SampleAPI {
  c: string;
  constructor(c) { this.c = c; }
  get<T>(path: string, params: object = {}) { return CCSessionReq.request<T>(this.c + path, params, false); }
  // files 字段传{key:文件路径}
  post<T>(path: string, params: object = {}, files?: { [x: string]: string }) { return CCSessionReq.request<T>(this.c + path, params, true, files); }
}

// 公共参数
function publicParams() {
  const { userInfo } = UGStore.globalProps;
  return { 'token': userInfo && userInfo["API-SID"] };
};

// 字典(map)类型
type Dictionary = { [x: string]: any; }

export class CCSessionReq {

  private static isEncrypt = true; // 参数是否加密
  private static http = axios.create({
    baseURL: AppDefine?.host,
    // timeout: 30000, // 0 no limit
    headers: { 'Content-Type': 'www-form-urlencoded', }
  });

  static request<T>(path: string, params: object = {}, isPost: boolean = false, files?: { [x: string]: string }): CCSessionModel<T> {
    typeof params == 'string' && (params = JSON.parse(params));// 容错
    let url = `${AppDefine.host}/wjapp/api.php?${path}`;// 拼接url
    params = Object.assign({}, publicParams(), params); // 添加公共参数

    const sm = new CCSessionModel<T>();
    sm.url = url;
    sm.params = params;
    sm.promise = encryptParams(params).then((params) => {// 参数加密
      if (Platform.OS == 'ios' && this.isEncrypt) {
        url += '&checkSign=1';
      }
      // 登录请求去掉token
      if (url.indexOf('c=user&a=login') != -1) {
        params['token'] = undefined;
      }

      console.log('【发起请求】', url);

      // 若是GET请求则拼接参数到URL
      if (!isPost) {
        for (const key in params) {
          url += `&${key}=${params[key]}`;
        }
        return this.http.get<ResponseObject<T>>(url);
      } else if (files && Object.keys(files).length) {
        // 上传文件
        const formData = new FormData();
        for (const k in files) {
          const uri = files[k];
          const name = uri.substring(uri.lastIndexOf('/') + 1);
          const blob: any & Blob = { uri: Platform.OS == 'ios' ? uri : `file://${uri}`,
            type: 'multipart/form-data',
            name: name };
          formData.append(k, blob);
        }
        for (const k in params) {
          formData.append(k, params[k])
        }
        return this.http.post<ResponseObject<T>>(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        return this.http.post<ResponseObject<T>>(url, params);
      }
    }).then((res) => {
      // 接口请求成功
      sm.status = res?.status;
      sm.res = res?.data;
      sm.err = CheckError(sm);

      if (sm.err) {
        return Promise.reject(sm.err);
      }
      console.log('【请求成功】', sm.res?.msg, sm.url);

      // 向外回调
      sm.success && sm.success(res?.data, sm)
      sm.completion && sm.completion(sm.res, sm.err, sm)
      return Promise.resolve(res);
    }).catch((err: AxiosError<ResponseObject<T>>) => {
      if (!sm.err && err.response) {
        sm.status = err.response?.status;
        sm.res = err.response?.data;
        sm.err = CheckError(sm);
      } else {
        sm.err = err;
      }

      console.log('【请求失败】', sm.err);

      // 向外回调
      sm.failure && sm.failure(sm.err, sm)
      sm.completion && sm.completion(sm.res, sm.err, sm)
      // 显示错误信息
      !sm.noShowErrorHUD && sm.err?.message && showError(sm.err?.message);
      return Promise.reject(err);
    });
    return sm;
  }
}

// 参数加密
function encryptParams(params: Dictionary): Promise<Dictionary> {
  if (Platform.OS == 'ios') {
    return OCHelper.call('CMNetwork.encryptionCheckSign:', [Object.assign({ checkSign: 1 }, params)]);
  } else {
    return ANHelper.callAsync(CMD.ENCRYPTION_PARAMS, { params: params });
  }
}
