import { Linking, Platform } from 'react-native'
import { useSafeArea } from 'react-native-safe-area-context'
import { LotteryType } from '../../redux/model/全局/UGLotteryModel'
import { UGTabbarItem, UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { UGStore } from '../../redux/store/UGStore'
import { GameType, SeriesId } from '../models/Enum'
import { PushAnnouncement, PushHomeGame, PushWheel } from '../models/Interface'
import { PageName } from '../navigation/Navigation'
import { navigate, popToRoot, push } from '../navigation/RootNavigation'
import { httpClient } from '../network/httpClient'
import { RedBagDetailActivityModel } from '../network/Model/RedBagDetailActivityModel'
import { api } from '../network/NetworkRequest1/NetworkRequest1'
import { anyEmpty } from '../tools/Ext'
import { Toast } from '../tools/ToastUtils'
import { B_DEBUG, ugLog } from '../tools/UgLog'
import { hideLoading, showLoading, showMessage } from '../widget/UGLoadingCP'
import { ANHelper } from './ANHelper/ANHelper'
import { CMD, OPEN_PAGE_PMS } from './ANHelper/hp/CmdDefine'
import { MenuType } from './ANHelper/hp/GotoDefine'
import AppDefine from './AppDefine'
import { NSValue } from './OCHelper/OCBridge/OCCall'
import { OCHelper } from './OCHelper/OCHelper'
import { RnPageModel } from './OCHelper/SetRnPageInfo'
import { CapitalConst } from '../../pages/cpt/const/CapitalConst'
import { Skin1 } from '../theme/UGSkinManagers'
import { IBetLotteryPage } from '../../pages/bet/BetLotteryPage'
import { H5Router } from '../../pages/base/H5页面/H5WebPage'


export enum UGLinkPositionType {
  资金管理 = 1,
  APP下载 = 2,
  聊天室 = 3,
  在线客服 = 4,
  长龙助手 = 5,
  推广收益 = 6,
  开奖网 = 7,
  利息宝 = 8,
  优惠活动 = 9,
  注单记录 = 10,
  QQ客服 = 11,
  微信客服 = 12,
  任务大厅 = 13,
  站内信 = 14,
  签到 = 15,
  投诉中心 = 16,
  全民竞猜 = 17,
  活动彩金 = 18,
  游戏大厅 = 19,
  会员中心 = 20,
  充值 = 21,
  提现 = 22,
  额度转换 = 23,
  即时注单 = 24,
  今日输赢 = 25,
  开奖记录 = 26,
  当前版本号 = 27,
  资金明细 = 28,
  回到电脑版 = 29,
  返回首页 = 30,
  退出登录 = 31,
  投注记录 = 32,
  彩种规则 = 33,
  红包记录 = 36,
  扫雷记录 = 37,
  修改密码 = 38,
  修改提款密码 = 39,
  红包活动 = 40,
  试玩 = 41,
  真人大厅 = 42,
  棋牌大厅 = 43,
  电子大厅 = 44,
  体育大厅 = 45,
  电竞大厅 = 46,
  彩票大厅 = 47,
  开奖走势 = 54,
  路珠 = 55,

  // 自定义（从100+开始写，前面的都是后台定制的）
}

export default class PushHelper {
  static pushAnnouncement(data: PushAnnouncement[]) {
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGPlatformNoticeView.alloc.initWithFrame:[setDataArray:].show', [NSValue.CGRectMake(20, AppDefine.height * 0.1, AppDefine.width - 40, AppDefine.height * 0.8)], [data])

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
  // 登出
  static async pushLogout() {
    //已退出不能重复执行
    if (anyEmpty(UGStore.globalProps.userInfo?.uid)) return

    switch (Platform.OS) {
      case 'ios':
        await OCHelper.call('UGUserModel.setCurrentUser:', [])
        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout'])
        await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0])
        break
      case 'android':
        await ANHelper.callAsync(CMD.LOG_OUT)
        Toast('退出成功')
        break
    }
  }
  // 首页游戏列表跳转
  static pushHomeGame(game: PushHomeGame) {
    game = Object.assign({}, game?.category ? { clsName: 'GameModel' } : { clsName: 'GameModel', category: '不要为空' }, game)
    console.log('--------game-------', game)
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGNavigationController.current.pushViewControllerWithGameModel:', [game])
        break
      case 'android':
        if (B_DEBUG) {
          // push(PageName.BetLotteryPage, {lotteryId: game?.gameId} as IBetLotteryPage)
          // return
        }
        if (this.pushDeposit(game?.seriesId?.toString(), game?.subId?.toString())) return

        if (game?.seriesId == 7 && game?.subId == GameType.游戏大厅) {  //游戏大厅
          push(PageName.GameLobbyPage, { showBackButton: true })
          return
        }
        if (game?.isPopup == 1) {  //二级游戏分类
          push(PageName.TwoLevelGames, { game: game, showBackButton: true })
          return
        }
        if (game?.seriesId && ["2", "3", "4", "5", "6", "8"].includes(game.seriesId + '') && game?.gameId) {  //第三方遊戲
          console.log('第三方遊戲')
          if (!UGUserModel.checkTestorUser()) {
            UGUserModel.checkLogin()
          } else {
            ugLog("Game3rdView")
            ANHelper.callAsync(CMD.OPEN_NAVI_PAGE, game)
          }
          return
        }
        if (game?.seriesId == 7 && game?.subId == MenuType.YHDD) {  //优惠活动
          console.log('优惠活动')
          push(PageName.PromotionPage, { showBackBtn: true })
          return
        }

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

  /**
   * 跳转存款
   * @param seriesId
   * @param subId
   */
  static pushDeposit(seriesId?: string, subId?: string): boolean {
    let tabIndex = ''
    if (seriesId == '7' && subId == MenuType.ZHGL) {
      tabIndex = CapitalConst.CAPITAL_DETAIL
    } else if (seriesId == '7' && (subId == MenuType.CQK || subId == MenuType.CZ)) {
      tabIndex = CapitalConst.DEPOSIT
    } else if (seriesId == '7' && subId == MenuType.TX) {
      tabIndex = CapitalConst.WITHDRAWAL
    } else if (seriesId == '7' && subId == MenuType.CZJL) {
      tabIndex = CapitalConst.DEPOSIT_RECORD
    } else if (seriesId == '7' && subId == MenuType.TXJL) {
      tabIndex = CapitalConst.WITHDRAWAL_RECORD
    }
    if (tabIndex.length > 0) {
      ugLog("uid: " + UGStore.globalProps.userInfo.uid)
      if (!UGStore.globalProps.userInfo.uid) {
        return
      }
      push(PageName.CapitalPage, { initTabIndex: tabIndex })
      return true
    }

    return false
  }

  // 跳转到彩票下注页，或内部功能页
  static pushCategory(linkCategory: number | string, linkPosition: number | string, title?: string) {
    ugLog('pushCategory = ', linkCategory, linkPosition)
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGNavigationController.current.pushViewControllerWithLinkCategory:linkPosition:', [Number(linkCategory), Number(linkPosition)])
        break
      case 'android':
        if (this.pushDeposit(linkCategory?.toString(), linkPosition?.toString())) return

        if (linkCategory == 7 && linkPosition == MenuType.YHDD) {  //优惠活动
          console.log('优惠活动')
          push(PageName.PromotionPage, { showBackBtn: true })
          return
        }

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
        OCHelper.call(
          'PromotePopView.alloc.initWithFrame:[setContent:title:].show',
          [NSValue.CGRectMake(20, AppDefine.height * 0.1, AppDefine.width - 40, AppDefine.height * 0.8)],
          [notice, '公告详情']
        )
        break
      case 'android':
        ANHelper.callAsync(CMD.OPEN_NOTICE, { rnString: notice })
        break
    }
  }

  static pushPromoteDetail(item) {
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call(({ vc }) => ({
          vc: {
            selectors: 'UGPromoteDetailController.new[setItem:]',
            args1: [item],
          },
          ret: {
            selectors: 'UGNavigationController.current.pushViewController:animated:',
            args1: [vc, true],
          },
        }))
        break
      case 'android':
        console.log("pushPromoteDetail")
        push(PageName.PromotionDetailPage, { showBackBtn: true, item: item })
        break
    }
  }

  static openWebView(url?: string) {
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

  // 跳转到H5页面
  static pushH5WebPage(router: H5Router) {
    push(PageName.H5WebPage, { router })
  }

  // 我的页按钮跳转
  static pushUserCenterType(code: UGUserCenterType) {
    ugLog('pushUserCenterType code=', code)

    switch (Platform.OS) {
      case 'ios':
        switch (code) {
          case UGUserCenterType.存款纪录: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [NSValue.ViewController('UGFundsViewController', { selectIndex: 2 }), true,])
            break
          }
          case UGUserCenterType.取款纪录: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [NSValue.ViewController('UGFundsViewController', { selectIndex: 3 }), true,])
            break
          }
          case UGUserCenterType.每日签到: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [NSValue.ViewController('UGSigInCodeViewController'), true])
            break
          }
          case UGUserCenterType.全民竞猜: {
            showMessage('敬请期待')
            break
          }
          // case UGUserCenterType.开奖走势: {
          //   navigate(PageName.TrendView, {})
          //   break
          // }
          case UGUserCenterType.资金明细: {
            PushHelper.pushCategory(7, 28)
            break
          }
          case UGUserCenterType.彩票大厅: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [NSValue.ViewController('UGLotteryHomeController'), true])
            break
          }
          case UGUserCenterType.聊天室: {
            this.pushCategory(9, null)
            // OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGChatViewController.new' }, true]);
            break
          }
          case UGUserCenterType.游戏大厅: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [NSValue.ViewController('UGYYLotteryHomeViewController'), true])
            break
          }
          case UGUserCenterType.刮刮乐: {
            if (!UGUserModel.checkLogin()) return
            showLoading()
            api.activity.scratchList().useSuccess(({ data }) => {
              hideLoading()
              // 数据转换为原生格式
              const scratchList = data?.scratchList?.map((v) => {
                return { clsName: 'ScratchModel', ...v }
              })
              const scratchWinList = data?.scratchWinList?.map((v) => {
                return { clsName: 'ScratchWinModel', ...v }
              })
              if (scratchList?.length) {
                OCHelper.call('UINavigationController.current.presentViewController:animated:completion:', [
                  {
                    selectors: 'ScratchController.new[setItem:][setModalPresentationStyle:]',
                    args1: [{ clsName: 'ScratchDataModel', scratchList, scratchWinList }],
                    args2: [5],
                  },
                  true,
                  undefined,
                ])
              }
            })
            break
          }
          case UGUserCenterType.砸金蛋: {
            if (!UGUserModel.checkLogin()) return
            showLoading()
            api.activity.goldenEggList().useSuccess(({ data }) => {
              hideLoading()
              // 数据转换为原生格式
              const list = data?.map((v) => {
                let obj = Object.assign({}, { clsName: 'DZPModel' }, v)
                obj.param = Object.assign({}, { clsName: 'DZPparamModel' }, obj?.param)
                obj.param.prizeArr = obj?.param?.prizeArr?.map((v) => {
                  return Object.assign({ clsName: 'DZPprizeModel' }, v)
                })
                return obj
              })
              if (list?.length) {
                OCHelper.call('UINavigationController.current.presentViewController:animated:completion:', [
                  {
                    selectors: 'EggFrenzyViewController.new[setItem:][setModalPresentationStyle:]',
                    args1: [list[0]],
                    args2: [5],
                  },
                  true,
                  undefined,
                ])
              }
            })
            break
          }
          case UGUserCenterType.任务弹窗: {
            if (!UGUserModel.checkLogin()) return
            console.log('top', AppDefine.safeArea.top, AppDefine.safeArea.bottom);

            const h = AppDefine.height - AppDefine.safeArea.top - AppDefine.safeArea.bottom - 150;
            OCHelper.call('UGTaskNoticeView.alloc.initWithFrame:.show', [NSValue.CGRectMake(25, (AppDefine.height - h) / 2, AppDefine.width - 50, h)])
            break
          }
          case UGUserCenterType.我的页: {
            (async () => {
              let mms: UGTabbarItem[] = await OCHelper.call('UGTabbarController.shared.customTabbar.dataArray')
              if (!mms) {
                // 兼容旧APP版本（写于2021.1.21 两个月后再删）
                mms = await OCHelper.call('UGTabbarController.shared.mms')
              }
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
                  OCHelper.call('UGNavigationController.current.pushViewController:animated:', [NSValue.ViewController('UGMineSkinViewController'), true])
                }
              }
            })()
            break
          }
          case UGUserCenterType.开奖结果: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [NSValue.ViewController('UGLotteryRecordController'), true])
            // OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGLotteryRecordController.new' }, true])
            break
          }
          case UGUserCenterType.银行卡管理: {
            if (__DEV__) {
              push(PageName.ManageBankListPage, {})
            } else {
              OCHelper.call('UGNavigationController.current.pushVCWithUserCenterItemType:', [UGUserCenterType.银行卡管理])
            }
            break
          }
          case UGUserCenterType.即时注单: {
            OCHelper.call('UGNavigationController.current.pushViewControllerWithLinkCategory:linkPosition:', [7, 24])
            break
          }
          case UGUserCenterType.优惠活动: {
            push(PageName.JDPromotionListPage)
            break
          }
          case UGUserCenterType.登录页: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [NSValue.ViewController('UGLoginViewController'), true])
            break
          }
          case UGUserCenterType.注册页: {
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [NSValue.ViewController('UGRegisterViewController'), true])
            break
          }
          case UGUserCenterType.路珠: {
            push(PageName.JSLuzhuPage)
            break
          }
          default: {
            OCHelper.call('UGNavigationController.current.pushVCWithUserCenterItemType:', [code]).then((succ) => {
              if (!succ) {
                console.log('跳转原生页面失败，请对接');
              }
            })
          }
        }

        break
      case 'android':
        let subId = ''
        ugLog("code: " + code)
        switch (code) {
          case UGUserCenterType.存款: {
            // if (B_DEBUG) {
            push(PageName.CapitalPage, { initTabIndex: CapitalConst.DEPOSIT })
            return
            // }
            // subId = MenuType.CZ
            // break
          }
          case UGUserCenterType.每日签到: {
            subId = MenuType.QD
            break
          }
          case UGUserCenterType.取款: {
            // if (B_DEBUG) {
            push(PageName.CapitalPage, { initTabIndex: CapitalConst.WITHDRAWAL })
            return
            // }
            // subId = MenuType.TX
            // break
          }
          case UGUserCenterType.银行卡管理: {
            // if (B_DEBUG) {
            push(PageName.ManageBankListPage)
            return
            // }
            // subId = MenuType.YHK
            // break
          }
          case UGUserCenterType.利息宝: {
            subId = MenuType.LXB
            break
          }
          case UGUserCenterType.推荐收益: {
            push(PageName.JDRecommendedIncomePage)
            return
          }
          case UGUserCenterType.即时注单: {
            subId = MenuType.JSZD
            break
          }
          case UGUserCenterType.彩票注单记录: {
            subId = MenuType.TZJL
            break
          }
          case UGUserCenterType.其他注单记录: {
            push(PageName.OtherRecord, { type: UGUserCenterType.真人注单 })
            return
          }
          case UGUserCenterType.电子注单: {
            push(PageName.OtherRecord, { type: UGUserCenterType.电子注单 })
            return
          }
          case UGUserCenterType.捕鱼注单: {
            push(PageName.OtherRecord, { type: UGUserCenterType.捕鱼注单 })
            return
          }
          case UGUserCenterType.电竞注单: {
            push(PageName.OtherRecord, { type: UGUserCenterType.电竞注单 })
            return
          }
          case UGUserCenterType.真人注单: {
            push(PageName.OtherRecord, { type: UGUserCenterType.真人注单 })
            return
          }
          case UGUserCenterType.棋牌注单: {
            push(PageName.OtherRecord, { type: UGUserCenterType.棋牌注单 })
            return
          }
          case UGUserCenterType.体育注单: {
            push(PageName.OtherRecord, { type: UGUserCenterType.体育注单 })
            return
          }
          case UGUserCenterType.登录页: {
            ANHelper.callAsync(CMD.OPEN_PAGE, OPEN_PAGE_PMS.LoginActivity)
            return
          }
          case UGUserCenterType.注册页: {
            ANHelper.callAsync(CMD.OPEN_PAGE, OPEN_PAGE_PMS.RegeditActivity)
            return
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
            subId = MenuType.GRXX
            break
          }
          case UGUserCenterType.建议反馈: {
            push(PageName.FeedbackView)
            return
          }
          case UGUserCenterType.在线客服: {
            push(PageName.OnlineService)
            return
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
            // Toast('敬请期待')
            break
          }
          case UGUserCenterType.开奖走势: {
            // Toast('敬请期待')
            push(PageName.TrendView, {})
            return
          }
          case UGUserCenterType.真人大厅:
          case UGUserCenterType.棋牌大厅:
          case UGUserCenterType.电子大厅:
          case UGUserCenterType.体育大厅:
          case UGUserCenterType.电竞大厅:
          case UGUserCenterType.捕鱼大厅: {
            subId = code.toString()
            break
          }
          case UGUserCenterType.QQ客服: {
            subId = MenuType.QQ
            break
          }
          case UGUserCenterType.资金明细: {
            // if (B_DEBUG) {r
            push(PageName.CapitalPage, { showBackButton: true })
            return
            // }
            // subId = MenuType.ZHGL
            // break
          }
          case UGUserCenterType.开奖网: {
            this.openWebView(
              //httpClient.defaults.baseURL + '/index2.php'
              httpClient.defaults.baseURL + '/open_prize/index.mobile.html?navhidden=1'
            )
            return
          }
          case UGUserCenterType.彩票大厅: {
            switch (UGStore.globalProps?.sysConf?.mobileGameHall) {
              case '1':
                push(PageName.GameHallPage, { showBackButton: true })
                return
              case '2':
                push(PageName.FreedomHallPage, { showBackButton: true })
                return
            }
            subId = MenuType.GCDT
            break
          }
          case UGUserCenterType.聊天室: {
            subId = MenuType.LTS
            break
          }
          case UGUserCenterType.游戏大厅: {
            // subId = MenuType.GCDT
            ugLog("游戏大厅")
            push(PageName.GameLobbyPage, { headerColor: Skin1.themeColor })
            return
          }
          case UGUserCenterType.刮刮乐: {
            if (!UGUserModel.checkLogin()) return
            showLoading()
            api.activity.scratchList().useSuccess(({ data }) => {
              hideLoading()
              ANHelper.callAsync(CMD.OPEN_ACTIVITIES, { key: 'ggl', data: data })
            })
            return
          }
          case UGUserCenterType.砸金蛋: {
            if (!UGUserModel.checkLogin()) return
            showLoading()
            api.activity.goldenEggList().useSuccess(({ data }) => {
              hideLoading()
              ANHelper.callAsync(CMD.OPEN_ACTIVITIES, { key: 'zjd', data: data })
            })
            return
          }
          case UGUserCenterType.任务弹窗: {
            // TODO Android
            break
          }
          case UGUserCenterType.我的页: {
            subId = MenuType.HYZX
            break
          }
          case UGUserCenterType.优惠活动: {
            push(PageName.PromotionPage, { showBackBtn: true })
            return
          }
        }

        if (!anyEmpty(subId)) {
          ANHelper.callAsync(CMD.OPEN_NAVI_PAGE, {
            seriesId: '7',
            subCode: code,
            subId: subId,
          })
        }
    }
  }

  // LinkPosition跳转
  static pushLinkPositionType(code: UGLinkPositionType) {
    switch (Platform.OS) {
      case 'ios':
        switch (code) {
          case UGLinkPositionType.今日输赢:
            OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGBetRecordViewController.new[setSelectIndex:]', args1: [3] }, true])
            break
          default:
            OCHelper.call('UGNavigationController.current.pushViewControllerWithLinkCategory:linkPosition:', [7, code])
        }
        break
      case 'android':
        PushHelper.pushCategory(7, code)
        break
    }
  }
}
