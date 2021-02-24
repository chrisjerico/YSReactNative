import { Platform, Alert } from 'react-native';
import AppDefine from '../../../rn/public/define/AppDefine';
import { OCHelper } from '../../../rn/public/define/OCHelper/OCHelper';
import { PageName } from '../../../rn/public/navigation/Navigation';
import { jumpTo, push } from '../../../rn/public/navigation/RootNavigation';
import { api } from '../../../rn/public/network/NetworkRequest1/NetworkRequest1';
import { hideLoading } from '../../../rn/public/widget/UGLoadingCP';
import UGUserModel from '../../../rn/redux/model/全局/UGUserModel';
import { UGStore } from '../../../rn/redux/store/UGStore';
import { doyDefine } from '../define/DoyDefine';
import { api_order } from './api/api_order';
import { api_user } from './api/api_user';
import { DoySessionModel } from './DoySessionModel';


// 校验错误信息
export function CheckError(sm: DoySessionModel<any>): Error {

  if (Platform.OS == 'ios' && OCHelper.ocTest) {
    // api请求信息添加到iOS下拉调试页面
    const params = { ...sm.params, token: UGUserModel.getToken() };
    sm.res.info = undefined
    OCHelper.call('LogVC.addRequestModel:', [{ selectors: 'CCSessionModel.new[setUrlString:][setParams:][setResObject:]', args1: [sm.url], args2: [params], args3: [sm.res] }]);
  }

  let err: Error;
  if (sm.status == 401) {
    hideLoading();
    sm.noShowErrorHUD = true;

    Alert.alert('温馨提示', '您的账号已经登录超时，请重新登录。', [{
      text: '确定', onPress: () => {
        doyDefine.token = undefined
        jumpTo(PageName.DoyHomePage)
        push(PageName.DoyLoginPage)
      }
    }])
    console.log('您的账号已经登录超时，请重新登录。', sm.url, sm.params);
    err = new Error('您的账号已经登录超时，请重新登录。');
  }
  else if (sm.status == 402) {
    hideLoading();
    sm.noShowErrorHUD = true;
    doyApi.user.logout().noShowErrorHUD = true;

    doyDefine.token = undefined
    err = new Error('登录已过期。');
  }
  else if (sm?.res?.code != 0) {
    // 【授权TOKEN:参数未传递!】 此类错误不提示出来
    if (sm?.res?.msg?.indexOf('TOKEN') != -1) {
      sm.noShowErrorHUD = true;
    }
    err = new Error(sm?.res?.msg ?? '请求失败' + sm?.res?.code);
  }

  if (!err) {
    // 请求成功
    if (Platform.OS == 'ios' && sm.url?.indexOf('c=user&a=info') != -1) {
      // 更新原生用户信息
      OCHelper.call('UGUserModel.currentUser.setValuesWithDictionary:', [sm.res?.data]);
    }
  }
  return sm.err = err;
}






/**
 * 使用帮助：
 * 1. 支持链式请求 const {data} = await doyApi.task.checkinList().promise
 * 2. 请求返回成功但业务逻辑错误（返回的code != 0）时，会视为请求错误并回调 failure()，错误信息可在 CheckError()函数配置
 * 3. 请求失败会自动调用showError(msg)，可以在 useFailure 或 useCompletion 设置 sm.noShowError = true 取消提示
 * 4. 支持在iOS下拉调试界面查看请求结果和参数
 * 5. 支持上传文件，使用方式参考 doyApi.user.uploadAvatar() 上传单个文件、api.user.uploadFeedback() 上传多文件
 * 
 * （请求参数默认加密，不支持改为不加密）
 * （不需要传token，公共参数里面有）
 */

/**
 *  举个栗子：
 *  showLoading()
 *  doyApi.task.checkinList().useSuccess(({ data, msg }) => {
 *    showSuccess(msg)
 *    ...
 *  })
 */
export class doyApi {
  // 用户
  static user = api_user

  // 买卖
  static order = api_order
}
