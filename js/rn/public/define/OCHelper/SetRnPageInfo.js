"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RnPageModel = exports.setRnPageInfo = void 0;
var config_1 = require("./../../../../../config");
var Navigation_1 = require("../../navigation/Navigation");
var Router_1 = require("../../navigation/Router");
var UGSkinManagers_1 = require("./../../theme/UGSkinManagers");
var OCHelper_1 = require("./OCHelper");
var react_native_1 = require("react-native");
var AppDefine_1 = require("../AppDefine");
var config_2 = require("../../../../../config");
// 配置需要被替换的oc页面（替换成rn）
function setRnPageInfo() {
    var _a;
    var pages = [];
    var skitType = UGSkinManagers_1.Skin1.skitType;
    skitType = (_a = config_2.releaseConfig.skinKeys[AppDefine_1.default.siteId]) !== null && _a !== void 0 ? _a : skitType;
    console.log("------------------skitType------------------", skitType);
    // 本地编译
    if (config_1.devConfig.isDebug) {
        (config_1.devConfig === null || config_1.devConfig === void 0 ? void 0 : config_1.devConfig.skinKey) && (skitType = config_1.devConfig === null || config_1.devConfig === void 0 ? void 0 : config_1.devConfig.skinKey); // 測試開發
        // tars
        if (skitType.indexOf('六合厅') != -1) {
            pages = pages.concat(LHTPages);
        }
        if (skitType.indexOf('威尼斯') != -1) {
            pages = pages.concat(WNSPages);
        }
        if (skitType.indexOf('宝石红') != -1) {
            pages = pages.concat(BSHPages);
        }
        if (skitType.indexOf('凯时') != -1) {
            pages = pages.concat(KSPages);
        }
        if (skitType.indexOf('金星黑') != -1) {
            pages = pages.concat(JXHPages);
        }
        if (skitType.indexOf('越南') != -1) {
            pages = pages.concat(VietnamPages);
        }
    }
    // 测试环境（未上线的内容）
    if (config_1.devConfig.isTest()) {
        if (skitType.indexOf('凯时') != -1) {
            pages = pages.concat(KSPages);
        }
        if (UGSkinManagers_1.Skin1.skitType.indexOf('利来') != -1) {
            pages = pages.concat(LLPages);
        }
        if (skitType.indexOf('六合厅') != -1) {
            pages = pages.concat(LHTPages);
        }
        if (skitType.indexOf('乐橙') != -1) {
            pages = pages.concat(LCPages);
        }
        if (skitType.indexOf('金星黑') != -1) {
            pages = pages.concat(JXHPages);
        }
        if (skitType.indexOf('威尼斯') != -1) {
            pages = pages.concat(WNSPages);
        }
    }
    // —————————————————— 以下为已上线内容 ————————————————————————
    // 优惠活动列表页
    pages.push({
        vcName: 'UGPromotionsController',
        rnName: Navigation_1.PageName.JDPromotionListPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    });
    // 开奖走势页
    pages.push({
        rnName: Navigation_1.PageName.TrendView,
        userCenterItemCode: 18,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    });
    if (skitType.indexOf('尊龙') != -1) {
        pages = pages.concat(ZLPages);
    }
    if (skitType.indexOf('宝石红') != -1) {
        pages = pages.concat(BSHPages);
    }
    // 替换原生页面
    RnPageModel.pages = pages;
    switch (react_native_1.Platform.OS) {
        case 'ios':
            OCHelper_1.OCHelper.call('AppDefine.shared.setRnPageInfos:', [pages]);
            break;
        case 'android':
            break;
    }
}
exports.setRnPageInfo = setRnPageInfo;
// 尊龙模板页面
var ZLPages = [
    {
        // 首页
        tabbarItemPath: '/home',
        rnName: Navigation_1.PageName.ZLHomePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        // 登录
        vcName: 'UGLoginViewController',
        rnName: Navigation_1.PageName.ZLLoginPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        // 注册
        vcName: 'UGRegisterViewController',
        rnName: Navigation_1.PageName.ZLRegisterPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        // 我的页
        tabbarItemPath: '/user',
        vcName: 'UGMineSkinViewController',
        rnName: Navigation_1.PageName.ZLMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
    },
    {
        vcName: 'UGPromotionsController',
        rnName: Navigation_1.PageName.JDPromotionListPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        vcName: 'UGBalanceConversionController',
        vcName2: 'LineConversionHeaderVC',
        fd_prefersNavigationBarHidden: true,
        允许游客访问: false,
        允许未登录访问: false,
    }
];
// 乐橙模板
var LCPages = [
    {
        // 首页
        tabbarItemPath: '/home',
        rnName: Navigation_1.PageName.LCHomePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        // 我的页
        tabbarItemPath: '/user',
        vcName: 'UGMineSkinViewController',
        rnName: Navigation_1.PageName.LCMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
    },
];
// 六合厅
var LHTPages = [
    {
        // 首页
        tabbarItemPath: '/home',
        rnName: Navigation_1.PageName.LHTHomePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        // 我的页
        tabbarItemPath: '/user',
        vcName: 'UGMineSkinViewController',
        rnName: Navigation_1.PageName.LHTMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
    },
    {
        // 登录
        vcName: 'UGLoginViewController',
        rnName: Navigation_1.PageName.LHTSignInPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
];
// 宝石红
var BSHPages = [
    {
        // 首页
        tabbarItemPath: '/home',
        rnName: Navigation_1.PageName.BZHHomePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        // 我的页
        tabbarItemPath: '/user',
        vcName: 'UGMineSkinViewController',
        rnName: Navigation_1.PageName.BZHMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
    },
    {
        // 登录
        vcName: 'UGLoginViewController',
        rnName: Navigation_1.PageName.BZHSignInPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        // 游戏大厅
        tabbarItemPath: '/lotteryList',
        vcName: 'UGYYLotteryHomeViewController',
        rnName: Navigation_1.PageName.BZHGameLobbyPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
    }
];
// 利来
var LLPages = [
    {
        // 首页
        tabbarItemPath: '/home',
        rnName: Navigation_1.PageName.LLHomePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        // 我的页
        tabbarItemPath: '/user',
        rnName: Navigation_1.PageName.LLMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
    },
    {
        // 登录
        vcName: 'UGLoginViewController',
        rnName: Navigation_1.PageName.LLLoginPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        // 注册
        vcName: 'UGRegisterViewController',
        rnName: Navigation_1.PageName.LLRegisterPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
];
// 威尼斯
var WNSPages = [
    {
        // 首页
        tabbarItemPath: '/home',
        rnName: Navigation_1.PageName.WNZHomePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        // 我的页
        tabbarItemPath: '/user',
        vcName: 'UGMineSkinViewController',
        rnName: Navigation_1.PageName.WNZMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
    },
    {
        // 登录
        vcName: 'UGLoginViewController',
        rnName: Navigation_1.PageName.WNZSignInPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    }
];
// 凯时
var KSPages = [
    {
        // 首页
        tabbarItemPath: '/home',
        rnName: Navigation_1.PageName.KSHomePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        // 我的页
        tabbarItemPath: '/user',
        vcName: 'UGMineSkinViewController',
        rnName: Navigation_1.PageName.KSMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
    },
    {
        // 登录
        vcName: 'UGLoginViewController',
        rnName: Navigation_1.PageName.KSSignInPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
];
// 金星黑
var JXHPages = [
    {
        // 首页
        tabbarItemPath: '/home',
        rnName: Navigation_1.PageName.JXHHomePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        // 我的页
        tabbarItemPath: '/user',
        vcName: 'UGMineSkinViewController',
        rnName: Navigation_1.PageName.JXHMinePage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
    },
    {
        // 登录
        vcName: 'UGLoginViewController',
        rnName: Navigation_1.PageName.JXHSignInPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        vcName: 'UGPromotionsController',
        rnName: Navigation_1.PageName.JDPromotionListPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    }
];
// 越南
var VietnamPages = [
    {
        // 首页
        tabbarItemPath: '/home',
        rnName: Navigation_1.PageName.VietnamHome,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        // 我的页
        tabbarItemPath: '/user',
        vcName: 'UGMineSkinViewController',
        rnName: Navigation_1.PageName.VietnamMine,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: false,
    },
    {
        // 登录
        vcName: 'UGLoginViewController',
        rnName: Navigation_1.PageName.VietnamLogin,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    },
    {
        vcName: 'UGPromotionsController',
        rnName: Navigation_1.PageName.JDPromotionListPage,
        fd_prefersNavigationBarHidden: true,
        允许游客访问: true,
        允许未登录访问: true,
    }
];
var RnPageModel = /** @class */ (function () {
    function RnPageModel() {
    }
    RnPageModel.getPageName = function (vcName) {
        if (Router_1.Router.getPageRouterType(vcName) != Router_1.RouterType.None) {
            return vcName;
        }
        for (var _i = 0, _a = this.pages; _i < _a.length; _i++) {
            var rpm = _a[_i];
            if (rpm.vcName == vcName) {
                return rpm.rnName;
            }
        }
        return null;
    };
    RnPageModel.pages = [];
    return RnPageModel;
}());
exports.RnPageModel = RnPageModel;
