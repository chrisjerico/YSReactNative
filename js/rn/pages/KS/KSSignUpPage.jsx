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
var useSignUpPage_1 = require("../../public/hooks/tars/useSignUpPage");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var Scale_1 = require("../../public/tools/Scale");
var LinearBadge_1 = require("../../public/views/tars/LinearBadge");
var MineHeader_1 = require("../../public/views/tars/MineHeader");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var SignUpFormList_1 = require("../../public/views/tars/SignUpFormList");
var KSSignUpPage = function () {
    var _a = useSignUpPage_1.default({
        homePage: Navigation_1.PageName.KSHomePage,
        signInPage: Navigation_1.PageName.KSSignInPage,
    }), show = _a.show, slideCodeRef = _a.slideCodeRef, label = _a.label, onChange = _a.onChange, sign = _a.sign, valid = _a.valid, passwordLimit = _a.passwordLimit, navigateTo = _a.navigateTo;
    var signUp = sign.signUp;
    var navigateToSignInPage = navigateTo.navigateToSignInPage;
    return (<>
      <SafeAreaHeader_1.default headerColor={'#000000'}>
        <MineHeader_1.default showBackBtn={true} onPressBackBtn={RootNavigation_1.popToRoot} rightTitle={'登录'} showRightTitle={true} onPressRightTitle={navigateToSignInPage}/>
      </SafeAreaHeader_1.default>
      <react_native_1.ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <react_native_1.View style={styles.formContainer}>
          <SignUpFormList_1.default slideCodeRef={slideCodeRef} slideCodeColor={'#ffffff'} show={show} label={label} passwordLimit={passwordLimit} onChange={onChange} Form={SignUpForm}/>
          <LinearBadge_1.default colors={['#eb5d4d', '#fb2464']} containerStyle={[styles.button, { height: null }]} title={'注册'} textStyle={{ color: '#ffffff', fontSize: Scale_1.scale(23) }} showIcon={false} showLogo={false} onPress={signUp}/>
        </react_native_1.View>
      </react_native_1.ScrollView>
    </>);
};
var SignUpForm = function (props) {
    var _a = react_1.useState(false), focus = _a[0], setFocuse = _a[1];
    return (<FormComponent_1.default {...props} containerStyle={{ marginBottom: Scale_1.scale(10) }} inputContainerStyle={{ borderColor: '#d9d9d9', borderWidth: Scale_1.scale(1), borderRadius: Scale_1.scale(10), backgroundColor: focus ? '#ffffff' : '#949494', height: Scale_1.scale(63) }} leftIconContainerStyle={{ marginLeft: Scale_1.scale(10) }} rightIconContainerStyle={{ marginRight: Scale_1.scale(10) }} closeEyeColor={'#000000'} showLabel={false} onFocus={function () { return setFocuse(true); }} onBlur={function () { return setFocuse(false); }} leftIconProps={__assign({ color: '#000000' }, props === null || props === void 0 ? void 0 : props.leftIconProps)}/>);
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
        marginVertical: Scale_1.scale(20),
        aspectRatio: 8,
        borderRadius: Scale_1.scale(5),
    },
});
exports.default = KSSignUpPage;
