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
exports.XBJMinePage = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_fast_image_1 = require("react-native-fast-image");
var NetworkRequest1_1 = require("../../public/network/NetworkRequest1");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var PushHelper_1 = require("../../public/define/PushHelper");
var IGlobalStateHelper_1 = require("../../redux/store/IGlobalStateHelper");
var UGThemeColor_1 = require("../../public/theme/UGThemeColor");
var UGSkinManagers_1 = require("../../public/theme/UGSkinManagers");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var ToastUtils_1 = require("../../public/tools/ToastUtils");
var ANHelper_1 = require("../../public/define/ANHelper/ANHelper");
var CmdDefine_1 = require("../../public/define/ANHelper/hp/CmdDefine");
// 设置默认Props
// UGStore.defaultGlobalProps.XBJMineProps = {
//   tabbarOpetions: { unmountOnBlur: false },
//   navbarOpstions: {
//     title: '我的',
//     backgroundColor: 'transparent',
//     hideUnderline: true,
//     rightComponent: (
//       <TouchableOpacity
//         onPress={() => {
//           PushHelper.pushUserCenterType(UGUserCenterType.站内信);
//         }}>
//         <FastImage source={{ uri: 'https://i.ibb.co/q0Pgt4B/2x.png' }} style={{ marginRight: 16, width: 20, height: 20 }} />
//       </TouchableOpacity>
//     ),
//   },
//   dataArray: [],
// };
exports.XBJMinePage = function (props) {
    var setProps = props.setProps;
    // 获取功能按钮列表
    switch (react_native_1.Platform.OS) {
        case 'ios':
            OCHelper_1.OCHelper.call('UGSystemConfigModel.currentConfig.userCenter').then(function (list) {
                var dataArray = list.map(function (item) { return new UGSysConfModel_1.UGUserCenterItem(item); });
                setProps({ dataArray: dataArray });
            });
            break;
        case 'android':
            ANHelper_1.ANHelper.callAsync(CmdDefine_1.CMD.ASK_MINE_ITEMS)
                .then(function (data) {
                var _a, _b;
                var userCenterItems = (_b = (_a = JSON.parse(data)) === null || _a === void 0 ? void 0 : _a.map(function (item) { return new UGSysConfModel_1.UGUserCenterItem(item); })) !== null && _b !== void 0 ? _b : [];
                setProps({ dataArray: userCenterItems });
            });
            break;
    }
    console.log('获取用户信息');
    // 获取用户信息
    IGlobalStateHelper_1.IGlobalStateHelper.updateUserInfo();
    var UserI = props.userInfo;
    var cells = props.dataArray.map(function (item) {
        return [
            <react_native_gesture_handler_1.TouchableOpacity key={item.code} style={{ flexDirection: 'row' }} onPress={function () {
                PushHelper_1.default.pushUserCenterType(item.code);
            }}>
        <react_native_fast_image_1.default source={{ uri: item.logo }} style={{ margin: 10, marginLeft: 13, width: 26, height: 26 }}/>
        <react_native_elements_1.Text style={{ marginTop: 14, marginLeft: 6 }}>{item.name}</react_native_elements_1.Text>
      </react_native_gesture_handler_1.TouchableOpacity>,
            <react_native_1.View style={{ marginLeft: 55, height: 0.5, backgroundColor: '#AAA' }}/>,
        ];
    });
    return (<react_native_gesture_handler_1.ScrollView style={{ flex: 1, padding: 16 }} key="scrollView">
      <react_native_1.View style={{ padding: 16, borderRadius: 4, backgroundColor: UGSkinManagers_1.Skin1.homeContentColor }}>
        <react_native_1.View style={{ flexDirection: 'row' }}>
          <react_native_elements_1.Avatar source={{ uri: UserI.avatar }} rounded showEditButton size={56} onPress={function () { }}/>
          <react_native_1.View style={{ marginLeft: 16 }}>
            <react_native_1.View style={{ marginTop: 4, flexDirection: 'row' }}>
              <react_native_elements_1.Text style={{ fontWeight: '500', fontSize: 16 }}>{UserI.usr}</react_native_elements_1.Text>
              <react_native_linear_gradient_1.default colors={['#FFEAC3', '#FFE09A']} start={{ x: 0, y: 1 }} end={{ x: 1, y: 1 }} style={{ marginLeft: 8, marginTop: 1, borderRadius: 3, width: 42, height: 17 }}>
                <react_native_elements_1.Text style={{ marginTop: 0.5, textAlign: 'center', color: '#8F6832', fontStyle: 'italic', fontWeight: '600', fontSize: 13 }}>{UserI.curLevelGrade}</react_native_elements_1.Text>
              </react_native_linear_gradient_1.default>
            </react_native_1.View>
            <react_native_1.View style={{ marginTop: 10, flexDirection: 'row' }}>
              <react_native_elements_1.Text style={{ fontSize: 12 }}>头衔：</react_native_elements_1.Text>
              <react_native_elements_1.Text style={{ fontSize: 12, color: UGThemeColor_1.UGColor.RedColor2 }}>{UserI.curLevelTitle}</react_native_elements_1.Text>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.View style={{ marginLeft: -15, marginTop: 18, flexDirection: 'row', justifyContent: 'space-around' }}>
          <react_native_gesture_handler_1.TouchableOpacity style={{ alignItems: 'center' }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.存款);
    }}>
            <react_native_fast_image_1.default source={{ uri: 'https://i.ibb.co/1MzcBGd/2x.png' }} style={{ width: 28, height: 21 }}/>
            <react_native_elements_1.Text style={{ marginTop: 11, fontSize: 12 }}>存款</react_native_elements_1.Text>
          </react_native_gesture_handler_1.TouchableOpacity>
          <react_native_gesture_handler_1.TouchableOpacity style={{ alignItems: 'center' }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.额度转换);
    }}>
            <react_native_fast_image_1.default source={{ uri: 'https://i.ibb.co/VNm1G2s/2x.png' }} style={{ width: 28, height: 21 }}/>
            <react_native_elements_1.Text style={{ marginTop: 11, fontSize: 12 }}>额度转换</react_native_elements_1.Text>
          </react_native_gesture_handler_1.TouchableOpacity>
          <react_native_gesture_handler_1.TouchableOpacity style={{ alignItems: 'center' }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.取款);
    }}>
            <react_native_fast_image_1.default source={{ uri: 'https://i.ibb.co/mJjNngx/2x.png' }} style={{ width: 28, height: 21 }}/>
            <react_native_elements_1.Text style={{ marginTop: 11, fontSize: 12 }}>取款</react_native_elements_1.Text>
          </react_native_gesture_handler_1.TouchableOpacity>
          <react_native_gesture_handler_1.TouchableOpacity style={{ alignItems: 'center' }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.存款);
    }}>
            <react_native_fast_image_1.default source={{ uri: 'https://i.ibb.co/RGXm0sc/2x.png' }} style={{ width: 28, height: 21 }}/>
            <react_native_elements_1.Text style={{ marginTop: 11, fontSize: 12 }}>资金管理</react_native_elements_1.Text>
          </react_native_gesture_handler_1.TouchableOpacity>
          <react_native_gesture_handler_1.TouchableOpacity style={{ alignItems: 'center', borderRadius: 100 }}>
            <react_native_elements_1.Text style={{ marginTop: 4, fontWeight: '500', color: UGThemeColor_1.UGColor.RedColor2 }}>{'¥' + (UserI.balance ? UserI.balance : '0.00')}</react_native_elements_1.Text>
            <react_native_elements_1.Text style={{ marginTop: 11, fontSize: 12 }}>中心钱包</react_native_elements_1.Text>
          </react_native_gesture_handler_1.TouchableOpacity>
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.View style={{ marginTop: 12, flexDirection: 'row', flex: 1 }}>
        <react_native_gesture_handler_1.TouchableOpacity containerStyle={{ padding: 12, borderRadius: 4, backgroundColor: UGSkinManagers_1.Skin1.homeContentColor, flex: 1, marginRight: 12 }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.全民竞猜);
    }}>
          <react_native_elements_1.Text style={{ marginTop: -3, fontSize: 14 }}>全员福利</react_native_elements_1.Text>
          <react_native_elements_1.Text style={{ marginTop: 4, fontSize: 10 }}>现金奖励等你拿</react_native_elements_1.Text>
          <react_native_fast_image_1.default source={{ uri: 'https://i.ibb.co/WHXtKwK/2x.png' }} style={{ marginTop: 9, marginBottom: -1, width: 80, height: 53 }}/>
        </react_native_gesture_handler_1.TouchableOpacity>
        <react_native_gesture_handler_1.TouchableOpacity containerStyle={{ padding: 12, borderRadius: 4, backgroundColor: UGSkinManagers_1.Skin1.homeContentColor, flex: 1, marginRight: 12 }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.活动彩金);
    }}>
          <react_native_elements_1.Text style={{ marginTop: -3, fontSize: 14 }}>彩金申请</react_native_elements_1.Text>
          <react_native_elements_1.Text style={{ marginTop: 4, fontSize: 10 }}>新手有好礼</react_native_elements_1.Text>
          <react_native_fast_image_1.default source={{ uri: 'https://i.ibb.co/Jz0F2nV/2x.png' }} style={{ marginTop: 9, marginBottom: -1, width: 92, height: 53 }}/>
        </react_native_gesture_handler_1.TouchableOpacity>
        <react_native_gesture_handler_1.TouchableOpacity containerStyle={{ padding: 12, borderRadius: 4, backgroundColor: UGSkinManagers_1.Skin1.homeContentColor, flex: 1 }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.任务中心);
    }}>
          <react_native_elements_1.Text style={{ marginTop: -3, fontSize: 14 }}>任务中心</react_native_elements_1.Text>
          <react_native_elements_1.Text style={{ marginTop: 4, fontSize: 10 }}>领取丰富大奖</react_native_elements_1.Text>
          <react_native_fast_image_1.default source={{ uri: 'https://i.ibb.co/mNs6pFN/2x.png' }} style={{ marginTop: 9, marginBottom: -1, width: 92, height: 53 }}/>
        </react_native_gesture_handler_1.TouchableOpacity>
      </react_native_1.View>
      <react_native_1.View style={{ marginTop: 12, borderRadius: 4, backgroundColor: UGSkinManagers_1.Skin1.homeContentColor }}>{cells}</react_native_1.View>
      <react_native_elements_1.Button title="退出登录" style={{ marginTop: 12 }} buttonStyle={{ backgroundColor: UGSkinManagers_1.Skin1.homeContentColor, borderRadius: 4, height: 48 }} titleStyle={{ color: UGThemeColor_1.UGColor.RedColor2 }} onPress={function () {
        react_native_1.Alert.alert('温馨提示', '确定退出账号', [
            { text: '取消', style: 'cancel' },
            {
                text: '确定',
                onPress: function () { return __awaiter(void 0, void 0, void 0, function () {
                    var _a;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                NetworkRequest1_1.default.user_logout();
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
                }); },
            },
        ]);
    }}/>

      <react_native_1.View style={{ height: 150 }}/>
    </react_native_gesture_handler_1.ScrollView>);
};
