"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardView = void 0;
var react_native_1 = require("react-native");
var React = require("react");
var react_native_elements_1 = require("react-native-elements");
var PushHelper_1 = require("../../../../public/define/PushHelper");
var UGSysConfModel_1 = require("../../../../redux/model/\u5168\u5C40/UGSysConfModel");
var useMemberItems_1 = require("../../../../public/hooks/useMemberItems");
var react_1 = require("react");
var UGStore_1 = require("../../../../redux/store/UGStore");
exports.CardView = function () {
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var balance = userStore.balance, fullName = userStore.fullName, todayWinAmount = userStore.todayWinAmount, curLevelGrade = userStore.curLevelGrade;
    var _a = react_1.useState(false), showBalance = _a[0], setShowBalance = _a[1];
    var _b = react_1.useState(), depositItem = _b[0], setDepositItem = _b[1];
    var _c = react_1.useState(), withdrawItem = _c[0], setWithdrawItem = _c[1];
    var _d = react_1.useState(), LXBItem = _d[0], setLXBItem = _d[1];
    var UGUserCenterItem = useMemberItems_1.default().UGUserCenterItem;
    react_1.useEffect(function () {
        UGUserCenterItem && setDepositItem(UGUserCenterItem.find(function (item) { return item.name == '存款'; }));
        UGUserCenterItem && setWithdrawItem(UGUserCenterItem.find(function (item) { return item.name == '取款'; }));
        UGUserCenterItem && setLXBItem(UGUserCenterItem.find(function (item) { return item.name == '利息宝'; }));
        console.log("UGUserCenterItemL:", UGUserCenterItem);
    }, [UGUserCenterItem]);
    return (<react_native_1.View style={{ height: 300, width: react_native_1.Dimensions.get("screen").width }}>
            <react_native_1.Image style={{
        width: react_native_1.Dimensions.get("screen").width,
        height: "100%",
        resizeMode: "stretch",
        position: "absolute"
    }} source={{ uri: "http://test30.6yc.com/views/mobileTemplate/19/images/assetsBoxbg.png" }}/>
            <react_native_1.View style={{ paddingTop: 20 }}>
                <react_native_1.View style={{ paddingHorizontal: 50, paddingTop: 10, flexDirection: "row" }}>
                    <react_native_1.Text style={{ fontSize: 16, fontWeight: "bold", alignSelf: 'center' }}>{fullName}</react_native_1.Text>
                    <react_native_1.View style={{ marginLeft: 8, backgroundColor: "#84C1FF", borderRadius: 10 }}>
                        <react_native_1.Text style={{
        color: "#ffffff",
        fontWeight: "bold",
        paddingVertical: 2,
        paddingHorizontal: 6
    }}>{curLevelGrade}</react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.TouchableOpacity style={{ flex: 1, alignItems: "flex-end" }} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.任务中心);
    }}>
                        <react_native_1.Image style={{ width: 84, height: 22, resizeMode: "stretch" }} source={{ uri: "http://test30.6yc.com/static/vuePublic/images/my/userInfo/missionhall.png" }}/>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>
                <react_native_1.View style={{ paddingHorizontal: 50, paddingTop: 10, flexDirection: "row" }}>
                    <react_native_1.Text style={{ color: "#65727B", alignSelf: "center", marginRight: 10 }}>余额 : </react_native_1.Text>
                    <react_native_1.TouchableOpacity onPress={function () { return setShowBalance(!showBalance); }}>
                        {showBalance ? <react_native_1.Image source={{
        width: 22,
        height: 22,
        uri: "http://test30.6yc.com/views/mobileTemplate/19/images/moneyicon.png"
    }}/> :
        <react_native_1.Image source={{
            width: 22,
            height: 22,
            uri: "https://test30.6yc.com/views/mobileTemplate/19/images/moneyhideicon.png"
        }}/>}
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>
                <react_native_1.View style={{ paddingHorizontal: 50, paddingTop: 10, flexDirection: "row", alignItems: "center" }}>
                    {showBalance ? <react_native_1.Text style={{
        fontSize: 18,
        paddingRight: 10,
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        lineHeight: 36,
    }}>{balance + " RMB"}</react_native_1.Text> : <react_native_1.Text style={{
        fontSize: 30,
        paddingRight: 10,
        fontWeight: "bold",
        textAlign: "center",
        alignSelf: "center",
        lineHeight: 36,
        top: 5
    }}>
                            * * * *
                    </react_native_1.Text>}
                    {showBalance && <react_native_elements_1.Icon name={"refresh"}/>}
                </react_native_1.View>
                <react_native_1.View style={{ flexDirection: "row", paddingHorizontal: 50, marginTop: 30, alignItems: "center" }}>
                    <CardButton uri={"http://test30.6yc.com/views/mobileTemplate/19/images/deposit.png"} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.存款);
    }} text={"存款"}/>
                    <react_native_1.View style={{ backgroundColor: "#9d9d9d", height: 40, width: 1 }}/>
                    <CardButton onPress={function () {
        LXBItem && PushHelper_1.default.pushUserCenterType(LXBItem.code);
    }} imgStyle={{ height: 39 }} uri={"http://test30.6yc.com/views/mobileTemplate/19/images/bet.png"} text={"利息宝"}/>
                    <react_native_1.View style={{ backgroundColor: "#9d9d9d", height: 40, width: 1 }}/>
                    <CardButton onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.取款);
    }} uri={"http://test30.6yc.com/views/mobileTemplate/19/images/withdraw.png"} text={"提现"}/>
                </react_native_1.View>
            </react_native_1.View>
        </react_native_1.View>);
};
var CardButton = function (_a) {
    var uri = _a.uri, text = _a.text, imgStyle = _a.imgStyle, onPress = _a.onPress;
    return (<react_native_1.TouchableOpacity onPress={onPress} style={{ alignItems: "center", flex: 1 / 3, height: "100%" }}>
            <react_native_1.View style={{ height: 39, justifyContent: "center" }}>
                <react_native_1.Image style={[{ width: 39, height: 30, resizeMode: "cover" }, imgStyle]} source={{ uri: uri }}/>
            </react_native_1.View>
            <react_native_1.View style={{ flex: 1 }}/>
            <react_native_1.Text style={{ marginTop: 20 }}>{text}</react_native_1.Text>
        </react_native_1.TouchableOpacity>);
};
