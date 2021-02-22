import React, { useState } from 'react'
import { Image, ScrollView, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'
import { BaseScreen } from './component/BaseScreen'
import Icon from 'react-native-vector-icons/FontAwesome'
import { navigate } from '../../public/navigation/RootNavigation'
import { PageName } from '../../public/navigation/Navigation'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import CheckBox from '../../public/views/tars/CheckBox'
import APIRouter from '../../public/network/APIRouter'
import { httpClient } from '../../public/network/httpClient'
import NeedNameInputComponent from '../../public/components/tars/NeedNameInputComponent'
import ReloadSlidingVerification from '../../public/components/tars/ReloadSlidingVerification'
import { UGText } from '../../../doy/public/Button之类的基础组件/DoyButton'

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

  return (
    <BaseScreen style={{ backgroundColor: '#ffffff' }} screenName={'登录'}>
      <View style={{ marginHorizontal: 24, top: 46, flex: 1 }}>
        <ScrollView bounces={false} style={{ flex: 1 }}>
          <View
            style={{
              flexDirection: 'row',
              paddingVertical: 16,
              paddingHorizontal: 4,
              borderBottomWidth: 1,
              borderColor: '#dddddd',
            }}>
            <Icon style={{ marginRight: 12 }} size={25} color={'gold'} name={'user-o'} />
            <TextInput style={{ flex: 1 }} defaultValue={account || ''} onChangeText={(text) => onChangeAccount(text)}
                       placeholder={'请输入账号'} />
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
            <TextInput secureTextEntry={!showPwd} style={{ flex: 1 }} defaultValue={password || ''}
                       onChangeText={(text) => onChangePassword(text)} placeholder={'请输入密码'} />
            <TouchableWithoutFeedback onPress={() => setShowPwd(!showPwd)}>
              <Image style={{ height: 15, width: 18, marginRight: 8, resizeMode: 'stretch' }}
                     source={{ uri: showPwd ? httpClient.defaults.baseURL + '/images/icon-eyes.png' : httpClient.defaults.baseURL + '/images/icon-eye.png' }} />
            </TouchableWithoutFeedback>
          </View>
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
                <UGText style={{ alignSelf: 'center', paddingVertical: 20, color: 'black' }}>登录</UGText>
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
                <UGText style={{ alignSelf: 'center', paddingVertical: 20, color: '#ddd' }}>登录</UGText>
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
              <UGText style={{ alignSelf: 'center', paddingVertical: 20, color: 'black' }}>马上注册</UGText>
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
              <UGText style={{ alignSelf: 'center', paddingVertical: 20, color: 'black' }}>免费试玩</UGText>
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
              <UGText style={{ alignSelf: 'center', paddingVertical: 20, color: 'black' }}>返回首页</UGText>
            </TouchableOpacity>
            <NeedNameInputComponent ref={needNameInputRef} onSubmitFullName={onSubmitFullName} />
          </View>
        </ScrollView>
      </View>
    </BaseScreen>
  )
}

export default LCLoginPage
