"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_1 = require("react");
var hooks_1 = require("@react-native-community/hooks");
var LottoContext_1 = require("../../LottoContext");
var LMItem_1 = require("./balls/LMItem");
var itemSize = 40;
var HKTMTItemView = function (_a) {
    var data = _a.data;
    var width = hooks_1.useDimensions().screen.width;
    var currentOddsData = LottoContext_1.useLottoContext().currentOddsData;
    return (<react_native_1.View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap' }}>
      <react_native_1.Text style={{ textAlign: 'center', marginVertical: 10, width: "100%" }}>{data.alias}</react_native_1.Text>
      <react_native_1.View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
        {data.plays.map(function (data, index) {
        if (index > 1) {
            return <react_native_1.View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{ width: ((width / 4 * 3) - 5) / 3, borderWidth: 1, borderColor: '#444', height: itemSize }}>
                <LMItem_1.default fix={1} data={data}/>
              </react_native_1.View>;
        }
        else {
            return <react_native_1.View key={data.from_id + data.isBan + data.code + data.name + data.alias} style={{ width: ((width / 4 * 3) - 5) / 2, borderWidth: 1, borderColor: '#444', height: itemSize }}>
                <LMItem_1.default fix={1} data={data}/>
              </react_native_1.View>;
        }
    })}
      </react_native_1.View>
    </react_native_1.View>);
};
exports.default = HKTMTItemView;
