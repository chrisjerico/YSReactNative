import * as React from 'react'
import { useState } from 'react'
import { Image, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native'
import { BaseScreen } from '../乐橙/component/BaseScreen'
import AppDefine from '../../public/define/AppDefine'
import { push } from '../../public/navigation/RootNavigation'
import { PageName } from '../../public/navigation/Navigation'
import { UGStore } from '../../redux/store/UGStore'
// @ts-ignore
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { LLRegisterInput } from './component/registerPage/LLRegisterInput'
import { httpClient } from '../../public/network/httpClient'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { AgentType } from '../../public/models/Enum'
import ReloadSlidingVerification from '../../public/components/tars/ReloadSlidingVerification'

export const LLRegisterPage = () => {
  const { show, onChange, sign, reference, placeholder } = useSignUpPage({
    homePage: PageName.LLHomePage,
    signInPage: PageName.LLLoginPage,
  })
  const { userSingUp } = sign
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
  const [acc, setAcc] = useState('')
  const [pwd, setPwd] = useState('')
  const [inviter, setInviter] = useState('')
  const [agentType, setAgentType] = useState<any>(AgentType.用户注册)
  const regex = RegExp('^[A-Za-z0-9]{6,15}$')
  const SystemStore = UGStore.globalProps.sysConf
  const { showRecommendGuy, showSms, showName, showEmail, showInviteCode, showAgentButton, showFundPassword, showPhoneNumber, showQQ, showSlideCode, showWx } = show
  const { mobile_logo = '', pass_length_min, pass_length_max } = SystemStore

  return (
    <BaseScreen screenName={'注册'} style={{ backgroundColor: '#ffffff' }}>
      <StatusBar barStyle="dark-content" translucent={true} />
      <View style={{ alignItems: 'center', width: AppDefine.width, height: 140 }}>
        <Image style={{ width: AppDefine.width, height: 182, resizeMode: 'stretch', position: 'absolute' }}
               source={{ uri: httpClient.defaults.baseURL + '/views/mobileTemplate/20/images/login-blue-bg.png' }} />
        <Image style={{ width: 150, height: 150, resizeMode: 'stretch' }}
               source={{ uri: mobile_logo }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false} bounces={false}
                  style={{ marginHorizontal: 36, marginTop: 28, marginBottom: 30 }}>
        <LLRegisterInput isPwd={false} visible={showInviteCode} onChangeText={(text) => {
          onChangeInviteCode(text)
        }}
                         placeholder={inviteCodePlaceholder || '邀请码'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-reco.png'} />
        <LLRegisterInput isPwd={false} visible={showRecommendGuy} onChangeText={(text) => {
          setInviter(text)
          onChangeRecommendGuy(text)
        }}
                         placeholder={recommendGuyPlaceholder || '推荐人或上级代理'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-reco.png'} />
        <LLRegisterInput maxLength={15} isPwd={false} onChangeText={(text) => {
          setAcc(text)
          onChangeAccount(text)
        }} placeholder={accountPlaceholder || '请输入会员账号（7-15位字母或数字)'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-user.png'} />
        {!regex.test(acc) && <View style={{ flexDirection: 'row' }}>
          <Text style={{
            color: 'red',
            fontSize: 12,
            textAlign: 'left',
            flex: 1,
            paddingVertical: 4,
          }}>*请使用7-15位英文或数字的组合</Text>
        </View>}
        <LLRegisterInput maxLength={15} isPwd={true} onChangeText={(text) => {
          setPwd(text)
          onChangePassword(text)
        }} placeholder={passwordPlaceholder || '请输入密码（长度不能低于6位)'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-pwd.png'} />
        {pass_length_min && pass_length_max && (pwd.length < pass_length_min || pwd.length > pass_length_max) &&
        <View style={{ flexDirection: 'row' }}>
          <Text style={{
            color: 'red',
            fontSize: 12,
            textAlign: 'left',
            flex: 1,
            paddingVertical: 4,
          }}>{`*请使用${pass_length_min}-${pass_length_max}位英文或数字的组合`}</Text>
        </View>}
        <LLRegisterInput isPwd={true} onChangeText={onChangeConfirmPassword} placeholder={confirmPasswordPlaceholder || '请确认密码'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-pwd.png'} />
        <LLRegisterInput visible={showEmail} isPwd={false} onChangeText={onChangeEmail} placeholder={emailPlaceholder || '请输入电子邮件'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-email.png'} />
        <LLRegisterInput visible={showFundPassword} maxLength={4} isPwd={true} onChangeText={onChaneFundPassword}
                         placeholder={fundPasswordPlaceholder || '请输入取款密码'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-pwd.png'} />
        <LLRegisterInput visible={showName} isPwd={false} onChangeText={onChaneRealName} placeholder={'请输入真实姓名'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-user.png'} />
        <LLRegisterInput visible={showQQ} isPwd={false} onChangeText={onChaneQQ} placeholder={qqPlaceholder || '请输入QQ号'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-user.png'} />
        <LLRegisterInput visible={showWx} isPwd={false} onChangeText={onChaneWeChat} placeholder={wxPlaceholder || '请输入微信号'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-user.png'} />
        <LLRegisterInput visible={showSms || showPhoneNumber} isPwd={false} onChangeText={onChanePhone} placeholder={'请输入手机'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-user.png'} />
        <LLRegisterInput visible={showSms} isPwd={false} onChangeText={onChaneSms} placeholder={smsPlaceholder || '请输入手机短信验证码'}
                         img={httpClient.defaults.baseURL + '/images/moban9_icon/icon-user.png'} />
        <ReloadSlidingVerification
          ref={reference?.slideCodeRef}
          show={showSlideCode}
          onChange={onChangeSlideCode}
          backgroundColor={'#ffffff'}
          containerStyle={{
            backgroundColor: '#ffffff',
          }}
        />
        {showAgentButton ? <View style={{
          backgroundColor: '#b6b6b6',
          flexDirection: 'row',
          width: 152,
          alignSelf: 'center',
          marginTop: 8,
          paddingVertical: 2,
          justifyContent: 'center',
        }}>
          <TouchableWithoutFeedback onPress={() => {
            setAgentType(AgentType.用户注册)
            onChangeAgent(AgentType.用户注册)
          }}>
            <View style={{ backgroundColor: agentType == AgentType.用户注册 ? '#3ba2d0' : '#b6b6b6' }}>
              <Text style={{
                paddingVertical: 4,
                paddingHorizontal: 8,
                width: 74,
                color: agentType == AgentType.用户注册 ? '#ffffff' : '#000000',
              }}>普通用户</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={() => {
            setAgentType(AgentType.代理注册)
            onChangeAgent(AgentType.代理注册)
          }}>
            <View style={{ backgroundColor: agentType == AgentType.代理注册 ? '#3ba2d0' : '#b6b6b6' }}>
              <Text style={{
                paddingVertical: 4,
                paddingHorizontal: 8,
                width: 74,
                color: agentType == AgentType.代理注册 ? '#ffffff' : '#000000',
              }}>注册代理</Text>
            </View>
          </TouchableWithoutFeedback>
        </View> : null}
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={{ flex: 1, backgroundColor: '#d19898', borderRadius: 30, marginTop: 12 }}
                            onPress={userSingUp}>
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
              push(PageName.LLLoginPage)
            }}>马上登录</Text>
          </View>
          <Text style={{ color: '#666', marginTop: 16, fontSize: 14 }}>Copyright ©2012-2021 All Right
            Reserved</Text>
        </View>
      </ScrollView>
    </BaseScreen>
  )
}
