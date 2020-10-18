import * as React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Alert, Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { BaseScreen } from '../乐橙/component/BaseScreen'
import AppDefine from '../../public/define/AppDefine'
import { navigate, popToRoot } from '../../public/navigation/RootNavigation'
import { PageName } from '../../public/navigation/Navigation'
import APIRouter from '../../public/network/APIRouter'
import { UGStore } from '../../redux/store/UGStore'
import { EventRegister } from 'react-native-event-listeners'
// @ts-ignore
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import { ugLog } from '../../public/tools/UgLog'
import { Icon } from 'react-native-elements'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { LLRegisterInput } from './component/registerPage/LLRegisterInput'
import { httpClient } from '../../public/network/httpClient'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'

export const LLRegisterPage = () => {
  const { show, slideCodeRef, label, onChange, sign, valid, passwordLimit } = useSignUpPage({
    homePage: PageName.LLHomePage,
    signInPage: PageName.LLLoginPage,
  })
  const { signUp } = sign
  const { showRecommendGuy, showName, showFundPassword, showQQ, showWx, showEmail, showPhoneNumber, showSms, showSlideCode, showAgentButton } = show
  const {
    onChangeRecommendGuy,
    obChangeAccount,
    obChangePassword,
    onChangeConfirmPassword,
    onChaneRealName,
    onChaneFundPassword,
    onChaneQQ,
    onChaneWeChat,
    onChanePhone,
    onChangeEmail,
    onChaneSms,
    onChangeSlideCode,
    onChangeAgent,
  } = onChange
  const [acc, setAcc] = useState('')
  const [pwd, setPwd] = useState('')
  const [code, setCode] = useState('')
  const [inviter, setInviter] = useState('')
  const regex = RegExp('^[A-Za-z0-9]{6,15}$')
  const SystemStore = UGStore.globalProps.sysConf
  const {
    mobile_logo = '',
    rankingListSwitch,
    hide_reco, // 代理人 0不填，1选填，2必填
    reg_name, // 真实姓名 0不填，1选填，2必填
    reg_fundpwd, // 取款密码 0不填，1选填，2必填
    reg_qq, // QQ 0不填，1选填，2必填
    reg_wx, // 微信 0不填，1选填，2必填
    reg_phone, // 手机 0不填，1选填，2必填
    reg_email, // 邮箱 0不填，1选填，2必填
    reg_vcode, // 0无验证码，1图形验证码 2滑块验证码 3点击显示图形验证码
    pass_limit, // 注册密码强度，0、不限制；1、数字字母；2、数字字母符合
    pass_length_min, // 注册密码最小长度
    pass_length_max, // 注册密码最大长度,
    agentRegbutton,// 是否开启代理注册，0=关闭；1=开启
    smsVerify, // 手机短信验证
    allowreg,
    closeregreason,
  } = SystemStore

  useEffect(() => {
    if (reg_vcode == 1) {
      reRenderCode()
    }
  }, [reg_vcode])

  useEffect(() => {
    if (allowreg == false) {
      Alert.alert(closeregreason, '', [{
        text: '确定',
        onPress: () => {
          popToRoot()
        },
      }])
    }
  }, [allowreg])

  const reRenderCode = async () => {
    try {
      const { data, status } = await APIRouter.secure_imgCaptcha()
      setCode(data)
    } catch (error) {
    }
  }

  const getVcode = useMemo(() => {
    ugLog('sliding reg_vcode=', reg_vcode)
    if (reg_vcode == 0) {
        return null
    } else if (reg_vcode == 3 || reg_vcode == 1) {
        return <LetterVerificationCode reg_vcode={reg_vcode} onPress={reRenderCode} code={code}/>
    } else {
        return <SlidingVerification onChange={onChangeSlideCode}/>
    }
  }, [reg_vcode, code])

  return (
    <BaseScreen screenName={'注册'}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <View style={{ alignItems: 'center', width: AppDefine.width, height: 140 }}>
        <Image style={{ width: AppDefine.width, height: 182, resizeMode: 'stretch', position: 'absolute' }}
               source={{ uri: httpClient.defaults.baseURL + '/views/mobileTemplate/20/images/login-blue-bg.png' }} />
        <Image style={{ width: 150, height: 150, resizeMode: 'stretch' }}
               source={{ uri: mobile_logo }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}
                  style={{ marginHorizontal: 36, marginTop: 28, marginBottom: 30 }}>
        <LLRegisterInput isPwd={false} visible={showRecommendGuy} onChangeText={(text) => {
          setInviter(text)
          onChangeRecommendGuy(text)
        }}
                          placeholder={'推荐人或上级代理'}
                          img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-reco.png'} />
        {showRecommendGuy && inviter == '' && <View style={{ flexDirection: 'row' }}>
          <Text style={{
            color: 'red',
            fontSize: 12,
            textAlign: 'left',
            flex: 1,
            paddingVertical: 4,
          }}>*请填写推荐人ID</Text>
        </View>}
        <LLRegisterInput isPwd={false} onChangeText={(text) => {
          setAcc(text)
          obChangeAccount(text)
        }} placeholder={'请输入会员账号（6-15位字母或数字)'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-user.png'} />
        {!regex.test(acc) && <View style={{ flexDirection: 'row' }}>
          <Text style={{
            color: 'red',
            fontSize: 12,
            textAlign: 'left',
            flex: 1,
            paddingVertical: 4,
          }}>*请使用6-15位英文或数字的组合</Text>
        </View>}
        <LLRegisterInput isPwd={true} onChangeText={(text) => {
          setPwd(text)
          obChangePassword(text)
        }} placeholder={'请输入密码（长度不能低于6位)'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-pwd.png'} />
        {pass_length_min && pass_length_max && pwd.length < pass_length_min && pwd.length > pass_length_max && <View style={{ flexDirection: 'row' }}>
          <Text style={{
            color: 'red',
            fontSize: 12,
            textAlign: 'left',
            flex: 1,
            paddingVertical: 4,
          }}>{`*请使用${pass_length_min}-${pass_length_max}位英文或数字的组合`}</Text>
        </View>}
        <LLRegisterInput isPwd={true} onChangeText={onChangeConfirmPassword} placeholder={'请确认密码'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-pwd.png'} />
        <LLRegisterInput isPwd={false} visible={reg_email != 0} onChangeText={onChangeEmail} placeholder={'请输入电子邮件'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-email.png'} />
        {reg_fundpwd ? <LLRegisterInput maxLength={4} isPwd={true} onChangeText={onChaneFundPassword} placeholder={'请输入取款密码'}
                                        img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-pwd.png'} /> : null}
        {reg_name ? <LLRegisterInput isPwd={false} onChangeText={onChaneRealName} placeholder={'请输入真实姓名'}
                                     img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-user.png'} /> : null}
        {reg_qq ? <LLRegisterInput isPwd={false} onChangeText={onChaneQQ} placeholder={'请输入QQ号'}
                                   img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-user.png'} /> : null}
        {reg_wx ? <LLRegisterInput isPwd={false} onChangeText={onChaneWeChat} placeholder={'请输入微信号'}
                                   img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-user.png'} /> : null}
        {reg_phone ? <LLRegisterInput isPwd={false} onChangeText={onChanePhone} placeholder={'请输入手机'}
                                      img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-user.png'} /> : null}
        {getVcode}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ flex: 1, backgroundColor: '#d19898', borderRadius: 30, marginTop: 12 }}
                            onPress={signUp}>
            <Text
              style={{
                fontSize: 16,
                color: 'white',
                textAlign: 'center',
                paddingVertical: 16,
              }}>立即开户</Text>
          </TouchableOpacity>
        </View>
        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', marginTop: 16 }}>
            <Text style={{ color: '#3c3c3c', fontSize: 14 }}>已有账号？</Text>
            <Text style={{ color: '#387ef5', fontSize: 14 }} onPress={() => {
              navigate(PageName.LLLoginPage, '')
            }}>马上登录</Text>
          </View>
          <Text style={{ color: '#666', marginTop: 16, fontSize: 14 }}>Copyright ©2012-2020 All Right
            Reserved</Text>
        </View>
      </ScrollView>
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
    return (() => EventRegister.removeEventListener(this.listener))
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

const LetterVerificationCode = ({ code, onPress, reg_vcode }: { code: string, onPress: () => {}, reg_vcode: 1 | 3 }) => {
  const [hide, setHide] = useState(reg_vcode == 1 ? false : true)
  return (
    <View style={{
      flexDirection: 'row',
      alignItems: 'center',
      height: 50,
      backgroundColor: 'gray',
      borderRadius: 4,
      borderColor: 'white',
      borderWidth: 1,
      marginBottom: 10,
      paddingHorizontal: 10,
    }}>
      <View style={{ width: 40, justifyContent: 'center', alignItems: 'center' }}>
        <Icon name={'Safety'} type={'antdesign'} color="black" size={24} />
      </View>
      <View style={{ height: '90%', width: 0.5, backgroundColor: 'black', marginHorizontal: 5 }}></View>
      {!hide ? <TouchableWithoutFeedback onPress={onPress}>
        <Image resizeMode={'contain'} style={{ height: '100%', aspectRatio: 2 }} source={{ uri: code }} />
      </TouchableWithoutFeedback> : <TouchableWithoutFeedback onPress={() => {
        setHide(false)
        onPress()
      }}>
        <Text>点击显示验证码</Text>
      </TouchableWithoutFeedback>}

    </View>


  )
}
