"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ReloadSlidingVerification_1 = require("../../components/tars/ReloadSlidingVerification");
var Scale_1 = require("../../tools/Scale");
var CheckBox_1 = require("./CheckBox");
var SignInFormList = function (_a) {
    var slideCodeRef = _a.slideCodeRef, value = _a.value, onChange = _a.onChange, show = _a.show, Form = _a.Form, slideCodeColor = _a.slideCodeColor, _b = _a.showCheckBox, showCheckBox = _b === void 0 ? true : _b;
    var remember = value.remember, account = value.account, password = value.password;
    var onChangePassword = onChange.onChangePassword, onChangeAccount = onChange.onChangeAccount, onChangeRemember = onChange.onChangeRemember, onChangeSlideCode = onChange.onChangeSlideCode;
    var loginVCode = show.loginVCode;
    return (<>
      <Form visible={true} placeholder={'请输入会员帐号'} onChangeText={onChangeAccount} leftIconProps={{
        name: 'user-circle',
        type: 'font-awesome',
    }} defaultValue={account} showLabel={false} leftIconTitle={'帐号'}/>
      <Form showLabel={false} visible={true} placeholder={'请输入密码'} leftIconProps={{
        name: 'unlock-alt',
        type: 'font-awesome',
    }} onChangeText={onChangePassword} showRightIcon defaultValue={password} rightIconType={'eye'} leftIconTitle={'密码'}/>
      {showCheckBox && <CheckBox_1.default onPress={onChangeRemember} label={'记住密码'} containerStyle={{ alignSelf: 'flex-start', marginTop: Scale_1.scale(10) }} defaultValue={remember}/>}
      <ReloadSlidingVerification_1.default ref={slideCodeRef} show={loginVCode} onChange={onChangeSlideCode} backgroundColor={slideCodeColor} containerStyle={{
        backgroundColor: slideCodeColor,
    }}/>
    </>);
};
exports.default = SignInFormList;
