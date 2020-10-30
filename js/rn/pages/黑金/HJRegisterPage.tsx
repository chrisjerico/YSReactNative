import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import FormComponent, {FormComponentProps} from '../../public/components/temp/FormComponent'
import PushHelper from '../../public/define/PushHelper'
import useSignUpPage from '../../public/hooks/temp/useSignUpPage'
import {PageName} from '../../public/navigation/Navigation'
import {pop, popToRoot, push} from '../../public/navigation/RootNavigation'
import {scale, scaleHeight} from '../../public/tools/Scale'
import Button from '../../public/views/temp/Button'
import MineHeader from '../../public/views/temp/MineHeader'
import SafeAreaHeader from '../../public/views/temp/SafeAreaHeader'
import {UGUserCenterType} from '../../redux/model/全局/UGSysConfModel'
import {HJThemeColor} from "../../public/theme/colors/HJThemeColor";
import SignUpFormList from "./reg/SignUpFormList";
import FastImage from "react-native-fast-image";
import CommStyles from "../base/CommStyles";

/**
 * 注册
 * @constructor
 */
const HJRegisterPage = () => {
  const {
    show,
    slideCodeRef,
    phoneNumber,
    label,
    onChange,
    sign,
    valid,
    mobile_logo,
    passwordLimit,
  } = useSignUpPage({
    homePage: PageName.HJHomePage,
    signInPage: PageName.HJLoginPage,
  })

  const {signUp} = sign

  return (
    <>
      <SafeAreaHeader headerColor={HJThemeColor.黑金.bgColor[0]}>
        <MineHeader
          showBackBtn={true}
          onPressBackBtn={pop}
          showCustomerService={false}
        />
      </SafeAreaHeader>
      <ScrollView style={_styles.container} showsVerticalScrollIndicator={false}>
        <View style={_styles.formContainer}>

          <FastImage style={_styles.logo}
                     resizeMode={'contain'}
                     source={{uri: mobile_logo}}/>

          <SignUpFormList
            slideCodeRef={slideCodeRef}
            phoneNumber={phoneNumber}
            slideCodeColor={HJThemeColor.黑金.bgColor[0]}
            show={show}
            label={label}
            passwordLimit={passwordLimit}
            onChange={onChange}
            Form={SignUpForm}
          />

          <Button
            title={'立即注册'}
            disabled={!valid}
            containerStyle={_styles.log_bt}
            disabledContainerStyle={[_styles.log_bt, _styles.log_bt_unavailable]}
            titleStyle={{color: valid ? '#ffffff' : 'grey', fontSize: scale(23)}}
            onPress={signUp}
          />

          <View style={CommStyles.center}>
            <View style={{
              width: '50%',
              marginTop: scale(50),
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
              <View style={{flexDirection: 'row'}}>
                <FastImage style={_styles.text_icon}
                           resizeMode={'contain'}
                           source={{uri: "http://test61a.fhptcdn.com/views/mobileTemplate/28/images/login_ptsy.png"}}/>
                <Text onPress={() => {
                  push(PageName.HJHomePage)
                }} style={{color: '#8e8e93', fontSize: scale(20)}}>平台首页</Text>
              </View>

              <View style={[CommStyles.line_v, {height: scale(20), marginHorizontal: scale(32)}]}/>

              <View style={{flexDirection: 'row'}}>
                <FastImage style={_styles.text_icon}
                           resizeMode={'contain'}
                           source={{uri: "http://test61a.fhptcdn.com/views/mobileTemplate/28/images/login_lxkf.png"}}/>
                <Text onPress={() => {
                  PushHelper.pushUserCenterType(UGUserCenterType.在线客服);
                }} style={{color: '#8e8e93', fontSize: scale(20)}}>联系客服</Text>
              </View>

            </View>
          </View>

          <Button
            containerStyle={[CommStyles.center,
              {padding: scale(16), marginTop: scale(30)}]}
            title={'马上登录'}
            titleStyle={{color: '#8e8e93', fontSize: scale(22)}}
            onPress={() => push(PageName.HJLoginPage)}
          />

        </View>
      </ScrollView>
    </>
  )
}

const SignUpForm = (props: FormComponentProps) => {
  return (
    <FormComponent
      {...props}
      containerStyle={{marginBottom: scale(10)}}
      inputContainerStyle={{borderColor: 'grey'}}
    />
  )
}

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HJThemeColor.黑金.bgColor[0],
  },
  text_icon: {
    width: scale(32),
    height: scale(32),
    marginRight: scale(12),
  },
  logo: {
    width: '100%',
    height: scale(64),
    marginBottom: scale(64)
  },
  log_bt_unavailable: {
    borderColor: 'grey',
  },
  log_bt: {
    flex: 1,
    height: 50,
    backgroundColor: "#00000099",
    borderRadius: 999,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: HJThemeColor.黑金.themeColor,
    borderWidth: scale(1),
    marginTop: scale(16)
  },
  formContainer: {
    width: '100%',
    alignSelf: 'center',
    padding: scale(32),
  },
  button: {
    width: '100%',
    marginVertical: scale(20),
    aspectRatio: 8,
    borderRadius: scale(5),
  },
})

export default HJRegisterPage
