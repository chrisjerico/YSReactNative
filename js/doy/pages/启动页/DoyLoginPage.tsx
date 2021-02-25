import AsyncStorage from "@react-native-community/async-storage"
import React, { useEffect, useRef, useState } from "react"
import { View, Text, Alert } from "react-native"
import { Button } from "react-native-elements"
import FastImage from "react-native-fast-image"
import { UGBasePageProps } from "../../../rn/pages/base/UGPage"
import { PageName } from "../../../rn/public/navigation/Navigation"
import { jumpTo, push } from "../../../rn/public/navigation/RootNavigation"
import { skin1 } from "../../../rn/public/theme/UGSkinManagers"
import { sc375 } from "../../../rn/public/tools/Scale"
import { hideLoading, showError, showLoading, showSuccess } from "../../../rn/public/widget/UGLoadingCP"
import { AsyncStorageKey } from "../../../rn/redux/store/IGlobalStateHelper"
import { UGStore } from "../../../rn/redux/store/UGStore"
import { img_doy } from "../../../rn/Res/icon"
import { doyDefine } from "../../publicClass/define/DoyDefine"
import { doyApi } from "../../publicClass/network/DoyApi"
import { DoyButton1, DoyText14 } from "../../publicComponent/Button之类的基础组件/DoyButton"
import { DoyDropDownPicker1, getDoyDropDownPickerItems } from "../../publicComponent/Button之类的基础组件/DoyDropDownPicker"
import { DoyTextInput1, DoyTextInputPwd, DoyTextInputSms, DoyTextInputVerificationCode1 } from "../../publicComponent/Button之类的基础组件/DoyTextInput"

const sc = sc375

export const DoyLoginPage = ({ setProps }: UGBasePageProps) => {
  const [isPwd, setIsPwd] = useState(true)
  const { current: v } = useRef({
    phone: '',
    pwd: '',
    code: '', // 验证码
  })

  useEffect(() => {
    setProps({
      didFocus: () => {
        UGStore.loadValueForKey<{ phone: string, pwd: string }>(AsyncStorageKey.lastLoginAccount).then(({ phone, pwd }) => {
          v.phone = phone
          v.pwd = pwd
          setProps()
        })
      },
    })
  }, [])

  const { themeColor, navBarBgColor } = skin1

  return <View style={{ flex: 1, paddingHorizontal: sc(24), }}>
    <FastImage source={{ uri: img_doy('登录页logo@3x') }} style={{ marginTop: sc(116), marginBottom: sc(24), width: sc(147), height: sc(36) }} />
    <View style={{ flexDirection: 'row', zIndex: 1, backgroundColor: 'white', borderRadius: sc(4), }}>
      <DoyDropDownPicker1
        items={getDoyDropDownPickerItems(['+86', '+63'], [img_doy('简体中文@3x'), img_doy('简体中文@3x')], { width: sc(24), height: sc(16), marginRight: sc(3) })}
        defaultValueAtIndex={0}
        outerViewStyle={{ width: sc(100), marginLeft: sc(5), }}
        containerStyle={{ marginTop: 0 }}
      />
      <DoyTextInput1 placeholder='请输入手机号' onlyInteger defaultValue={v.phone} maxLength={11} style={{ flex: 1, marginTop: 0, paddingLeft: sc(7) }} onChangeText={(text) => {
        v.phone = text;
      }} />
    </View>

    {isPwd && <DoyTextInputPwd
      defaultValue={v.pwd}
      onChangeText={(text) => {
        v.pwd = text;
      }}
    />}
    {!isPwd && <DoyTextInputSms
      smsButtonProps={{
        onSmsButtonClick: (startCountdown) => {
          startCountdown()
        }
      }}
      onChangeText={(text) => {
        v.code = text
      }}
    />}
    <Button title={isPwd ? '用短信验证码登录' : '用密码登录'} buttonStyle={{ backgroundColor: 'transparent', alignSelf: 'flex-start', paddingHorizontal: 0, paddingVertical: sc(16) }} titleStyle={{ color: themeColor, fontSize: sc(14), fontWeight: '600' }} onPress={() => { setIsPwd(!isPwd) }} />
    <DoyButton1 title='登录' onPress={() => {
      let err = ''
      if (!v.phone?.length) {
        err = '请输入手机号'
      } else if (isPwd && !v.pwd?.length) {
        err = '请输入密码'
      } else if (!isPwd && !v.code?.length) {
        err = '请输入验证码'
      }

      if (err.length) {
        showError(err)
        return
      }
      showLoading()
      const { phone, pwd } = v
      doyApi.user.login(phone, pwd).useSuccess(async ({ data }) => {
        doyDefine.token = data["API-SID"]
        await UGStore.saveValueAndKey(AsyncStorageKey.token, doyDefine.token)
        await UGStore.saveValueAndKey(AsyncStorageKey.lastLoginAccount, { phone, pwd })
        showSuccess('登录成功！')
        jumpTo(PageName.DoyHomePage)
      })
    }} />
    <View style={{ flex: 1 }} />
    <View style={{ flexDirection: 'row', marginBottom: sc(10), justifyContent: 'center' }}>
      <Button title='忘记密码' buttonStyle={{ backgroundColor: 'transparent', alignSelf: 'flex-start', paddingHorizontal: 0, paddingVertical: sc(16) }} titleStyle={{ color: themeColor, fontSize: sc(14), fontWeight: '600' }} onPress={() => { Alert.alert('请联系客服') }} />
      <Button title='注册账号' buttonStyle={{ backgroundColor: 'transparent', alignSelf: 'flex-start', paddingHorizontal: 0, paddingVertical: sc(16) }} titleStyle={{ color: themeColor, fontSize: sc(14), fontWeight: '600' }} containerStyle={{ marginLeft: sc(40) }} onPress={() => { push(PageName.DoyRegisterPage1) }} />
    </View>
  </View>
}