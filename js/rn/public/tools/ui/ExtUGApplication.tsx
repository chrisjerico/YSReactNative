import { Platform } from 'react-native'
import { ANHelper } from '../../define/ANHelper/ANHelper'
import { CMD } from '../../define/ANHelper/hp/CmdDefine'
import { PageName } from '../../navigation/Navigation'
import { anyEmpty } from '../Ext'
import { B_DEBUG, ugLog } from '../UgLog'

/**
 * Arc
 *
 * UGApplication扩展协助
 *
 * */
export default class ExtUGApplication {
  //在Application初始化之前使用，只能手动初始化 tab列表
  //Router.PageNameLists.tabList
  static TAB_LIST = [
    PageName.LCMinePage,
    PageName.LCHomePage,
    PageName.TransitionPage,
    PageName.ZLHomePage,
    PageName.ZLMinePage,
    PageName.ZLLoginPage,
    PageName.WNZSignInPage,
    PageName.WNZSignUpPage,
    PageName.HJHomePage,
    PageName.HJMinePage,
    PageName.HJLoginPage,
    PageName.HJRegisterPage,
    PageName.PromotionListPage,
    PageName.LHTHomePage,
    PageName.LHTMinePage,
    PageName.BZHHomePage,
    PageName.BZHMinePage,
    PageName.JXHHomePage,
    PageName.JXHMinePage,
    PageName.WNZHomePage,
    PageName.WNZMinePage,
    PageName.KSHomePage,
    PageName.KSMinePage,
    PageName.LLHomePage,
    PageName.LLMinePage,
    PageName.BYHomePage,
    PageName.BYMinePage,
    PageName.LEFHomePage,
    PageName.GameHallPage,
    PageName.FreedomHallPage,
    PageName.LEFMinePage,
    PageName.UpdateVersionPage,    
    PageName.GameLobbyPage,
    PageName.Game3rdView,
  ]

  //在Application初始化之前使用，只能手动初始化 stack列表
  //Router.PageNameLists.stackList
  static STACK_LIST = [
    PageName.ZLRegisterPage,
    PageName.BZHSignUpPage,
    PageName.BZHSignInPage,
    PageName.LottoBetting,
    PageName.ZLMinePage,
    PageName.KSSignInPage,
    PageName.KSSignUpPage,
    PageName.LLRegisterPage,
    PageName.LLLoginPage,
    PageName.BYSignUpPage,
    PageName.BYSignInPage,
    PageName.LEFSignUpPage,
    PageName.LEFSignInPage,
  ]

  /**
   * 从原生读取当前的暂存的UI
   */
  static syncCurrentPage = () => {
    let initName = null
    //Android 需要特殊处理
    switch (Platform.OS) {
      case 'android':
        // let currentScene = B_DEBUG
        //     ? PageName.UpdateVersionPage //Chrome 调试无法使用 Native同步方法，所以暂时使用主页
        //     : PageName[ANHelper.callSync(CMD.CURRENT_PAGE)];
        let currentScene
        // B_DEBUG ?
        //   currentScene = PageName[PageName.WNZHomePage] :
          currentScene = PageName[ANHelper.callSync(CMD.CURRENT_PAGE)]
        ugLog('ext currentScene=', currentScene)
        if (anyEmpty(currentScene)) {
          initName = PageName.UpdateVersionPage
        } else {
          initName = currentScene
        }
        break
    }
    return initName
  }

  /**
   * 该暂存的UI是不是 tab UI
   */
  static tabUI = () => {
    const pageName = ExtUGApplication.syncCurrentPage()
    const isTab = ExtUGApplication.TAB_LIST.includes(pageName)
    if (isTab) return pageName

    return PageName.UpdateVersionPage
  }

  /**
   * 该暂存的UI是不是 stack UI
   */
  static stackUI = () => {
    const pageName = ExtUGApplication.syncCurrentPage()
    const isStack = ExtUGApplication.STACK_LIST.includes(pageName)
    if (isStack) return pageName

    return null
  }
}
