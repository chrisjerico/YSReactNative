
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { Image, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { BaseScreen } from './component/BaseScreen'
import Icon from 'react-native-vector-icons/FontAwesome'
import { navigate } from '../../public/navigation/RootNavigation'
import { PageName } from '../../public/navigation/Navigation'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import CheckBox from '../../public/views/tars/CheckBox'
import APIRouter from '../../public/network/APIRouter'
import { ugLog } from '../../public/tools/UgLog'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import { EventRegister } from "react-native-event-listeners"
import AppDefine from '../../public/define/AppDefine'
import { httpClient } from '../../public/network/httpClient'
import NeedNameInputComponent from '../../public/components/tars/NeedNameInputComponent'

const LCLoginPage = () => {
  const { sign, value, onChange, navigateTo, show, valid, reference } = useSignInPage({
    homePage: PageName.LCHomePage,
    signUpPage: PageName.LCRegisterPage,
  })
  const { slideCodeRef, needNameInputRef } = reference
  const { showSignInSlideCode } = show
  const { onChangePassword, onChangeAccount, onChangeRemember, onChangeSlideCode, onSubmitFullName } = onChange
  const { remember, account, password } = value
  const { signIn, tryPlay } = sign
  const { navigateToSignUpPage } = navigateTo
  const [code, setCode] = useState('')
  const [showPwd, setShowPwd] = useState(false)
  const reRenderCode = async () => {
    try {
      const { data, status } = await APIRouter.secure_imgCaptcha()
      setCode(data)
    } catch (error) {
    }
  }

  const getVCode = useMemo(() => {
    if (showSignInSlideCode) {
      return <SlidingVerification onChange={onChangeSlideCode} />
    } else return <View />
  }, [showSignInSlideCode, code])
  return (
    <BaseScreen style={{backgroundColor: "#ffffff"}} screenName={'登录'}>
      <View style={{ marginHorizontal: 24, top: 46 }}>
        <View
          style={{
            flexDirection: 'row',
            paddingVertical: 16,
            paddingHorizontal: 4,
            borderBottomWidth: 1,
            borderColor: '#dddddd',
          }}>
          <Icon style={{ marginRight: 12 }} size={25} color={'gold'} name={'user-o'} />
          <TextInput style={{ flex: 1 }} defaultValue={account || ''} onChangeText={(text) => onChangeAccount(text)} placeholder={'请输入账号'} />
        </View>
        <View
          style={{
            marginTop: 8,
            flexDirection: 'row',
            paddingVertical: 16,
            paddingHorizontal: 4,
            borderBottomWidth: 1,
            borderColor: '#dddddd',
          }}>
          <Icon style={{ marginRight: 12 }} size={25} color={'gold'} name={'unlock-alt'} />
          <TextInput secureTextEntry={!showPwd} style={{ flex: 1 }} defaultValue={password || ''} onChangeText={(text) => onChangePassword(text)} placeholder={'请输入密码'} />
          <TouchableWithoutFeedback onPress={() => setShowPwd(!showPwd)}>
            <Image style={{ height: 15, width: 18, marginRight: 8, resizeMode: 'stretch' }}
                   source={{ uri: showPwd ? httpClient.defaults.baseURL + '/images/icon-eyes.png' : httpClient.defaults.baseURL + '/images/icon-eye.png' }} />
          </TouchableWithoutFeedback>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 24 }}>
          <CheckBox onPress={onChangeRemember} label={'记住密码'} defaultValue={remember} />
        </View>
        {getVCode}
        <View style={{ paddingTop: 16 }}>
          {valid ? (
            <TouchableOpacity
              style={{
                marginTop: 8,
                backgroundColor: 'gold',
                borderRadius: 4,
                borderBottomWidth: 1,
                borderColor: '#dddddd',
              }}
              onPress={signIn}>
              <Text style={{ alignSelf: 'center', paddingVertical: 20, color: 'black' }}>登录</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              disabled={true}
              style={{
                marginTop: 8,
                backgroundColor: '#ffefae',
                borderRadius: 4,
                borderBottomWidth: 1,
                borderColor: '#dddddd',
              }}
              onPress={signIn}>
              <Text style={{ alignSelf: 'center', paddingVertical: 20, color: '#ddd' }}>登录</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={{
              marginTop: 8,
              backgroundColor: '#dedede',
              borderRadius: 4,
              borderBottomWidth: 1,
              borderColor: '#dddddd',
            }}
            onPress={navigateToSignUpPage}>
            <Text style={{ alignSelf: 'center', paddingVertical: 20, color: 'black' }}>马上注册</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 8,
              backgroundColor: '#dedede',
              borderRadius: 4,
              borderBottomWidth: 1,
              borderColor: '#dddddd',
            }}
            onPress={tryPlay}>
            <Text style={{ alignSelf: 'center', paddingVertical: 20, color: 'black' }}>免费试玩</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              marginTop: 8,
              backgroundColor: '#dedede',
              borderRadius: 4,
              borderBottomWidth: 1,
              borderColor: '#dddddd',
            }}
            onPress={() => navigate(PageName.LCHomePage)}>
            <Text style={{ alignSelf: 'center', paddingVertical: 20, color: 'black' }}>返回首页</Text>
          </TouchableOpacity>
          <NeedNameInputComponent ref={needNameInputRef} onSubmitFullName={onSubmitFullName} />
        </View>
      </View>
    </BaseScreen>
  )
}

export default LCLoginPage

const SlidingVerification = ({ onChange }: { onChange: (data: any) => void }) => {
  const webViewScript = `setTimeout(function() {
            document.getElementById('app').style.background = 'white'
            window.ReactNativeWebView.postMessage(document.getElementById('nc_1-stage-1').offsetHeight);
          }, 500);
          true;`
  const [webviewHeight, setWebViewHeight] = useState(0)
  const hadnleMessage = (e: WebViewMessageEvent) => {
    let eData = e?.nativeEvent?.data
    console.log('sliding response: ' + eData)

    if (typeof eData == 'string') {
      setWebViewHeight(parseInt(eData) * 1.5)
    } else {
      onChange(eData)
    }
  }
  const webViewRef = useRef<WebView>()
  useEffect(() => {
    const listener = EventRegister.addEventListener('reload', (data) => {
      webViewRef?.current?.reload()
    })
    return () => EventRegister.removeEventListener(this.listener)
  }, [])

  let slidingUrl = `${AppDefine.host}/dist/index.html#/swiperverify?platform=native`
  ugLog('slidingUrl=' + slidingUrl)

  return (
    <View style={{ height: webviewHeight }}>
      <WebView
        ref={webViewRef}
        style={{ minHeight: webviewHeight, backgroundColor: 'white' }}
        containerStyle={{ backgroundColor: 'white', height: 10 }}
        javaScriptEnabled
        injectedJavaScript={webViewScript}
        startInLoadingState
        source={{ uri: slidingUrl }}
        onMessage={hadnleMessage}
      />
    </View>
  )
}
