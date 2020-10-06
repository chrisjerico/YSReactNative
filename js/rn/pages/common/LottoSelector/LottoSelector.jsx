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
var react_1 = require("react");
var react_native_1 = require("react-native");
var APIRouter_1 = require("../../../public/network/APIRouter");
var Header_1 = require("./Header");
var moment_1 = require("moment");
var LottoItem_1 = require("./LottoItem");
var LottoSelector = function () {
    var _a;
    var _b = react_1.useState(), lottoData = _b[0], setLottoData = _b[1];
    var _c = react_1.useState(0), reloadTime = _c[0], setReloadTime = _c[1];
    var _d = react_1.useState(true), isLoading = _d[0], setIsLoading = _d[1];
    var init = function () { return __awaiter(void 0, void 0, void 0, function () {
        var _a, data, status, timeStampList_1, index, element, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.game_lotteryGames()];
                case 1:
                    _a = _b.sent(), data = _a.data, status = _a.status;
                    setLottoData(data);
                    timeStampList_1 = [];
                    for (index = 0; index < data.data.length; index++) {
                        element = data.data[index];
                        element.list.map(function (res) {
                            timeStampList_1.push(moment_1.default(res.curCloseTime).unix());
                        });
                    }
                    timeStampList_1.sort();
                    if (timeStampList_1.length > 0) {
                        setReloadTime(timeStampList_1[0] + 3);
                    }
                    setIsLoading(false);
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    setIsLoading(false);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    var _e = react_1.useState(moment_1.default()), currentTimeStamp = _e[0], setCurrentTimeStamp = _e[1];
    react_1.useEffect(function () {
        if (currentTimeStamp.unix() >= reloadTime && reloadTime != 0 && isLoading == false) {
            setIsLoading(true);
            init();
        }
    }, [reloadTime, currentTimeStamp]);
    react_1.useEffect(function () {
        init();
        var timer = setInterval(function () {
            setCurrentTimeStamp(moment_1.default());
        }, 1000);
        return (function () {
            clearInterval(timer), console.log("deinit");
        });
    }, []);
    return (<react_native_1.View style={{ flex: 1, backgroundColor: 'white' }}>
            <Header_1.default />
            <react_native_1.FlatList keyExtractor={function (item, index) { return index.toString(); }} data={(_a = lottoData === null || lottoData === void 0 ? void 0 : lottoData.data) !== null && _a !== void 0 ? _a : []} style={{ flex: 1 }} renderItem={function (_a) {
        var item = _a.item;
        return <>
                        <react_native_1.Text style={{
            fontSize: 18,
            marginLeft: 20,
            marginVertical: 10,
            fontWeight: "bold"
        }}>{item.gameTypeName}</react_native_1.Text>
                        <react_native_1.FlatList data={item.list} numColumns={2} columnWrapperStyle={{ paddingHorizontal: 10 }} renderItem={function (_a) {
            var item = _a.item, index = _a.index;
            return <LottoItem_1.default currentTimeStamp={currentTimeStamp} item={item} index={index}/>;
        }}/>
                    </>;
    }}/>
        </react_native_1.View>);
};
exports.default = LottoSelector;
