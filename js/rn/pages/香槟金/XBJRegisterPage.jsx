"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.XBJRegisterPage = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_gesture_handler_1 = require("react-native-gesture-handler");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_native_linear_gradient_1 = require("react-native-linear-gradient");
var react_native_elements_1 = require("react-native-elements");
var react_native_webview_1 = require("react-native-webview");
var NetworkRequest1_1 = require("../../public/network/NetworkRequest1");
var AppDefine_1 = require("../../public/define/AppDefine");
var UGTextField_1 = require("../../public/widget/UGTextField");
var Navigation_1 = require("../../public/navigation/Navigation");
var OCHelper_1 = require("../../public/define/OCHelper/OCHelper");
var UGStore_1 = require("../../redux/store/UGStore");
var UGSkinManagers_1 = require("../../public/theme/UGSkinManagers");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var ToastUtils_1 = require("../../public/tools/ToastUtils");
// 滑动验证
function SlidingVerification(props) {
    return (<react_native_1.View style={{ marginTop: 13, height: props.hidden ? 0 : 52, borderRadius: 26, overflow: 'hidden' }}>
      <react_native_webview_1.default style={{ marginLeft: -15, marginRight: -14, marginTop: -22, flex: 1 }} javaScriptEnabled startInLoadingState source={{ uri: AppDefine_1.default.host + "/dist/index.html#/swiperverify?platform=native" }} onMessage={function (e) {
        console.log('e=');
        console.log(e);
    }}/>
    </react_native_1.View>);
}
exports.XBJRegisterPage = function (props) {
    var setProps = props.setProps, v = props.vars;
    react_1.useEffect(function () {
        setProps({
            backgroundColor: UGSkinManagers_1.Skin1.bgColor,
            navbarOpstions: { hidden: true, backgroundColor: 'transparent', hideUnderline: true, back: true },
            accountErr: '',
        });
    }, []);
    function onRegisterBtnClick() {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x, _y, _z;
        var _0 = props.sysConf, hide_reco = _0.hide_reco, // 代理人 0不填，1选填，2必填
        reg_name = _0.reg_name, // 真实姓名 0不填，1选填，2必填
        reg_fundpwd = _0.reg_fundpwd, // 取款密码 0不填，1选填，2必填
        reg_qq = _0.reg_qq, // QQ 0不填，1选填，2必填
        reg_wx = _0.reg_wx, // 微信 0不填，1选填，2必填
        reg_phone = _0.reg_phone, // 手机 0不填，1选填，2必填
        reg_email = _0.reg_email, // 邮箱 0不填，1选填，2必填
        pass_limit = _0.pass_limit, // 注册密码强度，0、不限制；1、数字字母；2、数字字母符合
        reg_vcode = _0.reg_vcode, // 0无验证码，1图形验证码 2滑块验证码 3点击显示图形验证码
        smsVerify = _0.smsVerify, // 是否需要短信验证码
        pass_length_min = _0.pass_length_min, pass_length_max = _0.pass_length_max;
        var err;
        var pwdWrongLength = ((_a = v.pwd1) === null || _a === void 0 ? void 0 : _a.length) < pass_length_min || ((_b = v.pwd1) === null || _b === void 0 ? void 0 : _b.length) > pass_length_max;
        if (hide_reco == 2) {
            err = !((_c = v.referrerId) === null || _c === void 0 ? void 0 : _c.length) ? '请输入推荐人ID' : undefined;
            err = ((_d = v.referrerId) === null || _d === void 0 ? void 0 : _d.length) > 10 ? '长度在1到10之间' : undefined;
        }
        else if (!((_e = v.account) === null || _e === void 0 ? void 0 : _e.trim().length)) {
            err = '请输入账号';
        }
        else if (((_f = v.account) === null || _f === void 0 ? void 0 : _f.length) < 6 || ((_g = v.account) === null || _g === void 0 ? void 0 : _g.length) > 15 || !((_h = v.account) === null || _h === void 0 ? void 0 : _h.isIntegerAndLetter)) {
            err = '请输入6-15位英文或数字的组合的用户名';
        }
        else if (!((_j = v.pwd1) === null || _j === void 0 ? void 0 : _j.length)) {
            err = '请输入密码';
        }
        else if (!((_k = v.pwd2) === null || _k === void 0 ? void 0 : _k.length)) {
            err = '请输入确认密码';
        }
        else if (v.pwd1 !== v.pwd2) {
            err = '两次输入的密码不一致';
        }
        else if (pass_limit == 1) {
            if (pwdWrongLength || !((_l = v.pwd1) === null || _l === void 0 ? void 0 : _l.isIntegerAndLetter)) {
                err = "\u8BF7\u8F93\u5165" + pass_length_min + "\u5230" + pass_length_max + "\u4F4D\u6570\u5B57\u5B57\u6BCD\u7EC4\u6210\u7684\u5BC6\u7801";
            }
        }
        else if (pass_limit == 2) {
            if (pwdWrongLength || !((_m = v.pwd1) === null || _m === void 0 ? void 0 : _m.isVisibleASCII)) {
                err = "\u8BF7\u8F93\u5165" + pass_length_min + "\u5230" + pass_length_max + "\u4F4D\u6570\u5B57\u5B57\u6BCD\u7B26\u53F7\u7EC4\u6210\u7684\u5BC6\u7801";
            }
        }
        else if (pwdWrongLength) {
            err = "\u8BF7\u8F93\u5165" + pass_length_min + "\u5230" + pass_length_max + "\u4F4D\u957F\u5EA6\u7684\u5BC6\u7801";
        }
        else if (reg_name == 2) {
            err = !((_o = v.realname) === null || _o === void 0 ? void 0 : _o.length) ? '请输入真实姓名' : undefined;
            err = ((_p = v.realname) === null || _p === void 0 ? void 0 : _p.length) < 2 || !((_q = v.realname) === null || _q === void 0 ? void 0 : _q.isChinese) ? '请输入正确的真实姓名' : undefined;
        }
        else if (reg_qq == 2 && !((_r = v.qq) === null || _r === void 0 ? void 0 : _r.length)) {
            err = '请输入QQ号';
        }
        else if (reg_wx == 2 && !((_s = v.wechat) === null || _s === void 0 ? void 0 : _s.length)) {
            err = '请输入微信号';
        }
        else if (reg_phone == 2) {
            err = !((_t = v.phone) === null || _t === void 0 ? void 0 : _t.length) ? '请输入手机号' : undefined;
            err = !((_u = v.phone) === null || _u === void 0 ? void 0 : _u.isMobile) ? '请输入正确的手机号' : undefined;
        }
        else if (reg_email == 2) {
            err = !((_v = v.email) === null || _v === void 0 ? void 0 : _v.length) ? '请输入邮箱' : undefined;
            err = !((_w = v.email) === null || _w === void 0 ? void 0 : _w.isEmail) ? '请输入正确的邮箱' : undefined;
        }
        else if (reg_fundpwd == 2 && ((_x = v.fundPwd) === null || _x === void 0 ? void 0 : _x.length) < 4) {
            err = '请输入4位数字的取款密码';
        }
        else if (reg_vcode == 1 && !((_y = v.letterCode) === null || _y === void 0 ? void 0 : _y.length)) {
            err = '请输入验证码';
        }
        else if (smsVerify && !((_z = v.smsCode) === null || _z === void 0 ? void 0 : _z.length)) {
            err = '请输入短信验证码';
        }
        if (err) {
            switch (react_native_1.Platform.OS) {
                case 'ios':
                    OCHelper_1.OCHelper.call('HUDHelper.showMsg:', [err]);
                    break;
                case 'android':
                    ToastUtils_1.Toast(err);
                    break;
            }
            return;
        }
        // 注册
        NetworkRequest1_1.default.user_reg({
            inviter: v.referrerId,
            usr: v.account,
            pwd: v.pwd1.md5(),
            fundPwd: v.fundPwd.md5(),
            fullName: v.realname,
            qq: v.qq,
            wx: v.wechat,
            phone: v.phone,
            smsCode: v.smsCode,
            imgCode: v.letterCode,
            slideCode: v.slideCode,
            email: v.email,
            regType: props.isAgent ? 'agent' : 'user',
        })
            .then(function (data) {
            console.log(data);
        })
            .catch(function (err) {
            switch (react_native_1.Platform.OS) {
                case 'ios':
                    OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [err.message]);
                    break;
                case 'android':
                    ToastUtils_1.Toast(err.message);
                    break;
            }
        });
    }
    var _a = UGStore_1.UGStore.globalProps.sysConf, _b = _a.agentRegbutton, agentRegbutton = _b === void 0 ? '1' : _b, hide_reco = _a.hide_reco, reg_name = _a.reg_name, reg_fundpwd = _a.reg_fundpwd, reg_qq = _a.reg_qq, reg_wx = _a.reg_wx, reg_phone = _a.reg_phone, reg_email = _a.reg_email, reg_vcode = _a.reg_vcode, smsVerify = _a.smsVerify;
    var selectedColor = 'rgba(0, 0, 0, 0.5)';
    return (<react_native_gesture_handler_1.ScrollView style={{ paddingTop: 50, paddingBottom: 100 }}>
      <react_native_fast_image_1.default source={{ uri: 'https://i.ibb.co/PrsPnxF/m-logo.png' }} style={{ marginLeft: AppDefine_1.default.width * 0.5 - 50, width: 100, height: 36 }}/>
      <react_native_1.View style={{ marginLeft: 24, marginTop: 56, width: AppDefine_1.default.width - 48, borderRadius: 8, overflow: 'hidden', flexDirection: 'row' }}>
        <react_native_gesture_handler_1.TouchableOpacity style={{ width: 52, flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)', justifyContent: 'center' }} activeOpacity={1} onPress={function () {
        RootNavigation_1.navigate(Navigation_1.PageName.XBJLoginPage);
    }}>
          <react_native_fast_image_1.default source={{ uri: 'https://i.ibb.co/W2tbj1Q/entry-login-toggle-btn.png' }} style={{ marginLeft: 17, width: 20, height: 20, opacity: 0.6 }}/>
          <react_native_1.Text style={{ marginLeft: 18, marginTop: 20, width: 20, fontSize: 16, lineHeight: 30, color: 'white', opacity: 0.6 }}>返回登录</react_native_1.Text>
        </react_native_gesture_handler_1.TouchableOpacity>
        <react_native_1.View style={{ flex: 1, backgroundColor: 'rgba(255, 255, 255, 0.3)', padding: 24 }}>
          <react_native_1.Text style={{ fontSize: 20, fontWeight: '500', color: 'white', textAlign: 'center' }}>注册</react_native_1.Text>
          <react_native_1.View style={{
        marginTop: agentRegbutton == '1' ? 20 : 0,
        marginBottom: 12,
        flexDirection: 'row',
        height: agentRegbutton == '1' ? 40 : 0,
        borderRadius: 21,
        borderWidth: agentRegbutton == '1' ? 1 : 0,
        borderColor: selectedColor,
        overflow: 'hidden',
    }}>
            <react_native_elements_1.Button title="用户注册" containerStyle={{ flex: 1 }} buttonStyle={{ borderRadius: 0, backgroundColor: props.isAgent ? 'transparent' : selectedColor }} titleStyle={{ fontWeight: props.isAgent ? '400' : '500', color: props.isAgent ? selectedColor : 'white' }} onPress={function () {
        setProps({ isAgent: false });
    }}/>
            <react_native_elements_1.Button title="代理注册" containerStyle={{ flex: 1 }} buttonStyle={{ borderRadius: 0, backgroundColor: !props.isAgent ? 'transparent' : selectedColor }} titleStyle={{ fontWeight: !props.isAgent ? '400' : '500', color: !props.isAgent ? selectedColor : 'white' }} onPress={function () {
        setProps({ isAgent: true });
    }}/>
          </react_native_1.View>
          <UGTextField_1.default type="推荐人ID" placeholder={'推荐人ID' + (hide_reco == 1 ? '（选填）' : '')} hidden={!hide_reco} onChangeText={function (text) {
        v.referrerId = text;
    }}/>
          <UGTextField_1.default type="账号" placeholder="账号长度为6-15位" errorMessage="用户名: 为 6-15 位字母与数字组成" onEndEditing={function () {
        if (v.account.length) {
            var tmpAccount = v.account;
            NetworkRequest1_1.default.user_exists(tmpAccount)
                .then(function () {
                setProps({ accountErr: null });
            })
                .catch(function (err) {
                if (v.account === tmpAccount) {
                    setProps({ accountErr: err.message });
                }
            });
        }
        else {
            setProps({ accountErr: null });
        }
    }} onChangeText={function (text) {
        v.account = text;
    }}/>
          <react_native_1.Text style={{ marginRight: 5, marginTop: props.accountErr ? 5 : 0, height: props.accountErr ? 18 : 0, color: 'red', textAlign: 'right', fontSize: 12 }}>
            {props.accountErr}
          </react_native_1.Text>
          <UGTextField_1.default type="密码" onChangeText={function (text) {
        v.pwd1 = text;
    }}/>
          <UGTextField_1.default type="密码" placeholder="请输入确认密码" onChangeText={function (text) {
        v.pwd2 = text;
    }}/>
          <UGTextField_1.default type="真实姓名" placeholder={'真实姓名' + (reg_name == 1 ? '（选填）' : '')} hidden={!reg_name} onChangeText={function (text) {
        v.realname = text;
    }}/>
          <UGTextField_1.default type="QQ" placeholder={'QQ号' + (reg_qq == 1 ? '（选填）' : '')} hidden={!reg_qq} onChangeText={function (text) {
        v.qq = text;
    }}/>
          <UGTextField_1.default type="微信" placeholder={'微信号' + (reg_wx == 1 ? '（选填）' : '')} hidden={!reg_wx} onChangeText={function (text) {
        v.wechat = text;
    }}/>
          <UGTextField_1.default type="邮箱" placeholder={'邮箱地址' + (reg_email == 1 ? '（选填）' : '')} hidden={!reg_email} onChangeText={function (text) {
        v.email = text;
    }}/>
          <UGTextField_1.default type="手机号" placeholder={'手机号' + (reg_phone == 1 ? '（选填）' : '')} hidden={!reg_phone} onChangeText={function (text) {
        v.phone = text;
    }}/>
          <UGTextField_1.default type="短信验证码" hidden={!smsVerify} didSmsButtonClick={function (startCountdown) {
        NetworkRequest1_1.default.secure_smsCaptcha(v.phone)
            .then(function () {
            startCountdown();
        })
            .catch(function (err) {
            switch (react_native_1.Platform.OS) {
                case 'ios':
                    OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [err.message]);
                    break;
                case 'android':
                    ToastUtils_1.Toast(err.message);
                    break;
            }
        });
    }} onChangeText={function (text) {
        v.smsCode = text;
    }}/>
          <UGTextField_1.default type="字母验证码" hidden={reg_vcode != 1} onChangeText={function (text) {
        v.letterCode = text;
    }}/>
          <UGTextField_1.default type="密码" maxLength={4} placeholder={'取款密码' + (reg_fundpwd == 1 ? '（选填）' : '')} hidden={!reg_fundpwd} keyboardType="number-pad" onChangeText={function (text) {
        v.fundPwd = text;
    }}/>
          <SlidingVerification hidden={reg_vcode != 2}/>
          <react_native_elements_1.Button style={{ marginTop: 24 }} buttonStyle={{ borderRadius: 20, height: 40, borderWidth: 0.5, borderColor: '#B0937D' }} ViewComponent={react_native_linear_gradient_1.default} linearGradientProps={{ colors: ['#B0937D', '#997961'], start: { x: 0, y: 1 }, end: { x: 1, y: 1 } }} titleStyle={{ fontSize: 16 }} title="注册" onPress={onRegisterBtnClick}/>
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.View style={{ height: 200 }}/>
    </react_native_gesture_handler_1.ScrollView>);
};
