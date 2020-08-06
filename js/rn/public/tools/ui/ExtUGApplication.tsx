import {Platform} from "react-native";
import {PageName} from "../../navigation/Navigation";
import {ANHelper, CMD} from "../../define/ANHelper/ANHelper";
import {Router} from "../../navigation/Router";
import {B_DEBUG, ugLog} from "../UgLog";

/**
 * Arc
 *
 * UGApplication扩展协助
 *
 * */
export default class ExtUGApplication {

  //手动初始化 tab列表
  //Router.PageNameLists.tabList
  static TAB_LIST = [
    PageName.LXBView,
    PageName.VietnamHome,
    PageName.LCMinePage,
    PageName.LCHomePage,
    PageName.TransitionPage,
    PageName.XBJLoginPage,
    PageName.XBJRegisterPage,
    PageName.XBJMinePage,
    PageName.XBJHomePage,
    PageName.ZLHomePage,
    PageName.ZLMinePage,
    PageName.PromotionListPage,
    PageName.LHTHomePage,
    PageName.LHTMinePage,
    PageName.BZHHomePage,
    PageName.BZHMinePage,
    PageName.GDBHomePage,
    PageName.GDBMinePage,
    PageName.WNZHomePage,
    PageName.WNZMinePage,
    PageName.KSHomePage,
    PageName.UpdateVersionPage,
    PageName.JDPromotionListPage,
  ];

  //手动初始化 stack列表
  //Router.PageNameLists.stackList
  static STACK_LIST = [
    PageName.ZLLoginPage,
    PageName.ZLRegisterPage,
    PageName.JDPromotionListPage,
    PageName.PromotionListPage,
    PageName.GDLoginPage,
    PageName.GDRegisterPage,
    PageName.BZHRegisterPage,
    PageName.BZHSignInPage,
    PageName.LottoBetting,
    PageName.ZLMinePage,
    PageName.VietnamLogin,
    PageName.VietnamRegister,
    PageName.VietnamGameList,
  ];

  /**
   * 从原生读取当前的暂存的UI
   */
  static syncCurrentPage = () => {
    let initName = null;
    //Android 需要特殊处理
    switch (Platform.OS) {
      case "android":
        let currentScene = B_DEBUG
            ? PageName.ZLHomePage //Chrome 调试无法使用 Native同步方法，所以暂时使用主页
            : PageName[ANHelper.callSync(CMD.CURRENT_PAGE)];
        if (currentScene != null) {
          initName = currentScene
        }
        break;
    }
    return initName;
  }

  /**
   * 该暂存的UI是不是 tab UI
   */
  static tabUI = () => {
    const pageName = ExtUGApplication.syncCurrentPage();
    const isTab = ExtUGApplication.TAB_LIST.includes(pageName);
    if (isTab) return pageName;

    return PageName.UpdateVersionPage;
  }

  /**
   * 该暂存的UI是不是 stack UI
   */
  static stackUI = () => {
    const pageName = ExtUGApplication.syncCurrentPage();
    const isStack = ExtUGApplication.STACK_LIST.includes(pageName);
    if (isStack) return pageName;

    return null;
  }
}
