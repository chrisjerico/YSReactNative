"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
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
var LottoContent = function () {
    var _a, _b, _c;
    var value = LottoContext_1.useLottoContext();
    var borderColor = "red";
    var currentPlayOdd = UGStore_1.UGStore.globalProps.BettingReducer.currentPlayOdd;
    react_1.useEffect(function () {
        // OCHelper.call('CMCommon.hideTabBar', []);
    }, []);
    var getPlayView = function () {
        switch (currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.code) {
            case 'TM':
                return <TM_1.default />;
                break;
            case 'LM':
            case 'ZOX':
                return <LM_1.default />;
            case 'SB':
                return <SB_1.default />;
            case 'ZM':
                return <ZM_1.default />;
            case 'ZM1-6':
                return <ZM16_1.default />;
            case 'ZT':
                return <ZT_1.default />;
            case 'LMA':
                return <LMA_1.default />;
            case 'YX':
            case 'ZX':
            case 'TX':
                return <YX_1.default />;
            case 'WS':
                return <WS_1.default />;
            case 'TWS':
                return <TWS_1.default />;
            case 'WX':
                return <WX_1.default />;
            default:
                break;
        }
    };
    var onPress = function (item) {
        UGStore_1.UGStore.dispatch({
            type: BettingReducer_1.BettingReducerActions.setCurrentPlayOdd, value: item
        });
    };
    return (<react_native_1.View style={{ flex: 1, flexDirection: 'row' }}>
      <react_native_1.FlatList keyExtractor={function (item) { return item.name; }} style={{ flex: 1 }} data={(_c = (_b = (_a = value === null || value === void 0 ? void 0 : value.currentOddsData) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.playOdds) !== null && _c !== void 0 ? _c : []} renderItem={function (_a) {
        var item = _a.item;
        return <react_native_1.TouchableWithoutFeedback onPress={onPress.bind(null, item)}>
          <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', height: 40, borderWidth: (currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.name) == item.name ? 1 : 0, borderColor: borderColor, borderBottomWidth: (currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.name) == item.name ? 2 : 0 }}>
            <react_native_1.View style={{ width: 8, height: 8, backgroundColor: (currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.name) == item.name ? borderColor : '#c3c3c3', borderRadius: 4, position: 'absolute', left: 5 }}></react_native_1.View>
            <react_native_1.Text style={{
            fontSize: 15,
            fontWeight: (currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.name) == item.name ? 'bold' : 'normal',
            textAlign: 'left',
            color: (currentPlayOdd === null || currentPlayOdd === void 0 ? void 0 : currentPlayOdd.name) == item.name ? "red" : "#403e3e",
            marginLeft: 5
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
