import React from 'react'
import { Image, StatusBar, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { BaseScreen } from '../乐橙/component/BaseScreen'
import { CheckBox } from './component/CheckBox'
import PushHelper from '../../public/define/PushHelper'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import { PageName } from '../../public/navigation/Navigation'
import { httpClient } from '../../public/network/httpClient'
import ReloadSlidingVerification from '../../public/components/tars/ReloadSlidingVerification'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import { useEffect, useMemo, useRef, useState } from 'react'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import { EventRegister } from 'react-native-event-listeners'
import AppDefine from '../../public/define/AppDefine'
import { ugLog } from '../../public/tools/UgLog'
import APIRouter from '../../public/network/APIRouter'

export const LLLoginPage = ({ setProps }) => {
  const { onChange, show, slideCodeRef, sign, valid, navigateTo, value } = useSignInPage({
    homePage: PageName.LLHomePage,
    signUpPage: PageName.LLRegisterPage,
  })
  const { onChangePassword, onChangeAccount, onChangeRemember, onChangeSlideCode } = onChange
  const { signIn, tryPlay } = sign
  const { loginVCode } = show
  const { remember, account, password } = value
  const { navigateToSignUpPage } = navigateTo
  const [code, setCode] = useState('')

  const getVCode = useMemo(() => {
    if (loginVCode) {
      return <SlidingVerification onChange={onChangeSlideCode} />
    } else return <View />
  }, [loginVCode, code])

  useEffect(() => {
    reRenderCode()
  }, [loginVCode])

  console.log(password)

  const reRenderCode = async () => {
    try {
      const { data, status } = await APIRouter.secure_imgCaptcha()
      setCode(data)
    } catch (error) {
    }
  }

  return (
    <BaseScreen
      screenName={'登录'}
      style={{
        backgroundColor: '#ffffff',
      }}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <View style={{marginHorizontal: 28}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'rgb(238, 238, 238)',
            paddingTop: 12,
          }}>
          <Image
            style={{ height: 18, width: 18, marginRight: 8 }}
            source={{
              uri: 'https://test10.6yc.com/images/moban9_icon/icon-user.png',
            }}
          />
          <TextInput value={account} onChangeText={(text) => onChangeAccount(text)}
                     style={{ fontSize: 14, paddingVertical: 20, flex: 1 }} placeholderTextColor={'#333'}
                     placeholder={'请输入会员账号'} />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            borderBottomWidth: 1,
            borderBottomColor: 'rgb(238, 238, 238)',
            paddingTop: 12,
          }}>
          <Image
            style={{
              height: 18,
              width: 18,
              marginRight: 8,
              resizeMode: 'stretch',
            }}
            source={{
              uri: 'https://test10.6yc.com/images/moban9_icon/icon-pwd.png',
            }}
          />
          <TextInput
            value={password}
            secureTextEntry={true}
            onChangeText={(text) => onChangePassword(text)}
            style={{ fontSize: 14, paddingVertical: 20, flex: 1 }}
            placeholderTextColor={'#333'}
            placeholder={'请输入密码'}
          />
        </View>
        {(password == null || password == "") && <View style={{ flexDirection: 'row' }}>
          <Text style={{
            color: 'red',
            fontSize: 12,
            textAlign: 'left',
            flex: 1,
            paddingVertical: 4,
          }}>{`*请输入密码`}</Text>
        </View>}
        {getVCode}
        <View style={{ flexDirection: 'row' }}>
          <TouchableHighlight
            disabled={!valid}
            onPress={() => signIn()}
            underlayColor={'#007aff'}
            style={{
              backgroundColor: valid ? '#d82e2f' : '#d19898',
              height: 47,
              width: 'auto',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: 12,
              borderRadius: 4,
            }}>
            <Text style={{ color: 'white', fontSize: 16 }}>登 录</Text>
          </TouchableHighlight>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          {/* <CheckBox
          isCheck={remember}
          onCheck={() => {
            onChangeRemember(!remember)
            setProps()
          }}
          text={'记住密码'}
        /> */}
          <View style={{ flex: 1 }} />
          <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                            onPress={() => PushHelper.pushUserCenterType(UGUserCenterType.在线客服)}>
            <Image
              style={{ height: 24, width: 24 }}
              source={{
                uri: 'https://test10.6yc.com/views/mobileTemplate/20/images/kf.png',
              }}
            />
            <Text style={{ color: '#333333', paddingLeft: 8 }}>在线客服</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <Text style={{ fontSize: 16, paddingVertical: 24, color: '#3c3c3c' }}>其他</Text>
          <View style={{ flexDirection: 'row', marginHorizontal: 12 }}>
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => {
                navigateToSignUpPage()
              }}>
              <Image
                style={{ height: 64, width: 64 }}
                source={{
                  uri: 'https://test10.6yc.com/views/mobileTemplate/20/images/register.png',
                }}
              />
              <Text style={{ marginTop: 8 }}>马上注册</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => tryPlay()}>
              <Image
                style={{ height: 64, width: 64 }}
                source={{
                  uri: 'https://test10.6yc.com/views/mobileTemplate/20/images/mfsw.png',
                }}
              />
              <Text style={{ marginTop: 8 }}>免费试玩</Text>
            </TouchableOpacity>
            <View style={{ flex: 1 }} />
            <TouchableOpacity
              style={{ alignItems: 'center' }}
              onPress={() => {
                PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
              }}>
              <Image
                style={{ height: 64, width: 64 }}
                source={{
                  uri: 'https://test10.6yc.com/views/mobileTemplate/20/images/dnb.png',
                }}
              />
              <Text style={{ marginTop: 8 }}>电脑版</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </BaseScreen>
  )
}

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
