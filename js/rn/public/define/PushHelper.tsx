import { Alert, AlertButton, Platform } from 'react-native'
import { LotteryType } from '../../redux/model/全局/UGLotteryModel'
import { UGAgentApplyInfo, UGTabbarItem, UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import { SeriesId } from '../models/Enum'
import { PushAnnouncement, PushHomeGame, PushWheel } from '../models/Interface'
import { PageName } from '../navigation/Navigation'
import { navigate, popToRoot, push } from '../navigation/RootNavigation'
import { httpClient } from '../network/httpClient'
import { RedBagDetailActivityModel } from '../network/Model/RedBagDetailActivityModel'
import NetworkRequest1 from '../network/NetworkRequest1'
import { Toast } from '../tools/ToastUtils'
import { ugLog } from '../tools/UgLog'
import { GoldenEgg } from '../views/tars/Activitys'
import { ANHelper } from './ANHelper/ANHelper'
import { CMD, OPEN_PAGE_PMS } from './ANHelper/hp/CmdDefine'
import { MenuType } from './ANHelper/hp/GotoDefine'
import AppDefine from './AppDefine'
import { NSValue } from './OCHelper/OCBridge/OCCall'
import { OCHelper } from './OCHelper/OCHelper'
import { RnPageModel } from './OCHelper/SetRnPageInfo'

export default class PushHelper {
  static pushAnnouncement(data: PushAnnouncement[]) {
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGPlatformNoticeView.alloc.initWithFrame:[setDataArray:].show', [NSValue.CGRectMake(20, 60, AppDefine.width - 40, AppDefine.height * 0.8)], [data])

        break
      case 'android':
        ANHelper.callAsync(CMD.OPEN_POP_NOTICE, { popup: data })
        break
    }
  }

  // 右側選單
  static pushRightMenu(from: '1' | '2') {
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGYYRightMenuView.alloc.initWithFrame:[setTitleType:].show', [NSValue.CGRectMake(AppDefine.width / 2, 0, AppDefine.width / 2, AppDefine.height)], [from])
        break
      case 'android':
        ANHelper.callAsync(CMD.OPEN_RIGHT_MENU)
        break
    }
  }

  // 輪盤
  static async pushWheel(turntableList: PushWheel[]) {
    const turntableListModel = Object.assign({ clsName: 'DZPModel' }, turntableList?.[0])
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call(({ vc }) => ({
          vc: {
            selectors: 'DZPMainView.alloc.initWithFrame:[setItem:]',
            args1: [NSValue.CGRectMake(100, 100, AppDefine.width - 60, AppDefine.height - 60)],
            args2: [turntableListModel],
          },
          ret: {
            selectors: 'SGBrowserView.showMoveView:yDistance:',
            args1: [vc, 100],
          },
        }))
        break
      case 'android':
        ANHelper.callAsync(CMD.OPEN_ROULETTE, { data: turntableList })
        break
    }
  }
  // 登入
  static pushLogin() {
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
          {
            selectors: 'AppDefine.viewControllerWithStoryboardID:',
            args1: ['UGLoginViewController'],
          },
          true,
        ])
        break
      case 'android':
        ANHelper.callAsync(CMD.OPEN_PAGE, OPEN_PAGE_PMS.LoginActivity)
        break
    }
  }
  // 註冊
  static pushRegister() {
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
          {
            selectors: 'AppDefine.viewControllerWithStoryboardID:',
            args1: ['UGRegisterViewController'],
          },
          true,
        ])
        break
      case 'android':
        ANHelper.callAsync(CMD.OPEN_PAGE, OPEN_PAGE_PMS.RegeditActivity)
        break
    }
  }
  // 首页游戏列表跳转
  static pushHomeGame(game: PushHomeGame) {
    game = Object.assign({ clsName: 'GameModel' }, game)
    console.log('--------game-------', game)
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGNavigationController.current.pushViewControllerWithGameModel:', [game])
        break
      case 'android':
        ANHelper.callAsync(CMD.OPEN_NAVI_PAGE, game)
        break
    }
  }

  // 去彩票
  static pushLottery(code: LotteryType | number) {
    this.pushHomeGame({
      seriesId: SeriesId.彩票, // 普通彩票
      subId: code,
      gameId: code,
    })
  }

  // 去捕魚
  static pushFish(code: string) {
    this.pushHomeGame({
      seriesId: SeriesId.捕鱼, // 捕魚
      subId: code,
      gameId: code,
    })
  }

  static pushGoldenEggs(goldenEggs: GoldenEgg[]) {
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call(({ vc }) => ({
          vc: {
            selectors: 'EggFrenzyViewController.new[setItem:]',
            args1: [goldenEggs],
          },
          ret: {
            selectors: 'UGNavigationController.current.presentViewController:animated:',
            args1: [vc, true],
          },
        }))
        // OCHelper.call('UGNavigationController.current.presentViewController:animated:', [{ selectors: 'EggFrenzyViewController.new', args1: [goldenEggs] }, true])
        console.log('-------去砸Ｇ蛋')
        break
      case 'android':
        break
    }
  }

  static pushCratchs() {}
  // 去彩票大廳 userCenter裡有
  // static pushLotteryLobby() {
  //   OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGLotterySelectController.new' }, true])
  // }
  /**
   * 打开红包
   * @param redBag
   */
  static pushRedBag(redBag: RedBagDetailActivityModel) {
    const data = redBag?.data
    const redbagModel = Object.assign({}, { clsName: 'UGRedEnvelopeModel', rid: data?.id }, data) // ios 裡是抓rid

    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGredActivityView.alloc.initWithFrame:[setItem:].show', [NSValue.CGRectMake(20, AppDefine.height * 0.1, AppDefine.width - 40, AppDefine.height * 0.8)], [redbagModel])
        break
      case 'android':
        ANHelper.callAsync(CMD.OPEN_RED_BAD, data)
        break
    }
  }

  // 跳转到彩票下注页，或内部功能页
  static pushCategory(linkCategory: number | string, linkPosition: number | string, title?: string) {
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGNavigationController.current.pushViewControllerWithLinkCategory:linkPosition:', [Number(linkCategory), Number(linkPosition)])
        break
      case 'android':
        ANHelper.callAsync(CMD.OPEN_NAVI_PAGE, {
          seriesId: linkCategory,
          subId: linkPosition,
        })
        break
    }
  }
  static pushNoticePopUp(notice: string) {
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGNoticePopView.alloc.initWithFrame:[setContent:].show', [NSValue.CGRectMake(20, AppDefine.height * 0.1, AppDefine.width - 40, AppDefine.height * 0.8)], [notice])
        break
      case 'android':
        ANHelper.callAsync(CMD.OPEN_NOTICE, { rnString: notice })
        break
    }
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
        }))
        break
      case 'android':
        ANHelper.callAsync(CMD.OPEN_WEB, { url: url })
        break
    }
  }

  //电脑版
  static openPC() {
    PushHelper.openWebView(AppDefine.host + '/index2.php')
  }

  // 我的页按钮跳转
  static pushUserCenterType(code: UGUserCenterType) {
    ugLog('pushUserCenterType code=', code)

    switch (Platform.OS) {
      case 'ios':
        switch (code) {
          case UGUserCenterType.存款: {
            PushHelper.pushCategory(7, 21)
            break
          }
          case UGUserCenterType.取款: {
            PushHelper.pushCategory(7, 22)
            break
          }
          case UGUserCenterType.存款纪录: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
              {
                selectors: 'AppDefine.viewControllerWithStoryboardID:[setSelectIndex:]',
                args1: ['UGFundsViewController'],
                args2: [2],
              },
              true,
            ])
            break
          }
          case UGUserCenterType.取款纪录: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
              {
                selectors: 'AppDefine.viewControllerWithStoryboardID:[setSelectIndex:]',
                args1: ['UGFundsViewController'],
                args2: [3],
              },
              true,
            ])
            break
          }
          case UGUserCenterType.每日签到:
            {
              OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGSigInCodeViewController.new', args1: [] }, true])
            }
            break
          case UGUserCenterType.银行卡管理: {
            async function func1() {
              let hasBankCard: boolean = await OCHelper.call('UGUserModel.currentUser.hasBankCard')
              let hasFundPwd: boolean = await OCHelper.call('UGUserModel.currentUser.hasFundPwd')
              var vcName = hasBankCard ? 'UGBankCardInfoController' : hasFundPwd ? 'UGBindCardViewController' : 'UGSetupPayPwdController'
              OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                {
                  selectors: 'AppDefine.viewControllerWithStoryboardID:',
                  args1: [vcName],
                },
                true,
              ])
            }
            func1()
            break
          }
          case UGUserCenterType.利息宝: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
              {
                selectors: 'AppDefine.viewControllerWithStoryboardID:',
                args1: ['UGYubaoViewController'],
              },
              true,
            ])
            break
          }
          case UGUserCenterType.推荐收益: {
            async function func1() {
              let isTest: boolean = await OCHelper.call('UGUserModel.currentUser.isTest')
              if (isTest) {
                // 试玩账号去阉割版的推荐收益页
                OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGPromotionIncomeController.new' }, true])
              } else {
                // ShowLoading
                OCHelper.call('SVProgressHUD.showWithStatus:')

                var info: UGAgentApplyInfo = await NetworkRequest1.team_agentApplyInfo()

                if (info.reviewStatus === 2) {
                  // 去推荐收益页
                  OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGPromotionIncomeController.new' }, true])
                } else {
                  let agent_m_apply = await OCHelper.call('UGSystemConfigModel.currentConfig.agent_m_apply')
                  if (parseInt(agent_m_apply) !== 1) {
                    OCHelper.call('HUDHelper.showMsg:', ['在线注册代理已关闭'])
                  } else {
                    // 去申请代理
                    info = Object.assign({ clsName: 'UGagentApplyInfo' }, info)
                    OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                      {
                        selectors: 'UGAgentViewController.new[setItem:]',
                        args1: [],
                      },
                      true,
                    ])
                  }
                }
                // HideLoading
                OCHelper.call('SVProgressHUD.dismiss')
              }
            }
            func1()
            break
          }
          case UGUserCenterType.彩票注单记录: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGBetRecordViewController.new' }, true])
            break
          }
          case UGUserCenterType.其他注单记录: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
              {
                selectors: 'AppDefine.viewControllerWithStoryboardID:[setGameType:]',
                args1: ['UGRealBetRecordViewController', 'real'],
              },
              true,
            ])
            break
          }
          case UGUserCenterType.额度转换: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
              {
                selectors: 'AppDefine.viewControllerWithStoryboardID:',
                args1: ['UGBalanceConversionController'],
              },
              true,
            ])
            break
          }
          case UGUserCenterType.站内信: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGMailBoxTableViewController.new' }, true])
            break
          }
          case UGUserCenterType.安全中心: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGSecurityCenterViewController.new' }, true])
            break
          }
          case UGUserCenterType.任务中心: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
              {
                selectors: 'AppDefine.viewControllerWithStoryboardID:',
                args1: ['UGMissionCenterViewController'],
              },
              true,
            ])
            break
          }
          case UGUserCenterType.个人信息: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
              {
                selectors: 'AppDefine.viewControllerWithStoryboardID:',
                args1: ['UGUserInfoViewController'],
              },
              true,
            ])
            break
          }
          case UGUserCenterType.建议反馈: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
              {
                selectors: 'AppDefine.viewControllerWithStoryboardID:',
                args1: ['UGFeedBackController'],
              },
              true,
            ])
            break
          }
          case UGUserCenterType.在线客服: {
            async function func1() {
              let urlStr: string = await OCHelper.call('UGSystemConfigModel.currentConfig.zxkfUrl.stringByTrim')
              if (!urlStr.length) return
              let hasHost = await OCHelper.call('NSURL.URLWithString:.host.length', [urlStr])
              let hasScheme = await OCHelper.call('NSURL.URLWithString:.scheme.length', [urlStr])
              // 补全URL
              if (!hasHost) {
                urlStr = AppDefine.host + urlStr
              } else if (!hasScheme) {
                urlStr = 'http://' + urlStr
              }
              OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                {
                  selectors: 'SLWebViewController.new[setUrlStr:]',
                  args1: [urlStr],
                },
                true,
              ])
            }
            func1()
            break
          }
          case UGUserCenterType.活动彩金: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGMosaicGoldViewController.new' }, true])
            break
          }
          case UGUserCenterType.长龙助手: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGChangLongController.new' }, true])
            break
          }
          case UGUserCenterType.全民竞猜: {
            OCHelper.call('HUDHelper.showMsg:', ['敬请期待'])
            break
          }
          case UGUserCenterType.开奖走势: {
            navigate(PageName.TrendView, {})
            break
          }
          case UGUserCenterType.QQ客服: {
            OCHelper.call('UGSystemConfigModel.currentConfig.qqs').then((qqs: Array<string> = []) => {
              if (!qqs.length) {
                OCHelper.call('HUDHelper.showMsg:', ['敬请期待'])
              } else {
                var btns: Array<AlertButton> = qqs.map(
                  (qq: string, idx: number): AlertButton => {
                    return {
                      text: `QQ客服${idx + 1}：${qq}`,
                      onPress: () => {
                        OCHelper.call('CMCommon.goQQ:', [qq])
                      },
                    }
                  }
                )
                btns.push({ text: '取消', style: 'cancel' })
                Alert.alert('请选择QQ客服', null, btns)
              }
            })
            break
          }
          case UGUserCenterType.资金明细: {
            PushHelper.pushCategory(7, 28)
            break
          }
          case UGUserCenterType.开奖网: {
            this.openWebView(
              //httpClient.defaults.baseURL + '/index2.php'
              httpClient.defaults.baseURL + '/open_prize/index.mobile.html?navhidden=1'
            )
            break
          }
          case UGUserCenterType.彩票大厅: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGLotteryHomeController.new' }, true])
            break
          }
          case UGUserCenterType.聊天室: {
            this.pushCategory(9, null)
            // OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGChatViewController.new' }, true]);
            break
          }
          case UGUserCenterType.游戏大厅: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGYYLotteryHomeViewController.new' }, true])
            break
          }
          case UGUserCenterType.我的页: {
            OCHelper.call('UGTabbarController.shared.mms').then((mms: UGTabbarItem[]) => {
              let isOcPush = false
              mms.forEach((item, idx) => {
                if (item.path == '/user') {
                  isOcPush = true
                  popToRoot()
                  OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [idx])
                }
              })
              if (!isOcPush) {
                const rpm = RnPageModel.pages.filter((p) => {
                  return p.tabbarItemPath == '/user'
                })[0]
                if (rpm) {
                  push(rpm.rnName)
                } else {
                  OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                    {
                      selectors: 'AppDefine.viewControllerWithStoryboardID:',
                      args1: ['UGMineSkinViewController'],
                    },
                    true,
                  ])
                }
              }
            })
            break
          }
          case UGUserCenterType.开奖结果: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
              {
                selectors: 'AppDefine.viewControllerWithStoryboardID:',
                args1: ['UGLotteryRecordController'],
              },
              true,
            ])
            // OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGLotteryRecordController.new' }, true])
            break
          }
        }

        break
      case 'android':
        let subId = ''
        switch (code) {
          case UGUserCenterType.存款: {
            subId = MenuType.CZ
            break
          }
          case UGUserCenterType.每日签到: {
            subId = MenuType.QD
            break
          }
          case UGUserCenterType.取款: {
            subId = MenuType.TX
            break
          }
          case UGUserCenterType.银行卡管理: {
            subId = MenuType.YHK
            break
          }
          case UGUserCenterType.利息宝: {
            subId = MenuType.LXB
            break
          }
          case UGUserCenterType.推荐收益: {
            subId = MenuType.SYTJ
            break
          }
          case UGUserCenterType.彩票注单记录: {
            subId = MenuType.TZJL
            break
          }
          case UGUserCenterType.其他注单记录: {
            subId = MenuType.QTZD
            break
          }
          case UGUserCenterType.额度转换: {
            subId = MenuType.EDZH
            break
          }
          case UGUserCenterType.站内信: {
            subId = MenuType.ZLX
            break
          }
          case UGUserCenterType.安全中心: {
            subId = MenuType.AQZX
            break
          }
          case UGUserCenterType.任务中心: {
            subId = MenuType.RWZX
            break
          }
          case UGUserCenterType.个人信息: {
            subId = MenuType.HYZX
            break
          }
          case UGUserCenterType.建议反馈: {
            subId = MenuType.TSZX
            break
          }
          case UGUserCenterType.在线客服: {
            subId = MenuType.KF
            break
          }
          case UGUserCenterType.活动彩金: {
            subId = MenuType.SQCJ
            break
          }
          case UGUserCenterType.长龙助手: {
            subId = MenuType.CLZS
            break
          }
          case UGUserCenterType.全民竞猜: {
            subId = MenuType.QMJC
            break
          }
          case UGUserCenterType.开奖走势: {
            Toast('敬请期待')
            return
          }
          case UGUserCenterType.QQ客服: {
            subId = MenuType.QQ
            break
          }
          case UGUserCenterType.资金明细: {
            subId = MenuType.ZHGL
            break
          }
          case UGUserCenterType.彩票大厅: {
            subId = MenuType.GCDT
            break
          }
          case UGUserCenterType.聊天室: {
            subId = MenuType.LTS
            break
          }
          case UGUserCenterType.游戏大厅: {
            subId = MenuType.GCDT
            break
          }
          case UGUserCenterType.我的页: {
            subId = MenuType.HYZX
            break
          }
        }

        ANHelper.callAsync(CMD.OPEN_NAVI_PAGE, {
          seriesId: '7',
          subId: subId,
        })
        break
    }
  }
}
