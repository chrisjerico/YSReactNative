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
var hooks_1 = require("@react-native-community/hooks");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var react_native_fast_image_1 = require("react-native-fast-image");
var UGStore_1 = require("../../../redux/store/UGStore");
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
var Navigation_1 = require("../../../public/navigation/Navigation");
var OCHelper_1 = require("../../../public/define/OCHelper/OCHelper");
var APIRouter_1 = require("../../../public/network/APIRouter");
var UGUserModel_1 = require("../../../redux/model/\u5168\u5C40/UGUserModel");
var PushHelper_1 = require("../../../public/define/PushHelper");
var UGSysConfModel_1 = require("../../../redux/model/\u5168\u5C40/UGSysConfModel");
var OCCall_1 = require("../../../public/define/OCHelper/OCBridge/OCCall");
var AppDefine_1 = require("../../../public/define/AppDefine");
var Header = function () {
    var width = hooks_1.useDimensions().screen.width;
    var top = react_native_safe_area_context_1.useSafeArea().top;
    var mobile_logo = UGStore_1.UGStore.globalProps.sysConf.mobile_logo;
    var _a = UGStore_1.UGStore.globalProps.userInfo.uid, uid = _a === void 0 ? "" : _a;
    var testPlay = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_1, userInfo, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 11, , 12]);
                    return [4 /*yield*/, APIRouter_1.default.user_guestLogin()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_1 = _a.status;
                    if (!(react_native_1.Platform.OS == 'ios')) return [3 /*break*/, 10];
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay'])];
                case 2:
                    _b.sent();
                    //@ts-ignore
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel_1.default.getYS(data.data)])];
                case 3:
                    //@ts-ignore
                    _b.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd'])];
                case 4:
                    _b.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName'])];
                case 5:
                    _b.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw'])];
                case 6:
                    _b.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete'])];
                case 7:
                    _b.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true])];
                case 8:
                    _b.sent();
                    return [4 /*yield*/, APIRouter_1.default.user_info()];
                case 9:
                    userInfo = (_b.sent()).data;
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: userInfo === null || userInfo === void 0 ? void 0 : userInfo.data });
                    UGStore_1.UGStore.save();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
                    _b.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_1 = _b.sent();
                    console.log(error_1);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    }); };
    return (<react_native_1.View style={{ width: width, height: 45 }}>
      <react_native_1.View style={{ height: top, width: width }}></react_native_1.View>
      {uid != "" ? <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10 }}>
        <react_native_fast_image_1.default resizeMode={"contain"} style={{ width: 130, height: 36, marginLeft: 30 }} source={{ uri: mobile_logo }}/>
        <react_native_1.View style={{ borderColor: 'rgba(100,111,149,0.5)', paddingVertical: 7, borderRadius: 4, flexDirection: 'row', paddingHorizontal: 7, position: 'absolute', right: 10 }}>
          <react_native_1.View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <react_native_1.TouchableWithoutFeedback onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.站内信);
    }}>
              <react_native_fast_image_1.default resizeMode={'contain'} style={{ width: 33, height: 33 }} source={{ uri: "http://test24.6yc.com/images/icon-message-24.png" }}/>
            </react_native_1.TouchableWithoutFeedback>
            <react_native_1.TouchableWithoutFeedback onPress={function () {
        OCHelper_1.OCHelper.call('UGYYRightMenuView.alloc.initWithFrame:[setTitleType:].show', [OCCall_1.NSValue.CGRectMake(AppDefine_1.default.width / 2, 0, AppDefine_1.default.width / 2, AppDefine_1.default.height), "1"]);
    }}>
              <react_native_fast_image_1.default resizeMode={'contain'} style={{ width: 33, height: 33 }} source={{ uri: "http://test24.6yc.com/views/mobileTemplate/26/images/menu24.png" }}/>
            </react_native_1.TouchableWithoutFeedback>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View> : <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10 }}>

          <react_native_fast_image_1.default resizeMode={"contain"} style={{ width: 130, height: 36, marginLeft: 30 }} source={{ uri: mobile_logo }}/>
          <react_native_1.View style={{ borderWidth: 1, borderColor: 'rgba(100,111,149,0.5)', paddingVertical: 7, borderRadius: 4, flexDirection: 'row', paddingHorizontal: 7, position: 'absolute', right: 10 }}>
            <react_native_1.Text onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.VietnamLogin);
    }} style={{ color: "#646f95" }}>登录<react_native_1.Text>/</react_native_1.Text></react_native_1.Text>
            <react_native_1.Text onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.VietnamRegister);
    }} style={{ color: "#646f95" }}>注册<react_native_1.Text>/</react_native_1.Text></react_native_1.Text>
            <react_native_1.Text onPress={testPlay} style={{ color: "#646f95" }}>试玩</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>}

    </react_native_1.View>);
};
exports.default = Header;
