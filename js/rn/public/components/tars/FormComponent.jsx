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
var Ionicons_1 = require("react-native-vector-icons/Ionicons");
var APIRouter_1 = require("../../network/APIRouter");
var Scale_1 = require("../../tools/Scale");
var tars_1 = require("../../tools/tars");
var Button_1 = require("../../views/tars/Button");
var RightIcon = function (_a) {
    var openEyeColor = _a.openEyeColor, closeEyeColor = _a.closeEyeColor, showRightIcon = _a.showRightIcon, rightIconType = _a.rightIconType, renderRightIcon = _a.renderRightIcon, showContent = _a.showContent, onPressEye = _a.onPressEye, onPressSms = _a.onPressSms, rightIconProps = _a.rightIconProps;
    if (showRightIcon) {
        if (renderRightIcon) {
            return renderRightIcon();
        }
        else {
            switch (rightIconType) {
                case 'eye':
                    return <Ionicons_1.default name={showContent ? 'ios-eye' : 'ios-eye-off'} size={Scale_1.scale(40)} color={showContent ? openEyeColor : closeEyeColor} onPress={onPressEye} {...rightIconProps}/>;
                case 'sms':
                    return (<Button_1.default title={'获取验证码'} onPress={onPressSms} titleStyle={{ fontSize: Scale_1.scale(20) }} containerStyle={{
                        aspectRatio: 4,
                        width: Scale_1.scale(150),
                        backgroundColor: '#F1E1FF',
                        borderRadius: Scale_1.scale(5),
                    }}/>);
                default:
                    return null;
            }
        }
    }
    else {
        return null;
    }
};
var LeftIcon = function (_a) {
    var leftIconProps = _a.leftIconProps, showLeftIcon = _a.showLeftIcon, renderLeftIcon = _a.renderLeftIcon, leftIconName = _a.leftIconName;
    if (showLeftIcon) {
        if (renderLeftIcon) {
            return renderLeftIcon();
        }
        else {
            return <react_native_elements_1.Icon name={leftIconName} type={'feather'} color={'#d9d9d9'} size={Scale_1.scale(30)} {...leftIconProps}/>;
        }
    }
    else {
        return null;
    }
};
var FormComponent = function (_a) {
    var value = _a.value, onChangeText = _a.onChangeText, placeholder = _a.placeholder, _b = _a.showRightIcon, showRightIcon = _b === void 0 ? false : _b, label = _a.label, visible = _a.visible, containerStyle = _a.containerStyle, _c = _a.showLabel, showLabel = _c === void 0 ? true : _c, renderRightIcon = _a.renderRightIcon, renderLeftIcon = _a.renderLeftIcon, maxLength = _a.maxLength, leftIconName = _a.leftIconName, labelTextStyle = _a.labelTextStyle, _d = _a.showLeftIcon, showLeftIcon = _d === void 0 ? true : _d, inputContainerStyle = _a.inputContainerStyle, inputStyle = _a.inputStyle, formStyle = _a.formStyle, defaultValue = _a.defaultValue, rightIconType = _a.rightIconType, leftIconContainerStyle = _a.leftIconContainerStyle, rightIconContainerStyle = _a.rightIconContainerStyle, leftIconProps = _a.leftIconProps, rightIconProps = _a.rightIconProps, _e = _a.placeholderTextColor, placeholderTextColor = _e === void 0 ? '#000000' : _e, _f = _a.openEyeColor, openEyeColor = _f === void 0 ? '#84C1FF' : _f, _g = _a.closeEyeColor, closeEyeColor = _g === void 0 ? '#d9d9d9' : _g, onFocus = _a.onFocus, onBlur = _a.onBlur;
    var _h = react_1.useState(false), showContent = _h[0], setShowContent = _h[1];
    var phoneNumber = react_1.useRef('');
    var fetchSms = function () { return __awaiter(void 0, void 0, void 0, function () {
        var data, _a, code, msg, error_1;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, APIRouter_1.default.secure_smsCaptcha(phoneNumber.current)];
                case 1:
                    data = (_b.sent()).data;
                    _a = data !== null && data !== void 0 ? data : {}, code = _a.code, msg = _a.msg;
                    if (code != 0) {
                        throw { message: msg };
                    }
                    else {
                        tars_1.ToastSuccess(msg);
                    }
                    return [3 /*break*/, 3];
                case 2:
                    error_1 = _b.sent();
                    tars_1.ToastError(error_1 === null || error_1 === void 0 ? void 0 : error_1.message);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    }); };
    if (visible) {
        return (<react_native_1.View style={[styles.container, containerStyle]}>
        <react_native_elements_1.Input style={[
            {
                height: '50%',
                width: '100%',
            },
            styles.zero,
            formStyle,
        ]} defaultValue={defaultValue} inputContainerStyle={[styles.zero, inputContainerStyle]} inputStyle={[styles.inputStyle, inputStyle]} maxLength={maxLength} placeholder={placeholder} containerStyle={[styles.containerStyle]} placeholderTextColor={placeholderTextColor} leftIcon={<LeftIcon leftIconProps={leftIconProps} leftIconName={leftIconName} renderLeftIcon={renderLeftIcon} showLeftIcon={showLeftIcon}/>} rightIcon={<RightIcon openEyeColor={openEyeColor} closeEyeColor={closeEyeColor} showContent={showContent} showRightIcon={showRightIcon} rightIconType={rightIconType} onPressEye={function () { return setShowContent(!showContent); }} onPressSms={fetchSms} renderRightIcon={renderRightIcon} rightIconProps={rightIconProps}/>} leftIconContainerStyle={[styles.leftIconContainerStyle, leftIconContainerStyle]} rightIconContainerStyle={rightIconContainerStyle} value={value} onChangeText={rightIconType == 'sms'
            ? function (value) {
                phoneNumber.current = value;
                onChangeText && onChangeText();
            }
            : onChangeText} secureTextEntry={rightIconType == 'eye' ? !showContent : false} onFocus={onFocus} onBlur={onBlur}/>
        {showLabel ? <react_native_1.Text style={[styles.labelText, labelTextStyle]}>{label}</react_native_1.Text> : null}
      </react_native_1.View>);
    }
    else {
        return null;
    }
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
    },
    labelText: {
        fontSize: Scale_1.scale(15),
        color: 'red',
        fontWeight: '100',
        marginTop: Scale_1.scale(10),
    },
    leftIconContainerStyle: {
        marginLeft: 0,
        marginRight: 5,
        alignItems: 'center',
        width: Scale_1.scale(40),
    },
    inputStyle: {
        fontSize: Scale_1.scale(19),
        fontWeight: '300',
        color: '#000000',
    },
    zero: {
        paddingLeft: 0,
        paddingRight: 0,
        marginLeft: 0,
        marginRight: 0,
        paddingHorizontal: 0,
        marginHorizontal: 0,
        padding: 0,
        margin: 0,
    },
    containerStyle: {
        paddingLeft: 0,
        paddingRight: 0,
    },
});
exports.default = FormComponent;
