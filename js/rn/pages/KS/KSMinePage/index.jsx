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
var Navigation_1 = require("../../../public/navigation/Navigation");
var useLoginOut_1 = require("../../../public/hooks/useLoginOut");
var useMemberItems_1 = require("../../../public/hooks/useMemberItems");
var OCHelper_1 = require("../../../public/define/OCHelper/OCHelper");
var APIRouter_1 = require("../../../public/network/APIRouter");
var UGSysConfModel_1 = require("../../../redux/model/\u5168\u5C40/UGSysConfModel");
var PushHelper_1 = require("../../../public/define/PushHelper");
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
var UGLoadingCP_1 = require("../../../public/widget/UGLoadingCP");
var ToastUtils_1 = require("../../../public/tools/ToastUtils");
var KSMine = function (_a) {
    var navigation = _a.navigation;
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var width = hooks_1.useDimensions().window.width;
    var _b = userStore.uid, uid = _b === void 0 ? "" : _b, curLevelTitle = userStore.curLevelTitle, usr = userStore.usr, balance = userStore.balance, unreadMsg = userStore.unreadMsg;
    var _c = react_1.useState(), infoModel = _c[0], setInfoModel = _c[1];
    var loginOut = useLoginOut_1.default(Navigation_1.PageName.KSHomePage).loginOut;
    var UGUserCenterItem = useMemberItems_1.default().UGUserCenterItem;
    var requestBalance = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_1, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    UGLoadingCP_1.showLoading({ type: UGLoadingCP_1.UGLoadingType.Loading, text: '正在刷新金额...' });
                    return [4 /*yield*/, APIRouter_1.default.user_balance_token()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_1 = _a.status;
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: { balance: data.data.balance } });
                    // OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['刷新成功！']);
                    ToastUtils_1.Toast('刷新成功！');
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    ToastUtils_1.Toast('刷新失败请稍后再试！');
                    // OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '刷新失败请稍后再试']);
                    console.log(error_1);
                    return [3 /*break*/, 3];
                case 3:
                    UGLoadingCP_1.hideLoading();
                    return [2 /*return*/];
            }
        });
    }); };
    var init = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status_2, error_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.yuebao_stat()];
                case 1:
                    _a = _b.sent(), data = _a.data, status_2 = _a.status;
                    setInfoModel(data);
                    return [3 /*break*/, 3];
                case 2:
                    error_2 = _b.sent();
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        init();
    }, [userStore === null || userStore === void 0 ? void 0 : userStore.uid]);
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
    return <react_native_1.View style={{ flex: 1, backgroundColor: 'black' }}>
    <Header />
    <react_native_1.ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <react_native_linear_gradient_1.default start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#eb5d4d", "#fb2464"]} style={{ width: "100%", backgroundColor: "#2c2e36", borderRadius: 8, overflow: "hidden", flexDirection: 'column', marginBottom: 10, paddingBottom: 20 }}>
        <react_native_1.View>
          <react_native_1.Text style={{ fontSize: 22, color: 'white', marginTop: 10, marginLeft: 10, marginRight: 20 }}>{usr}</react_native_1.Text>
          <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, justifyContent: 'space-between' }}>
            <react_native_1.View style={{ flexDirection: 'row' }}>
              <react_native_fast_image_1.default style={{ width: 26, height: 26 }} source={{ uri: "http://test60f.fhptcdn.com/views/mobileTemplate/22/images/touxiang.png" }}/>
              <react_native_1.Text style={{ marginLeft: 10, color: 'white', fontSize: 15 }}>{userStore.curLevelGrade}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={{ flexDirection: 'column' }}>
              <react_native_1.TouchableOpacity style={{ marginBottom: 10 }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.任务中心);
    }}>
                <react_native_1.Image source={{ uri: "missionhall" }} style={{ height: 18, aspectRatio: 150 / 39 }}/>
              </react_native_1.TouchableOpacity>
              <react_native_1.TouchableOpacity onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.每日签到);
    }}>
                <react_native_1.Image source={{ uri: "dailysign" }} style={{ height: 18, aspectRatio: 150 / 39 }}/>
              </react_native_1.TouchableOpacity>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.View style={{ flexDirection: 'row', marginTop: 30 }}>
          <react_native_1.TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.个人信息);
    }}>
            <react_native_1.View style={{ flexDirection: 'row' }}>
              <react_native_elements_1.Icon type={'font-awesome'} name={"address-card-o"} size={15} color={'white'}/>
              <react_native_1.Text style={{ color: 'white', marginLeft: 5 }}>实名认证</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.安全中心);
    }}>
            <react_native_1.View style={{ flexDirection: 'row' }}>
              <react_native_elements_1.Icon type={'font-awesome'} name={"check-square-o"} size={15} color={'white'}/>

              <react_native_1.Text style={{ color: 'white', marginLeft: 5 }}>账户安全</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.银行卡管理);
    }}>
            <react_native_1.View style={{ flexDirection: 'row' }}>
              <react_native_elements_1.Icon type={'font-awesome'} name={"credit-card"} size={15} color={'white'}/>

              <react_native_1.Text style={{ color: 'white', marginLeft: 5 }}>银行卡管理</react_native_1.Text>
            </react_native_1.View>


          </react_native_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_linear_gradient_1.default>
      <react_native_linear_gradient_1.default colors={["#3a3a41"]} start={{ x: 0.5, y: 0.6 }} style={{ height: 80, width: "100%", backgroundColor: "#2c2e36", borderRadius: 8, overflow: "hidden", paddingVertical: 15 }}>
        <react_native_1.View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', marginHorizontal: 10, }}>
          <react_native_1.Text style={{ fontSize: 16, color: 'white', fontWeight: "bold", marginBottom: 10 }}>总资产</react_native_1.Text>
          <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <react_native_fast_image_1.default style={{ width: 25, aspectRatio: 1 }} source={{ uri: "http://test60f.fhptcdn.com/views/mobileTemplate/22/images/yuanIcon.png" }}/>
            <react_native_1.Text style={{ fontSize: 22, color: 'white', marginRight: 20, marginLeft: 10 }}> {balance}</react_native_1.Text>
            <react_native_gesture_handler_1.TouchableWithoutFeedback onPress={requestBalance}>
              <react_native_elements_1.Icon name="refresh" type="materialIcon" color="#8c9ba7" size={24}/>
            </react_native_gesture_handler_1.TouchableWithoutFeedback>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_linear_gradient_1.default>
      <react_native_1.View style={{ flex: 1, flexDirection: 'row', marginTop: 15, marginBottom: 10 }}>
        <react_native_1.TouchableOpacity onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.存款);
    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginRight: 10 }}>
          <react_native_linear_gradient_1.default style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 62, borderRadius: 8 }} colors={['#eb5d4d', "#fb7a24"]}>
            <react_native_fast_image_1.default style={{ width: 27, height: 20 }} resizeMode={'contain'} source={{ uri: "http://test60f.fhptcdn.com/views/mobileTemplate/22/images/depositlogo.png" }}/>
            <react_native_1.Text style={{ color: 'white', fontSize: 14 }}> 存款</react_native_1.Text>
          </react_native_linear_gradient_1.default>
        </react_native_1.TouchableOpacity>
        <react_native_1.TouchableOpacity onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.额度转换);
    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: "#3a3a41", marginRight: 10, borderRadius: 8 }}>
          <react_native_fast_image_1.default style={{ width: 20, height: 20 }} source={{ uri: "http://test60f.fhptcdn.com/views/mobileTemplate/22/images/xima.png" }}/>
          <react_native_1.Text style={{ color: 'white', fontSize: 14 }}> 额度转换</react_native_1.Text>
        </react_native_1.TouchableOpacity>
        <react_native_1.TouchableOpacity onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.取款);
    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: "#3a3a41", borderRadius: 8 }}>
          <react_native_fast_image_1.default style={{ width: 27, height: 20 }} source={{ uri: "http://test60f.fhptcdn.com/views/mobileTemplate/22/images/withdrawlogo.png", }}/>
          <react_native_1.Text style={{ color: 'white', fontSize: 14 }}> 取款</react_native_1.Text>
        </react_native_1.TouchableOpacity>
      </react_native_1.View>

      <react_native_1.FlatList columnWrapperStyle={{ paddingVertical: 10 }} numColumns={3} style={{ backgroundColor: '#34343b', borderRadius: 8, paddingVertical: 10 }} renderItem={function (_a) {
        var item = _a.item;
        return (<react_native_1.TouchableOpacity onPress={function () {
            PushHelper_1.default.pushUserCenterType(item.code);
        }} style={{ width: (width - 40) / 3, justifyContent: 'center', alignItems: 'center' }}>
            <react_native_fast_image_1.default resizeMode={'contain'} style={{ width: (width - 20) / 3 > 50 ? 50 : 30, aspectRatio: 1, tintColor: 'white', overflow: "visible" }} source={{ uri: item.logo }}>
              {item.code == 9 && unreadMsg > 0 ? <react_native_1.View style={{
            position: 'absolute', right: -5, top: 3, backgroundColor: 'red',
            height: 20, width: 20,
            borderRadius: 10, justifyContent: 'center', alignItems: 'center'
        }}>
                <react_native_1.Text style={{ color: 'white', fontSize: 10 }}>{unreadMsg}</react_native_1.Text>
              </react_native_1.View> : null}
            </react_native_fast_image_1.default>
            <react_native_1.Text style={{ color: 'white', marginTop: 10 }}>{item.name}</react_native_1.Text>

          </react_native_1.TouchableOpacity>);
    }} data={UGUserCenterItem}/>
      <react_native_1.TouchableOpacity onPress={loginOut} style={{ height: 55, backgroundColor: '#34343b', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 10, marginBottom: 150 }}>
        <react_native_1.Text style={{ color: 'white', fontSize: 21 }}>退出登录</react_native_1.Text>
      </react_native_1.TouchableOpacity>
    </react_native_1.ScrollView>
  </react_native_1.View>;
};
var Header = function () {
    var top = react_native_safe_area_context_1.useSafeArea().top;
    return (<react_native_1.View style={{ backgroundColor: "#1a1a1e", }}>
      <react_native_1.View style={{ height: top }}></react_native_1.View>
      <react_native_1.View style={{ height: 45, backgroundColor: "#1a1a1e", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
        <react_native_1.TouchableOpacity style={{ position: 'absolute', left: 15 }} onPress={function () {
        RootNavigation_1.pop();
        switch (react_native_1.Platform.OS) {
            case "ios":
                OCHelper_1.OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
                break;
            case "android":
                //TODO
                break;
        }
    }}>
          <react_native_elements_1.Icon name='ios-arrow-back' type="ionicon" color="white" size={30}/>
        </react_native_1.TouchableOpacity>
        <react_native_1.Text style={{ color: 'white', fontSize: 20, fontWeight: "bold" }}>个人中心</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>);
};
exports.default = KSMine;
