"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var FormComponent_1 = require("../../public/components/tars/FormComponent");
var PushHelper_1 = require("../../public/define/PushHelper");
var useSignUpPage_1 = require("../../public/hooks/tars/useSignUpPage");
var Navigation_1 = require("../../public/navigation/Navigation");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var BZHThemeColor_1 = require("../../public/theme/colors/BZHThemeColor");
var Scale_1 = require("../../public/tools/Scale");
var Button_1 = require("../../public/views/tars/Button");
var MineHeader_1 = require("../../public/views/tars/MineHeader");
var SafeAreaHeader_1 = require("../../public/views/tars/SafeAreaHeader");
var SignUpFormList_1 = require("../../public/views/tars/SignUpFormList");
var UGSysConfModel_1 = require("../../redux/model/\u5168\u5C40/UGSysConfModel");
var BZHSignUpPage = function () {
    var _a = useSignUpPage_1.default({
        homePage: Navigation_1.PageName.BZHHomePage,
        signInPage: Navigation_1.PageName.BZHSignInPage,
    }), show = _a.show, slideCodeRef = _a.slideCodeRef, label = _a.label, onChange = _a.onChange, sign = _a.sign, valid = _a.valid, passwordLimit = _a.passwordLimit;
    var signUp = sign.signUp;
    return (<>
      <SafeAreaHeader_1.default headerColor={BZHThemeColor_1.BZHThemeColor.宝石红.themeColor}>
        <MineHeader_1.default title={'注册'} showBackBtn={true} onPressBackBtn={RootNavigation_1.pop} showRightTitle={true} onPressRightTitle={function () {
        PushHelper_1.default.pushUserCenterType(UGSysConfModel_1.UGUserCenterType.在线客服);
    }}/>
      </SafeAreaHeader_1.default>
      <react_native_1.ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <react_native_1.View style={styles.formContainer}>
          <SignUpFormList_1.default slideCodeRef={slideCodeRef} slideCodeColor={'#ffffff'} show={show} label={label} passwordLimit={passwordLimit} onChange={onChange} Form={SignUpForm}/>
          <Button_1.default title={'注册'} disabled={!valid} containerStyle={[
        styles.button,
        {
            backgroundColor: BZHThemeColor_1.BZHThemeColor.宝石红.themeColor,
        },
    ]} disabledContainerStyle={styles.button} titleStyle={{ color: '#ffffff', fontSize: Scale_1.scale(23) }} onPress={signUp}/>
          <react_native_1.View style={styles.bottomButtonContainer}>
            <react_native_1.TouchableWithoutFeedback onPress={function () {
        RootNavigation_1.push(Navigation_1.PageName.BZHSignInPage, {});
    }}>
              <react_native_1.Text style={{ fontWeight: '300' }}>{'返回登录'}</react_native_1.Text>
            </react_native_1.TouchableWithoutFeedback>
            <react_native_1.TouchableWithoutFeedback onPress={RootNavigation_1.popToRoot}>
              <react_native_1.Text style={{ fontWeight: '300' }}>{'返回首页'}</react_native_1.Text>
            </react_native_1.TouchableWithoutFeedback>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.ScrollView>
    </>);
};
var SignUpForm = function (props) {
    return <FormComponent_1.default {...props} containerStyle={{ marginBottom: Scale_1.scale(10) }} inputContainerStyle={{ borderColor: '#d9d9d9' }}/>;
};
var styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BZHThemeColor_1.BZHThemeColor.宝石红.homeContentSubColor,
    },
    formContainer: {
        backgroundColor: '#ffffff',
        width: '95%',
        alignSelf: 'center',
        borderRadius: Scale_1.scale(10),
        marginTop: Scale_1.scale(15),
        paddingHorizontal: Scale_1.scale(25),
        paddingTop: Scale_1.scale(25),
        marginBottom: Scale_1.scaleHeight(70),
    },
    bottomButtonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        paddingVertical: Scale_1.scale(25),
    },
    button: {
        width: '100%',
        marginVertical: Scale_1.scale(20),
        aspectRatio: 8,
        borderRadius: Scale_1.scale(5),
    },
});
exports.default = BZHSignUpPage;
