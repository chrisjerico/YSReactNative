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
var react_1 = require("react");
var react_native_safe_area_context_1 = require("react-native-safe-area-context");
var react_native_fast_image_1 = require("react-native-fast-image");
var PushHelper_1 = require("../../public/define/PushHelper");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var Navigation_1 = require("../../public/navigation/Navigation");
var UGStore_1 = require("../../redux/store/UGStore");
var APIRouter_1 = require("../../public/network/APIRouter");
var react_native_elements_1 = require("react-native-elements");
var usePopUpView_1 = require("../../public/hooks/usePopUpView");
var UGUserModel_1 = require("../../redux/model/\u5168\u5C40/UGUserModel");
var AppDefine_1 = require("../../public/define/AppDefine");
var useGetHomeInfo_1 = require("../../public/hooks/useGetHomeInfo");
var hooks_1 = require("@react-native-community/hooks");
var useAutoReNewUserInfo_1 = require("../../public/hooks/useAutoReNewUserInfo");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var useMemberItems_1 = require("../../public/hooks/useMemberItems");
var useLoginOut_1 = require("../../public/hooks/useLoginOut");
var GDBMinePage = function (_a) {
    var navigation = _a.navigation;
    var _b = hooks_1.useDimensions().window, width = _b.width, height = _b.height;
    var onPopViewPress = usePopUpView_1.default().onPopViewPress;
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _c = userStore.uid, uid = _c === void 0 ? "" : _c;
    var systemStore = UGStore_1.UGStore.globalProps.sysConf;
    var _d = useGetHomeInfo_1.default(), banner = _d.banner, notice = _d.notice, homeGames = _d.homeGames, couponListData = _d.couponListData, rankList = _d.rankList, redBag = _d.redBag, floatAds = _d.floatAds, onlineNum = _d.onlineNum, loading = _d.loading;
    var _e = react_1.useState(), originalNoticeString = _e[0], setOriginalNoticeString = _e[1];
    var _f = react_1.useState(), noticeFormat = _f[0], setnoticeFormat = _f[1];
    var top = react_native_safe_area_context_1.useSafeArea().top;
    react_1.useEffect(function () {
        var _a, _b, _c;
        var string = "";
        var noticeData = (_c = (_b = (_a = notice === null || notice === void 0 ? void 0 : notice.data) === null || _a === void 0 ? void 0 : _a.scroll) === null || _b === void 0 ? void 0 : _b.map(function (res) {
            string += res.content;
            return { label: res.id, value: res.title };
        })) !== null && _c !== void 0 ? _c : [];
        setnoticeFormat(noticeData);
        setOriginalNoticeString(string);
    }, [notice]);
    var _g = useAutoReNewUserInfo_1.default(navigation);
    return (<react_native_fast_image_1.default source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/bg-black.png" }} style={{ width: width, height: height, }}>
      <react_native_1.ScrollView style={{ flex: 1, paddingHorizontal: 20, paddingTop: top }}>
        <react_native_1.View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
          <react_native_fast_image_1.default style={{ width: 66, height: 66, borderRadius: 33 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/2/images/money-2.png" }}/>
          <react_native_1.View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <react_native_1.Text style={{ color: "#a0a0a0", fontSize: 16, marginBottom: 10, fontWeight: "bold" }}>{userStore.curLevelTitle}</react_native_1.Text>
            <react_native_1.Text style={{ color: "#cfa461", fontSize: 12 }}>{userStore.curLevelGrade}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.每日签到);
    }}>
            <react_native_1.Image source={{ uri: "dailysign" }} style={{ height: 18, aspectRatio: 150 / 39 }}/>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
        <AcctountDetail />
        <react_native_1.View style={{ height: 50 }}></react_native_1.View>
      </react_native_1.ScrollView>
    </react_native_fast_image_1.default>);
};
var AcctountDetail = function () {
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _a = userStore.uid, uid = _a === void 0 ? "" : _a, _b = userStore.balance, balance = _b === void 0 ? 0 : _b;
    var _c = react_1.useState(false), hideAmount = _c[0], setHideAmount = _c[1];
    var requestBalance = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.user_balance_token()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_1 = _a.status;
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: { balance: data.data.balance } });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var testPlay = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_2, userInfo, error_2;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 11, , 12]);
                    OCHelper_1.OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
                    return [4 /*yield*/, APIRouter_1.default.user_guestLogin()];
                case 1:
                    _a = _c.sent(), data = _a.data, status_2 = _a.status;
                    if (!(react_native_1.Platform.OS == 'ios')) return [3 /*break*/, 10];
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay'])];
                case 2:
                    _c.sent();
                    //@ts-ignore
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel_1.default.getYS(data.data)])];
                case 3:
                    //@ts-ignore
                    _c.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd'])];
                case 4:
                    _c.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName'])];
                case 5:
                    _c.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw'])];
                case 6:
                    _c.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete'])];
                case 7:
                    _c.sent();
                    return [4 /*yield*/, OCHelper_1.OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true])];
                case 8:
                    _c.sent();
                    return [4 /*yield*/, APIRouter_1.default.user_info()];
                case 9:
                    userInfo = (_c.sent()).data;
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: userInfo === null || userInfo === void 0 ? void 0 : userInfo.data });
                    UGStore_1.UGStore.save();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
                    _c.label = 10;
                case 10: return [3 /*break*/, 12];
                case 11:
                    error_2 = _c.sent();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [(_b = error_2 === null || error_2 === void 0 ? void 0 : error_2.message) !== null && _b !== void 0 ? _b : '登入失败']);
                    console.log(error_2);
                    return [3 /*break*/, 12];
                case 12: return [2 /*return*/];
            }
        });
    }); };
    var getHideAmount = function () {
        var str = "";
        for (var index = 0; index < userStore.balance.length; index++) {
            var element = userStore.balance[index];
            str += "*";
        }
        return str;
    };
    var loginOut = useLoginOut_1.default(Navigation_1.PageName.GDBHomePage).loginOut;
    var width = hooks_1.useDimensions().screen.width;
    var UGUserCenterItem = useMemberItems_1.default().UGUserCenterItem;
    var _d = react_1.useState([]), centerItem = _d[0], setCenterItem = _d[1];
    react_1.useEffect(function () {
        if (UGUserCenterItem) {
            UGUserCenterItem.push({
                code: UGSysConfModel_1.UGUserCenterType.登出,
                logo: 'http://test05.6yc.com/views/mobileTemplate/18/images/logoout.png',
                name: '退出登录'
            });
            setCenterItem(UGUserCenterItem);
        }
    }, [UGUserCenterItem]);
    return (<react_native_1.View>


      <react_native_1.View style={{ width: "100%", backgroundColor: "#242424", borderRadius: 12, overflow: "hidden" }}>
        <react_native_1.View style={{ backgroundColor: "#242424", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: 20, paddingVertical: 10 }}>
          <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <react_native_1.Text style={{ fontSize: 12, color: "#676767" }}>账户余额</react_native_1.Text>
            <react_native_1.TouchableOpacity onPress={function () {
        setHideAmount(function (hideAmount) { return !hideAmount; });
    }}>
              <react_native_elements_1.Icon name={hideAmount ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={"rgba(255, 255, 255, 0.3)"} containerStyle={{ marginLeft: 15, marginRight: 4 }}/>
            </react_native_1.TouchableOpacity>
          </react_native_1.View>

          <react_native_1.Text style={{ fontSize: 27, color: "#cfa461" }}>{hideAmount ? getHideAmount() : userStore.balance}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={{ height: 38, backgroundColor: "#2a2a2a", paddingLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <react_native_1.TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.存款);
    }}>
            <react_native_fast_image_1.default style={{ width: 22, height: 22 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/chong%20Zhi.png" }}/>
            <react_native_1.Text style={{ color: '#cfa461', fontSize: 12, marginLeft: 3 }}>充值</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.取款);
    }}>
            <react_native_fast_image_1.default style={{ width: 22, height: 22 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/tiSian.png" }}/>
            <react_native_1.Text style={{ color: '#a0a0a0', fontSize: 12, marginLeft: 3 }}>提现</react_native_1.Text>
          </react_native_1.TouchableOpacity>

        </react_native_1.View>

      </react_native_1.View>
      <react_native_1.FlatList numColumns={3} renderItem={function (_a) {
        var item = _a.item;
        return <react_native_1.TouchableOpacity onPress={function () {
            if (item.code == UGSysConfModel_1.UGUserCenterType.登出) {
                loginOut();
            }
            else {
                PushHelper_1.default.pushUserCenterType(item.code);
            }
        }} style={{ width: (width - 20) / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 10, marginTop: 20 }}>
          <react_native_1.Image source={{ uri: item.logo }} style={{ width: 30, height: 30, tintColor: "gray" }}/>
          <react_native_1.Text style={{ color: '#a0a0a0', marginTop: 10, fontWeight: "bold", fontSize: 13 }}>{item.name}</react_native_1.Text>
        </react_native_1.TouchableOpacity>;
    }} data={centerItem} style={{ flex: 1, backgroundColor: "#242424", borderRadius: 12, marginTop: 10 }}/>
      <react_native_1.View style={{ height: 100 }}></react_native_1.View>
    </react_native_1.View>);
};
var FastImageAutoHeight = function (props) {
    var _a = react_1.useState(100), picHeight = _a[0], setPicHeight = _a[1];
    var _b = usePopUpView_1.default(), cardMargin = _b.cardMargin, marginHorizontal = _b.marginHorizontal;
    return (<react_native_fast_image_1.default {...props} style={[props.style, { height: picHeight }]} onLoad={function (e) {
        setPicHeight(((AppDefine_1.default.width - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height);
    }}/>);
};
var styles = react_native_1.StyleSheet.create({
    buttonContainer: {
        flex: 1,
        marginRight: 5,
    }
});
exports.default = GDBMinePage;
