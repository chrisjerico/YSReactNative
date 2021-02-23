import React from 'react'
import { Image, ScrollView, StatusBar, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import { BaseScreen } from '../乐橙/component/BaseScreen'
import PushHelper from '../../public/define/PushHelper'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import { PageName } from '../../public/navigation/Navigation'
import { httpClient } from '../../public/network/httpClient'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import CheckBox from '../../public/views/tars/CheckBox'
import ReloadSlidingVerification from '../../public/components/tars/ReloadSlidingVerification'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'

export const LLLoginPage = ({ setProps }) => {
  const { onChange, show, slideCodeRef, sign, valid, navigateTo, value } = useSignInPage({
    homePage: PageName.LLHomePage,
    signUpPage: PageName.LLRegisterPage,
  })
  const { onChangePassword, onChangeAccount, onChangeRemember, onChangeSlideCode } = onChange
  const { signIn, tryPlay } = sign
  const { showSignInSlideCode } = show
  const { remember, account, password } = value
  const { navigateToSignUpPage } = navigateTo

  return (
    <BaseScreen
      screenName={'登录'}
      style={{
        backgroundColor: '#ffffff',
      }}>
      <ScrollView bounces={false}>
        <StatusBar barStyle="dark-content" translucent={true} />
        <View style={{ marginHorizontal: 28 }}>
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
                uri: httpClient.defaults.baseURL + '/images/moban9_icon/icon-user.png',
              }}
            />
            <TextInput onChangeText={(text) => onChangeAccount(text)}
                       style={{ fontSize: 14, paddingVertical: 20, flex: 1 }} placeholderTextColor={'#333'}
                       placeholder={'请输入会员账号'}>
              {account}
            </TextInput>
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
                uri: httpClient.defaults.baseURL + '/images/moban9_icon/icon-pwd.png',
              }}
            />
            <TextInput
              secureTextEntry={true}
              onChangeText={(text) => onChangePassword(text)}
              style={{ fontSize: 14, paddingVertical: 20, flex: 1 }}
              placeholderTextColor={'#333'}
              placeholder={'请输入密码'}
            >
              {password}
            </TextInput>
          </View>
          {(password == null || password == '') && <View style={{ flexDirection: 'row' }}>
            <UGText style={{
              color: 'red',
              fontSize: 12,
              textAlign: 'left',
              flex: 1,
              paddingVertical: 4,
            }}>{`*请输入密码`}</UGText>
          </View>}
          <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 24 }}>
            <CheckBox onPress={onChangeRemember} label={'记住密码'} defaultValue={remember} />
          </View>
          <ReloadSlidingVerification
            ref={slideCodeRef}
            show={showSignInSlideCode}
            onChange={onChangeSlideCode}
            backgroundColor={'#ffffff'}
            containerStyle={{
              backgroundColor: '#ffffff',
            }}
          />
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
              <UGText style={{ color: 'white', fontSize: 16 }}>登 录</UGText>
            </TouchableHighlight>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
            <View style={{ flex: 1 }} />
            <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }}
                              onPress={() => PushHelper.pushUserCenterType(UGUserCenterType.在线客服)}>
              <Image
                style={{ height: 24, width: 24 }}
                source={{
                  uri: httpClient.defaults.baseURL + '/views/mobileTemplate/20/images/kf.png',
                }}
              />
              <UGText style={{ color: '#333333', paddingLeft: 8 }}>在线客服</UGText>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'center' }}>
            <UGText style={{ fontSize: 16, paddingVertical: 24, color: '#3c3c3c' }}>其他</UGText>
            <View style={{ flexDirection: 'row', marginHorizontal: 12 }}>
              <TouchableOpacity
                style={{ alignItems: 'center' }}
                onPress={() => {
                  navigateToSignUpPage()
                }}>
                <Image
                  style={{ height: 64, width: 64 }}
                  source={{
                    uri: httpClient.defaults.baseURL + '/views/mobileTemplate/20/images/register.png',
                  }}
                />
                <UGText style={{ marginTop: 8 }}>马上注册</UGText>
              </TouchableOpacity>
              <View style={{ flex: 1 }} />
              <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => tryPlay()}>
                <Image
                  style={{ height: 64, width: 64 }}
                  source={{
                    uri: httpClient.defaults.baseURL + '/views/mobileTemplate/20/images/mfsw.png',
                  }}
                />
                <UGText style={{ marginTop: 8 }}>免费试玩</UGText>
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
                    uri: httpClient.defaults.baseURL + '/views/mobileTemplate/20/images/dnb.png',
                  }}
                />
                <UGText style={{ marginTop: 8 }}>电脑版</UGText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </BaseScreen>
  )
}
