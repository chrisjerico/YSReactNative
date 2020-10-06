"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var FormComponent_1 = require("../../public/components/tars/FormComponent");
var PushHelper_1 = require("../../public/define/PushHelper");
var useSignUpPage_1 = require("../../public/hooks/tars/useSignUpPage");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var WNZThemeColor_1 = require("../../public/theme/colors/WNZThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var Button_1 = require("../../public/views/tars/Button");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var SignUpFormList_1 = require("../../public/views/tars/SignUpFormList");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var MenuModalComponent_1 = require("./components/MenuModalComponent");
var config_1 = require("./config");
var Menu_1 = require("./views/Menu");
var SignHeader_1 = require("./views/SignHeader");
var WNZSignUpPage = function () {
    var _a;
    var menu = react_1.useRef(null);
    var _b = useSignUpPage_1.default({
        homePage: Navigation_1.PageName.WNZHomePage,
        signInPage: Navigation_1.PageName.WNZSignInPage,
    }), slideCodeRef = _b.slideCodeRef, show = _b.show, label = _b.label, onChange = _b.onChange, sign = _b.sign, valid = _b.valid, passwordLimit = _b.passwordLimit, navigateTo = _b.navigateTo;
    var signUp = sign.signUp, tryPlay = sign.tryPlay;
    var navigateToSignInPage = navigateTo.navigateToSignInPage;
    return (<>
      <SafeAreaHeader_1.default headerColor={WNZThemeColor_1.WNZThemeColor.威尼斯.themeColor}>
        <SignHeader_1.default onPressLeftTool={RootNavigation_1.pop} onPressMenu={function () {
        var _a;
        (_a = menu === null || menu === void 0 ? void 0 : menu.current) === null || _a === void 0 ? void 0 : _a.open();
    }} onPressSign={navigateToSignInPage}/>
      </SafeAreaHeader_1.default>
      <react_native_1.ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <react_native_1.View style={styles.formContainer}>
          <SignUpFormList_1.default slideCodeRef={slideCodeRef} slideCodeColor={'#f2f2f2'} show={show} label={label} passwordLimit={passwordLimit} onChange={onChange} Form={SignUpForm}/>
          <Button_1.default disabled={!valid} title={'立即注册'} containerStyle={styles.signUpButton} disabledContainerStyle={[
        styles.signUpButton,
        {
            opacity: 0.5,
            backgroundColor: '#dd524d',
        },
    ]} titleStyle={{ color: '#ffffff', fontSize: Scale_1.scale(23) }} onPress={signUp}/>
          <Button_1.default title={'已有帐号，直接登陆'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={RootNavigation_1.pop}/>
          <Button_1.default title={'免费试玩'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={tryPlay}/>
          <Button_1.default title={'在线客服'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={function () { return PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服); }}/>
          <Button_1.default title={'返回首页'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={RootNavigation_1.popToRoot}/>
        </react_native_1.View>
      </react_native_1.ScrollView>
      <MenuModalComponent_1.default ref={menu} menus={(_a = 
    // @ts-ignore
    config_1.default === null || 
    // @ts-ignore
    config_1.default === void 0 ? void 0 : 
    // @ts-ignore
    config_1.default.menuSignIn) === null || _a === void 0 ? void 0 : _a.concat(config_1.default === null || config_1.default === void 0 ? void 0 : config_1.default.menus)} renderMenu={function (_a) {
        var item = _a.item;
        var title = item.title, onPress = item.onPress;
        return (<Menu_1.default color={WNZThemeColor_1.WNZThemeColor.威尼斯.themeColor} title={title} onPress={function () {
            var _a;
            (_a = menu === null || menu === void 0 ? void 0 : menu.current) === null || _a === void 0 ? void 0 : _a.close();
            onPress && onPress();
        }}/>);
    }}/>
    </>);
};
var SignUpForm = function (props) { return (<FormComponent_1.default {...props} containerStyle={{ marginBottom: Scale_1.scale(15) }} inputContainerStyle={styles.inputContainerStyle} leftIconContainerStyle={styles.leftIconContainerStyle} rightIconContainerStyle={{ marginRight: Scale_1.scale(10) }} renderLeftIcon={function () { return <react_native_1.Text style={styles.leftIconText}>{props === null || props === void 0 ? void 0 : props.leftIconTitle}</react_native_1.Text>; }} labelTextStyle={{ paddingLeft: Scale_1.scale(20) }} placeholderTextColor={'#9D9D9D'}/>); };
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WNZThemeColor_1.WNZThemeColor.威尼斯.homeContentSubColor,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: Scale_1.scale(20),
        marginTop: Scale_1.scale(23),
        marginBottom: Scale_1.scale(100),
    },
    signUpButton: {
        width: '100%',
        backgroundColor: '#dd524d',
        marginTop: Scale_1.scale(12),
        aspectRatio: 10,
        borderRadius: Scale_1.scale(5),
    },
    whiteButton: {
        width: '100%',
        backgroundColor: '#ffffff',
        marginTop: Scale_1.scale(15),
        aspectRatio: 10,
        borderRadius: Scale_1.scale(5),
        borderColor: '#ccc',
        borderWidth: Scale_1.scale(1),
    },
    whitwButtonTitle: {
        color: '#f13031',
        fontSize: Scale_1.scale(23),
        fontWeight: '300',
    },
    inputContainerStyle: {
        borderWidth: Scale_1.scale(1),
        borderRadius: Scale_1.scale(10),
        backgroundColor: '#ffffff',
        borderColor: '#d9d9d9',
        height: Scale_1.scale(63),
    },
    leftIconText: {
        fontSize: Scale_1.scale(23),
        fontWeight: '400',
    },
    leftIconContainerStyle: {
        width: Scale_1.scale(120),
        marginLeft: 0,
        marginRight: 0,
        alignItems: 'flex-start',
        paddingLeft: Scale_1.scale(20),
    },
});
exports.default = WNZSignUpPage;
