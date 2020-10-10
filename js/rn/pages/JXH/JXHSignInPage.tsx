import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FormComponent, { FormComponentProps } from '../../public/components/tars/FormComponent'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import { PageName } from '../../public/navigation/Navigation'
import { popToRoot } from '../../public/navigation/RootNavigation'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import CheckBox from '../../public/views/tars/CheckBox'
import LinearBadge from '../../public/views/tars/LinearBadge'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignInFormList from '../../public/views/tars/SignInFormList'

const JXHSignInPage = () => {
  const { sign, value, onChange, navigateTo, show, slideCodeRef } = useSignInPage({
    homePage: PageName.JXHHomePage,
    signUpPage: PageName.JXHSignUpPage,
  })

  const { navigateToSignUpPage } = navigateTo

  const { signIn, tryPlay } = sign

  const { onChangeRemember } = onChange
  const { remember } = value

  return (
    <>
      <SafeAreaHeader headerColor={'#000000'}>
        <MineHeader showBackBtn={true} onPressBackBtn={popToRoot} showRightTitle={false} backBtnColor={'#cfa461'} />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={{ color: '#ffffff', fontSize: scale(30), marginBottom: scale(30) }}>{'欢迎您'}</Text>
          <View style={{ flexDirection: 'row', marginBottom: scale(20) }}>
            <Text style={{ color: '#ffffff', fontSize: scale(15) }}>{'没有账号,立即'}</Text>
            <TouchableWithoutFeedback onPress={navigateToSignUpPage}>
              <Text style={{ color: '#cfa461', fontSize: scale(15) }}>{'注册'}</Text>
            </TouchableWithoutFeedback>
            <Text style={{ color: '#ffffff', fontSize: scale(15) }}>{'或'}</Text>
            <TouchableWithoutFeedback onPress={tryPlay}>
              <Text style={{ color: '#cfa461', fontSize: scale(15) }}>{'免费试玩'}</Text>
            </TouchableWithoutFeedback>
          </View>
          <SignInFormList slideCodeRef={slideCodeRef} slideCodeColor={'#ffffff'} show={show} onChange={onChange} value={value} Form={SignInForm} showCheckBox={false} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <CheckBox onPress={onChangeRemember} label={'记住密码'} containerStyle={{ alignSelf: 'flex-start', marginTop: scale(10) }} defaultValue={remember} labelTextStyle={{ color: '#8e8e93' }} />
          </View>
          <LinearBadge
            colors={['#cfa461', '#cfa461']}
            containerStyle={[styles.button, { height: null }]}
            title={'登录'}
            textStyle={{ color: '#ffffff', fontSize: scale(23) }}
            showIcon={false}
            showLogo={false}
            onPress={signIn}
          />
          <Button title={'返回首页'} containerStyle={styles.popButton} titleStyle={{ color: '#ffffff', fontSize: scale(23) }} onPress={popToRoot} />
        </View>
      </ScrollView>
    </>
  )
}

const SignInForm = (props: FormComponentProps) => {
  return (
    <FormComponent
      {...props}
      containerStyle={{ marginBottom: scale(10) }}
      inputContainerStyle={{ borderRadius: scale(10), backgroundColor: '#333333', height: scale(63), borderBottomWidth: 0 }}
      leftIconContainerStyle={{ marginLeft: scale(10) }}
      rightIconContainerStyle={{ marginRight: scale(10) }}
      closeEyeColor={'#cfa461'}
      leftIconProps={{ color: '#cfa461', ...props?.leftIconProps }}
      inputStyle={{ color: '#ffffff' }}
      placeholderTextColor={'#ffffff'}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  formContainer: {
    backgroundColor: '#000000',
    width: '95%',
    alignSelf: 'center',
    marginTop: scale(15),
    paddingHorizontal: scale(25),
    paddingTop: scale(25),
    marginBottom: scaleHeight(70),
  },
  button: {
    width: '100%',
    marginTop: scale(20),
    marginBottom: scale(25),
    aspectRatio: 8,
    borderRadius: scale(5),
  },
  popButton: {
    backgroundColor: '#a09e9d',
    width: '100%',
    aspectRatio: 8,
    borderRadius: scale(5),
  },
})

export default JXHSignInPage
