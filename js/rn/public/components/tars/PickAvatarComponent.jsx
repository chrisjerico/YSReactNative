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
var react_native_elements_1 = require("react-native-elements");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var Scale_1 = require("../../../public/tools/Scale");
var UGStore_1 = require("../../../redux/store/UGStore");
var APIRouter_1 = require("../../network/APIRouter");
var tars_1 = require("../../tools/tars");
var Avatar_1 = require("../../views/tars/Avatar");
var ProgressCircle_1 = require("../../views/tars/ProgressCircle");
var PickAvatarComponent = function (_a, ref) {
    var initAvatar = _a.initAvatar, color = _a.color, onSaveAvatarSuccess = _a.onSaveAvatarSuccess;
    var _b = react_1.useState(initAvatar), avatar = _b[0], setAvatar = _b[1];
    var _c = react_1.useState([]), avatarList = _c[0], setAvatarList = _c[1];
    var _d = react_1.useState(''), fileName = _d[0], setfileName = _d[1];
    var scrollView = react_1.useRef(null);
    var _e = react_1.useState(true), loading = _e[0], setLoading = _e[1];
    var _f = react_1.useState(false), visible = _f[0], setVisible = _f[1];
    var fetchAvatarList = function () { return __awaiter(void 0, void 0, void 0, function () {
        var response, avatarList_1, error_1;
        var _a, _b;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 2, 3, 4]);
                    setLoading(true);
                    return [4 /*yield*/, APIRouter_1.default.system_avatarList()];
                case 1:
                    response = _c.sent();
                    avatarList_1 = (_b = (_a = response === null || response === void 0 ? void 0 : response.data) === null || _a === void 0 ? void 0 : _a.data) !== null && _b !== void 0 ? _b : [];
                    setAvatarList(avatarList_1);
                    return [3 /*break*/, 4];
                case 2:
                    error_1 = _c.sent();
                    console.log('-------error------', error_1);
                    return [3 /*break*/, 4];
                case 3:
                    setLoading(false);
                    return [7 /*endfinally*/];
                case 4: return [2 /*return*/];
            }
        });
    }); };
    var saveAvatar = function (_a) {
        var url = _a.url, filename = _a.filename;
        return __awaiter(void 0, void 0, void 0, function () {
            var value, error_2;
            var _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _c.trys.push([0, 2, 3, 4]);
                        UGStore_1.UGStore.dispatch({ type: 'merge', userInfo: { avatar: url } });
                        return [4 /*yield*/, APIRouter_1.default.task_changeAvatar(filename)];
                    case 1:
                        value = _c.sent();
                        if (((_b = value === null || value === void 0 ? void 0 : value.data) === null || _b === void 0 ? void 0 : _b.code) == 0) {
                            tars_1.ToastSuccess('修改头像成功');
                            onSaveAvatarSuccess && onSaveAvatarSuccess();
                        }
                        else {
                            tars_1.ToastError('修改头像失败');
                        }
                        return [3 /*break*/, 4];
                    case 2:
                        error_2 = _c.sent();
                        tars_1.ToastError('修改头像失败');
                        console.log('-------error------', error_2);
                        return [3 /*break*/, 4];
                    case 3:
                        setVisible(false);
                        return [7 /*endfinally*/];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    react_1.useEffect(function () {
        fetchAvatarList();
    }, []);
    react_1.useImperativeHandle(ref, function () { return ({
        open: function () {
            setVisible(true);
        },
        close: function () {
            setVisible(false);
        },
        fetchAvatarList: fetchAvatarList,
    }); });
    return (<react_native_1.Modal transparent={true} visible={visible}>
      <react_native_1.View style={styles.container}>
        <react_native_1.View style={styles.pickerBlock}>
          <react_native_1.View style={styles.avatarContainer}>
            <Avatar_1.default uri={avatar} size={200}/>
            <react_native_1.Text style={{ marginTop: Scale_1.scale(10) }}>{'头像预览'}</react_native_1.Text>
          </react_native_1.View>
          {loading ? (<ProgressCircle_1.default />) : (<react_native_1.View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
              <AntDesign_1.default name={'left'} color={'#9D9D9D'} size={Scale_1.scale(30)} style={{ paddingHorizontal: Scale_1.scale(10) }} onPress={function () { return scrollView.current.scrollTo({ x: 0, y: 0, animated: true }); }}/>
              <react_native_1.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} ref={scrollView}>
                {avatarList === null || avatarList === void 0 ? void 0 : avatarList.map(function (item, index) {
        var url = item.url, filename = item.filename;
        return (<Avatar_1.default key={index} uri={url} size={100} containerStyle={{ marginHorizontal: Scale_1.scale(10) }} onPress={function () {
            setAvatar(url);
            setfileName(filename);
        }}/>);
    })}
              </react_native_1.ScrollView>
              <AntDesign_1.default name={'right'} color={'#9D9D9D'} size={Scale_1.scale(30)} style={{ paddingHorizontal: Scale_1.scale(10) }} onPress={function () { return scrollView.current.scrollToEnd({ x: 0, y: 0, animated: true }); }}/>
            </react_native_1.View>)}
          <react_native_1.View style={styles.buttonContainer}>
            <react_native_elements_1.Button activeOpacity={1} title={'保存头像'} buttonStyle={{
        backgroundColor: color,
        width: Scale_1.scale(200),
    }} titleStyle={{ color: '#ffffff' }} onPress={function () { return saveAvatar({ url: avatar, filename: fileName }); }}/>
            <react_native_elements_1.Button activeOpacity={1} title={'取消'} buttonStyle={{ backgroundColor: '#D0D0D0', width: Scale_1.scale(200) }} titleStyle={{ color: '#ffffff' }} onPress={function () {
        setVisible(false);
    }}/>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.Modal>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(98, 94, 94, 0.73)',
    },
    pickerBlock: {
        width: '100%',
        aspectRatio: 1,
        backgroundColor: '#ffffff',
    },
    avatarContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
});
exports.default = react_1.forwardRef(PickAvatarComponent);
