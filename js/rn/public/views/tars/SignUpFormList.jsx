"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var AgentButtonComponent_1 = require("../../components/tars/AgentButtonComponent");
var ReloadSlidingVerification_1 = require("../../components/tars/ReloadSlidingVerification");
var Scale_1 = require("../../tools/Scale");
var SignUpFormList = function (_a) {
    var slideCodeColor = _a.slideCodeColor, show = _a.show, onChange = _a.onChange, label = _a.label, slideCodeRef = _a.slideCodeRef, passwordLimit = _a.passwordLimit, _b = _a.Form, Form = _b === void 0 ? function () {
        return null;
    } : _b;
    var showRecommendGuy = show.showRecommendGuy, showName = show.showName, showFundPassword = show.showFundPassword, showQQ = show.showQQ, showWx = show.showWx, showEmail = show.showEmail, showPhoneNumber = show.showPhoneNumber, showSms = show.showSms, showSlideCode = show.showSlideCode, showAgentButton = show.showAgentButton;
    var onChangeRecommendGuy = onChange.onChangeRecommendGuy, obChangeAccount = onChange.obChangeAccount, obChangePassword = onChange.obChangePassword, onChangeConfirmPassword = onChange.onChangeConfirmPassword, onChaneRealName = onChange.onChaneRealName, onChaneFundPassword = onChange.onChaneFundPassword, onChaneQQ = onChange.onChaneQQ, onChaneWeChat = onChange.onChaneWeChat, onChanePhone = onChange.onChanePhone, onChangeEmail = onChange.onChangeEmail, onChaneSms = onChange.onChaneSms, onChangeSlideCode = onChange.onChangeSlideCode, onChangeAgent = onChange.onChangeAgent;
    var recommendGuyLabel = label.recommendGuyLabel, passwordLebel = label.passwordLebel, confirmPasswordLabel = label.confirmPasswordLabel, fundPasswordLabel = label.fundPasswordLabel, nameLabel = label.nameLabel, emailLabel = label.emailLabel, phoneNumberLabel = label.phoneNumberLabel, wxLabel = label.wxLabel, qqLabel = label.qqLabel;
    var maxLength = passwordLimit.maxLength;
    return (<>
      <Form leftIconName={'users'} onChangeText={onChangeRecommendGuy} label={recommendGuyLabel} placeholder={'推荐人ID'} leftIconTitle={'推荐人'} visible={showRecommendGuy}/>
      <Form onChangeText={obChangeAccount} label={'*请使用6-15位英文或数字的组合'} placeholder={'帐号'} visible={true} leftIconName={'users'} leftIconTitle={'用户帐号'}/>
      <Form leftIconName={'lock'} onChangeText={obChangePassword} label={passwordLebel} placeholder={'密码'} showRightIcon visible={true} maxLength={maxLength} rightIconType={'eye'} leftIconTitle={'登录密码'}/>
      <Form leftIconName={'lock'} onChangeText={onChangeConfirmPassword} label={confirmPasswordLabel} placeholder={'确认密码'} showRightIcon visible={true} rightIconType={'eye'} leftIconTitle={'确认密码'}/>
      <Form leftIconName={'user'} onChangeText={onChaneRealName} label={nameLabel} placeholder={'真实姓名'} visible={showName} leftIconTitle={'真实姓名'}/>
      <Form leftIconName={'lock'} onChangeText={onChaneFundPassword} label={fundPasswordLabel} placeholder={'取款密码'} showRightIcon visible={showFundPassword} maxLength={4} rightIconType={'eye'} leftIconTitle={'取款密码'}/>
      <Form leftIconProps={{
        name: 'QQ',
        type: 'antdesign',
    }} onChangeText={onChaneQQ} label={qqLabel} placeholder={'QQ号'} visible={showQQ} leftIconTitle={'QQ号'}/>
      <Form leftIconProps={{
        name: 'wechat',
        type: 'font-awesome',
    }} onChangeText={onChaneWeChat} label={wxLabel} placeholder={'微信号'} leftIconTitle={'微信号'} visible={showWx}/>
      <Form leftIconName={'smartphone'} onChangeText={onChanePhone} label={phoneNumberLabel} placeholder={'手机号'} visible={showPhoneNumber} leftIconTitle={'手机号码'}/>
      <Form leftIconProps={{
        type: 'material-community',
        name: 'email-outline',
    }} onChangeText={onChangeEmail} label={emailLabel} placeholder={'电子邮箱'} leftIconTitle={'电子邮箱'} visible={showEmail}/>
      <Form leftIconName={'lock'} onChangeText={onChaneSms} placeholder={'短信验证码'} visible={showSms} showRightIcon={true} rightIconType={'sms'} leftIconTitle={'验证码'}/>
      <AgentButtonComponent_1.default visible={showAgentButton} onChangeAgent={onChangeAgent} containerStyle={{ marginVertical: Scale_1.scale(20) }}/>
      <ReloadSlidingVerification_1.default ref={slideCodeRef} show={showSlideCode} onChange={onChangeSlideCode} backgroundColor={slideCodeColor} containerStyle={{
        backgroundColor: slideCodeColor,
    }}/>
    </>);
};
exports.default = SignUpFormList;
