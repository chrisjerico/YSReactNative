"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var FormComponent_1 = require("../../public/components/tars/FormComponent");
var PushHelper_1 = require("../../public/define/PushHelper");
var useSignInPage_1 = require("../../public/hooks/tars/useSignInPage");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var WNZThemeColor_1 = require("../../public/theme/colors/WNZThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var Button_1 = require("../../public/views/tars/Button");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var SignInFormList_1 = require("../../public/views/tars/SignInFormList");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var MenuModalComponent_1 = require("./components/MenuModalComponent");
var config_1 = require("./config");
var Menu_1 = require("./views/Menu");
var SignHeader_1 = require("./views/SignHeader");
var WNZSignInPage = function () {
    var _a;
    var menu = react_1.useRef(null);
    var _b = useSignInPage_1.default({
        homePage: Navigation_1.PageName.WNZHomePage,
        signUpPage: Navigation_1.PageName.WNZSignUpPage,
    }), sign = _b.sign, value = _b.value, onChange = _b.onChange, navigateTo = _b.navigateTo, show = _b.show, slideCodeRef = _b.slideCodeRef, valid = _b.valid;
    var navigateToSignUpPage = navigateTo.navigateToSignUpPage;
    var signIn = sign.signIn, tryPlay = sign.tryPlay;
    return (<>
      <SafeAreaHeader_1.default headerColor={WNZThemeColor_1.WNZThemeColor.威尼斯.themeColor}>
        <SignHeader_1.default onPressLeftTool={RootNavigation_1.pop} onPressMenu={function () {
        var _a;
        (_a = menu === null || menu === void 0 ? void 0 : menu.current) === null || _a === void 0 ? void 0 : _a.open();
    }} onPressSign={navigateToSignUpPage}/>
      </SafeAreaHeader_1.default>
      <react_native_1.ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <react_native_1.View style={styles.formContainer}>
          <SignInFormList_1.default slideCodeRef={slideCodeRef} slideCodeColor={'#f2f2f2'} show={show} onChange={onChange} value={value} Form={SignInForm}/>
          <Button_1.default disabled={!valid} title={'登陆'} containerStyle={[styles.loginButton, { backgroundColor: '#dd524d' }]} disabledContainerStyle={styles.loginButton} titleStyle={{ color: '#ffffff', fontSize: Scale_1.scale(25) }} onPress={signIn}/>
          <Button_1.default title={'立即注册'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={navigateToSignUpPage}/>
          <Button_1.default title={'在线客服'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服);
    }}/>
          <Button_1.default title={'免费试玩'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={tryPlay}/>
          <Button_1.default title={'返回首页'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={RootNavigation_1.popToRoot}/>
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
        </react_native_1.View>
      </react_native_1.ScrollView>
    </>);
};
var SignInForm = function (props) { return (<FormComponent_1.default {...props} containerStyle={{ marginBottom: Scale_1.scale(10) }} inputContainerStyle={styles.inputContainerStyle} leftIconContainerStyle={styles.leftIconContainerStyle} rightIconContainerStyle={{ marginRight: Scale_1.scale(10) }} renderLeftIcon={function () { return <react_native_1.Text style={styles.leftIconText}>{props === null || props === void 0 ? void 0 : props.leftIconTitle}</react_native_1.Text>; }} placeholderTextColor={'#9D9D9D'}/>); };
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: WNZThemeColor_1.WNZThemeColor.威尼斯.homeContentSubColor,
    },
    formContainer: {
        flex: 1,
        paddingHorizontal: Scale_1.scale(20),
        paddingTop: Scale_1.scale(40),
    },
    inputContainerStyle: {
        borderWidth: Scale_1.scale(1),
        borderRadius: Scale_1.scale(10),
        backgroundColor: '#ffffff',
        borderColor: '#d9d9d9',
        paddingLeft: Scale_1.scale(20),
        height: Scale_1.scale(63),
    },
    leftIconText: {
        fontSize: Scale_1.scale(23),
        fontWeight: '400',
    },
    loginButton: {
        width: '100%',
        marginTop: Scale_1.scale(32),
        aspectRatio: 10,
        borderRadius: Scale_1.scale(5),
        marginBottom: Scale_1.scale(38),
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
        fontSize: Scale_1.scale(25),
        fontWeight: '300',
    },
    leftIconContainerStyle: {
        width: Scale_1.scale(75),
        marginLeft: 0,
        marginRight: 0,
        alignItems: 'flex-start',
    },
});
exports.default = WNZSignInPage;
