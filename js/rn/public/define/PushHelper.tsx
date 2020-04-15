import {UGUserCenterType, UGAgentApplyInfo} from '../../redux/model/全局/UGSysConfModel';
import AppDefine from './AppDefine';
import {Alert, AlertButton, Platform} from 'react-native';
import NetworkRequest1 from '../network/NetworkRequest1';
import { IGameIconListItem } from '../../redux/model/home/IGameBean';

export default class PushHelper {
  // 首页游戏列表跳转
  static pushHomeGame(game: IGameIconListItem) {
    game = Object.assign({clsName: 'GameModel'}, game);
    if (Platform.OS != 'ios') return;
    AppDefine.ocCall('UGNavigationController.current.pushViewControllerWithGameModel:', [game]);
  }

  // 去彩票下注页
  static pushLottery() {}

  // 跳转到彩票下注页，或内部功能页
  static pushCategory(linkCategory: number | string, linkPosition: number | string, title?: string) {
    if (Platform.OS != 'ios') return;
    AppDefine.ocCall('UGNavigationController.current.pushViewControllerWithLinkCategory:linkPosition:', [Number(linkCategory), Number(linkPosition)]);
  }

  // 我的页按钮跳转
  static pushUserCenterType(code: UGUserCenterType) {
    if (Platform.OS != 'ios') return;
    switch (code) {
      case UGUserCenterType.存款: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'UGFundsViewController.new[setSelectIndex:]', args1: [0]}, true]);
        break;
      }
      case UGUserCenterType.取款: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'UGFundsViewController.new[setSelectIndex:]', args1: [1]}, true]);
        break;
      }
      case UGUserCenterType.银行卡管理: {
        async function func1() {
          let hasBankCard: boolean = await AppDefine.ocCall('UGUserModel.currentUser.hasBankCard');
          let hasFundPwd: boolean = await AppDefine.ocCall('UGUserModel.currentUser.hasFundPwd');
          var vcName = hasBankCard ? 'UGBankCardInfoController' : hasFundPwd ? 'UGBindCardViewController' : 'UGSetupPayPwdController';
          AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'AppDefine.viewControllerWithStoryboardID:', args1: [vcName]}, true]);
        }
        func1();
        break;
      }
      case UGUserCenterType.利息宝: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'AppDefine.viewControllerWithStoryboardID:', args1: ['UGYubaoViewController']}, true]);
        break;
      }
      case UGUserCenterType.推荐收益: {
        async function func1() {
          let isTest: boolean = await AppDefine.ocCall('UGUserModel.currentUser.isTest');
          if (isTest) {
            // 试玩账号去阉割版的推荐收益页
            AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'UGPromotionIncomeController.new'}, true]);
          } else {
            // ShowLoading
            AppDefine.ocCall('SVProgressHUD.showWithStatus:');

            var info: UGAgentApplyInfo = await NetworkRequest1.team_agentApplyInfo();
            if (info.reviewStatus === 2) {
              // 去推荐收益页
              AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'UGPromotionIncomeController.new'}, true]);
            } else {
              let agent_m_apply = await AppDefine.ocCall('UGSystemConfigModel.currentConfig.agent_m_apply');
              if (parseInt(agent_m_apply) === 1) {
                AppDefine.ocCall('HUDHelper.showMsg:', ['在线注册代理已关闭']);
              } else {
                // 去申请代理
                info = Object.assign({clsName: 'UGagentApplyInfo'}, info);
                AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'UGAgentViewController.new[setItem:]', args1: []}, true]);
              }
            }
            // HideLoading
            AppDefine.ocCall('SVProgressHUD.dismiss');
          }
        }
        func1();
        break;
      }
      case UGUserCenterType.彩票注单记录: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'UGBetRecordViewController.new'}, true]);
        break;
      }
      case UGUserCenterType.其他注单记录: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [
          {selectors: 'AppDefine.viewControllerWithStoryboardID:[setGameType:]', args1: ['UGRealBetRecordViewController', 'real']},
          true,
        ]);
        break;
      }
      case UGUserCenterType.额度转换: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'AppDefine.viewControllerWithStoryboardID:', args1: ['UGBalanceConversionController']}, true]);
        break;
      }
      case UGUserCenterType.站内信: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'UGMailBoxTableViewController.new'}, true]);
        break;
      }
      case UGUserCenterType.安全中心: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'UGSecurityCenterViewController.new'}, true]);
        break;
      }
      case UGUserCenterType.任务中心: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'AppDefine.viewControllerWithStoryboardID:', args1: ['UGMissionCenterViewController']}, true]);
        break;
      }
      case UGUserCenterType.个人信息: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'AppDefine.viewControllerWithStoryboardID:', args1: ['UGUserInfoViewController']}, true]);
        break;
      }
      case UGUserCenterType.建议反馈: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'AppDefine.viewControllerWithStoryboardID:', args1: ['UGFeedBackController']}, true]);
        break;
      }
      case UGUserCenterType.在线客服: {
        async function func1() {
          let urlStr: string = await AppDefine.ocCall('UGSystemConfigModel.currentConfig.zxkfUrl.stringByTrim');
          if (!urlStr.length) return;
          let hasHost = await AppDefine.ocCall('NSURL.URLWithString:.host.length', [urlStr]);
          let hasScheme = await AppDefine.ocCall('NSURL.URLWithString:.scheme.length', [urlStr]);
          // 补全URL
          if (!hasHost) {
            urlStr = AppDefine.host + urlStr;
          } else if (!hasScheme) {
            urlStr = 'http://' + urlStr;
          }
          AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'SLWebViewController.new[setUrlStr:]', args1: [urlStr]}, true]);
        }
        func1();
        break;
      }
      case UGUserCenterType.活动彩金: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'UGMosaicGoldViewController.new'}, true]);
        break;
      }
      case UGUserCenterType.长龙助手: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'UGChangLongController.new'}, true]);
        break;
      }
      case UGUserCenterType.全民竞猜: {
        AppDefine.ocCall('HUDHelper.showMsg:', ['敬请期待']);
        break;
      }
      case UGUserCenterType.开奖走势: {
        AppDefine.ocCall('HUDHelper.showMsg:', ['敬请期待']);
        break;
      }
      case UGUserCenterType.QQ客服: {
        AppDefine.ocCall('UGSystemConfigModel.currentConfig.qqs').then((qqs: Array<string> = []) => {
          if (!qqs.length) {
            AppDefine.ocCall('HUDHelper.showMsg:', ['敬请期待']);
          } else {
            var btns: Array<AlertButton> = qqs.map(
              (qq: string, idx: number): AlertButton => {
                return {
                  text: `QQ客服${idx + 1}：${parseInt(qq)}`,
                  onPress: () => {
                    AppDefine.ocCall('CMCommon.goQQ:', [qq]);
                  },
                };
              },
            );
            btns.push({text: '取消', style: 'cancel'});
            Alert.alert('请选择QQ客服', null, btns);
          }
        });
        break;
      }
      case UGUserCenterType.资金明细: {
        AppDefine.ocCall('UGNavigationController.current.pushViewController:animated:', [{selectors: 'UGFundsViewController.new[setSelectIndex:]', args1: [4]}, true]);
        break;
      }
    }
  }
}
