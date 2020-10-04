"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var moment_1 = require("moment");
var UGSkinManagers_1 = require("../../../public/theme/UGSkinManagers");
var react_1 = require("react");
var hooks_1 = require("@react-native-community/hooks");
var LottoContext_1 = require("../LottoBetting/LottoContext");
var LottoItem = react_1.memo(function (_a) {
    var item = _a.item, index = _a.index, currentTimeStamp = _a.currentTimeStamp;
    var _b = react_1.useState(false), imgError = _b[0], setImgError = _b[1];
    var width = hooks_1.useDimensions().screen.width;
    var _c = LottoContext_1.useLottoContext(), setlottoData = _c.setlottoData, setShowModal = _c.setShowModal;
    var memoFastImage = react_1.useMemo(function () {
        return <react_native_fast_image_1.default onLoad={function (e) {
            var _a, _b;
            if (((_a = e === null || e === void 0 ? void 0 : e.nativeEvent) === null || _a === void 0 ? void 0 : _a.width) == 0 || ((_b = e === null || e === void 0 ? void 0 : e.nativeEvent) === null || _b === void 0 ? void 0 : _b.height) == 0) {
                setImgError(true);
            }
        }} onError={function () {
            setImgError(true);
        }} style={{ height: 60, width: 60 }} source={{ uri: item.pic, cache: 'cacheOnly' }}/>;
    }, []);
    var onPress = function () {
        setlottoData(item);
        setShowModal(false);
    };
    return (<react_native_1.TouchableOpacity onPress={onPress} style={{
        width: (width - 30) / 2,
        backgroundColor: UGSkinManagers_1.Skin1.themeColor,
        borderRadius: 8, flexDirection: 'row',
        paddingVertical: 20, paddingLeft: 10,
        marginRight: index % 2 == 0 ? 10 : 0,
        marginBottom: 5
    }}>
    {imgError ? <react_native_1.Image source={{ uri: "loading" }} style={{ width: 60, height: 60 }}/> : memoFastImage}

    <react_native_1.View style={{ flexDirection: 'column', marginLeft: 5 }}>
      <react_native_1.Text style={{ color: 'white', marginBottom: 5 }}>{item.title}</react_native_1.Text>
      <react_native_1.Text style={{ color: 'green', fontSize: 14 }}>{item.openCycle}</react_native_1.Text>
      <TimeLabel isInstant={item.isInstant} curCloseTime={item.curCloseTime} currentTimeStamp={currentTimeStamp}/>
    </react_native_1.View>
  </react_native_1.TouchableOpacity>);
});
var TimeLabel = function (_a) {
    var isInstant = _a.isInstant, currentTimeStamp = _a.currentTimeStamp, curCloseTime = _a.curCloseTime;
    var getTimeDiff = function (a, end) {
        var b = moment_1.default(end);
        if (b.diff(a, 'seconds') <= 0) {
            return "00:00";
        }
        var minutes = b.diff(a, 'minutes') % 60 >= 10 ? b.diff(a, 'minutes') % 60 : "0" + b.diff(a, 'minutes') % 60;
        var seconds = (b.diff(a, 'seconds') % 60) >= 10 ? (b.diff(a, 'seconds') % 60) : "0" + (b.diff(a, 'seconds') % 60);
        var hours = (b.diff(a, 'hours') % 24) >= 10 ? (b.diff(a, 'hours') % 24) : "0" + (b.diff(a, 'hours') % 24);
        var days = (b.diff(a, 'days') % 30) >= 10 ? (b.diff(a, 'days') % 30) : "0" + (b.diff(a, 'days') % 30);
        if (days > 0) {
            return days + "天" + hours + ":" + minutes + ":" + seconds;
        }
        else if (hours > 0) {
            return hours + ":" + minutes + ":" + seconds;
        }
        else {
            return minutes + ":" + seconds;
        }
    };
    return <react_native_1.Text style={{ color: 'red' }}>{isInstant == "0" ? getTimeDiff(currentTimeStamp, curCloseTime) : ""}</react_native_1.Text>;
};
exports.default = LottoItem;
