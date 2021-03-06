import { devConfig } from './../../../../../config';
import { UGStore } from './../../../redux/store/UGStore';
import { Platform } from 'react-native';
import { api_activity } from './api/api_activity';
import { api_user } from './api/api_user';
import { api_bbs } from './api/api_bbs';
import { api_chat } from './api/api_chat';
import { api_game } from './api/api_game';
import { api_lhcdoc } from './api/api_lhcdoc';
import { api_notice } from './api/api_notice';
import { api_oauth } from './api/api_oauth';
import { api_real } from './api/api_real';
import { api_recharge } from './api/api_recharge';
import { api_report } from './api/api_report';
import { api_secure } from './api/api_secure';
import { api_system } from './api/api_system';
import { api_task } from './api/api_task';
import { api_team } from './api/api_team';
import { api_ticket } from './api/api_ticket';
import { api_withdraw } from './api/api_withdraw';
import { api_yuebao } from './api/api_yuebao';
import { CCSessionModel } from './CCSessionModel';
import { hideLoading } from '../../widget/UGLoadingCP';
import { OCHelper } from '../../define/OCHelper/OCHelper';
import AppDefine from '../../define/AppDefine';
import { api_moment } from './api/api_moment';
import UGUserModel from '../../../redux/model/全局/UGUserModel';


// 校验错误信息
export function CheckError(sm: CCSessionModel<any>): Error {

  if (Platform.OS == 'ios' && OCHelper.ocTest) {
    // api请求信息添加到iOS下拉调试页面
    const params = { ...sm.params, token: UGUserModel.getToken() };
    sm.res.info = undefined
    OCHelper.call('LogVC.addRequestModel:', [{ selectors: 'CCSessionModel.new[setUrlString:][setParams:][setResObject:]', args1: [sm.url], args2: [params], args3: [sm.res] }]);
  }


  if (sm.url.indexOf(AppDefine?.host) == -1) return;

  let err: Error;
  if (sm.status == 401) {
    hideLoading();
    sm.noShowErrorHUD = true;
    
    if (Platform.OS == 'ios') {
      OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationloginTimeout'])
    }
    console.log('您的账号已经登录超时，请重新登录。', sm.url, sm.params);
    err = new Error('您的账号已经登录超时，请重新登录。');
  }
  else if (sm.status == 402) {
    hideLoading();
    sm.noShowErrorHUD = true;
    api.user.logout().noShowErrorHUD = true;

    if (Platform.OS == 'ios') {
      OCHelper.call('UGUserModel.setCurrentUser:', []).then(() => {
        OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']).then(() => {
          UGStore.dispatch({ type: 'reset', userInfo: {} })
        })
      })
    }
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
 * 1. 支持链式请求 const {data} = await api.task.checkinList().promise
 * 2. 请求返回成功但业务逻辑错误（返回的code != 0）时，会视为请求错误并回调 failure()，错误信息可在 CheckError()函数配置
 * 3. 请求失败会自动调用showError(msg)，可以在 useFailure 或 useCompletion 设置 sm.noShowError = true 取消提示
 * 4. 支持在iOS下拉调试界面查看请求结果和参数
 * 5. 支持上传文件，使用方式参考 api.user.uploadAvatar() 上传单个文件、api.user.uploadFeedback() 上传多文件
 * 
 * （请求参数默认加密，不支持改为不加密）
 * （不需要传token，公共参数里面有）
 */

/**
 *  举个栗子：
 *  showLoading()
 *  api.task.checkinList().useSuccess(({ data, msg }) => {
 *    showSuccess(msg)
 *    ...
 *  })
 */
export class api {
  // 活动
  static activity = api_activity;

  // bbs
  static bbs = api_bbs;

  // 聊天
  static chat = api_chat;

  // 游戏
  static game = api_game;

  // 六合资料
  static lhcdoc = api_lhcdoc;

  // 通知
  static notice = api_notice;

  // 认证
  static oauth = api_oauth;

  // 真人
  static real = api_real;

  // 充值
  static recharge = api_recharge;

  // 反馈
  static report = api_report;

  // 安全
  static secure = api_secure;

  // 系统
  static system = api_system;

  // 任务
  static task = api_task;

  // 代理
  static team = api_team;

  // 注单
  static ticket = api_ticket;

  // 用户
  static user = api_user;

  // 提现
  static withdraw = api_withdraw;

  // 利息宝
  static yuebao = api_yuebao;

  // 朋友圈
  static moment = api_moment;


}
