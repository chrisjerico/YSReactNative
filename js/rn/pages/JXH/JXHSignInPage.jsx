"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var FormComponent_1 = require("../../public/components/tars/FormComponent");
var useSignInPage_1 = require("../../public/hooks/tars/useSignInPage");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var Scale_1 = require("../../public/tools/Scale");
var Button_1 = require("../../public/views/tars/Button");
var CheckBox_1 = require("../../public/views/tars/CheckBox");
var LinearBadge_1 = require("../../public/views/tars/LinearBadge");
var MineHeader_1 = require("../../public/views/tars/MineHeader");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var SignInFormList_1 = require("../../public/views/tars/SignInFormList");
var JXHSignInPage = function () {
    var _a = useSignInPage_1.default({
        homePage: Navigation_1.PageName.JXHHomePage,
        signUpPage: Navigation_1.PageName.JXHSignUpPage,
    }), sign = _a.sign, value = _a.value, onChange = _a.onChange, navigateTo = _a.navigateTo, show = _a.show, slideCodeRef = _a.slideCodeRef;
    var navigateToSignUpPage = navigateTo.navigateToSignUpPage;
    var signIn = sign.signIn;
    var onChangeRemember = onChange.onChangeRemember;
    var remember = value.remember;
    return (<>
      <SafeAreaHeader_1.default headerColor={'#000000'}>
        <MineHeader_1.default showBackBtn={true} onPressBackBtn={RootNavigation_1.popToRoot} showRightTitle={false} backBtnColor={'#cfa461'}/>
      </SafeAreaHeader_1.default>
      <react_native_1.ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <react_native_1.View style={styles.formContainer}>
          <react_native_1.Text style={{ color: '#ffffff', fontSize: Scale_1.scale(30), marginBottom: Scale_1.scale(30) }}>{'欢迎您'}</react_native_1.Text>
          <react_native_1.View style={{ flexDirection: 'row', marginBottom: Scale_1.scale(20) }}>
            <react_native_1.Text style={{ color: '#ffffff', fontSize: Scale_1.scale(15) }}>{'没有账号,立即'}</react_native_1.Text>
            <react_native_1.Text style={{ color: '#cfa461', fontSize: Scale_1.scale(15) }}>{'注册'}</react_native_1.Text>
            <react_native_1.Text style={{ color: '#ffffff', fontSize: Scale_1.scale(15) }}>{'或'}</react_native_1.Text>
            <react_native_1.Text style={{ color: '#cfa461', fontSize: Scale_1.scale(15) }}>{'免费试玩'}</react_native_1.Text>
          </react_native_1.View>
          <SignInFormList_1.default slideCodeRef={slideCodeRef} slideCodeColor={'#ffffff'} show={show} onChange={onChange} value={value} Form={SignInForm} showCheckBox={false}/>
          <react_native_1.View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <CheckBox_1.default onPress={onChangeRemember} label={'记住密码'} containerStyle={{ alignSelf: 'flex-start', marginTop: Scale_1.scale(10) }} defaultValue={remember} labelTextStyle={{ color: '#8e8e93' }}/>
          </react_native_1.View>
          <LinearBadge_1.default colors={['#cfa461', '#cfa461']} containerStyle={[styles.button, { height: null }]} title={'登录'} textStyle={{ color: '#ffffff', fontSize: Scale_1.scale(23) }} showIcon={false} showLogo={false} onPress={signIn}/>
          <Button_1.default title={'返回首页'} containerStyle={styles.popButton} titleStyle={{ color: '#ffffff', fontSize: Scale_1.scale(23) }} onPress={RootNavigation_1.popToRoot}/>
        </react_native_1.View>
      </react_native_1.ScrollView>
    </>);
};
var SignInForm = function (props) {
    return (<FormComponent_1.default {...props} containerStyle={{ marginBottom: Scale_1.scale(10) }} inputContainerStyle={{ borderRadius: Scale_1.scale(10), backgroundColor: '#333333', height: Scale_1.scale(63), borderBottomWidth: 0 }} leftIconContainerStyle={{ marginLeft: Scale_1.scale(10) }} rightIconContainerStyle={{ marginRight: Scale_1.scale(10) }} closeEyeColor={'#cfa461'} leftIconProps={__assign({ color: '#cfa461' }, props === null || props === void 0 ? void 0 : props.leftIconProps)} inputStyle={{ color: '#ffffff' }} placeholderTextColor={'#ffffff'}/>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#000000',
    },
    formContainer: {
        backgroundColor: '#000000',
        width: '95%',
        alignSelf: 'center',
        marginTop: Scale_1.scale(15),
        paddingHorizontal: Scale_1.scale(25),
        paddingTop: Scale_1.scale(25),
        marginBottom: Scale_1.scaleHeight(70),
    },
    button: {
        width: '100%',
        marginTop: Scale_1.scale(20),
        marginBottom: Scale_1.scale(25),
        aspectRatio: 8,
        borderRadius: Scale_1.scale(5),
    },
    popButton: {
        backgroundColor: '#a09e9d',
        width: '100%',
        aspectRatio: 8,
        borderRadius: Scale_1.scale(5),
    },
});
exports.default = JXHSignInPage;
