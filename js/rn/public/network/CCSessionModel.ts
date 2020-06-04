import {ANHelper, NativeCommand} from './../define/ANHelper/ANHelper';
import {Platform} from 'react-native';
import AppDefine from '../define/AppDefine';
import {OCHelper} from '../define/OCHelper/OCHelper';

interface Dictionary {
  [x: string]: any;
}

interface ResponseObject {
  code: number;
  msg: string;
  data: any;
}

export default class CCSessionModel {
  static isEncrypt = true; // 参数是否加密
  static publicParams = {
    // 公共参数
    // able: "123"
  };

  // 参数加密
  static encryptParams(params: Dictionary): Promise<Dictionary> {
    if (!this.isEncrypt) {
      return new Promise(resolve => resolve(params));
    }
    var temp = Object.assign({}, params);
    temp['checkSign'] = 1;

    console.log('开始加密');
    if (Platform.OS == 'ios') {
      return OCHelper.call('CMNetwork.encryptionCheckSign:', [temp]);
    } else {
      return ANHelper.call(NativeCommand.ENCRYPTION_PARAMS, {params: params});
    }
  }

  // 发起请求
  static req(path: string, params: object = {}, isPost: boolean = false): Promise<any> {
    var url = `${AppDefine.host}/wjapp/api.php?${path}`;
    return this.request(url, params, isPost);
  }

  static request(url: string, params: object = {}, isPost: boolean = false): Promise<any> {
    // 添加公共参数
    params = Object.assign({}, this.publicParams, params);

    // 参数加密
    var promise = this.encryptParams(params)
      .then((params: any) => {
        if (typeof params == 'string') {
          params = JSON.parse(params);
        }

        if (Platform.OS == 'ios') {
          if (this.isEncrypt) {
            url += '&checkSign=1';
          }
        }

        // 若是GET请求则拼接参数到URL
        if (!isPost) {
          if (Platform.OS == 'ios') {
            Object.keys(params).map(key => {
              var value = params[key];
              url += `&${key}=${value}`;
            });
          } else {
            for (let paramsKey in params) {
              url += `&${paramsKey}=${params[paramsKey]}`;
            }
          }
          params = null;
        }

        console.log('url = ' + url);
        console.log('发起请求B');
        return fetch(url, {
          method: isPost ? 'POST' : 'GET',
          body: params ? JSON.stringify(params) : null,
          headers: new Headers({
            'Content-Type': 'application/json',
          }),
        })
          .then(function(response) {
            // 检查是否正常返回
            if (response.ok) {
              // 返回的是一个promise对象, 值就是后端返回的数据, 调用then()可以接收
              console.log('req succ!');
              return response.json();
            }
            return Promise.reject(new Error('请求失败：' + response.statusText));
          })
          .then((responseObject: ResponseObject) => {
            if (responseObject.code != 0) {
              return Promise.reject(new Error(responseObject.msg));
            }
            return Promise.resolve(responseObject.data);
          });
      })
      .catch(err => {
        console.log('请求失败， err = ');
        console.log(err);
        return Promise.reject(err);
      });
    return promise;
  }
}