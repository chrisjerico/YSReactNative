"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_1 = require("react");
var react_native_1 = require("react-native");
var BaseScreen_1 = require("./component/BaseScreen");
var CardView_1 = require("./component/minePage/CardView");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var UGStore_1 = require("../../redux/store/UGStore");
var useMemberItems_1 = require("../../public/hooks/useMemberItems");
var PushHelper_1 = require("../../public/define/PushHelper");
var useLoginOut_1 = require("../../public/hooks/useLoginOut");
var Navigation_1 = require("../../public/navigation/Navigation");
var LCMinePage = function () {
    var userStore = UGStore_1.UGStore.globalProps.userInfo;
    var _a = userStore.uid, uid = _a === void 0 ? "" : _a;
    var UGUserCenterItem = useMemberItems_1.default().UGUserCenterItem;
    react_1.useEffect(function () {
        userStore && uid == "" && PushHelper_1.default.pushLogin();
    });
    var loginOut = useLoginOut_1.default(Navigation_1.PageName.LCHomePage).loginOut;
    return (<BaseScreen_1.BaseScreen style={{ backgroundColor: "#ffffff", flex: 1 }} screenName={"我的"}>
            <react_native_1.ScrollView bounces={false}>
                <CardView_1.CardView />
                <react_native_1.SafeAreaView>
                    <react_native_1.FlatList scrollEnabled={false} style={{ borderTopWidth: 1, borderTopColor: '#E0E0E0', marginTop: 20 }} keyExtractor={function (item, index) { return "mine-" + index; }} data={UGUserCenterItem} renderItem={function (_a) {
        var item = _a.item;
        return (<react_native_1.View style={{
            flexDirection: "row",
            flex: 1,
            marginLeft: 20,
            height: 47,
            alignItems: "center",
            borderBottomWidth: 1,
            borderBottomColor: '#E0E0E0'
        }}>
                                <react_native_1.TouchableOpacity style={{ flexDirection: "row", flex: 1, }} onPress={function () {
            PushHelper_1.default.pushUserCenterType(item.code);
        }}>
                                    <react_native_1.Image style={{ height: 29, width: 29, marginRight: 10, resizeMode: "stretch" }} source={{ uri: item.logo }}/>
                                    <react_native_1.Text style={{ alignSelf: "center", color: "#47535B", flex: 1 }}>{item.name}</react_native_1.Text>
                                    <react_native_1.View style={{ marginRight: 20 }}>
                                        <FontAwesome_1.default size={20} name={'angle-right'}/>
                                    </react_native_1.View>
                                </react_native_1.TouchableOpacity>
                            </react_native_1.View>);
    }}/>
                    <react_native_1.TouchableOpacity onPress={loginOut} style={{ height: 55, backgroundColor: '#34343b', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 10, marginBottom: 150 }}>
                        <react_native_1.Text style={{ color: 'white', fontSize: 21 }}>退出登录</react_native_1.Text>
                    </react_native_1.TouchableOpacity>
                </react_native_1.SafeAreaView>
            </react_native_1.ScrollView>
        </BaseScreen_1.BaseScreen>);
};
exports.default = LCMinePage;
