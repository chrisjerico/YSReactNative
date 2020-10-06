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
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var Scale_1 = require("../../tools/Scale");
var APIRouter_1 = require("../../network/APIRouter");
var UGStore_1 = require("../../../redux/store/UGStore");
var ReLoadBalanceComponent = function (_a) {
    var color = _a.color, containerStyle = _a.containerStyle, _b = _a.size, size = _b === void 0 ? 25 : _b, balance = _a.balance, title = _a.title, balanceStyle = _a.balanceStyle, titleStyle = _a.titleStyle, animatedContainerStyle = _a.animatedContainerStyle;
    var _c = react_1.useState(new react_native_1.Animated.Value(0)), spinValue = _c[0], setSpinValue = _c[1];
    var reload = react_1.useRef(false);
    var spinDeg = spinValue.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '360deg'],
    });
    var _d = react_1.useState(balance), money = _d[0], setMoney = _d[1];
    var fetchBalance = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, balance_1, error_1;
        var _a;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.user_balance_token()];
                case 1:
                    data = (_b.sent()).data;
                    balance_1 = (_a = data === null || data === void 0 ? void 0 : data.data) === null || _a === void 0 ? void 0 : _a.balance;
                    console.log('-------balance-----', balance_1);
                    setMoney(balance_1);
                    UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: { balance: balance_1 } });
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    console.log('-------error------', error_1);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    react_1.useEffect(function () {
        setMoney(balance);
    }, [balance]);
    return (<react_native_1.View style={[styles.container, containerStyle]}>
      <react_native_1.Text style={[styles.title, titleStyle]}>{title}</react_native_1.Text>
      <react_native_1.Text style={[styles.balance, balanceStyle]} numberOfLines={1}>
        {money}
      </react_native_1.Text>
      <react_native_1.TouchableWithoutFeedback onPress={function () {
        if (!reload.current) {
            reload.current = true;
            fetchBalance();
            // onPress && onPress()
            react_native_1.Animated.timing(spinValue, {
                toValue: 1,
                duration: 3000,
                easing: react_native_1.Easing.linear,
                useNativeDriver: true,
            }).start(function () {
                setSpinValue(new react_native_1.Animated.Value(0));
                reload.current = false;
            });
        }
    }}>
        <react_native_1.Animated.View style={[styles.animatedContainer, animatedContainerStyle, { width: Scale_1.scale(size) }, { transform: [{ rotateZ: spinDeg }] }]}>
          <FontAwesome_1.default name={'refresh'} size={Scale_1.scale(size)} color={color}/>
        </react_native_1.Animated.View>
      </react_native_1.TouchableWithoutFeedback>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: { flexDirection: 'row' },
    animatedContainer: {
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: { fontSize: Scale_1.scale(19) },
    balance: {
        color: '#ff861b',
        fontSize: Scale_1.scale(19),
        marginRight: Scale_1.scale(10),
    },
});
exports.default = ReLoadBalanceComponent;
