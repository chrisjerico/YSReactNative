"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var LottoContext_1 = require("./LottoContext");
var BettingReducer_1 = require("../../../redux/reducer/BettingReducer");
var UGStore_1 = require("../../../redux/store/UGStore");
var YX_1 = require("./PlayVIew/LHT/YX");
var SB_1 = require("./PlayVIew/LHT/SB");
var ZT_1 = require("./PlayVIew/LHT/ZT");
var LMA_1 = require("./PlayVIew/LHT/LMA");
var WS_1 = require("./PlayVIew/LHT/WS");
var TWS_1 = require("./PlayVIew/LHT/TWS");
var WX_1 = require("./PlayVIew/LHT/WX");
var LM_1 = require("./PlayVIew/LHT/LM");
var ZM_1 = require("./PlayVIew/LHT/ZM");
var TM_1 = require("./PlayVIew/LHT/TM");
var ZM16_1 = require("./PlayVIew/LHT/ZM16");
var LottoContent = function (_a) {
    var _b, _c, _d;
    var setProps = _a.setProps;
    var value = LottoContext_1.useLottoContext();
    var borderColor = "red";
    var currentPlayOdd = UGStore_1.UGStore.globalProps.BettingReducer.currentPlayOdd;
    var getPlayView = function () {
        console.log("currentPlayOdd?.code", currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.code);
        switch (currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.code) {
            case "TM":
                return <TM_1.default setProps={setProps}/>;
            case "LM":
            case "ZOX":
                return <LM_1.default setProps={setProps}/>;
            case "SB":
                return <SB_1.default setProps={setProps}/>;
            case "ZM":
                return <ZM_1.default setProps={setProps}/>;
            case "ZM1-6":
                return <ZM16_1.default setProps={setProps}/>;
            case "ZT":
                return <ZT_1.default setProps={setProps}/>;
            case "LMA":
                return <LMA_1.default setProps={setProps}/>;
            case "YX":
            case "ZX":
            case "TX":
                return <YX_1.default setProps={setProps}/>;
            case "WS":
                return <WS_1.default setProps={setProps}/>;
            case "TWS":
                return <TWS_1.default setProps={setProps}/>;
            case "WX":
                return <WX_1.default setProps={setProps}/>;
            default:
                break;
        }
    };
    var onPress = function (item) {
        UGStore_1.UGStore.dispatch({
            type: BettingReducer_1.BettingReducerActions.setCurrentPlayOdd, value: item,
        });
        setProps();
    };
    return (<react_native_1.View style={{ flex: 1, flexDirection: "row" }}>
      <react_native_1.FlatList keyExtractor={function (item) { return item.name; }} style={{ flex: 1, borderRightColor: "#d1d0d0", borderRightWidth: 1 }} data={(_d = (_c = (_b = value === null || value === void 0 ? void 0 : value.currentOddsData) === null || _b === void 0 ? void 0 : _b.data) === null || _c === void 0 ? void 0 : _c.playOdds) !== null && _d !== void 0 ? _d : []} renderItem={function (_a) {
        var item = _a.item;
        return <react_native_1.TouchableWithoutFeedback onPress={onPress.bind(null, item)}>
          <react_native_1.View style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            height: 40,
            borderWidth: (currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.name) == item.name ? 1 : 0,
            borderColor: borderColor,
            borderBottomWidth: (currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.name) == item.name ? 2 : 0,
        }}>
            <react_native_1.View style={{
            width: 8,
            height: 8,
            backgroundColor: (currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.name) == item.name ? borderColor : "#c3c3c3",
            borderRadius: 4,
            position: "absolute",
            left: 5,
        }}/>
            <react_native_1.Text style={{
            fontSize: 15,
            fontWeight: (currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.name) == item.name ? "bold" : "normal",
            textAlign: "left",
            color: (currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.name) == item.name ? "red" : "#403e3e",
            marginLeft: 5,
        }}>{item.name}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>;
    }}/>
      <react_native_1.View style={{ flex: 3 }}>
        {getPlayView()}
      </react_native_1.View>
    </react_native_1.View>);
};
exports.default = LottoContent;
