import SafeAreaHeader from "../../../public/views/tars/SafeAreaHeader"
import React, { useEffect, useRef, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { scale, scaleHeight } from "../../../public/tools/Scale"
import AntDesign from 'react-native-vector-icons/AntDesign'
import Form from "./Form"
import ReloadSlidingVerification from "../../../public/components/tars/ReloadSlidingVerification"
import { BZHThemeColor } from "../../../public/theme/colors/BZHThemeColor"
import CheckBox from './CheckBox'
import { Button } from 'react-native-elements'

interface SignInProps {
  slidingVerificationRef: any;
  account: string; 
  onChangeAccount: () => any;
  hidePassword: boolean;
  onPressHidePassword, onChangePassword, password, isRemember, onPressRemember, loginVCode, onPressTryPlay, onPressReturnHome,onPressLoginRightNow,valid,onChangeSlidingVerification
}

const SignIn = ({ slidingVerificationRef,account, onChangeAccount, hidePassword, onPressHidePassword, onChangePassword, password, isRemember, onPressRemember, loginVCode, onPressTryPlay, onPressReturnHome,onPressLoginRightNow,valid,onChangeSlidingVerification } : SignInProps) => {

  return (
    <>
      <SafeAreaHeader headerColor={BZHThemeColor.宝石红.themeColor}>
        <TouchableWithoutFeedback onPress={() => { }}>
          <AntDesign name={'left'} color={'#ffffff'} size={scale(25)} />
        </TouchableWithoutFeedback>
        <Text style={styles.headerTitle}>{'登录'}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            // PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        >
          <Text style={styles.headerTitle}>{'客服'}</Text>
        </TouchableWithoutFeedback>
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.whiteBlock}>
          <Form
            show={true}
            placeholder={'请输入会员帐号'}
            value={account}
            onChangeText={onChangeAccount}
          />

          {/* (value: any) => {
            setProps({ account: value })
          } */}
          <Form
            show={true}
            rightIconProps={{
              color: hidePassword ? '#d9d9d9' : '#84C1FF',
              onPress: onPressHidePassword,
            }}
            placeholder={'请输入密码'}
            leftIcon={{
              name: 'lock',
            }}
            value={password}
            onChangeText={onChangePassword}
            secureTextEntry={hidePassword}
            showRightIcon
          />
          <CheckBox
            check={isRemember}
            onPress={onPressRemember}
          />
          {loginVCode ? (
            <ReloadSlidingVerification
              ref={slidingVerificationRef}
              onChange={onChangeSlidingVerification}
              containerStyle={{ marginBottom: scale(20) }}
            />
          ) : null}
          <Button
            title={'立即登录'}
            disabled={!valid}
            buttonStyle={styles.button}
            titleStyle={{ color: '#ffffff' }}
            onPress={onPressLoginRightNow}
            activeOpacity={1}
          />
          <Button
            title={'快速注册'}
            buttonStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#F0F0F0',
              borderWidth: scale(1),
              width: '100%',
            }}
            titleStyle={{ color: '#EA0000' }}
            onPress={() => {
              // navigate(PageName.BZHRegisterPage, {})
            }}
            activeOpacity={1}
          />
          <View style={styles.bottomButtonContainer}>
            <TouchableWithoutFeedback onPress={onPressTryPlay}>
              <Text>{'免费试玩'}</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPressReturnHome}>
              <Text>{'返回首页'}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BZHThemeColor.宝石红.homeContentSubColor,
  },
  whiteBlock: {
    backgroundColor: '#ffffff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
    paddingTop: scale(25),
    marginBottom: scaleHeight(70),
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: scale(20),
    aspectRatio: 4,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: scale(25),
  },
  button: {
    backgroundColor: BZHThemeColor.宝石红.themeColor,
    width: '100%',
    marginVertical: scale(20),
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
  },
})

// () => {
//   logIn({
//     account,
//     password: password?.md5(),
//     isRemember,
//   })
// }