"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var FUtils_1 = require("../tools/FUtils");
var UGTextField = /** @class */ (function (_super) {
    __extends(UGTextField, _super);
    function UGTextField(props) {
        var _this = _super.call(this, props) || this;
        _this.code = '';
        _this.state = { text: null, secureTextEntry: !!props.secureTextEntry };
        var iconSize = 20;
        var defaultProps = {
            styleType: '圆角背景样式',
            containerStyle: [{ marginTop: 12, height: 45, backgroundColor: 'rgba(0, 0, 0, 0.6)', borderRadius: 22.5, overflow: 'hidden' }],
            inputStyle: { marginLeft: 8, height: 45, color: 'white', fontSize: 15 },
            leftIconContainerStyle: { marginLeft: 2, width: iconSize + 10, height: iconSize },
            placeholderTextColor: 'rgba(255, 255, 255, 0.3)',
            clearButtonMode: 'while-editing',
        };
        if (props.styleType == '下划线样式') {
            defaultProps = FUtils_1.deepMergeProps(defaultProps, { containerStyle: { backgroundColor: 'transparent', height: 50 } });
        }
        var other = (function () {
            switch (props.type) {
                case '推荐人ID':
                    return {
                        placeholder: '推荐人ID',
                        leftIcon: { name: 'user', type: 'font-awesome', color: 'rgba(255, 255, 255, 0.6)', size: iconSize },
                        keyboardType: 'number-pad',
                        onlyIntegerAndLetter: true,
                    };
                case '账号':
                    return {
                        placeholder: '请输入账号',
                        leftIcon: { name: 'user', type: 'font-awesome', color: 'rgba(255, 255, 255, 0.6)', size: iconSize },
                        keyboardType: 'email-address',
                        onlyIntegerAndLetter: true,
                    };
                case '密码':
                    return {
                        placeholder: '请输入密码',
                        leftIcon: { name: 'lock', type: 'material', color: 'rgba(255, 255, 255, 0.6)', size: iconSize },
                        rightIcon: (<_this.Eye secureTextEntry={true} didClick={function (selected) {
                            _this.newProps.secureTextEntry = selected;
                            _this.setState({});
                        }}/>),
                        secureTextEntry: true,
                        rightIconContainerStyle: { marginLeft: -6, marginRight: 3, height: iconSize },
                        keyboardType: 'email-address',
                        onlyVisibleASCII: true,
                    };
                case '真实姓名':
                    return {
                        placeholder: '真实姓名',
                        leftIcon: { name: 'user', type: 'font-awesome', color: 'rgba(255, 255, 255, 0.6)', size: iconSize },
                    };
                case 'QQ':
                    return {
                        placeholder: 'QQ号',
                        leftIcon: { name: 'qq', type: 'font-awesome', color: 'rgba(255, 255, 255, 0.6)', size: iconSize },
                        keyboardType: 'number-pad',
                        onlyInteger: true,
                    };
                case '微信':
                    return {
                        placeholder: '微信号',
                        leftIcon: { name: 'wechat', type: 'font-awesome', color: 'rgba(255, 255, 255, 0.6)', size: iconSize },
                        keyboardType: 'email-address',
                    };
                case '邮箱':
                    return {
                        placeholder: '邮箱地址',
                        leftIcon: { name: 'mail', type: 'entypo', color: 'rgba(255, 255, 255, 0.6)', size: iconSize },
                        keyboardType: 'email-address',
                    };
                case '手机号':
                    return {
                        placeholder: '手机号',
                        leftIcon: { name: 'device-mobile', type: 'octicon', color: 'rgba(255, 255, 255, 0.6)', size: iconSize },
                        keyboardType: 'phone-pad',
                        onlyInteger: true,
                    };
                case '字母验证码':
                    return {
                        placeholder: '验证码',
                        keyboardType: 'email-address',
                        onlyIntegerAndLetter: true,
                        leftIcon: { name: 'Safety', type: 'antdesign', color: 'rgba(255, 255, 255, 0.6)', size: iconSize },
                        rightIcon: (<_this.LetterVerificationCode didClick={function (code) {
                            _this.code = code;
                        }}/>),
                    };
                case '短信验证码':
                    return {
                        placeholder: '验证码',
                        keyboardType: 'email-address',
                        onlyIntegerAndLetter: true,
                        leftIcon: { name: 'Safety', type: 'antdesign', color: 'rgba(255, 255, 255, 0.6)', size: iconSize },
                        rightIcon: <_this.SysButton didClick={_this.props.didSmsButtonClick}/>,
                    };
                default:
                    return {};
            }
        })();
        _this.newProps = FUtils_1.deepMergeProps(defaultProps, other);
        return _this;
    }
    UGTextField.prototype.SysButton = function (props) {
        var didClick = props.didClick;
        var _a = react_1.useState(59), count = _a[0], setCount = _a[1];
        var _b = react_1.useState(0), willCountdown = _b[0], setWillCountdown = _b[1];
        var title = '发送验证码';
        var disabled = false;
        if (willCountdown) {
            title = count + "\u79D2\u540E\u91CD\u65B0\u83B7\u53D6";
            disabled = true;
            setTimeout(function () {
                if (count == 1) {
                    setCount(59);
                    setWillCountdown(0);
                }
                else {
                    setCount(count - 1);
                }
            }, 1000);
        }
        return (<react_native_elements_1.Button title={title} disabled={disabled} disabledStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.2)' }} disabledTitleStyle={{ color: '#CCC' }} buttonStyle={{ marginRight: 3, backgroundColor: 'rgba(255, 255, 255, 0.25)' }} titleStyle={{ fontSize: 11 }} onPress={function () {
            didClick &&
                didClick(function () {
                    setWillCountdown(1);
                });
        }}/>);
    };
    // 安全输入的眼睛图标
    UGTextField.prototype.Eye = function (props) {
        var secureTextEntry = props.secureTextEntry, didClick = props.didClick;
        var _a = react_1.useState(secureTextEntry), selected = _a[0], setSelected = _a[1];
        var name = selected ? 'md-eye-off' : 'md-eye';
        return (<react_native_gesture_handler_1.TouchableOpacity onPress={function () {
            setSelected((selected = !selected));
            didClick(selected);
        }}>
        <react_native_elements_1.Icon name={name} type="ionicon" size={22} color="rgba(255, 255, 255, 0.3)" containerStyle={{ marginLeft: 15, marginRight: 4 }}/>
      </react_native_gesture_handler_1.TouchableOpacity>);
    };
    // 验证码
    UGTextField.prototype.LetterVerificationCode = function (props) {
        var _a = react_1.useState(0), count = _a[0], setCount = _a[1];
        var code = '';
        var codeLength = 4; //验证码的长度，可变
        var selectChar = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        for (var i = 0; i < codeLength; i++) {
            var charIndex = Math.floor(Math.random() * selectChar.length);
            code += selectChar[charIndex];
        }
        return (<react_native_1.Text style={{
            color: 'white',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            paddingVertical: 6.5,
            paddingLeft: 12,
            paddingRight: 8,
            borderRadius: 8,
            overflow: 'hidden',
            fontWeight: '600',
            fontStyle: 'italic',
            letterSpacing: 3,
            marginRight: 3,
        }} onPress={function () {
            setCount(count + 1);
            props.didClick(code);
        }}>
        {code}
      </react_native_1.Text>);
    };
    // 刷新UI
    UGTextField.prototype.render = function () {
        var _this = this;
        var _a;
        var props = FUtils_1.deepMergeProps(this.newProps, this.props);
        if (this.props.hidden) {
            FUtils_1.deepMergeProps(props, { containerStyle: { marginTop: 0, height: 0 } });
        }
        return (<react_native_elements_1.Input {...props} value={(_a = this.state.text) !== null && _a !== void 0 ? _a : null} onChangeText={function (text) {
            var _a, _b, _c, _d;
            var _e = _this.newProps, onlyNumbers = _e.onlyInteger, onlyNumbersWithDecimals = _e.onlyNumber, onlyNumbersAndLetters = _e.onlyIntegerAndLetter, onlyVisibleASCII = _e.onlyVisibleASCII, _f = _e.additionalAllowedCharacters, chars = _f === void 0 ? '' : _f, forbiddenCharacters = _e.forbiddenCharacters;
            // 禁用指定字符
            if (forbiddenCharacters) {
                text = text.replace(new RegExp("[" + forbiddenCharacters + "]+"), '');
            }
            var reg = null;
            // 仅数字
            if (onlyNumbers) {
                reg = "[0-9" + chars + "]*";
            }
            // 仅数字含小数
            else if (onlyNumbersWithDecimals) {
                text = (_b = (_a = text.match(new RegExp("[0-9." + chars + "]*", 'g'))) === null || _a === void 0 ? void 0 : _a.join('')) !== null && _b !== void 0 ? _b : '';
                reg = "^[0-9]*[.]?[0-9" + chars + "]{0," + onlyNumbersWithDecimals + "}";
            }
            // 仅数字加字母
            else if (onlyNumbersAndLetters) {
                reg = "[0-9A-Za-z" + chars + "]*";
            }
            // 仅可见的ASCII码
            else if (onlyVisibleASCII) {
                reg = "[ -~" + chars + "]*";
            }
            if (reg) {
                text = (_d = (_c = text.match(new RegExp(reg, 'g'))) === null || _c === void 0 ? void 0 : _c.join('')) !== null && _d !== void 0 ? _d : '';
            }
            _this.setState({ text: text });
            // 回调
            _this.props.onChangeText && _this.props.onChangeText(text);
        }}/>);
    };
    return UGTextField;
}(react_1.Component));
exports.default = UGTextField;
