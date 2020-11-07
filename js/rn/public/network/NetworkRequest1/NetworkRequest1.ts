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
import { UGStore } from '../../../redux/store/UGStore';
import AppDefine from '../../define/AppDefine';
import { api_moment } from './api/api_moment';


// 校验错误信息
export function CheckError(sm: CCSessionModel<any>): Error {
  if (sm.url.indexOf(AppDefine?.host) == -1) return;

  let err: Error;
  if (sm.status == 401) {
    hideLoading();
    sm.noShowErrorHUD = true;
    if (Platform.OS == 'ios') {
      OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationloginTimeout'])
    }
    err = new Error('您的账号已经登录超时，请重新登录。');
  }
  else if (sm.status == 402) {
    hideLoading();
    sm.noShowErrorHUD = true;
    api.user.logout();
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
    err = new Error(sm?.res?.msg ?? '请求失败' + sm?.res?.code);
  }
  return sm.err = err;
}


export class api {
  // 活动
  static activity = new api_activity();

  // bbs
  static bbs = new api_bbs();

  // 聊天
  static chat = new api_chat();

  // 游戏
  static game = new api_game();

  // 六合资料
  static lhcdoc = new api_lhcdoc();

  // 通知
  static notice = new api_notice();

  // 认证
  static oauth = new api_oauth();

  // 真人
  static real = new api_real();

  // 充值
  static recharge = new api_recharge();

  // 反馈
  static report = new api_report();

  // 安全
  static secure = new api_secure();

  // 系统
  static system = new api_system();

  // 任务
  static task = new api_task();

  // 代理
  static team = new api_team();

  // 注单
  static ticket = new api_ticket();

  // 用户
  static user = new api_user();

  // 提现
  static withdraw = new api_withdraw();

  // 利息宝
  static yuebao = new api_yuebao();

  // 朋友圈
  static moment = new api_moment();
}