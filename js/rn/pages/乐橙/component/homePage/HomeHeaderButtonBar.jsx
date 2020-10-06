"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var LoginButtonBar_1 = require("./LoginButtonBar");
var React = require("react");
var UGStore_1 = require("../../../../redux/store/UGStore");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_1 = require("react");
exports.HomeHeaderButtonBar = function () {
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var balance = userStore.balance, uid = userStore.uid;
    var sysStore = UGStore_1.UGStore.globalProps.sysConf;
    var _a = sysStore.mobile_logo, mobile_logo = _a === void 0 ? "" : _a;
    react_1.useEffect(function () {
        console.log("uid:", uid);
    }, [uid]);
    return (<react_native_1.SafeAreaView style={{ backgroundColor: "#FFFFFF" }}>
            <react_native_1.View style={{ flexDirection: "row", marginHorizontal: 10, backgroundColor: "#FFFFFF" }}>
                <react_native_fast_image_1.default resizeMode={'contain'} style={{ width: 127, height: 40 }} source={{ uri: mobile_logo }}/>
                <react_native_1.View style={{ flex: 1 }}/>
                {!uid ? <LoginButtonBar_1.LoginButtonBar /> :
        <react_native_1.View style={{ flexDirection: "row", alignItems: "center", height: 40 }}>
                        <react_native_1.Image style={{ width: 20, height: 20 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/19/images/coin.png" }}/>
                        <react_native_1.Text style={{ marginLeft: 10 }}>{balance || "0.000"}</react_native_1.Text>
                    </react_native_1.View>}
            </react_native_1.View>
        </react_native_1.SafeAreaView>);
};
