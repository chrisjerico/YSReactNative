import React from 'react'
import {Platform, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View} from 'react-native'
import FormComponent, {FormComponentProps} from '../../public/components/tars/FormComponent'
import PushHelper from '../../public/define/PushHelper'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import {PageName} from '../../public/navigation/Navigation'
import {pop, popToRoot, push} from '../../public/navigation/RootNavigation'
import {scale, scaleHeight} from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import {UGUserCenterType} from '../../redux/model/全局/UGSysConfModel'
import {HJThemeColor} from "../../public/theme/colors/HJThemeColor";
import CommStyles from "../base/CommStyles";
import FastImage from "react-native-fast-image";
import {UGStore} from "../../redux/store/UGStore";
import SignInFormList from "./reg/SignInFormList";

/**
 * 登录
 * @constructor
 */
const HJLoginPage = () => {
  console.disableYellowBox = true

  const {
    sign,
    value,
    onChange,
    navigateTo,
    show,
    slideCodeRef,
    mobile_logo,
    valid,
  } = useSignInPage({
    homePage: PageName.HJHomePage,
    signUpPage: PageName.HJRegisterPage,
  })

  const {navigateToSignUpPage} = navigateTo

  const {signIn, tryPlay} = sign

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

          <SignInFormList
            slideCodeRef={slideCodeRef}
            slideCodeColor={HJThemeColor.黑金.bgColor[0]}
            show={show}
            onChange={onChange}
            value={value}
            Form={SignInForm}
          />

          <Button
            title={'立即登录'}
            disabled={!valid}
            containerStyle={_styles.log_bt}
            disabledContainerStyle={[_styles.log_bt, _styles.log_bt_unavailable]}
            titleStyle={{color: valid ? '#ffffff' : 'grey', fontSize: scale(23)}}
            onPress={signIn}
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
            title={'马上注册'}
            titleStyle={{color: '#8e8e93', fontSize: scale(22)}}
            onPress={()=> push(PageName.HJRegisterPage)}
          />

        </View>
      </ScrollView>
    </>
  )
}

const SignInForm = (props: FormComponentProps) => (
  <FormComponent
    {...props}
    containerStyle={{marginBottom: scale(20)}}
    inputContainerStyle={{borderColor: 'grey'}}
  />
)

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: HJThemeColor.黑金.bgColor[0],
  },
  formContainer: {
    margin: scale(32),
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
})

export default HJLoginPage
