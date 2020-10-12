"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPEN_PAGE_PMS = exports.CMD = void 0;
/**
 * @Description: 交互命令
 *
 * @author Arc
 * @date 2020/8/6
 */
var CMD;
(function (CMD) {
    CMD["OPEN_PAGE"] = "OPEN_PAGE";
    CMD["OPEN_RIGHT_MENU"] = "OPEN_RIGHT_MENU";
    CMD["LAUNCH_GO"] = "LAUNCH_GO";
    CMD["OPEN_WEB"] = "OPEN_WEB";
    CMD["OPEN_NAVI_PAGE"] = "OPEN_NAVI_PAGE";
    CMD["OPEN_RED_BAD"] = "OPEN_RED_BAD";
    CMD["OPEN_NOTICE"] = "OPEN_NOTICE";
    CMD["OPEN_POP_NOTICE"] = "OPEN_POP_NOTICE";
    CMD["OPEN_COUPON"] = "OPEN_COUPON";
    CMD["LOG_OUT"] = "LOG_OUT";
    CMD["UNIVERSAL"] = "UNIVERSAL";
    CMD["MOVE_TO_BACK"] = "MOVE_TO_BACK";
    CMD["FINISH_ACTIVITY"] = "FINISH_ACTIVITY";
    CMD["APP_THEME_COLOR"] = "UGSkinManagers.currentSkin.navBarBgColor.hexString";
    CMD["RN_PAGES"] = "AppDefine.shared.setRnPageInfos:";
    CMD["CURRENT_PAGE"] = "CURRENT_PAGE";
    CMD["VISIBLE_MAIN_TAB"] = "VISIBLE_MAIN_TAB";
    CMD["APP_HOST"] = "AppDefine.shared.Host";
    CMD["APP_SITE"] = "AppDefine.shared.SiteId";
    CMD["SITE_ENCRYPTION"] = "SITE_ENCRYPTION";
    CMD["ENCRYPTION"] = "CMNetwork.encryptionCheckSign:";
    CMD["ENCRYPTION_PARAMS"] = "ENCRYPTION_PARAMS";
    CMD["ASK_MINE_ITEMS"] = "ASK_MINE_ITEMS";
    CMD["ASK_FOR_TOKEN"] = "ASK_FOR_TOKEN";
    CMD["ASK_FOR_TOKEN_AND_RSA"] = "ASK_FOR_TOKEN_AND_RSA";
    CMD["ACCESS_TOKEN"] = "ACCESS_TOKEN";
    CMD["SAVE_DATA"] = "SAVE_DATA";
    CMD["LOAD_DATA"] = "LOAD_DATA"; //加载数据
})(CMD = exports.CMD || (exports.CMD = {}));
/**
 * 打开界面参数
 */
exports.OPEN_PAGE_PMS = {
    LaunchActivity: {
        toActivity: true,
        packageName: 'com.phoenix.lotterys.main',
        className: 'LaunchActivity'
    },
    LoginActivity: {
        toActivity: true,
        packageName: 'com.phoenix.lotterys.my.activity',
        className: 'LoginActivity'
    },
    RegeditActivity: {
        toActivity: true,
        packageName: 'com.phoenix.lotterys.my.activity',
        className: 'RegeditActivity'
    }
};
//# sourceMappingURL=CmdDefine.js.map