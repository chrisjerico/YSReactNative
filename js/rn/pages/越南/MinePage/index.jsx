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
var react_native_elements_1 = require("react-native-elements");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var hooks_1 = require("@react-native-community/hooks");
var UGStore_1 = require("../../../redux/store/UGStore");
var useLoginOut_1 = require("../../../public/hooks/useLoginOut");
var useMemberItems_1 = require("../../../public/hooks/useMemberItems");
var Navigation_1 = require("../../../public/navigation/Navigation");
var OCHelper_1 = require("../../../public/define/OCHelper/OCHelper");
var APIRouter_1 = require("../../../public/network/APIRouter");
var PushHelper_1 = require("../../../public/define/PushHelper");
var UGSysConfModel_1 = require("../../../redux/model/\u5168\u5C40/UGSysConfModel");
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
var MinePage = function (_a) {
    var navigation = _a.navigation;
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var width = hooks_1.useDimensions().window.width;
    var _b = userStore.uid, uid = _b === void 0 ? "" : _b, curLevelTitle = userStore.curLevelTitle, usr = userStore.usr, balance = userStore.balance, unreadMsg = userStore.unreadMsg;
    var loginOut = useLoginOut_1.default(Navigation_1.PageName.ZLHomePage).loginOut;
    var UGUserCenterItem = useMemberItems_1.default().UGUserCenterItem;
    var requestBalance = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_1, error_1;
        var _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, , 3]);
                    OCHelper_1.OCHelper.call('SVProgressHUD.showWithStatus:', ['正在刷新金额...']);
                    return [4 /*yield*/, APIRouter_1.default.user_balance_token()];
                case 1:
                    _a = _c.sent(), data = _a.data, status_1 = _a.status;
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: { balance: data.data.balance } });
                    OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['刷新成功！']);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _c.sent();
                    OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [(_b = error_1 === null || error_1 === void 0 ? void 0 : error_1.message) !== null && _b !== void 0 ? _b : '刷新失败请稍后再试']);
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        navigation.addListener('focus', function () { return __awaiter(void 0, void 0, void 0, function () {
            var userInfo;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, APIRouter_1.default.user_info()];
                    case 1:
                        userInfo = (_a.sent()).data;
                        UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: userInfo === null || userInfo === void 0 ? void 0 : userInfo.data });
                        UGStore_1.UGStore.save();
                        return [2 /*return*/];
                }
            });
        }); });
        return (function () {
            navigation.removeListener('focus', null);
        });
    }, []);
    return <react_native_1.View style={{ flex: 1, backgroundColor: 'white' }}>
    <Header />
    <react_native_1.ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <react_native_1.View style={{
        width: width - 24, marginBottom: 10, backgroundColor: 'white',
        alignSelf: 'center', borderRadius: 8, shadowColor: "#444",
        minHeight: 130,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        paddingVertical: 7,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        marginTop: 10
    }}>
        <react_native_1.View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 33, borderBottomColor: "#f2f2f2", borderBottomWidth: 1, alignItems: 'flex-end', paddingBottom: 10 }}>
          <react_native_fast_image_1.default style={{ width: 63, height: 63, borderRadius: 63 / 2, marginRight: 11 }} source={{ uri: "http://test24.6yc.com/views/mobileTemplate/2/images/money-2.png" }}/>
          <react_native_1.View style={{ flexDirection: 'column' }}>
            <react_native_1.Text style={{ fontWeight: "bold", fontSize: 21 }}>龘{usr}</react_native_1.Text>
            <react_native_linear_gradient_1.default start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: 52, height: 27, justifyContent: 'center', alignItems: 'center' }} colors={['#d5b69d', '#eddbcd']}>
              <react_native_1.Text style={{ fontSize: 16, color: 'white' }}>{curLevelTitle}</react_native_1.Text>
            </react_native_linear_gradient_1.default>
          </react_native_1.View>

        </react_native_1.View>
        <react_native_1.View style={{ flex: 1, paddingHorizontal: 6, flexDirection: 'row', alignItems: 'center' }}>
          <react_native_1.View style={{ flex: 1 }}>
            <react_native_1.Text style={{ color: "#8e8e93", marginTop: 10 }}>余额（元）</react_native_1.Text>
            <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <react_native_1.Text style={{ fontSize: 14, color: '#fb9802', marginRight: 3, fontWeight: "bold" }}> {parseFloat(balance).toFixed(2)}</react_native_1.Text>
              <react_native_gesture_handler_1.TouchableWithoutFeedback onPress={requestBalance}>
                <react_native_elements_1.Icon name="refresh" type="materialIcon" color="#8c9ba7" size={24}/>
              </react_native_gesture_handler_1.TouchableWithoutFeedback>
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.View style={{ height: "80%", backgroundColor: "#f2f2f2", width: 1, marginRight: 10 }}></react_native_1.View>
          <react_native_1.View style={{ flex: 1, alignItems: 'flex-start' }}>
            <react_native_1.Text style={{ color: "#8e8e93", marginTop: 10 }}>積分</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.View style={{
        width: width - 24, marginBottom: 10, backgroundColor: 'white',
        alignSelf: 'center', borderRadius: 8, shadowColor: "#444",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        paddingVertical: 10,
        shadowOffset: {
            height: 0,
            width: 0,
        },
    }}>
        <react_native_1.View style={{ flex: 1, flexDirection: 'row', marginVertical: 10 }}>
          <react_native_1.TouchableOpacity onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.利息宝);
    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <react_native_fast_image_1.default style={{ width: 34, height: 34 }} source={{ uri: "http://test24.6yc.com/views/mobileTemplate/26/images/tgzq.png" }}/>
            <react_native_1.Text style={{ color: '#333333', fontSize: 14, marginTop: 3, }}>掙錢</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.存款);
    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <react_native_fast_image_1.default style={{ width: 34, height: 34 }} source={{ uri: "http://test24.6yc.com/views/mobileTemplate/26/images/cqk.png" }}/>
            <react_native_1.Text style={{ color: '#333333', fontSize: 14, marginTop: 3, }}>存款</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity onPress={loginOut} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <react_native_fast_image_1.default style={{ width: 34, height: 34 }} source={{ uri: "http://test24.6yc.com/views/mobileTemplate/26/images/tx.png" }}/>
            <react_native_1.Text style={{ color: '#333333', fontSize: 14, marginTop: 3, }}>退出登录</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.银行卡管理);
    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <react_native_fast_image_1.default style={{ width: 34, height: 34 }} source={{ uri: "http://test24.6yc.com/views/mobileTemplate/26/images/yhk.png" }}/>
            <react_native_1.Text style={{ color: '#333333', fontSize: 14, marginTop: 3, }}>銀行卡</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.View>
      
      <react_native_1.FlatList style={{ overflow: "visible", width: width - 24, alignSelf: 'center', }} contentContainerStyle={{
        marginBottom: 100, backgroundColor: 'white',
        alignSelf: 'center', borderRadius: 8, shadowColor: "#444",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
            height: 0,
            width: 0,
        },
        paddingHorizontal: 10,
        paddingLeft: 13,
        width: width - 24,
    }} renderItem={function (_a) {
        var item = _a.item;
        return (<react_native_1.TouchableOpacity onPress={function () {
            PushHelper_1.default.pushUserCenterType(item.code);
        }} style={{ height: 51, borderBottomWidth: 1, borderBottomColor: "#f2f2f2" }}>
            <react_native_1.View style={{ alignItems: 'center', flexDirection: 'row', height: 51, }}>
              <react_native_fast_image_1.default resizeMode={'contain'} style={{ width: 22 * 1.2, height: 17.5 * 1.2, tintColor: 'white', overflow: "visible", marginRight: 18 }} source={{ uri: item.logo }}>
                {item.code == 9 && unreadMsg > 0 ? <react_native_1.View style={{
            position: 'absolute', right: 0, top: 0, backgroundColor: 'red',
            height: 10, width: 10,
            borderRadius: 5, justifyContent: 'center', alignItems: 'center'
        }}>
                  <react_native_1.Text style={{ color: 'white', fontSize: 10 }}>{unreadMsg}</react_native_1.Text>
                </react_native_1.View> : null}
              </react_native_fast_image_1.default>
              <react_native_1.Text style={{ color: '#47535b' }}>{item.name}</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.TouchableOpacity>);
    }} data={UGUserCenterItem}/>
    </react_native_1.ScrollView>
  </react_native_1.View>;
};
var Header = function () {
    var top = react_native_safe_area_context_1.useSafeArea().top;
    return (<react_native_1.View>
      <react_native_1.View style={{ height: top }}></react_native_1.View>
      <react_native_1.View style={{ height: 45, backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
        <react_native_1.TouchableOpacity style={{ position: 'absolute', left: 15 }} onPress={function () {
        RootNavigation_1.pop();
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
                break;
            case 'android':
                break;
        }
    }}>
          <react_native_elements_1.Icon name='ios-arrow-back' type="ionicon" color="rgba(142, 142, 147,1)" size={30}/>
        </react_native_1.TouchableOpacity>
        <react_native_1.Text style={{ color: 'black', fontSize: 20, fontWeight: "bold" }}>我的页</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>);
};
exports.default = MinePage;
