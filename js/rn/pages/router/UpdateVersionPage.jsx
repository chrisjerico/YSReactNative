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
exports.UpdateVersionPage = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_code_push_1 = require("react-native-code-push");
var Progress = require("react-native-progress");
var ANHelper_1 = require("../../public/define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../public/define/ANHelper/hp/CmdDefine");
var DataDefine_1 = require("../../public/define/ANHelper/hp/DataDefine");
var AppDefine_1 = require("../../public/define/AppDefine");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var SetRnPageInfo_1 = require("../../public/define/OCHelper/SetRnPageInfo");
var UGSkinManagers_1 = require("../../public/theme/UGSkinManagers");
var Ext_1 = require("../../public/tools/Ext");
var UGStore_1 = require("../../redux/store/UGStore");
exports.UpdateVersionPage = function (props) {
    var setProps = props.setProps, _a = props.progress, progress = _a === void 0 ? 0 : _a, _b = props.text, text = _b === void 0 ? '正在努力更新中...' : _b, _c = props.bCodePush, bCodePush = _c === void 0 ? false : _c, _d = props.bBanner, bBanner = _d === void 0 ? false : _d;
    react_1.useEffect(function () {
        console.log('OCHelper.CodePushKey = ', OCHelper_1.OCHelper.CodePushKey);
        var options = {};
        switch (react_native_1.Platform.OS) {
            case 'ios':
                options = {
                    deploymentKey: OCHelper_1.OCHelper.CodePushKey,
                    /*
                   * installMode (codePush.InstallMode)： 安装模式，用在向CodePush推送更新时没有设置强制更新(mandatory为true)的情况下，默认codePush.InstallMode.ON_NEXT_RESTART 即下一次启动的时候安装。
                   * 在更新配置中通过指定installMode来决定安装完成的重启时机，亦即更新生效时机
                     codePush.InstallMode.IMMEDIATE：表示安装完成立即重启更新(强制更新安装模式)
                     codePush.InstallMode.ON_NEXT_RESTART：表示安装完成后会在下次重启后进行更新
                     codePush.InstallMode.ON_NEXT_RESUME：表示安装完成后会在应用进入后台后重启更新
                   *
                   * 强制更新模式(单独的抽出来设置 强制安装)
                   * mandatoryInstallMode (codePush.InstallMode):强制更新,默认codePush.InstallMode.IMMEDIATE
                   *
                   * minimumBackgroundDuration (Number):该属性用于指定app处于后台多少秒才进行重启已完成更新。默认为0。该属性只在installMode为InstallMode.ON_NEXT_RESUME情况下有效
                   *
                   * */
                    installMode: react_native_code_push_1.default.InstallMode.IMMEDIATE,
                };
                break;
            case 'android':
                options = {
                    /*
                   * installMode (codePush.InstallMode)： 安装模式，用在向CodePush推送更新时没有设置强制更新(mandatory为true)的情况下，默认codePush.InstallMode.ON_NEXT_RESTART 即下一次启动的时候安装。
                   * 在更新配置中通过指定installMode来决定安装完成的重启时机，亦即更新生效时机
                     codePush.InstallMode.IMMEDIATE：表示安装完成立即重启更新(强制更新安装模式)
                     codePush.InstallMode.ON_NEXT_RESTART：表示安装完成后会在下次重启后进行更新
                     codePush.InstallMode.ON_NEXT_RESUME：表示安装完成后会在应用进入后台后重启更新
                   *
                   * 强制更新模式(单独的抽出来设置 强制安装)
                   * mandatoryInstallMode (codePush.InstallMode):强制更新,默认codePush.InstallMode.IMMEDIATE
                   *
                   * minimumBackgroundDuration (Number):该属性用于指定app处于后台多少秒才进行重启已完成更新。默认为0。该属性只在installMode为InstallMode.ON_NEXT_RESUME情况下有效
                   *
                   * */
                    installMode: react_native_code_push_1.default.InstallMode.IMMEDIATE,
                };
                break;
        }
        react_native_code_push_1.default.sync(options, function (status) {
            var isNewest = false;
            switch (status) {
                case react_native_code_push_1.default.SyncStatus.SYNC_IN_PROGRESS:
                    console.log('当前已经在更新了，无须重复执行');
                    break;
                case react_native_code_push_1.default.SyncStatus.CHECKING_FOR_UPDATE:
                    console.log('rn正在查找可用的更新');
                    break;
                case react_native_code_push_1.default.SyncStatus.AWAITING_USER_ACTION:
                    console.log('rn弹了框让用户自己选择是否要更新');
                    break;
                case react_native_code_push_1.default.SyncStatus.UPDATE_IGNORED:
                    console.log('rn忽略此热更新');
                    isNewest = true;
                    break;
                case react_native_code_push_1.default.SyncStatus.UP_TO_DATE:
                    console.log('rn已是最新版本');
                    isNewest = true;
                    break;
                case react_native_code_push_1.default.SyncStatus.DOWNLOADING_PACKAGE:
                    console.log('rn正在下载热更新');
                    break;
                case react_native_code_push_1.default.SyncStatus.INSTALLING_UPDATE:
                    console.log('rn正在安装热更新');
                    break;
                case react_native_code_push_1.default.SyncStatus.UNKNOWN_ERROR:
                    console.log('rn热更新出错❌');
                    break;
                case react_native_code_push_1.default.SyncStatus.UPDATE_INSTALLED:
                    console.log('rn热更新安装成功，正在重启RN');
                    return;
            }
            if (isNewest) {
                setProps({ progress: 1, text: '正在进入主页...' });
                switch (react_native_1.Platform.OS) {
                    case 'ios':
                        OCHelper_1.OCHelper.call('UGSystemConfigModel.currentConfig').then(function (sysConf) {
                            initConfig(sysConf);
                        });
                        break;
                    case 'android':
                        ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.LOAD_DATA, { key: DataDefine_1.NA_DATA.CONFIG }).then(function (config) {
                            initConfig(JSON.parse(config));
                        });
                        break;
                }
            }
        }, function (progress) {
            var p = progress.receivedBytes / progress.totalBytes;
            setProps({ progress: p });
            console.log('rn热更新包下载进度：' + p);
        });
        // 超时时间20秒
        var timer = setTimeout(function () {
            clearTimeout(timer);
            switch (react_native_1.Platform.OS) {
                case 'ios':
                    OCHelper_1.OCHelper.launchFinish();
                    break;
                case 'android':
                    ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.LAUNCH_GO);
                    break;
            }
        }, 20000);
        setProps({
            navbarOpstions: { hidden: true },
            tabbarOpetions: { unmountOnBlur: false },
        });
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.arrayForKey:', ['LaunchPics']).then(function (pics) {
                    if (pics && pics.length) {
                        setProps({ backgroundImage: pics[0] });
                    }
                });
                break;
            case 'android':
                ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.LOAD_DATA, { key: DataDefine_1.NA_DATA.LAUNCH_PICS }).then(function (picStr) {
                    if (!Ext_1.anyEmpty(picStr)) {
                        var pics_1 = JSON.parse(picStr);
                        if (!Ext_1.arrayEmpty(pics_1)) {
                            setProps({ backgroundImage: pics_1.shift() });
                            //暂时不轮播，直接清空
                            pics_1 = [];
                            //定时器显示图片
                            var tempInterval_1 = setInterval(function () {
                                if (Ext_1.arrayEmpty(pics_1)) {
                                    clearInterval(tempInterval_1);
                                    setProps({ bBanner: true });
                                }
                                else {
                                    setProps({ backgroundImage: pics_1.shift() });
                                }
                            }, 2500);
                        }
                        else {
                            setProps({ bBanner: true });
                        }
                    }
                });
        }
        return function () {
            clearTimeout(timer);
        };
    }, []);
    react_1.useEffect(function () {
        // ugLog('bCodePush=', bCodePush, ', bBanner=', bBanner)
        switch (react_native_1.Platform.OS) {
            case 'ios':
                break;
            case 'android':
                bCodePush && bBanner && ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.LAUNCH_GO);
                break;
        }
    }, [bCodePush, bBanner]);
    var initConfig = function (sysConf) { return __awaiter(void 0, void 0, void 0, function () {
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    UGStore_1.UGStore.dispatch({ type: 'merge', sysConf: sysConf });
                    sysConf = UGStore_1.UGStore.globalProps.sysConf;
                    _a = react_native_1.Platform.OS;
                    switch (_a) {
                        case 'ios': return [3 /*break*/, 1];
                        case 'android': return [3 /*break*/, 4];
                    }
                    return [3 /*break*/, 5];
                case 1:
                    console.log('初始化RN模板', '替换原生页面');
                    // 设置皮肤
                    return [4 /*yield*/, UGSkinManagers_1.default.updateSkin(sysConf)
                        // 配置替换rn的页面
                    ];
                case 2:
                    // 设置皮肤
                    _b.sent();
                    // 配置替换rn的页面
                    SetRnPageInfo_1.setRnPageInfo();
                    // 通知iOS进入首页
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('ReactNativeVC.showLastRnPage')];
                case 3:
                    // 通知iOS进入首页
                    _b.sent();
                    OCHelper_1.OCHelper.launchFinish();
                    return [3 /*break*/, 5];
                case 4:
                    setProps({ bCodePush: true });
                    return [3 /*break*/, 5];
                case 5:
                    UGStore_1.UGStore.save();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.View style={{ flex: 1, justifyContent: 'flex-end' }}>
      <react_native_1.View style={{ marginHorizontal: 15, paddingHorizontal: 15, backgroundColor: '#0000003f', height: 70, marginBottom: 300, borderRadius: 20 }}>
        <react_native_1.Text style={{ marginTop: 24, color: '#fff', fontWeight: '500' }}>{text}</react_native_1.Text>
        <Progress.Bar progress={progress} borderWidth={0} borderRadius={2} unfilledColor="#aaa" color="white" height={4} width={AppDefine_1.default.width - 60} style={{ marginTop: 10 }}/>
      </react_native_1.View>
    </react_native_1.View>);
};
