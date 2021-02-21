import { skinColors } from './../../public/theme/const/UGSkinColor';
import PushHelper from '../../public/define/PushHelper'
import { GameType, SeriesId } from '../../public/models/Enum'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, push } from '../../public/navigation/RootNavigation'
import { UGImageHost, useHtml5Image } from '../../Res/icon'
import { UGStore } from '../../redux/store/UGStore'
import { goToUserCenterType } from '../../public/tools/tars';

const { getHtml5Image, img_assets } = useHtml5Image(UGImageHost.t132f)
const { isTest = false, uid = '' } = UGStore.globalProps.userInfo

const config = {
  defaultUserCenterLogos: {
    1: getHtml5Image(23, 'chongzhi'), // 存款
    2: getHtml5Image(23, 'tixian'), // 取款
    3: getHtml5Image(23, 'center/bank'), // 银行卡管理
    4: getHtml5Image(23, 'center/yeb'), // 利息宝
    5: getHtml5Image(23, 'center/my_lottery'), // 推荐收益
    6: getHtml5Image(23, 'center/cp'), // 彩票注单记录
    7: getHtml5Image(23, 'center/chase'), // 其他注单记录
    8: getHtml5Image(23, 'center/transfer'), // 额度转换
    9: getHtml5Image(23, 'center/message'), // 站内信
    10: getHtml5Image(23, 'center/person_summary'), // 安全中心
    11: getHtml5Image(23, 'center/my_redenvelope'), // 任务中心
    12: getHtml5Image(23, 'center/user_info'), // 个人信息
    13: getHtml5Image(7, 'zhmx'), // 建议反馈
    14: img_assets('wnz/service'), // 在线客服
    15: getHtml5Image(23, 'center/my_activity'), // 活动彩金
    16: img_assets('wnz/long'), // 长龙助手
    17: getHtml5Image(23, 'center/rule'), // 全民竞猜
    18: getHtml5Image(null, 'kj_trend'), // 开奖走势
    19: img_assets('wnz/qq'), // QQ客服
    20: img_assets('wnz/award'), // 開獎網
    22: getHtml5Image(23, 'center/electronic'), // 电子注单
    23: getHtml5Image(23, 'center/live'), // 真人注单
    24: getHtml5Image(23, 'center/chess'), // 棋牌注单
    25: getHtml5Image(23, 'center/chase'), // 捕鱼注单
    26: getHtml5Image(23, 'center/vr'), // 电竞注单
    27: getHtml5Image(23, 'center/sport'), // 体育注单
    30: getHtml5Image(23, 'center/recharge_record'), // 存款纪录
    31: getHtml5Image(23, 'center/withdraw-order'), // 取款纪录
    32: getHtml5Image(23, 'center/account_bill'), // 资金明细
    33: getHtml5Image(23, 'center/activity_hall'), // 优惠活动
    34: getHtml5Image(23, 'center/my_chat'), // 聊天室
    35: img_assets('invi@2x'), // UCI_我的关注
    36: img_assets('friend'), // UCI_我的动态
    37: img_assets('fans'), // UCI_我的粉丝

  },
  navColors: ['#edb93f', '#77674d', '#e62e25', '#52b653', '#007aff'],
  moreGame: [
    {
      title: '更多游戏',
      pic: getHtml5Image(23, 'home/moregame'),
      openCycle: '更多游戏玩法',
    },
  ],
  menus: [
    {
      title: '会员中心',
      onPress: goToUserCenterType.我的页, // navigate(PageName.WNZMinePage)
    },
    {
      title: '额度转换',
      onPress: goToUserCenterType.额度转换,
    },
    {
      title: '幸运棋牌',
      onPress: () => {
        PushHelper.pushHomeGame({ seriesId: SeriesId.棋牌, gameId: 51, subId: 51 })
      },
    },
    {
      title: '彩票游戏',
      onPress: goToUserCenterType.彩票大厅,
    },
    {
      title: 'AG视讯',
      onPress: () => {
        PushHelper.pushHomeGame({ gameId: 59, seriesId: SeriesId.真人, subId: 59 })
      },
    },
    {
      title: '真人视讯',
      onPress: () => {
        navigate(PageName.SeriesLobbyPage, { name: '真人视讯', headerColor: skinColors.themeColor.威尼斯, homePage: PageName.WNZHomePage, subId: 42 })
      },
    },
    {
      title: '电子游艺',
      onPress: () => {
        navigate(PageName.SeriesLobbyPage, { name: '电子游艺', headerColor: skinColors.themeColor.威尼斯, homePage: PageName.WNZHomePage, subId: 44 })
      },
    },
    {
      title: '捕鱼达人',
      onPress: () => {
        navigate(PageName.SeriesLobbyPage, { name: '捕鱼达人', headerColor: skinColors.themeColor.威尼斯, homePage: PageName.WNZHomePage, subId: 48 })
      },
    },
    {
      title: '体育游戏',
      onPress: () => {
        navigate(PageName.SeriesLobbyPage, { name: '体育游戏', headerColor: skinColors.themeColor.威尼斯, homePage: PageName.WNZHomePage, subId: 45 })
      },
    },
    {
      title: '棋牌游戏',
      onPress: () => {
        navigate(PageName.SeriesLobbyPage, { name: '棋牌游戏', headerColor: skinColors.themeColor.威尼斯, homePage: PageName.WNZHomePage, subId: 43 })
      },
    },
    {
      title: '更多彩种',
      onPress: goToUserCenterType.彩票大厅,
    },
    {
      title: '投注记录',
      onPress: goToUserCenterType.彩票注单记录,
    },
    {
      title: '开奖结果',
      onPress: goToUserCenterType.开奖结果,
    },
    {
      title: '长龙排行',
      onPress: goToUserCenterType.长龙助手,
    },
    {
      title: '游戏大厅',
      onPress: () => {
        navigate(PageName.GameLobbyPage, {})
      }
    },
  ],
  menuSignIn: [
    {
      title: '登录/注册',
      onPress: () => push(PageName.WNZSignInPage),
    },
  ],
  menuSignOut: [
    {
      gameId: 31,
      title: '安全退出',
      onPress: () => {},
    },
  ],
  c245UnAuthNavs: [
    {
      name: '登入/注册',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c245/images/drzc.png',
      onPress: () => {
        push(PageName.WNZSignInPage)
      },
    },
    {
      name: '充值中心',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c245/images/czzx.png',
      onPress: goToUserCenterType.存款,
    },
    {
      name: '优惠介绍',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c245/images/yhjs.png',
      onPress: () => {
        push(PageName.PromotionPage, {
          showBackBtn: true,
        })
      },
    },
    {
      name: '线上客服',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c245/images/xskf.png',
      onPress: goToUserCenterType.在线客服,
    },
    {
      gameId: 'tryPlay',
      name: '游戏试玩',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c245/images/yxsw.png',
    },
  ],
  c245AuthNavs: [
    {
      name: '会员中心',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c245/images/hyzx.png',
      onPress: goToUserCenterType.我的页,
    },
    {
      name: '充值中心',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c245/images/czzx.png',
      onPress: goToUserCenterType.存款,
    },
    {
      name: '优惠介绍',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c245/images/yhjs.png',
      onPress: () => {
        push(PageName.PromotionPage, {
          showBackBtn: true,
        })
      },
    },
    {
      name: '线上客服',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c245/images/xskf.png',
      onPress: goToUserCenterType.在线客服,
    },
    {
      name: '投注记录',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c245/images/tzjl.png',
      onPress: goToUserCenterType.彩票注单记录,
    },
  ],
  c108UnAuthNavs: [
    {
      name: '充值取款',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c108/images/2021.png',
      onPress: () => {
        if (!uid)  {
          push(PageName.WNZSignInPage)
          return
        }
        goToUserCenterType.存款
      },
    },
    {
      name: '优惠活动',
      gameId: GameType.优惠活动,
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c108/images/niu.png',
      onPress: () => {
        push(PageName.PromotionPage, {
          showBackBtn: true,
        })
      },
    },
    {
      name: '在线客服',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c108/images/qi.png',
      onPress: goToUserCenterType.在线客服,
    },
    {
      name: '登入/注册',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c108/images/sign.png',
      onPress: () => {
        push(PageName.WNZSignInPage)
      },
    },
    {
      gameId: 'tryPlay',
      name: '试玩',
      icon: 'https://cdn01.gangdongyumatou.cn/platform/c108/images/tourist.png',
    },
  ],
}

export default config
