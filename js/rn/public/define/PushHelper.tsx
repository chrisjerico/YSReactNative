import { UGAgentApplyInfo, UGUserCenterType, UGTabbarItem } from '../../redux/model/全局/UGSysConfModel';
import AppDefine from './AppDefine';
import {Alert, AlertButton, Platform} from 'react-native';
import NetworkRequest1 from '../network/NetworkRequest1';
import {IGameIconListItem} from '../../redux/model/home/IGameBean';
import {OCHelper} from './OCHelper/OCHelper';
import {HomeGamesModel} from '../network/Model/HomeGamesModel';
import {NSValue,} from './OCHelper/OCBridge/OCCall';
import {RedBagDetailActivityModel} from '../network/Model/RedBagDetailActivityModel';
import {TurntableListModel} from '../network/Model/TurntableListModel';
import {Toast} from '../tools/ToastUtils';
import { popToRoot, push } from '../navigation/RootNavigation';
import { PageName } from '../navigation/Navigation';
import {ANHelper} from "./ANHelper/ANHelper";
import {MenuType} from "./ANHelper/hp/GotoDefine";
import {NA_DATA} from "./ANHelper/hp/DataDefine";
import {CMD} from "./ANHelper/hp/CmdDefine";

export default class PushHelper {
  // 輪盤
  static async pushWheel(turntableList: TurntableListModel) {
    const turntableListModel = Object.assign({ clsName: 'DZPModel' }, turntableList?.[0]);
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call(({ vc }) => ({
          vc: {
            selectors: 'DZPMainView.alloc.initWithFrame:[setItem:]',
            args1: [NSValue.CGRectMake(100, 100, AppDefine.width - 60, AppDefine.height - 60),],
            args2: [turntableListModel]
          },
          ret: {
            selectors: 'SGBrowserView.showMoveView:yDistance:',
            args1: [vc, 100],
          },
        }));
        break;
      case 'android':

        break;
    }
  }
  // 登出
  static async pushLogout() {
    switch (Platform.OS) {
      case "ios":
        await OCHelper.call('UGUserModel.setCurrentUser:', []);
        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
        await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]);
        break;
      case "android":
        let result: string = await ANHelper.callAsync(CMD.LOAD_DATA, {key: NA_DATA.LOGIN_INFO})
        let loginInfo = JSON.parse(result);

        //保留 account, pwd, isRemember，下载登录的时候使用
        await ANHelper.callAsync(CMD.SAVE_DATA,
          {
            key: NA_DATA.LOGIN_INFO,
            account: loginInfo?.account,
            pwd: loginInfo?.pwd,
            isRemember: loginInfo?.isRemember,
          });

        await ANHelper.callAsync(CMD.SAVE_DATA,
          { key: NA_DATA.USER_INFO, });
        break;
    }
    Toast('退出成功');
  }
  // 登入
  static pushLogin() {
    switch (Platform.OS) {
      case "ios":
        OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{
          selectors: 'AppDefine.viewControllerWithStoryboardID:',
          args1: ['UGLoginViewController']
        }, true]);
        // OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{selectors: 'UGFundsViewController.new[setSelectIndex:]', args1: ['UGLoginViewController']}, true]);
        break;
      case "android":
        ANHelper.callAsync(CMD.OPEN_PAGE,
          {
            toActivity: true,
            packageName: 'com.phoenix.lotterys.my.activity',
            className: 'LoginActivity'
          });
        break;
    }
  }
  // 註冊
  static pushRegister() {
    switch (Platform.OS) {
      case "ios":
        OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{
          selectors: 'AppDefine.viewControllerWithStoryboardID:',
          args1: ['UGRegisterViewController']
        }, true]);
        // OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{selectors: 'UGFundsViewController.new[setSelectIndex:]', args1: ['UGLoginViewController']}, true]);
        break;
      case "android":
        ANHelper.callAsync(CMD.OPEN_PAGE,
          {
            toActivity: true,
            packageName: 'com.phoenix.lotterys.my.activity',
            className: 'RegeditActivity'
          });
        break;
    }



  }
  // 首页游戏列表跳转
  static pushHomeGame(game: IGameIconListItem | HomeGamesModel) {
    game = Object.assign({ clsName: 'GameModel' }, game);
    console.log('--------game-------', game)
    switch (Platform.OS) {
      case "ios":
        OCHelper.call('UGNavigationController.current.pushViewControllerWithGameModel:', [game]);
        break;
      case "android":
        ANHelper.callAsync(CMD.OPEN_NAVI_PAGE, game)
        break;
    }
  }

  /**
   * 打开红包
   * @param redBag
   */
  static pushRedBag(redBag: RedBagDetailActivityModel) {
    const data = redBag?.data
    const redbagModel = Object.assign({}, { clsName: 'UGRedEnvelopeModel', rid: data?.id }, data); // ios 裡是抓rid

    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGredActivityView.alloc.initWithFrame:[setItem:].show', [NSValue.CGRectMake(20, AppDefine.height * 0.1, AppDefine.width - 40, AppDefine.height * 0.8)], [redbagModel]);
        break;
      case 'android':
        ANHelper.callAsync(CMD.OPEN_RED_BAD, data)
        break;
    }


  }
  // 去彩票下注页
  static pushLottery() {
    OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGLotterySelectController.new' }, true]);
  }

  // 跳转到彩票下注页，或内部功能页
  static pushCategory(linkCategory: number | string, linkPosition: number | string, title?: string) {
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGNavigationController.current.pushViewControllerWithLinkCategory:linkPosition:', [Number(linkCategory), Number(linkPosition)]);
        break;
      case 'android':
        ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
          {
            seriesId: linkCategory,
            subId: linkPosition,
          })
        break;
    }
  }
  static pushNoticePopUp(notice: string) {
    if (Platform.OS != 'ios') return;
    OCHelper.call('UGNoticePopView.alloc.initWithFrame:[setContent:].show', [NSValue.CGRectMake(20, AppDefine.height * 0.1, AppDefine.width - 40, AppDefine.height * 0.8)], [notice]);
  }
  static openWebView(url: string) {
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call(({ vc }) => ({
          vc: {
            selectors: 'TGWebViewController.new[setUrl:]',
            args1: [url],
          },
          ret: {
            selectors: 'UGNavigationController.current.pushViewController:animated:',
            args1: [vc, true],
          },
        }));
        break;
      case 'android':
        ANHelper.callAsync(CMD.OPEN_WEB, { url: url })
        break;
    }
  }
  // 我的页按钮跳转
  static pushUserCenterType(code: UGUserCenterType) {
    switch (Platform.OS) {
      case 'ios':
        switch (code) {
          case UGUserCenterType.存款: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGFundsViewController.new[setSelectIndex:]', args1: [0] }, true]);
            break;
          }
          case UGUserCenterType.每日签到: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGSigInCodeViewController.new', args1: [] }, true]);
          }
            break
          case UGUserCenterType.取款: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGFundsViewController.new[setSelectIndex:]', args1: [1] }, true]);
            break;
          }
          case UGUserCenterType.银行卡管理: {
            async function func1() {
              let hasBankCard: boolean = await OCHelper.call('UGUserModel.currentUser.hasBankCard');
              let hasFundPwd: boolean = await OCHelper.call('UGUserModel.currentUser.hasFundPwd');
              var vcName = hasBankCard ? 'UGBankCardInfoController' : hasFundPwd ? 'UGBindCardViewController' : 'UGSetupPayPwdController';
              OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'AppDefine.viewControllerWithStoryboardID:', args1: [vcName] }, true]);
            }
            func1();
            break;
          }
          case UGUserCenterType.利息宝: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'AppDefine.viewControllerWithStoryboardID:', args1: ['UGYubaoViewController'] }, true]);
            break;
          }
          case UGUserCenterType.推荐收益: {
            async function func1() {
              let isTest: boolean = await OCHelper.call('UGUserModel.currentUser.isTest');
              if (isTest) {
                // 试玩账号去阉割版的推荐收益页
                OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGPromotionIncomeController.new' }, true]);
              } else {
                // ShowLoading
                OCHelper.call('SVProgressHUD.showWithStatus:');

                var info: UGAgentApplyInfo = await NetworkRequest1.team_agentApplyInfo();

                if (info.reviewStatus === 2) {
                  // 去推荐收益页
                  OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGPromotionIncomeController.new' }, true]);
                } else {
                  let agent_m_apply = await OCHelper.call('UGSystemConfigModel.currentConfig.agent_m_apply');
                  if (parseInt(agent_m_apply) !== 1) {
                    OCHelper.call('HUDHelper.showMsg:', ['在线注册代理已关闭']);
                  } else {
                    // 去申请代理
                    info = Object.assign({ clsName: 'UGagentApplyInfo' }, info);
                    OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGAgentViewController.new[setItem:]', args1: [] }, true]);
                  }
                }
                // HideLoading
                OCHelper.call('SVProgressHUD.dismiss');
              }
            }
            func1();
            break;
          }
          case UGUserCenterType.彩票注单记录: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGBetRecordViewController.new' }, true]);
            break;
          }
          case UGUserCenterType.其他注单记录: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
              { selectors: 'AppDefine.viewControllerWithStoryboardID:[setGameType:]', args1: ['UGRealBetRecordViewController', 'real'] },
              true,
            ]);
            break;
          }
          case UGUserCenterType.额度转换: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'AppDefine.viewControllerWithStoryboardID:', args1: ['UGBalanceConversionController'] }, true]);
            break;
          }
          case UGUserCenterType.站内信: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGMailBoxTableViewController.new' }, true]);
            break;
          }
          case UGUserCenterType.安全中心: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGSecurityCenterViewController.new' }, true]);
            break;
          }
          case UGUserCenterType.任务中心: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'AppDefine.viewControllerWithStoryboardID:', args1: ['UGMissionCenterViewController'] }, true]);
            break;
          }
          case UGUserCenterType.个人信息: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'AppDefine.viewControllerWithStoryboardID:', args1: ['UGUserInfoViewController'] }, true]);
            break;
          }
          case UGUserCenterType.建议反馈: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'AppDefine.viewControllerWithStoryboardID:', args1: ['UGFeedBackController'] }, true]);
            break;
          }
          case UGUserCenterType.在线客服: {
            async function func1() {
              let urlStr: string = await OCHelper.call('UGSystemConfigModel.currentConfig.zxkfUrl.stringByTrim');
              if (!urlStr.length) return;
              let hasHost = await OCHelper.call('NSURL.URLWithString:.host.length', [urlStr]);
              let hasScheme = await OCHelper.call('NSURL.URLWithString:.scheme.length', [urlStr]);
              // 补全URL
              if (!hasHost) {
                urlStr = AppDefine.host + urlStr;
              } else if (!hasScheme) {
                urlStr = 'http://' + urlStr;
              }
              OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'SLWebViewController.new[setUrlStr:]', args1: [urlStr] }, true]);
            }
            func1();
            break;
          }
          case UGUserCenterType.活动彩金: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGMosaicGoldViewController.new' }, true]);
            break;
          }
          case UGUserCenterType.长龙助手: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGChangLongController.new' }, true]);
            break;
          }
          case UGUserCenterType.全民竞猜: {
            OCHelper.call('HUDHelper.showMsg:', ['敬请期待']);
            break;
          }
          case UGUserCenterType.开奖走势: {
            OCHelper.call('HUDHelper.showMsg:', ['敬请期待']);
            break;
          }
          case UGUserCenterType.QQ客服: {
            OCHelper.call('UGSystemConfigModel.currentConfig.qqs').then((qqs: Array<string> = []) => {
              if (!qqs.length) {
                OCHelper.call('HUDHelper.showMsg:', ['敬请期待']);
              } else {
                var btns: Array<AlertButton> = qqs.map(
                  (qq: string, idx: number): AlertButton => {
                    return {
                      text: `QQ客服${idx + 1}：${parseInt(qq)}`,
                      onPress: () => {
                        OCHelper.call('CMCommon.goQQ:', [qq]);
                      },
                    };
                  },
                );
                btns.push({ text: '取消', style: 'cancel' });
                Alert.alert('请选择QQ客服', null, btns);
              }
            });
            break;
          }
          case UGUserCenterType.资金明细: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGFundsViewController.new[setSelectIndex:]', args1: [4] }, true]);
            break;
          }
          case UGUserCenterType.六合彩: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGLotteryHomeController.new' }, true]);
            break;
          }
          case UGUserCenterType.聊天室: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGChatViewController.new' }, true]);
            break;
          }
          case UGUserCenterType.游戏大厅: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGYYLotteryHomeViewController.new' }, true]);
            break;
          }
          case UGUserCenterType.我的页: {
            OCHelper.call('UGTabbarController.shared.mms').then((mms: UGTabbarItem[]) => {
              let isOcPush = false;
              mms.forEach((item, idx) => {
                if (item.path == '/user') {
                  isOcPush = true;
                  popToRoot();
                  OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [idx]);
                }
              })
              if (!isOcPush) {
                push(PageName.ZLMinePage);
              }
            })
            break;
          }
        }
        break;
      case 'android':
        switch (code) {
          case UGUserCenterType.存款: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.CZ,
              })
            break;
          }
          case UGUserCenterType.每日签到: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.QD,
              })
           }
            break
          case UGUserCenterType.取款: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.TX,
              })
            break;
          }
          case UGUserCenterType.银行卡管理: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.YHK,
              })
            break;
          }
          case UGUserCenterType.利息宝: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.LXB,
              })
            break;
          }
          case UGUserCenterType.推荐收益: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.SYTJ,
              })
          }
          case UGUserCenterType.彩票注单记录: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.TZJL,
              })
            break;
          }
          case UGUserCenterType.其他注单记录: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.TZJL,
                zdjlType: 2,
              })
            break;
          }
          case UGUserCenterType.额度转换: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.EDZH,
              })
            break;
          }
          case UGUserCenterType.站内信: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.ZLX,
              })
            break;
          }
          case UGUserCenterType.安全中心: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.AQZX,
              })
            break;
          }
          case UGUserCenterType.任务中心: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.RWZX,
              })
            break;
          }
          case UGUserCenterType.个人信息: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.HYZX,
              })
            break;
          }
          case UGUserCenterType.建议反馈: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.TSZX,
              })
            break;
          }
          case UGUserCenterType.在线客服: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.KF,
              })
            break;
          }
          case UGUserCenterType.活动彩金: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.SQCJ,
              })
            break;
          }
          case UGUserCenterType.长龙助手: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.CLZS,
              })
            break;
          }
          case UGUserCenterType.全民竞猜: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.QMJC,
              })
            break;
          }
          case UGUserCenterType.开奖走势: {
            Toast('敬请期待')
            break;
          }
          case UGUserCenterType.QQ客服: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.QQ,
              })
            break;
          }
          case UGUserCenterType.资金明细: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.ZHGL,
              })
            break;
          }
          case UGUserCenterType.六合彩: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.GCDT,
              })
            break;
          }
          case UGUserCenterType.聊天室: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.LTS,
              })
            break;
          }
          case UGUserCenterType.游戏大厅: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.GCDT,
              })
            break;
          }
          case UGUserCenterType.我的页: {
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE,
              {
                seriesId: '7',
                subId: MenuType.HYZX,
              })
            break;
          }
        }

        break;
    }
  }
}
