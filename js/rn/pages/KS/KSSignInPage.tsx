import React, { useState } from 'react'
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FormComponent, { FormComponentProps } from '../../public/components/tars/FormComponent'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot } from '../../public/navigation/RootNavigation'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import CheckBox from '../../public/views/tars/CheckBox'
import LinearBadge from '../../public/views/tars/LinearBadge'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignInFormList from '../../public/views/tars/SignInFormList'

const KSSignInPage = () => {
  const { sign, value, onChange, navigateTo, show, slideCodeRef } = useSignInPage({
    homePage: PageName.KSHomePage,
    signUpPage: PageName.KSSignUpPage,
  })

  const { navigateToSignUpPage } = navigateTo

  const { signIn } = sign

  const { onChangeRemember } = onChange
  const { remember } = value

  return (
    <>
      <SafeAreaHeader headerColor={'#000000'}>
        <MineHeader showBackBtn={true} rightTitle={'注册'} onPressBackBtn={popToRoot} showRightTitle={true} onPressRightTitle={navigateToSignUpPage} />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={{ color: '#ffffff', fontSize: scale(30), marginBottom: scale(30) }}>{'登录'}</Text>
          <SignInFormList slideCodeRef={slideCodeRef} slideCodeColor={'#ffffff'} show={show} onChange={onChange} value={value} Form={SignInForm} showCheckBox={false} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <TouchableWithoutFeedback onPress={() => {}}>
              <Text style={{ color: '#8e8e93' }}>{'忘记密码'}</Text>
            </TouchableWithoutFeedback>
            <CheckBox onPress={onChangeRemember} label={'记住密码'} containerStyle={{ alignSelf: 'flex-start', marginTop: scale(10) }} defaultValue={remember} labelTextStyle={{ color: '#8e8e93' }} />
          </View>
          <LinearBadge
            colors={['#eb5d4d', '#fb2464']}
            containerStyle={[styles.button, { height: null }]}
            title={'登录'}
            textStyle={{ color: '#ffffff', fontSize: scale(23) }}
            showIcon={false}
            showLogo={false}
            onPress={signIn}
          />
          <Button title={'免费试玩'} containerStyle={styles.signUpButton} titleStyle={{ color: '#ffffff', fontSize: scale(23) }} onPress={navigateToSignUpPage} />
        </View>
      </ScrollView>
    </>
  )
}

const SignInForm = (props: FormComponentProps) => {
  const [focus, setFocuse] = useState(false)
  return (
    <FormComponent
      {...props}
      containerStyle={{ marginBottom: scale(10) }}
      inputContainerStyle={{ borderColor: '#d9d9d9', borderWidth: scale(1), borderRadius: scale(10), backgroundColor: focus ? '#ffffff' : '#949494', height: scale(63) }}
      leftIconContainerStyle={{ marginLeft: scale(10) }}
      rightIconContainerStyle={{ marginRight: scale(10) }}
      closeEyeColor={'#000000'}
      onFocus={() => setFocuse(true)}
      onBlur={() => setFocuse(false)}
      leftIconProps={{ color: '#000000', ...props?.leftIconProps }}
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
  signUpButton: {
    backgroundColor: '#a09e9d',
    width: '100%',
    aspectRatio: 8,
    borderRadius: scale(5),
  },
})

export default KSSignInPage
