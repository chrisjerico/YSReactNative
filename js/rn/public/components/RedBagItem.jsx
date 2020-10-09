"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var UGStore_1 = require("../../redux/store/UGStore");
var react_1 = require("react");
var react_native_1 = require("react-native");
var RootNavigation_1 = require("../navigation/RootNavigation");
var PushHelper_1 = require("../define/PushHelper");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_2 = require("react");
/**
 * 红包

 *
 * @param redBag
 * @param loginPage
 * @constructor
 */
var RedBagItem = function (_a) {
    var _b;
    var style = _a.style, redBag = _a.redBag, loginPage = _a.loginPage;
    var _c = UGStore_1.UGStore.globalProps.userInfo, _d = _c.isTest, isTest = _d === void 0 ? false : _d, _e = _c.uid, uid = _e === void 0 ? "" : _e;
    var _f = react_1.useState(false), redBagVisiable = _f[0], setRedBagVisiable = _f[1];
    react_1.useEffect(function () {
        if ((redBag === null || redBag === void 0 ? void 0 : redBag.data) != null) {
            setRedBagVisiable(true);
        }
    }, [redBag]);
    return (redBagVisiable ?
        <react_native_1.TouchableWithoutFeedback onPress={function () {
            if (uid == "") {
                react_native_1.Alert.alert("温馨提示", "您还未登录", [
                    {
                        text: "取消",
                        onPress: function () {
                        },
                        style: "cancel"
                    },
                    {
                        text: "马上登录",
                        onPress: function () {
                            loginPage ? RootNavigation_1.navigate(loginPage, {}) : PushHelper_1.default.pushLogin();
                        },
                    }
                ]);
            }
            else if (isTest) {
                react_native_1.Alert.alert("温馨提示", "请登录正式账号", [
                    {
                        text: "取消",
                        onPress: function () {
                        },
                        style: "cancel"
                    },
                    {
                        text: "马上登录",
                        onPress: function () {
                            loginPage ? RootNavigation_1.navigate(loginPage, {}) : PushHelper_1.default.pushLogin();
                        },
                    }
                ]);
            }
            else {
                PushHelper_1.default.pushRedBag(redBag);
            }
        }}>
                <react_native_1.View style={[{ width: 120, right: 20, top: 80, position: "absolute", flexDirection: "row" }, style]}>
                    <react_native_fast_image_1.default style={[{ width: 95, height: 95, zIndex: 100 }]} source={{ uri: (_b = redBag === null || redBag === void 0 ? void 0 : redBag.data) === null || _b === void 0 ? void 0 : _b.redBagLogo }}>
                    </react_native_fast_image_1.default>
                    <react_native_1.TouchableWithoutFeedback onPress={function () {
            setRedBagVisiable(false);
        }}>
                        <react_native_1.Image style={{ width: 25, height: 25, marginLeft: 10 }} source={{ uri: "dialog_close" }}/>
                    </react_native_1.TouchableWithoutFeedback>
                </react_native_1.View>
            </react_native_1.TouchableWithoutFeedback> : <></>);
};
exports.default = RedBagItem;
