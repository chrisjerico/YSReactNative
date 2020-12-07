import PushHelper from '../../public/define/PushHelper'
import { SeriesId } from '../../public/models/Enum'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, push } from '../../public/navigation/RootNavigation'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { getIbbImage, goToUserCenterType, useHtml5Image } from '../../public/tools/tars'

const { getHtml5Image } = useHtml5Image('http://t132f.fhptcdn.com')

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
    14: 'https://appstatic.woyovr.com/assets/wnz/service.png', // 在线客服
    15: getHtml5Image(23, 'center/my_activity'), // 活动彩金
    16: 'https://appstatic.woyovr.com/assets/wnz/long.png', // 长龙助手
    17: getHtml5Image(23, 'center/rule'), // 全民竞猜
    18: getHtml5Image(null, 'kj_trend'), // 开奖走势
    19: 'https://appstatic.woyovr.com/assets/wnz/qq.png', // QQ客服
    20: 'https://appstatic.woyovr.com/assets/wnz/award.png', // 開獎網
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
        navigate(PageName.SeriesLobbyPage, { name: '真人视讯', headerColor: WNZThemeColor.威尼斯.themeColor, homePage: PageName.WNZHomePage, subId: 42 })
      },
    },
    {
      title: '电子游艺',
      onPress: () => {
        navigate(PageName.SeriesLobbyPage, { name: '电子游艺', headerColor: WNZThemeColor.威尼斯.themeColor, homePage: PageName.WNZHomePage, subId: 44 })
      },
    },
    {
      title: '捕鱼达人',
      onPress: () => {
        navigate(PageName.SeriesLobbyPage, { name: '捕鱼达人', headerColor: WNZThemeColor.威尼斯.themeColor, homePage: PageName.WNZHomePage, subId: 48 })
      },
    },
    {
      title: '体育游戏',
      onPress: () => {
        navigate(PageName.SeriesLobbyPage, { name: '体育游戏', headerColor: WNZThemeColor.威尼斯.themeColor, homePage: PageName.WNZHomePage, subId: 45 })
      },
    },
    {
      title: '棋牌游戏',
      onPress: () => {
        navigate(PageName.SeriesLobbyPage, { name: '棋牌游戏', headerColor: WNZThemeColor.威尼斯.themeColor, homePage: PageName.WNZHomePage, subId: 43 })
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
}

export default config
