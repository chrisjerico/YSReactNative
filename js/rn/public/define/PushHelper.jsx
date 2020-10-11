"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var Enum_1 = require("../models/Enum");
var Navigation_1 = require("../navigation/Navigation");
var RootNavigation_1 = require("../navigation/RootNavigation");
var httpClient_1 = require("../network/httpClient");
var NetworkRequest1_1 = require("../network/NetworkRequest1");
var ToastUtils_1 = require("../tools/ToastUtils");
var UgLog_1 = require("../tools/UgLog");
var ANHelper_1 = require("./ANHelper/ANHelper");
var CmdDefine_1 = require("./ANHelper/hp/CmdDefine");
var GotoDefine_1 = require("./ANHelper/hp/GotoDefine");
var AppDefine_1 = require("./AppDefine");
var OCCall_1 = require("./OCHelper/OCBridge/OCCall");
var OCHelper_1 = require("./OCHelper/OCHelper");
var SetRnPageInfo_1 = require("./OCHelper/SetRnPageInfo");
var PushHelper = /** @class */ (function () {
    function PushHelper() {
    }
    PushHelper.pushAnnouncement = function (data) {
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('UGPlatformNoticeView.alloc.initWithFrame:[setDataArray:].show', [OCCall_1.NSValue.CGRectMake(20, 60, AppDefine_1.default.width - 40, AppDefine_1.default.height * 0.8)], [data]);
                break;
            case 'android':
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_POP_NOTICE, { popup: data });
                break;
        }
    };
    // 右側選單
    PushHelper.pushRightMenu = function (from) {
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('UGYYRightMenuView.alloc.initWithFrame:[setTitleType:].show', [OCCall_1.NSValue.CGRectMake(AppDefine_1.default.width / 2, 0, AppDefine_1.default.width / 2, AppDefine_1.default.height)], [from]);
                break;
            case 'android':
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_RIGHT_MENU);
                break;
        }
    };
    // 輪盤
    PushHelper.pushWheel = function (turntableList) {
        return __awaiter(this, void 0, void 0, function () {
            var turntableListModel;
            return __generator(this, function (_a) {
                turntableListModel = Object.assign({ clsName: 'DZPModel' }, turntableList === null || turntableList === void 0 ? void 0 : turntableList[0]);
                switch (react_native_1.Platform.OS) {
                    case 'ios':
                        OCHelper_1.OCHelper.call(function (_a) {
                            var vc = _a.vc;
                            return ({
                                vc: {
                                    selectors: 'DZPMainView.alloc.initWithFrame:[setItem:]',
                                    args1: [OCCall_1.NSValue.CGRectMake(100, 100, AppDefine_1.default.width - 60, AppDefine_1.default.height - 60)],
                                    args2: [turntableListModel],
                                },
                                ret: {
                                    selectors: 'SGBrowserView.showMoveView:yDistance:',
                                    args1: [vc, 100],
                                },
                            });
                        });
                        break;
                    case 'android':
                        break;
                }
                return [2 /*return*/];
            });
        });
    };
    // 登出
    PushHelper.pushLogout = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = react_native_1.Platform.OS;
                        switch (_a) {
                            case 'ios': return [3 /*break*/, 1];
                            case 'android': return [3 /*break*/, 5];
                        }
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [])];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout'])];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, OCHelper_1.OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0])];
                    case 4:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 5: return [4 /*yield*/, ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.LOG_OUT)];
                    case 6:
                        _b.sent();
                        return [3 /*break*/, 7];
                    case 7:
                        ToastUtils_1.Toast('退出成功');
                        return [2 /*return*/];
                }
            });
        });
    };
    // 登入
    PushHelper.pushLogin = function () {
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                    {
                        selectors: 'AppDefine.viewControllerWithStoryboardID:',
                        args1: ['UGLoginViewController'],
                    },
                    true,
                ]);
                break;
            case 'android':
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_PAGE, CmdDefine_1.OPEN_PAGE_PMS.LoginActivity);
                break;
        }
    };
    // 註冊
    PushHelper.pushRegister = function () {
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                    {
                        selectors: 'AppDefine.viewControllerWithStoryboardID:',
                        args1: ['UGRegisterViewController'],
                    },
                    true,
                ]);
                break;
            case 'android':
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_PAGE, CmdDefine_1.OPEN_PAGE_PMS.RegeditActivity);
                break;
        }
    };
    // 首页游戏列表跳转
    PushHelper.pushHomeGame = function (game) {
        game = Object.assign({ clsName: 'GameModel' }, game);
        console.log('--------game-------', game);
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewControllerWithGameModel:', [game]);
                break;
            case 'android':
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_NAVI_PAGE, game);
                break;
        }
    };
    // 去彩票
    PushHelper.pushLottery = function (code) {
        this.pushHomeGame({
            seriesId: Enum_1.SeriesId.体育,
            subId: code,
            gameId: code,
        });
    };
    // 去捕魚
    PushHelper.pushFish = function (code) {
        this.pushHomeGame({
            seriesId: Enum_1.SeriesId.捕鱼,
            subId: code,
            gameId: code,
        });
    };
    // 去彩票大廳 userCenter裡有
    // static pushLotteryLobby() {
    //   OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGLotterySelectController.new' }, true])
    // }
    /**
     * 打开红包
     * @param redBag
     */
    PushHelper.pushRedBag = function (redBag) {
        var data = redBag === null || redBag === void 0 ? void 0 : redBag.data;
        var redbagModel = Object.assign({}, { clsName: 'UGRedEnvelopeModel', rid: data === null || data === void 0 ? void 0 : data.id }, data); // ios 裡是抓rid
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('UGredActivityView.alloc.initWithFrame:[setItem:].show', [OCCall_1.NSValue.CGRectMake(20, AppDefine_1.default.height * 0.1, AppDefine_1.default.width - 40, AppDefine_1.default.height * 0.8)], [redbagModel]);
                break;
            case 'android':
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_RED_BAD, data);
                break;
        }
    };
    // 跳转到彩票下注页，或内部功能页
    PushHelper.pushCategory = function (linkCategory, linkPosition, title) {
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewControllerWithLinkCategory:linkPosition:', [Number(linkCategory), Number(linkPosition)]);
                break;
            case 'android':
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_NAVI_PAGE, {
                    seriesId: linkCategory,
                    subId: linkPosition,
                });
                break;
        }
    };
    PushHelper.pushNoticePopUp = function (notice) {
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('UGNoticePopView.alloc.initWithFrame:[setContent:].show', [OCCall_1.NSValue.CGRectMake(20, AppDefine_1.default.height * 0.1, AppDefine_1.default.width - 40, AppDefine_1.default.height * 0.8)], [notice]);
                break;
            case 'android':
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_NOTICE, { rnString: notice });
                break;
        }
    };
    PushHelper.openWebView = function (url) {
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call(function (_a) {
                    var vc = _a.vc;
                    return ({
                        vc: {
                            selectors: 'TGWebViewController.new[setUrl:]',
                            args1: [url],
                        },
                        ret: {
                            selectors: 'UGNavigationController.current.pushViewController:animated:',
                            args1: [vc, true],
                        },
                    });
                });
                break;
            case 'android':
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_WEB, { url: url });
                break;
        }
    };
    // 我的页按钮跳转
    PushHelper.pushUserCenterType = function (code) {
        UgLog_1.ugLog('pushUserCenterType code=', code);
        switch (react_native_1.Platform.OS) {
            case 'ios':
                switch (code) {
                    case UGSysConfModel_1.UGUserCenterType.存款: {
                        PushHelper.pushCategory(7, 21);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.取款: {
                        PushHelper.pushCategory(7, 22);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.存款纪录: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                            {
                                selectors: 'AppDefine.viewControllerWithStoryboardID:[setSelectIndex:]',
                                args1: ['UGFundsViewController'],
                                args2: [2],
                            },
                            true,
                        ]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.取款纪录: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                            {
                                selectors: 'AppDefine.viewControllerWithStoryboardID:[setSelectIndex:]',
                                args1: ['UGFundsViewController'],
                                args2: [3],
                            },
                            true,
                        ]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.每日签到:
                        {
                            OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGSigInCodeViewController.new', args1: [] }, true]);
                        }
                        break;
                    case UGSysConfModel_1.UGUserCenterType.银行卡管理: {
                        function func1() {
                            return __awaiter(this, void 0, void 0, function () {
                                var hasBankCard, hasFundPwd, vcName;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser.hasBankCard')];
                                        case 1:
                                            hasBankCard = _a.sent();
                                            return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser.hasFundPwd')];
                                        case 2:
                                            hasFundPwd = _a.sent();
                                            vcName = hasBankCard ? 'UGBankCardInfoController' : hasFundPwd ? 'UGBindCardViewController' : 'UGSetupPayPwdController';
                                            OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                                                {
                                                    selectors: 'AppDefine.viewControllerWithStoryboardID:',
                                                    args1: [vcName],
                                                },
                                                true,
                                            ]);
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        }
                        func1();
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.利息宝: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                            {
                                selectors: 'AppDefine.viewControllerWithStoryboardID:',
                                args1: ['UGYubaoViewController'],
                            },
                            true,
                        ]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.推荐收益: {
                        function func1() {
                            return __awaiter(this, void 0, void 0, function () {
                                var isTest, info, agent_m_apply;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.currentUser.isTest')];
                                        case 1:
                                            isTest = _a.sent();
                                            if (!isTest) return [3 /*break*/, 2];
                                            // 试玩账号去阉割版的推荐收益页
                                            OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGPromotionIncomeController.new' }, true]);
                                            return [3 /*break*/, 7];
                                        case 2:
                                            // ShowLoading
                                            OCHelper_1.OCHelper.call('SVProgressHUD.showWithStatus:');
                                            return [4 /*yield*/, NetworkRequest1_1.default.team_agentApplyInfo()];
                                        case 3:
                                            info = _a.sent();
                                            if (!(info.reviewStatus === 2)) return [3 /*break*/, 4];
                                            // 去推荐收益页
                                            OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGPromotionIncomeController.new' }, true]);
                                            return [3 /*break*/, 6];
                                        case 4: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGSystemConfigModel.currentConfig.agent_m_apply')];
                                        case 5:
                                            agent_m_apply = _a.sent();
                                            if (parseInt(agent_m_apply) !== 1) {
                                                OCHelper_1.OCHelper.call('HUDHelper.showMsg:', ['在线注册代理已关闭']);
                                            }
                                            else {
                                                // 去申请代理
                                                info = Object.assign({ clsName: 'UGagentApplyInfo' }, info);
                                                OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                                                    {
                                                        selectors: 'UGAgentViewController.new[setItem:]',
                                                        args1: [],
                                                    },
                                                    true,
                                                ]);
                                            }
                                            _a.label = 6;
                                        case 6:
                                            // HideLoading
                                            OCHelper_1.OCHelper.call('SVProgressHUD.dismiss');
                                            _a.label = 7;
                                        case 7: return [2 /*return*/];
                                    }
                                });
                            });
                        }
                        func1();
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.彩票注单记录: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGBetRecordViewController.new' }, true]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.其他注单记录: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                            {
                                selectors: 'AppDefine.viewControllerWithStoryboardID:[setGameType:]',
                                args1: ['UGRealBetRecordViewController', 'real'],
                            },
                            true,
                        ]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.额度转换: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                            {
                                selectors: 'AppDefine.viewControllerWithStoryboardID:',
                                args1: ['UGBalanceConversionController'],
                            },
                            true,
                        ]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.站内信: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGMailBoxTableViewController.new' }, true]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.安全中心: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGSecurityCenterViewController.new' }, true]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.任务中心: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                            {
                                selectors: 'AppDefine.viewControllerWithStoryboardID:',
                                args1: ['UGMissionCenterViewController'],
                            },
                            true,
                        ]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.个人信息: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                            {
                                selectors: 'AppDefine.viewControllerWithStoryboardID:',
                                args1: ['UGUserInfoViewController'],
                            },
                            true,
                        ]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.建议反馈: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                            {
                                selectors: 'AppDefine.viewControllerWithStoryboardID:',
                                args1: ['UGFeedBackController'],
                            },
                            true,
                        ]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.在线客服: {
                        function func1() {
                            return __awaiter(this, void 0, void 0, function () {
                                var urlStr, hasHost, hasScheme;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, OCHelper_1.OCHelper.call('UGSystemConfigModel.currentConfig.zxkfUrl.stringByTrim')];
                                        case 1:
                                            urlStr = _a.sent();
                                            if (!urlStr.length)
                                                return [2 /*return*/];
                                            return [4 /*yield*/, OCHelper_1.OCHelper.call('NSURL.URLWithString:.host.length', [urlStr])];
                                        case 2:
                                            hasHost = _a.sent();
                                            return [4 /*yield*/, OCHelper_1.OCHelper.call('NSURL.URLWithString:.scheme.length', [urlStr])
                                                // 补全URL
                                            ];
                                        case 3:
                                            hasScheme = _a.sent();
                                            // 补全URL
                                            if (!hasHost) {
                                                urlStr = AppDefine_1.default.host + urlStr;
                                            }
                                            else if (!hasScheme) {
                                                urlStr = 'http://' + urlStr;
                                            }
                                            OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                                                {
                                                    selectors: 'SLWebViewController.new[setUrlStr:]',
                                                    args1: [urlStr],
                                                },
                                                true,
                                            ]);
                                            return [2 /*return*/];
                                    }
                                });
                            });
                        }
                        func1();
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.活动彩金: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGMosaicGoldViewController.new' }, true]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.长龙助手: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGChangLongController.new' }, true]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.全民竞猜: {
                        OCHelper_1.OCHelper.call('HUDHelper.showMsg:', ['敬请期待']);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.开奖走势: {
                        RootNavigation_1.navigate(Navigation_1.PageName.TrendView, {});
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.QQ客服: {
                        OCHelper_1.OCHelper.call('UGSystemConfigModel.currentConfig.qqs').then(function (qqs) {
                            if (qqs === void 0) { qqs = []; }
                            if (!qqs.length) {
                                OCHelper_1.OCHelper.call('HUDHelper.showMsg:', ['敬请期待']);
                            }
                            else {
                                var btns = qqs.map(function (qq, idx) {
                                    return {
                                        text: "QQ\u5BA2\u670D" + (idx + 1) + "\uFF1A" + qq,
                                        onPress: function () {
                                            OCHelper_1.OCHelper.call('CMCommon.goQQ:', [qq]);
                                        },
                                    };
                                });
                                btns.push({ text: '取消', style: 'cancel' });
                                react_native_1.Alert.alert('请选择QQ客服', null, btns);
                            }
                        });
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.资金明细: {
                        PushHelper.pushCategory(7, 28);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.开奖网: {
                        this.openWebView(
                        //httpClient.defaults.baseURL + '/index2.php'
                        httpClient_1.httpClient.defaults.baseURL + '/open_prize/index.mobile.html?navhidden=1');
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.彩票大厅: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGLotteryHomeController.new' }, true]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.聊天室: {
                        this.pushCategory(9, null);
                        // OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGChatViewController.new' }, true]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.游戏大厅: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGYYLotteryHomeViewController.new' }, true]);
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.我的页: {
                        OCHelper_1.OCHelper.call('UGTabbarController.shared.mms').then(function (mms) {
                            var isOcPush = false;
                            mms.forEach(function (item, idx) {
                                if (item.path == '/user') {
                                    isOcPush = true;
                                    RootNavigation_1.popToRoot();
                                    OCHelper_1.OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [idx]);
                                }
                            });
                            if (!isOcPush) {
                                var rpm = SetRnPageInfo_1.RnPageModel.pages.filter(function (p) {
                                    return p.tabbarItemPath == '/user';
                                })[0];
                                if (rpm) {
                                    RootNavigation_1.push(rpm.rnName);
                                }
                                else {
                                    OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                                        {
                                            selectors: 'AppDefine.viewControllerWithStoryboardID:',
                                            args1: ['UGMineSkinViewController'],
                                        },
                                        true,
                                    ]);
                                }
                            }
                        });
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.开奖结果: {
                        OCHelper_1.OCHelper.call('UGNavigationController.current.pushViewController:animated:', [
                            {
                                selectors: 'AppDefine.viewControllerWithStoryboardID:',
                                args1: ['UGLotteryRecordController'],
                            },
                            true,
                        ]);
                        // OCHelper.call('UGNavigationController.current.pushViewController:animated:', [{ selectors: 'UGLotteryRecordController.new' }, true])
                        break;
                    }
                }
                break;
            case 'android':
                var subId = '';
                switch (code.toString()) {
                    case UGSysConfModel_1.UGUserCenterType.存款.toString(): {
                        subId = GotoDefine_1.MenuType.CZ;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.每日签到.toString(): {
                        subId = GotoDefine_1.MenuType.QD;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.取款.toString(): {
                        subId = GotoDefine_1.MenuType.TX;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.银行卡管理.toString(): {
                        subId = GotoDefine_1.MenuType.YHK;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.利息宝.toString(): {
                        subId = GotoDefine_1.MenuType.LXB;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.推荐收益.toString(): {
                        subId = GotoDefine_1.MenuType.SYTJ;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.彩票注单记录.toString(): {
                        subId = GotoDefine_1.MenuType.TZJL;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.其他注单记录.toString(): {
                        subId = GotoDefine_1.MenuType.QTZD;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.额度转换.toString(): {
                        subId = GotoDefine_1.MenuType.EDZH;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.站内信.toString(): {
                        subId = GotoDefine_1.MenuType.ZLX;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.安全中心.toString(): {
                        subId = GotoDefine_1.MenuType.AQZX;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.任务中心.toString(): {
                        subId = GotoDefine_1.MenuType.RWZX;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.个人信息.toString(): {
                        subId = GotoDefine_1.MenuType.HYZX;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.建议反馈.toString(): {
                        subId = GotoDefine_1.MenuType.TSZX;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.在线客服.toString(): {
                        subId = GotoDefine_1.MenuType.KF;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.活动彩金.toString(): {
                        subId = GotoDefine_1.MenuType.SQCJ;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.长龙助手.toString(): {
                        subId = GotoDefine_1.MenuType.CLZS;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.全民竞猜.toString(): {
                        subId = GotoDefine_1.MenuType.QMJC;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.开奖走势.toString(): {
                        ToastUtils_1.Toast('敬请期待');
                        return;
                    }
                    case UGSysConfModel_1.UGUserCenterType.QQ客服.toString(): {
                        subId = GotoDefine_1.MenuType.QQ;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.资金明细.toString(): {
                        subId = GotoDefine_1.MenuType.ZHGL;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.彩票大厅.toString(): {
                        subId = GotoDefine_1.MenuType.GCDT;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.聊天室.toString(): {
                        subId = GotoDefine_1.MenuType.LTS;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.游戏大厅.toString(): {
                        subId = GotoDefine_1.MenuType.GCDT;
                        break;
                    }
                    case UGSysConfModel_1.UGUserCenterType.我的页.toString(): {
                        subId = GotoDefine_1.MenuType.HYZX;
                        break;
                    }
                }
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.OPEN_NAVI_PAGE, {
                    seriesId: '7',
                    subId: subId,
                });
                break;
        }
    };
    return PushHelper;
}());
exports.default = PushHelper;
