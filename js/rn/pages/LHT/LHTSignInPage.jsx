"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var FormComponent_1 = require("../../public/components/tars/FormComponent");
var useSignInPage_1 = require("../../public/hooks/tars/useSignInPage");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var LHThemeColor_1 = require("../../public/theme/colors/LHThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var Button_1 = require("../../public/views/tars/Button");
var MineHeader_1 = require("../../public/views/tars/MineHeader");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var SignInFormList_1 = require("../../public/views/tars/SignInFormList");
var LHTSignInPage = function () {
    var _a = useSignInPage_1.default({
        homePage: Navigation_1.PageName.LHTHomePage,
        signUpPage: Navigation_1.PageName.LHTSignUpPage,
    }), sign = _a.sign, value = _a.value, onChange = _a.onChange, navigateTo = _a.navigateTo, show = _a.show, slideCodeRef = _a.slideCodeRef, valid = _a.valid;
    var navigateToSignUpPage = navigateTo.navigateToSignUpPage;
    var signIn = sign.signIn, tryPlay = sign.tryPlay;
    return (<>
      <SafeAreaHeader_1.default headerColor={LHThemeColor_1.LHThemeColor.六合厅.themeColor}>
        <MineHeader_1.default showBackBtn={true} onPressBackBtn={RootNavigation_1.popToRoot} title={'登录'}/>
      </SafeAreaHeader_1.default>
      <react_native_1.ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <react_native_1.View style={styles.formContainer}>
          <SignInFormList_1.default slideCodeRef={slideCodeRef} slideCodeColor={'#ffffff'} show={show} onChange={onChange} value={value} Form={SignInForm}/>
          <Button_1.default disabled={!valid} title={'登录'} containerStyle={[
        styles.button,
        {
            backgroundColor: LHThemeColor_1.LHThemeColor.六合厅.themeColor,
            marginTop: Scale_1.scale(20),
        },
    ]} disabledContainerStyle={[
        styles.button,
        {
            marginTop: Scale_1.scale(20),
        },
    ]} titleStyle={[styles.buttonTitleStyle, { color: '#ffffff' }]} onPress={signIn}/>
          <Button_1.default title={'马上注册'} containerStyle={styles.button} titleStyle={styles.buttonTitleStyle} onPress={navigateToSignUpPage}/>
          <Button_1.default title={'免费试玩'} containerStyle={styles.button} titleStyle={styles.buttonTitleStyle} onPress={tryPlay}/>
          <Button_1.default title={'返回首页'} containerStyle={styles.button} titleStyle={styles.buttonTitleStyle} onPress={RootNavigation_1.popToRoot}/>
        </react_native_1.View>
      </react_native_1.ScrollView>
    </>);
};
var SignInForm = function (props) { return <FormComponent_1.default {...props} containerStyle={{ marginBottom: Scale_1.scale(20) }} inputContainerStyle={{ borderColor: '#d9d9d9' }}/>; };
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: LHThemeColor_1.LHThemeColor.六合厅.homeContentSubColor,
    },
    formContainer: {
        backgroundColor: '#ffffff',
        width: '95%',
        alignSelf: 'center',
        borderRadius: Scale_1.scale(10),
        marginTop: Scale_1.scale(15),
        paddingHorizontal: Scale_1.scale(25),
        paddingVertical: Scale_1.scale(25),
        marginBottom: Scale_1.scaleHeight(70),
    },
    button: {
        width: '100%',
        marginVertical: Scale_1.scale(5),
        aspectRatio: 8,
        borderRadius: Scale_1.scale(5),
        backgroundColor: '#dedede',
    },
    buttonTitleStyle: {
        color: LHThemeColor_1.LHThemeColor.六合厅.themeColor,
        fontSize: Scale_1.scale(23),
    },
});
exports.default = LHTSignInPage;
