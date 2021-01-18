import {
  Alert,
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
import { pop, push } from '../../public/navigation/RootNavigation'
import Icon from 'react-native-vector-icons/FontAwesome'
import * as React from 'react'
import { useEffect, useState } from 'react'
import { PageName } from '../../public/navigation/Navigation'
import { RegisterItem } from './component/registerPage/RegisterItem'
// @ts-ignore
import APIRouter from '../../public/network/APIRouter'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import AppDefine from '../../public/define/AppDefine'
import { httpClient } from '../../public/network/httpClient'
import { hideLoading, showLoading } from '../../public/widget/UGLoadingCP'
import { ToastError, ToastSuccess } from '../../Res/icon'
import { AgentType } from '../../public/models/Enum'
import ReloadSlidingVerification from '../../public/components/tars/ReloadSlidingVerification'

interface RegisterData {
  acc: string
  pwd: string
  confirmPwd: string
  phoneNumber: string
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
  const [data, setData] = useState<RegisterData>({ acc: '', pwd: '', confirmPwd: '', phoneNumber: '' })
  const regex = RegExp('^[A-Za-z0-9]{6,15}$')
  const [showPwd, setShowPwd] = useState(false)
  const [showConfirmPwd, setShowConfirmPwd] = useState(false)
  const [showFundPwd, setShowFundPwd] = useState(false)
  const { show, onChange, sign, reference, placeholder } = useSignUpPage({
    homePage: PageName.LCHomePage,
    signInPage: PageName.LCLoginPage,
  })
  const [haveBottomTab, setHaveBottomTab] = useState(false)
  const { userSingUp } = sign
  const { showRecommendGuy, showSms, showName, showEmail, showInviteCode, showAgentButton, showFundPassword, showPhoneNumber, showQQ, showSlideCode, showWx,  } = show
  const {
    recommendGuyPlaceholder,
    accountPlaceholder,
    passwordPlaceholder,
    confirmPasswordPlaceholder,
    fundPasswordPlaceholder,
    qqPlaceholder,
    wxPlaceholder,
    emailPlaceholder,
    smsPlaceholder,
    inviteCodePlaceholder,
  } = placeholder
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

  useEffect(() => {
    AppDefine.checkHeaderShowBackButton((status) => {
      setHaveBottomTab(status)
      setProps()
    })
  }, [])

  const fetchSms = async (phoneNumber) => {
    if (phoneNumber) {
      try {
        showLoading()
        const { data } = await APIRouter.secure_smsCaptcha(phoneNumber)
        const { code, msg } = data ?? {}

        hideLoading()
        if (code != 0) {
          throw { message: msg }
        } else {
          ToastSuccess(msg)
        }
      } catch (error) {
        hideLoading()
        ToastError(error?.message)
      }
    } else {
      Alert.alert('请填写手机号')
    }
  }

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
                      style={{ marginHorizontal: 12, maxHeight: haveBottomTab ? 500 : 550 }}>
            <Text style={{ color: 'red', fontSize: 14 }}>为了您的资金安全，请使用真实资料!</Text>
            <RegisterItem placeHolder={inviteCodePlaceholder || '邀请码'} iconName={'user-o'} config={showInviteCode}
                          onChangeText={(text) => onChangeInviteCode(text)} />
            {showInviteCode == 1 && <Text style={{ marginTop: 12, fontSize: 12, color: 'red' }}>邀请码，如没有可不填写</Text>}
            <RegisterItem placeHolder={recommendGuyPlaceholder || '推荐人'} iconName={'user-o'} config={showRecommendGuy}
                          onChangeText={(text) => onChangeRecommendGuy(text)} />
            {showRecommendGuy && <Text style={{ marginTop: 12, fontSize: 12, color: 'red' }}>推荐人ID，如没有可不填写</Text>}
            <View style={{
              flexDirection: 'row',
              paddingVertical: 10,
              borderWidth: 1,
              paddingHorizontal: 12,
              borderColor: '#ddd',
              marginTop: 12,
            }}>
              <Icon style={{ marginRight: 12 }} size={25} color={'gold'} name={'user-o'} />
              <TextInput placeholder={accountPlaceholder || '帐号'} style={{ flex: 1 }} onChangeText={(text) => {
                onChangeAccount(text)
                setData({ ...data, acc: text })
              }} />
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
                }} placeholder={passwordPlaceholder || '密码'}
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
                         onChangeText={(text) => {
                           onChangeConfirmPassword(text)
                           setData({ ...data, confirmPwd: text },
                           )
                         }}
                         placeholder={confirmPasswordPlaceholder || '确认密码'} style={{ flex: 1 }} />
              <TouchableWithoutFeedback onPress={() => setShowConfirmPwd(!showConfirmPwd)}>
                <Image style={{ height: 15, width: 18, marginRight: 8, resizeMode: 'stretch' }}
                       source={{ uri: showConfirmPwd ? httpClient.defaults.baseURL + '/images/icon-eyes.png' : httpClient.defaults.baseURL + '/images/icon-eye.png' }} />
              </TouchableWithoutFeedback>
            </View>
            {data.pwd != '' && data.pwd != data.confirmPwd &&
            <Text style={{ marginTop: 12, fontSize: 12, color: '#e00013' }}>*密码不一致</Text>}
            <RegisterItem placeHolder={'请输入真实姓名'} iconName={'user-o'} config={showName}
                          onChangeText={(text) => onChaneRealName(text)} />
            {showFundPassword && <View style={{
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
                         onChangeText={(text) => onChaneFundPassword(text)}
                         placeholder={fundPasswordPlaceholder || '请输入4数字取款密码'} style={{ flex: 1 }} />
              <TouchableWithoutFeedback onPress={() => setShowFundPwd(!showFundPwd)}>
                <Image style={{ height: 15, width: 18, marginRight: 8, resizeMode: 'stretch' }}
                       source={{ uri: showFundPwd ? httpClient.defaults.baseURL + '/images/icon-eyes.png' : httpClient.defaults.baseURL + '/images/icon-eye.png' }} />
              </TouchableWithoutFeedback>
            </View>}
            <RegisterItem placeHolder={qqPlaceholder || '请输入QQ帐号'} iconName={'qq'} iconType={'AntDesign'} config={showQQ}
                          onChangeText={(text) => onChaneQQ(text)} />
            <RegisterItem placeHolder={wxPlaceholder || '请输入微信号'} iconName={'wechat'} iconType={'AntDesign'} config={showWx}
                          onChangeText={(text) => onChaneWeChat(text)} />
            <RegisterItem placeHolder={'请输入手机号码'} iconName={'mobile'} config={showPhoneNumber || showSms}
                          onChangeText={(text) => {
                            onChanePhone(text)
                            setData({ ...data, phoneNumber: text })
                          }} />
            <RegisterItem sms={showSms} placeHolder={smsPlaceholder || '请输入手机短信验证码'} iconName={'unlock-alt'} config={showSms}
                          onChangeText={(text) => onChaneSms(text)} phoneNumber={data.phoneNumber} />
            <RegisterItem placeHolder={emailPlaceholder || '请输入邮箱地址'} iconName={'envelope-o'} config={showEmail}
                          onChangeText={(text) => onChangeEmail(text)} />
            {showAgentButton ?
              <View style={{
                marginTop: 8,
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
                <TouchableWithoutFeedback onPress={() => {
                  onChangeAgent(AgentType.用户注册)
                  setRegType(AgentType.用户注册)
                }}>
                  <View style={{
                    backgroundColor: '#bfbfbf',
                    paddingVertical: 2,
                    paddingLeft: 4,
                    borderTopLeftRadius: 4,
                    borderBottomLeftRadius: 4,
                  }}>
                    <View style={{
                      backgroundColor: regType == AgentType.用户注册 ? '#3ba2d0' : '#bfbfbf',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                      borderRadius: 4,
                    }}>
                      <Text style={{ color: regType == AgentType.用户注册 ? 'white' : '#919191' }}>普通用户</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
                <TouchableWithoutFeedback onPress={() => {
                  onChangeAgent(AgentType.代理注册)
                  setRegType(AgentType.代理注册)
                }}>
                  <View style={{
                    backgroundColor: '#bfbfbf',
                    paddingVertical: 2,
                    paddingLeft: 4,
                    borderTopRightRadius: 4,
                    borderBottomRightRadius: 4,
                  }}>
                    <View style={{
                      backgroundColor: regType == AgentType.代理注册 ? '#3ba2d0' : '#bfbfbf',
                      justifyContent: 'center',
                      alignItems: 'center',
                      padding: 5,
                      borderRadius: 4,
                    }}>
                      <Text style={{ color: regType == AgentType.代理注册 ? 'white' : '#919191' }}>注册代理</Text>
                    </View>
                  </View>
                </TouchableWithoutFeedback>
              </View>
              : null}
            <ReloadSlidingVerification
              ref={reference?.slideCodeRef}
              show={showSlideCode}
              onChange={onChangeSlideCode}
              backgroundColor={'#ffffff'}
              containerStyle={{
                backgroundColor: '#ffffff',
              }}
            />
            <TouchableOpacity
              onPress={userSingUp}
              style={{ paddingVertical: 16, marginTop: 12, borderRadius: 8, backgroundColor: '#ff9c06' }}>
              <Text style={{ alignSelf: 'center', color: 'white', fontSize: 16 }}>注册</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => push(PageName.LCLoginPage)}>
              <Text style={{ marginTop: 28, alignSelf: 'center', color: '#7e7e7e' }}>返回登录</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => push(PageName.LCHomePage)}>
              <Text style={{ marginTop: 28, alignSelf: 'center', color: '#7e7e7e' }}>返回首页</Text>
            </TouchableOpacity>
          </ScrollView>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default LCRegisterPage
