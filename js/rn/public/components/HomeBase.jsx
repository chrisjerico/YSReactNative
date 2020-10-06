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
var react_1 = require("react");
var react_native_1 = require("react-native");
var RedBagItem_1 = require("./RedBagItem");
var useGetHomeInfo_1 = require("../hooks/useGetHomeInfo");
var react_native_fast_image_1 = require("react-native-fast-image");
var hooks_1 = require("@react-native-community/hooks");
var UGStore_1 = require("../../redux/store/UGStore");
var APIRouter_1 = require("../network/APIRouter");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var RootNavigation_1 = require("../navigation/RootNavigation");
var Navigation_1 = require("../navigation/Navigation");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var OCCall_1 = require("../define/OCHelper/OCBridge/OCCall");
var AppDefine_1 = require("../define/AppDefine");
var HomeBase = function (_a) {
    var header = _a.header, children = _a.children, backgroundSource = _a.backgroundSource, loginPage = _a.loginPage, backgroundColor = _a.backgroundColor, _b = _a.needPadding, needPadding = _b === void 0 ? true : _b, paddingHorizontal = _a.paddingHorizontal, marginTop = _a.marginTop, globalEvents = _a.globalEvents;
    var redBag = useGetHomeInfo_1.default(['activity_redBagDetail']).redBag;
    var _c = useGetHomeInfo_1.default(), loading = _c.loading, onRefresh = _c.onRefresh;
    var _d = hooks_1.useDimensions().screen, width = _d.width, height = _d.height;
    if (!backgroundSource) {
        return <react_native_1.View style={{ flex: 1, backgroundColor: backgroundColor }}>
      {header}
      <react_native_1.ScrollView refreshControl={<react_native_1.RefreshControl style={{ backgroundColor: '#00000000' }} tintColor={'white'} refreshing={loading} onRefresh={onRefresh}/>} style={{ flex: 1, paddingHorizontal: needPadding ? paddingHorizontal ? paddingHorizontal : 10 : 0, marginTop: marginTop ? marginTop : 0 }}>
        <react_native_1.View style={{ flex: 1, justifyContent: 'center' }}>
          {children}
        </react_native_1.View>
      </react_native_1.ScrollView>
      <RedBagItem_1.default loginPage={loginPage} redBag={redBag}/>
      <TurntableListItem />
    </react_native_1.View>;
    }
    else {
        return <react_native_fast_image_1.default source={backgroundSource} style={{ width: width, height: height }}>
      {header}
      <react_native_1.ScrollView refreshControl={<react_native_1.RefreshControl style={{ backgroundColor: '#00000000' }} tintColor={'white'} refreshing={loading} onRefresh={onRefresh}/>} style={{ flex: 1, paddingHorizontal: 10, }}>
        <react_native_1.View style={{ flex: 1, justifyContent: 'center' }}>
          {children}
        </react_native_1.View>
      </react_native_1.ScrollView>
      <RedBagItem_1.default loginPage={loginPage} redBag={redBag}/>
      <TurntableListItem />
      {globalEvents}
    </react_native_fast_image_1.default>;
    }
};
var TurntableListItem = function () {
    var _a = hooks_1.useDimensions().screen, width = _a.width, height = _a.height;
    var _b = UGStore_1.UGStore.globalProps.userInfo, _c = _b.isTest, isTest = _c === void 0 ? false : _c, _d = _b.uid, uid = _d === void 0 ? "" : _d;
    var _e = react_1.useState(false), turntableListVisiable = _e[0], setTurntableListVisiable = _e[1];
    var _f = react_1.useState(), turntableList = _f[0], setTurntableList = _f[1];
    react_1.useEffect(function () {
        if (turntableList && turntableList != null) {
            setTurntableListVisiable(true);
        }
    }, [turntableList]);
    var getTurntableList = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.activity_turntableList()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_1 = _a.status;
                    setTurntableList(data.data);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        if (uid != "") {
            getTurntableList();
        }
    }, [uid]);
    if (turntableListVisiable) {
        return (<react_native_gesture_handler_1.TouchableWithoutFeedback onPress={function () {
            if (uid == "") {
                react_native_1.Alert.alert("温馨提示", "您还未登录", [
                    { text: "取消", onPress: function () { }, style: "cancel" },
                    {
                        text: "马上登录", onPress: function () {
                            RootNavigation_1.navigate(Navigation_1.PageName.ZLLoginPage, {});
                        },
                    }
                ]);
            }
            else if (isTest) {
                react_native_1.Alert.alert("温馨提示", "请先登录您的正式帐号", [
                    { text: "取消", onPress: function () { }, style: "cancel" },
                    {
                        text: "马上登录", onPress: function () {
                            RootNavigation_1.navigate(Navigation_1.PageName.ZLLoginPage, {});
                        },
                    }
                ]);
            }
            else {
                var turntableListModel_1 = Object.assign({ clsName: 'DZPModel' }, turntableList === null || turntableList === void 0 ? void 0 : turntableList[0]);
                switch (react_native_1.Platform.OS) {
                    case 'ios':
                        OCHelper_1.OCHelper.call(function (_a) {
                            var vc = _a.vc;
                            return ({
                                vc: {
                                    selectors: 'DZPMainView.alloc.initWithFrame:[setItem:]',
                                    args1: [OCCall_1.NSValue.CGRectMake(100, 100, AppDefine_1.default.width - 60, AppDefine_1.default.height - 60),],
                                    args2: [turntableListModel_1]
                                },
                                ret: {
                                    selectors: 'SGBrowserView.showMoveView:yDistance:',
                                    args1: [vc, 100],
                                },
                            });
                        });
                        break;
                    case 'android':
                        //TODO
                        break;
                }
            }
        }}>
        <react_native_1.ImageBackground style={{ width: 95, height: 95, position: 'absolute', top: height / 2, right: 20 }} source={{ uri: "dzp_btn" }}>
          <react_native_gesture_handler_1.TouchableWithoutFeedback onPress={function () {
            setTurntableListVisiable(false);
        }}>
            <react_native_1.Image style={{ width: 20, height: 20, right: 0, top: 0, position: 'absolute' }} source={{ uri: "dialog_close" }}/>
          </react_native_gesture_handler_1.TouchableWithoutFeedback>
        </react_native_1.ImageBackground>
      </react_native_gesture_handler_1.TouchableWithoutFeedback>);
    }
    else {
        return null;
    }
};
exports.default = HomeBase;
