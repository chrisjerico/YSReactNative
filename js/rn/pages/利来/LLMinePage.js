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
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var UGStore_1 = require("../../redux/store/UGStore");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var PushHelper_1 = require("../../public/define/PushHelper");
var useMemberItems_1 = require("../../public/hooks/useMemberItems");
var useLoginOut_1 = require("../../public/hooks/useLoginOut");
var Navigation_1 = require("../../public/navigation/Navigation");
var APIRouter_1 = require("../../public/network/APIRouter");
var httpClient_1 = require("../../public/network/httpClient");
var PickAvatarComponent_1 = require("../../public/components/tars/PickAvatarComponent");
var useMinePage_1 = require("../../public/hooks/tars/useMinePage");
var config_1 = require("../BZH/config");
var tars_1 = require("../../public/tools/tars");
var LLThemeCololr_1 = require("../../public/theme/colors/LLThemeCololr");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var LLMinePage = function (_a) {
    var navigation = _a.navigation, setProps = _a.setProps;
    var _b = useMinePage_1.default({
        homePage: Navigation_1.PageName.LLHomePage,
        defaultUserCenterLogos: config_1.default.defaultUserCenterLogos,
    }), pickAvatarComponentRef = _b.pickAvatarComponentRef, onSaveAvatarSuccess = _b.onSaveAvatarSuccess, onPressAvatar = _b.onPressAvatar, value = _b.value;
    var balance = value.balance, curLevelGrade = value.curLevelGrade, usr = value.usr, isTest = value.isTest, avatar = value.avatar, nextLevelInt = value.nextLevelInt, curLevelInt = value.curLevelInt, userCenterItems = value.userCenterItems, unreadMsg = value.unreadMsg;
    var getHtml5Image = tars_1.useHtml5Image().getHtml5Image;
    var UGUserCenterItem = useMemberItems_1.default().UGUserCenterItem;
    var _c = react_1.useState(0), levelWidth = _c[0], setLevelWidth = _c[1];
    var _d = react_1.useState(), depositItem = _d[0], setDepositItem = _d[1];
    var _e = react_1.useState(), withdrawItem = _e[0], setWithdrawItem = _e[1];
    var _f = react_1.useState(), transferItem = _f[0], setTransferItem = _f[1];
    var _g = react_1.useState(), missionItem = _g[0], setMissionItem = _g[1];
    var loginOut = useLoginOut_1.default(Navigation_1.PageName.LLHomePage).loginOut;
    var _h = react_1.useState(new react_native_1.Animated.Value(0)), spinValue = _h[0], setSpinValue = _h[1];
    var reload = react_1.useRef(false);
    var spinDeg = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    var getLevelWidth = function () {
        setLevelWidth(193 * parseInt(curLevelInt) / parseInt(nextLevelInt));
    };
    var refresh = function () { return __awaiter(void 0, void 0, void 0, function () {
        var userInfo;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, APIRouter_1.default.user_info()];
                case 1:
                    userInfo = (_a.sent()).data;
                    UGStore_1.UGStore.dispatch({ type: 'merge', props: userInfo === null || userInfo === void 0 ? void 0 : userInfo.data });
                    setProps();
                    UGStore_1.UGStore.save();
                    return [2 /*return*/];
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
                        UGStore_1.UGStore.dispatch({ type: 'merge', props: userInfo === null || userInfo === void 0 ? void 0 : userInfo.data });
                        setProps();
                        UGStore_1.UGStore.save();
                        return [2 /*return*/];
                }
            });
        }); });
        return (function () {
            navigation.removeListener('focus', null);
        });
    }, []);
    react_1.useEffect(function () {
        if (UGUserCenterItem) {
            setDepositItem(UGUserCenterItem.find(function (item) { return item.name == '存款'; }));
            setWithdrawItem(UGUserCenterItem.find(function (item) { return item.name == '取款'; }));
            setTransferItem(UGUserCenterItem.find(function (item) { return item.name == '额度转换'; }));
            setMissionItem(UGUserCenterItem.find(function (item) { return item.name == '任务中心'; }));
        }
    }, [UGUserCenterItem]);
    react_1.useEffect(function () {
        curLevelInt && nextLevelInt && parseInt(curLevelInt) > 0 && parseInt(nextLevelInt) > 0 && getLevelWidth();
    }, [curLevelInt, nextLevelInt]);
    return (React.createElement(React.Fragment, null,
        React.createElement(react_native_1.StatusBar, { barStyle: "light-content", translucent: true }),
        React.createElement(react_native_1.SafeAreaView, { style: { backgroundColor: "#39150D" } },
            React.createElement(react_native_1.ScrollView, { bounces: false, style: { backgroundColor: "#ffffff" } },
                React.createElement(react_native_1.SafeAreaView, { style: { backgroundColor: "#39150D", height: 172 } },
                    React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: function () { PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服); } },
                        React.createElement(react_native_1.Image, { style: { alignSelf: "flex-end", width: 28, height: 28, marginRight: 8 }, source: { uri: httpClient_1.httpClient.defaults.baseURL + "/views/mobileTemplate/20/images/zxkf.png" } })),
                    React.createElement(react_native_1.View, { style: {
                            backgroundColor: "#F3745B",
                            marginHorizontal: 8,
                            marginVertical: 12,
                            height: 159,
                            borderRadius: 6,
                        } },
                        React.createElement(react_native_1.View, { style: { flexDirection: "row", marginHorizontal: 8, marginVertical: 16 } },
                            React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: function () { return onPressAvatar(); } },
                                React.createElement(react_native_1.Image, { style: { width: 50, height: 50 }, source: { uri: isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar } })),
                            React.createElement(react_native_1.View, { style: { marginLeft: 12 } },
                                React.createElement(react_native_1.View, { style: { flexDirection: "row", alignItems: "center" } },
                                    React.createElement(react_native_1.Text, { style: { color: "#ffffff", lineHeight: 20, fontSize: 14 } }, usr),
                                    React.createElement(react_native_linear_gradient_1.default, { colors: ['#FFEAC3', '#FFE09A'], start: { x: 0, y: 1 }, end: { x: 1, y: 1 }, style: {
                                            marginLeft: 8,
                                            marginTop: 1,
                                            borderRadius: 3,
                                            width: 42,
                                            height: 17
                                        } },
                                        React.createElement(react_native_1.Text, { style: {
                                                marginTop: 0.5,
                                                textAlign: 'center',
                                                color: '#8F6832',
                                                fontStyle: 'italic',
                                                fontWeight: '600',
                                                fontSize: 13
                                            } }, curLevelGrade))),
                                React.createElement(react_native_1.View, { style: { flexDirection: "row", alignItems: 'center' } },
                                    React.createElement(react_native_1.View, { style: {
                                            backgroundColor: "#ddf",
                                            width: 193,
                                            height: 8,
                                            borderRadius: 4
                                        } }),
                                    React.createElement(react_native_1.View, { style: {
                                            position: "absolute",
                                            backgroundColor: "#3F64D8",
                                            width: levelWidth,
                                            height: 8,
                                            borderRadius: 4
                                        } }),
                                    React.createElement(react_native_1.Text, { style: {
                                            position: "absolute",
                                            left: 91.5,
                                            color: "#ffffff",
                                            lineHeight: 20,
                                            fontSize: 8
                                        } }, parseInt(curLevelInt) / parseInt(nextLevelInt) + "%"),
                                    React.createElement(react_native_1.Text, { style: {
                                            color: "#ffffff",
                                            lineHeight: 20,
                                            fontSize: 14
                                        } }, curLevelGrade)),
                                levelWidth === 193 ?
                                    React.createElement(react_native_1.Text, { style: { color: "#ffffff", fontSize: 14 } }, "\u606D\u559C\u60A8\u5DF2\u7ECF\u662F\u6700\u9AD8\u7B49\u7EA7!") :
                                    React.createElement(react_native_1.Text, { style: {
                                            color: "#ffffff",
                                            fontSize: 14
                                        } }, "\u8DDD\u79BB\u4E0B\u4E00\u7EA7\u8FD8\u5DEE" + (parseInt(nextLevelInt) - parseInt(curLevelInt))))),
                        React.createElement(react_native_1.View, { style: { marginHorizontal: 16, marginTop: 16 } },
                            React.createElement(react_native_1.Text, { style: { fontSize: 13, color: "#ffffff" } }, "\u603B\u4F59\u989D\uFF08\u5143\uFF09"),
                            React.createElement(react_native_1.View, { style: { flexDirection: "row", alignItems: "center", marginTop: 8 } },
                                React.createElement(react_native_1.Text, { style: {
                                        fontSize: 22,
                                        fontWeight: "bold",
                                        color: "#ffffff",
                                        alignSelf: "center",
                                        textAlign: "center"
                                    } }, balance ? "\u00A50" : "\u00A5" + balance),
                                React.createElement(react_native_1.View, { style: { flex: 1 } }),
                                React.createElement(react_native_1.Animated.View, { style: [{ transform: [{ rotateZ: spinDeg }] }] },
                                    React.createElement(FontAwesome_1.default, { size: 18, style: { color: "#ffffff" }, name: "refresh", onPress: function () {
                                            react_native_1.Animated.timing(spinValue, {
                                                toValue: 1,
                                                duration: 3000,
                                                easing: react_native_1.Easing.linear,
                                                useNativeDriver: true,
                                            }).start(function () {
                                                setSpinValue(new react_native_1.Animated.Value(0));
                                                reload.current = false;
                                            });
                                            refresh();
                                        } })))))),
                React.createElement(react_native_1.View, { style: {
                        marginTop: 56,
                        flexDirection: "row",
                        width: react_native_1.Dimensions.get("screen").width - 16,
                        marginHorizontal: 8
                    } },
                    React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: function () { return PushHelper_1.default.pushCategory(7, 21); } },
                        React.createElement(react_native_1.View, { style: { alignItems: "center", flex: 1 } },
                            React.createElement(react_native_1.Image, { style: { width: 36, height: 28 }, source: { uri: "http://test05.6yc.com/views/mobileTemplate/20/images/Cdeposit.png" } }),
                            React.createElement(react_native_1.Text, { style: { color: "#666666", fontSize: 14, marginTop: 4 } }, "\u5145\u503C"))),
                    React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: function () { return PushHelper_1.default.pushCategory(7, 22); } },
                        React.createElement(react_native_1.View, { style: { alignItems: "center", flex: 1 } },
                            React.createElement(react_native_1.Image, { style: { width: 36, height: 28 }, source: { uri: "http://test05.6yc.com/views/mobileTemplate/20/images/Cwithdraw.png" } }),
                            React.createElement(react_native_1.Text, { style: { color: "#666666", fontSize: 14, marginTop: 4 } }, "\u63D0\u73B0"))),
                    React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: function () { return PushHelper_1.default.pushUserCenterType(transferItem.code); } },
                        React.createElement(react_native_1.View, { style: { alignItems: "center", flex: 1 } },
                            React.createElement(react_native_1.Image, { style: { width: 36, height: 28 }, source: { uri: "http://test05.6yc.com/views/mobileTemplate/20/images/Cconversion.png" } }),
                            React.createElement(react_native_1.Text, { style: { color: "#666666", fontSize: 14, marginTop: 4 } }, "\u989D\u5EA6\u8F6C\u6362"))),
                    React.createElement(react_native_1.TouchableWithoutFeedback, { onPress: function () { return PushHelper_1.default.pushUserCenterType(missionItem.code); } },
                        React.createElement(react_native_1.View, { style: { alignItems: "center", flex: 1 } },
                            React.createElement(react_native_1.Image, { style: { width: 36, height: 28 }, source: { uri: "http://test05.6yc.com/views/mobileTemplate/20/images/Ctask.png" } }),
                            React.createElement(react_native_1.Text, { style: { color: "#666666", fontSize: 14, marginTop: 4 } }, "\u4EFB\u52A1\u4E2D\u5FC3")))),
                React.createElement(react_native_1.SafeAreaView, null,
                    React.createElement(react_native_1.FlatList, { scrollEnabled: false, style: { borderTopWidth: 1, borderTopColor: '#E0E0E0', marginTop: 20, marginBottom: 90 }, keyExtractor: function (item, index) { return "mine-" + index; }, data: UGUserCenterItem, ListFooterComponent: function () { return (React.createElement(react_native_1.View, { style: {
                                flexDirection: "row",
                                flex: 1,
                                marginLeft: 20,
                                height: 47,
                                alignItems: "center",
                                borderBottomWidth: 1,
                                borderBottomColor: '#E0E0E0'
                            } },
                            React.createElement(react_native_1.TouchableOpacity, { style: { flexDirection: "row", flex: 1, }, onPress: loginOut },
                                React.createElement(react_native_1.Image, { style: { height: 29, width: 29, marginRight: 10 }, source: { uri: httpClient_1.httpClient.defaults.baseURL + "/views/mobileTemplate/20/images/Csignout.png" } }),
                                React.createElement(react_native_1.Text, { style: { alignSelf: "center", color: "#47535B", flex: 1 } }, "\u9000\u51FA\u767B\u5F55"),
                                React.createElement(react_native_1.View, { style: { marginRight: 20 } },
                                    React.createElement(FontAwesome_1.default, { size: 20, name: 'angle-right' }))))); }, renderItem: function (_a) {
                            var item = _a.item;
                            return (React.createElement(react_native_1.View, { style: {
                                    flexDirection: "row",
                                    flex: 1,
                                    marginLeft: 20,
                                    height: 47,
                                    alignItems: "center",
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#E0E0E0'
                                } },
                                React.createElement(react_native_1.TouchableOpacity, { style: { flexDirection: "row", flex: 1, }, onPress: function () {
                                        PushHelper_1.default.pushUserCenterType(item.code);
                                    } },
                                    React.createElement(react_native_1.Image, { style: { height: 29, width: 29, marginRight: 10 }, source: { uri: item.logo } }),
                                    React.createElement(react_native_1.Text, { style: { alignSelf: "center", color: "#47535B", flex: 1 } }, item.name),
                                    React.createElement(react_native_1.View, { style: { marginRight: 20 } },
                                        React.createElement(FontAwesome_1.default, { size: 20, name: 'angle-right' })),
                                    item.name === "站内信" && unreadMsg > 0 && (React.createElement(react_native_1.View, { style: {
                                            position: "absolute",
                                            left: 80,
                                            backgroundColor: "red",
                                            borderRadius: 30,
                                            justifyContent: "center",
                                            width: 20,
                                            height: 20
                                        } },
                                        React.createElement(react_native_1.Text, { style: { alignSelf: "center", color: "white" } }, "1"))))));
                        } })),
                React.createElement(PickAvatarComponent_1.default, { ref: pickAvatarComponentRef, color: LLThemeCololr_1.LLThemeColor.利来.themeColor, initAvatar: isTest || !avatar ? getHtml5Image(18, 'money-2') : avatar, onSaveAvatarSuccess: onSaveAvatarSuccess })))));
};
exports.default = LLMinePage;
//# sourceMappingURL=LLMinePage.js.map