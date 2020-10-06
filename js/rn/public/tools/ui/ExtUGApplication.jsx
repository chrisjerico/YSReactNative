"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var ANHelper_1 = require("../../define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../define/ANHelper/hp/CmdDefine");
var Navigation_1 = require("../../navigation/Navigation");
var Ext_1 = require("../Ext");
/**
 * Arc
 *
 * UGApplication扩展协助
 *
 * */
var ExtUGApplication = /** @class */ (function () {
    function ExtUGApplication() {
    }
    //在Application初始化之前使用，只能手动初始化 tab列表
    //Router.PageNameLists.tabList
    ExtUGApplication.TAB_LIST = [
        Navigation_1.PageName.LXBView,
        Navigation_1.PageName.VietnamHome,
        Navigation_1.PageName.LCMinePage,
        Navigation_1.PageName.LCHomePage,
        Navigation_1.PageName.TransitionPage,
        Navigation_1.PageName.XBJLoginPage,
        Navigation_1.PageName.XBJRegisterPage,
        Navigation_1.PageName.XBJMinePage,
        Navigation_1.PageName.XBJHomePage,
        Navigation_1.PageName.ZLHomePage,
        Navigation_1.PageName.ZLMinePage,
        Navigation_1.PageName.PromotionListPage,
        Navigation_1.PageName.LHTHomePage,
        Navigation_1.PageName.LHTMinePage,
        Navigation_1.PageName.BZHHomePage,
        Navigation_1.PageName.BZHMinePage,
        Navigation_1.PageName.GDBHomePage,
        Navigation_1.PageName.GDBMinePage,
        Navigation_1.PageName.WNZHomePage,
        Navigation_1.PageName.WNZMinePage,
        Navigation_1.PageName.KSHomePage,
        Navigation_1.PageName.KSMine,
        Navigation_1.PageName.LLHomePage,
        Navigation_1.PageName.LLMinePage,
        Navigation_1.PageName.UpdateVersionPage,
        Navigation_1.PageName.JDPromotionListPage,
    ];
    //在Application初始化之前使用，只能手动初始化 stack列表
    //Router.PageNameLists.stackList
    ExtUGApplication.STACK_LIST = [
        Navigation_1.PageName.ZLLoginPage,
        Navigation_1.PageName.ZLRegisterPage,
        Navigation_1.PageName.JDPromotionListPage,
        Navigation_1.PageName.PromotionListPage,
        Navigation_1.PageName.GDLoginPage,
        Navigation_1.PageName.GDRegisterPage,
        Navigation_1.PageName.BZHSignUpPage,
        Navigation_1.PageName.BZHSignInPage,
        Navigation_1.PageName.LottoBetting,
        Navigation_1.PageName.ZLMinePage,
        Navigation_1.PageName.KSLogin,
        Navigation_1.PageName.KSRegister,
        Navigation_1.PageName.LLRegisterPage,
        Navigation_1.PageName.LLLoginPage,
        Navigation_1.PageName.VietnamLogin,
        Navigation_1.PageName.VietnamRegister,
        Navigation_1.PageName.VietnamGameList,
    ];
    /**
     * 从原生读取当前的暂存的UI
     */
    ExtUGApplication.syncCurrentPage = function () {
        var initName = null;
        //Android 需要特殊处理
        switch (react_native_1.Platform.OS) {
            case 'android':
                // let currentScene = B_DEBUG
                //     ? PageName.UpdateVersionPage //Chrome 调试无法使用 Native同步方法，所以暂时使用主页
                //     : PageName[ANHelper.callSync(CMD.CURRENT_PAGE)];
                var currentScene = Navigation_1.PageName[ANHelper_1.ANHelper.callSync(CmdDefine_1.CMD.CURRENT_PAGE)];
                if (Ext_1.anyEmpty(currentScene)) {
                    initName = Navigation_1.PageName.UpdateVersionPage;
                }
                else {
                    initName = currentScene;
                }
                break;
        }
        return initName;
    };
    /**
     * 该暂存的UI是不是 tab UI
     */
    ExtUGApplication.tabUI = function () {
        var pageName = ExtUGApplication.syncCurrentPage();
        var isTab = ExtUGApplication.TAB_LIST.includes(pageName);
        if (isTab)
            return pageName;
        return Navigation_1.PageName.UpdateVersionPage;
    };
    /**
     * 该暂存的UI是不是 stack UI
     */
    ExtUGApplication.stackUI = function () {
        var pageName = ExtUGApplication.syncCurrentPage();
        var isStack = ExtUGApplication.STACK_LIST.includes(pageName);
        if (isStack)
            return pageName;
        return null;
    };
    return ExtUGApplication;
}());
exports.default = ExtUGApplication;
