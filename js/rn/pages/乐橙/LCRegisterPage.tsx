import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import { navigate, pop } from '../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as React from 'react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { UGStore } from '../../redux/store/UGStore'
import { PageName } from '../../public/navigation/Navigation'
import { RegisterItem } from './component/registerPage/RegisterItem'
// @ts-ignore
import APIRouter from '../../public/network/APIRouter'
import { EventRegister } from 'react-native-event-listeners'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { ugLog } from '../../public/tools/UgLog'
import WebView, { WebViewMessageEvent } from 'react-native-webview'
import AppDefine from '../../public/define/AppDefine'
import { httpClient } from '../../public/network/httpClient'
import LetterVerificationCode from '../common/LetterVerificationCode'

interface RegisterData {
  acc: string
  pwd: string
  confirmPwd: string
  reco?: string
  reg_name?: string
  reg_fundpwd?: string
  reg_qq?: string
  reg_wx?: string
  reg_phone?: string
  reg_email?: string
  reg_vcdoe?: string
}

const LCRegisterPage = ({ navigation, setProps }) => {
  const [regType, setRegType] = useState<'user' | 'agent'>('user')
  const [data, setData] = useState<RegisterData>({ acc: '', pwd: '', confirmPwd: '' })
  const [code, setCode] = useState('')
  const [inviter, setInviter] = useState('')
  const SystemStore = UGStore.globalProps.sysConf
  const regex = RegExp('^[A-Za-z0-9]{6,15}$')
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)
  const [showFundPwd, setShowFundPwd] = useState(false)
  const { show, onChange, sign } = useSignUpPage({
    homePage: PageName.LCHomePage,
    signInPage: PageName.LCLoginPage,
  })
  const { signUp } = sign
  const { showRecommendGuy } = show
  const {
    onChangeRecommendGuy,
    onChangeAccount,
    onChangePassword,
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
    onChangeInviteCode,
  } = onChange

  const {
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
    smsVerify, // 手机短信验证,
    showInviteCode,
    allowreg,
    closeregreason,
  } = SystemStore

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
      return <LetterVerificationCode reg_vcode={reg_vcode} onPress={reRenderCode} code={code} />
    } else {
      return <SlidingVerification onChange={onChangeSlideCode} />
    }
  }, [reg_vcode, code])

  return (
    <SafeAreaView style={{ backgroundColor: 'gold', flex: 1 }}>
      <View style={{ backgroundColor: '#f3f3f3', flex: 1 }}>
        <SafeAreaView style={{ backgroundColor: 'gold' }}>
          <View style={{
            backgroundColor: 'gold',
            width: Dimensions.get('screen').width,
            flexDirection: 'row',
            alignItems: 'center',
            height: 53,
          }}>
            <Text style={{
              textAlign: 'center',
              fontSize: 17,
              width: '100%',
              alignSelf: 'center',
              color: '#fff',
            }}>注册</Text>
            <TouchableOpacity
              style={{ width: 30, position: 'absolute', left: 20, justifyContent: 'center', height: 33 }}
              onPress={() => pop()}>
              <Icon size={33} color={'#fff'} name={'angle-left'} />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View style={{
          borderWidth: 1,
          backgroundColor: 'white',
          borderColor: '#ddd',
          borderRadius: 12,
          paddingVertical: 20,
        }}>
          <ScrollView showsVerticalScrollIndicator={false}
                      style={{ marginHorizontal: 12, maxHeight: 550 }}>
            <Text style={{ color: 'red', fontSize: 14 }}>为了您的资金安全，请使用真实资料!</Text>
            <View style={{
              flexDirection: 'row',
              paddingVertical: 10,
              borderWidth: 1,
              paddingHorizontal: 12,
              borderColor: '#ddd',
              marginTop: 12,
            }}>
              <Icon style={{ marginRight: 12 }} size={25} color={'gold'} name={'user-o'} />
              <TextInput onChangeText={(text) => {
                onChangeAccount(text)
                setData({ ...data, acc: text })
              }} placeholder={'帐号'}
                         style={{ flex: 1 }} />
            </View>
            {regex.test(data.acc) ?
              <Text style={{ marginTop: 12, fontSize: 12, color: '#6bab64' }}>*该账号可用</Text> :
              <Text style={{ marginTop: 12, fontSize: 12, color: 'red' }}>*请使用6-15位英文或数字的组合</Text>
            }
            <View style={{
              flexDirection: 'row',
              paddingVertical: 10,
              borderWidth: 1,
              paddingHorizontal: 12,
              borderColor: '#ddd',
              marginTop: 12,
              alignItems: 'center',
            }}>
              <Icon style={{ marginRight: 12 }} size={25} color={'gold'} name={'unlock-alt'} />
              <TextInput
                secureTextEntry={!showPwd}
                onChangeText={(text) => {
                  onChangePassword(text)
                  setData({ ...data, pwd: text })
                }} placeholder={'密码'}
                style={{ flex: 1 }} />
              <TouchableWithoutFeedback onPress={() => setShowPwd(!showPwd)}>
                <Image style={{ height: 15, width: 18, marginRight: 8, resizeMode: 'stretch' }}
                       source={{ uri: showPwd ? httpClient.defaults.baseURL + '/images/icon-eyes.png' : httpClient.defaults.baseURL + '/images/icon-eye.png' }} />
              </TouchableWithoutFeedback>
            </View>
            <Text style={{ marginTop: 12, fontSize: 12, color: 'red' }}>*请使用至少6位字符</Text>
            <View style={{
              flexDirection: 'row',
              paddingVertical: 10,
              borderWidth: 1,
              paddingHorizontal: 12,
              borderColor: '#ddd',
              marginTop: 12,
            }}>
              <Icon style={{ marginRight: 12 }} size={25} color={'gold'} name={'unlock-alt'} />
              <TextInput secureTextEntry={!showConfirmPwd}
                         onChangeText={(text) => setData({ ...data, confirmPwd: text })}
                         placeholder={'确认密码'} style={{ flex: 1 }} />
              <TouchableWithoutFeedback onPress={() => setShowConfirmPwd(!showConfirmPwd)}>
                <Image style={{ height: 15, width: 18, marginRight: 8, resizeMode: 'stretch' }}
                       source={{ uri: showConfirmPwd ? httpClient.defaults.baseURL + '/images/icon-eyes.png' : httpClient.defaults.baseURL + '/images/icon-eye.png' }} />
              </TouchableWithoutFeedback>
            </View>
            {data.pwd != '' && data.pwd != data.confirmPwd &&
            <Text style={{ marginTop: 12, fontSize: 12, color: '#e00013' }}>*密码不一致</Text>}
            {reg_name ? <RegisterItem placeHolder={'请输入真实姓名'} iconName={'user-o'} config={reg_name}
                                      onChangeText={(text) => {
                                        onChaneRealName(text)
                                        setData({ ...data, reg_name: text })
                                      }} /> : null}
            <View style={{
              flexDirection: 'row',
              paddingVertical: 10,
              borderWidth: 1,
              paddingHorizontal: 12,
              borderColor: '#ddd',
              marginTop: 12,
            }}>
              <Icon style={{ marginRight: 12 }} size={25} color={'gold'} name={'unlock-alt'} />
              <TextInput secureTextEntry={!showFundPwd}
                         maxLength={4}
                         keyboardType={'numeric'}
                         onChangeText={(text) => {
                           onChaneFundPassword(text)
                           setData({ ...data, reg_fundpwd: text })
                         }}
                         placeholder={'请输入4数字取款密码'} style={{ flex: 1 }} />
              <TouchableWithoutFeedback onPress={() => setShowFundPwd(!showFundPwd)}>
                <Image style={{ height: 15, width: 18, marginRight: 8, resizeMode: 'stretch' }}
                       source={{ uri: showFundPwd ? httpClient.defaults.baseURL + '/images/icon-eyes.png' : httpClient.defaults.baseURL + '/images/icon-eye.png' }} />
              </TouchableWithoutFeedback>
            </View>
            {showRecommendGuy ? <RegisterItem placeHolder={'推荐人'} iconName={'unlock-alt'} config={smsVerify}
                                              onChangeText={(text) => {
                                                setInviter(text)
                                                onChangeRecommendGuy(text)
                                              }} /> : null}
            {showRecommendGuy && inviter == '' && hide_reco == 2 && <View style={{ flexDirection: 'row' }}>
              <Text style={{
                color: 'red',
                fontSize: 12,
                textAlign: 'left',
                flex: 1,
                paddingVertical: 4,
              }}>*请填写推荐人ID</Text>
            </View>}
            {smsVerify ? <RegisterItem placeHolder={'邀请码'} iconName={'unlock-alt'} config={smsVerify}
                                       onChangeText={(text) => {
                                         onChangeInviteCode(text)
                                       }} /> : null}
            {reg_qq ? <RegisterItem placeHolder={'请输入QQ帐号'} iconName={'qq'} iconType={'AntDesign'} config={reg_qq}
                                    onChangeText={(text) => {
                                      onChaneQQ(text)
                                    }} /> : null}
            {reg_wx ? <RegisterItem placeHolder={'请输入微信号'} iconName={'wechat'} iconType={'AntDesign'} config={reg_wx}
                                    onChangeText={(text) => {
                                      onChaneWeChat(text)
                                      setData({ ...data, reg_wx: text })
                                    }} /> : null}
            {reg_phone ? <RegisterItem placeHolder={'请输入手机号码'} iconName={'mobile'} config={reg_phone}
                                       onChangeText={(text) => {
                                         onChanePhone(text)
                                         setData({ ...data, reg_phone: text })
                                       }} /> : null}
            {smsVerify ? <RegisterItem placeHolder={'请输入手机短信验证码'} iconName={'unlock-alt'} config={smsVerify}
                                       onChangeText={(text) => {
                                         onChaneSms(text)
                                         setData({ ...data, reg_vcdoe: text })
                                       }} /> : null}
            {reg_email ? <RegisterItem placeHolder={'请输入邮箱地址'} iconName={'envelope-o'} config={reg_email}
                                       onChangeText={(text) => {
                                         onChangeEmail(text)
                                         setData({ ...data, reg_email: text })
                                       }} /> : null}
            {getVcode}
            <TouchableOpacity
              onPress={() => signUp()}
              style={{ paddingVertical: 16, marginTop: 12, borderRadius: 8, backgroundColor: '#ff9c06' }}>
              <Text style={{ alignSelf: 'center', color: 'white', fontSize: 16 }}>注册</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate(PageName.LCLoginPage)}>
              <Text style={{ marginTop: 28, alignSelf: 'center', color: '#7e7e7e' }}>返回登录</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigate(PageName.LCHomePage)}>
              <Text style={{ marginTop: 28, alignSelf: 'center', color: '#7e7e7e' }}>返回首页</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LCRegisterPage

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
