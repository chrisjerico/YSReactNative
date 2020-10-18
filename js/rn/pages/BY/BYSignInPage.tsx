import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import FastImage from 'react-native-fast-image'
import FormComponent from '../../public/components/tars/FormComponent'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop } from '../../public/navigation/RootNavigation'
import { scale, scaleHeight } from '../../public/tools/Scale'
import { useHtml5Image } from '../../public/tools/tars'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignInFormList, { SignInRenderFormProps } from '../../public/views/tars/SignInFormList'

const { getHtml5Image } = useHtml5Image('http://t132f.fhptcdn.com')

const BYSignInPage = () => {
  const { sign, value, onChange, navigateTo, show, slideCodeRef, valid } = useSignInPage({
    homePage: PageName.BYHomePage,
    signUpPage: PageName.BYSignUpPage,
  })

  const { navigateToSignUpPage } = navigateTo

  const { signIn, tryPlay } = sign

  return (
    <>
      <SafeAreaHeader headerColor={'#ffffff'}>
        <MineHeader title={'登录'} showBackBtn={true} onPressBackBtn={pop} showRightTitle={false} titleStyle={{ color: '#000000' }} backBtnColor={'#000000'} />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignInFormList
            slideCodeRef={slideCodeRef}
            slideCodeColor={'#ffffff'}
            show={show}
            onChange={onChange}
            value={value}
            renderForm={SignInForm}
            accountFormProps={{ topLabel: '用戶名', topLabelLogo: getHtml5Image(null, 'icon-user-24') }}
            passwordFormProps={{ topLabel: '密码', topLabelLogo: getHtml5Image(null, 'icon-pwd-24') }}
          />
          <Button
            title={'立即登录'}
            disabled={false}
            containerStyle={[
              styles.button,
              {
                backgroundColor: '#298dff',
              },
            ]}
            titleStyle={{ color: '#ffffff', fontSize: scale(23) }}
            onPress={signIn}
          />
          <Button
            title={'快速注册'}
            containerStyle={[
              styles.button,
              {
                backgroundColor: '#ffffff',
                borderColor: '#298dff',
                borderWidth: scale(1),
              },
            ]}
            titleStyle={{ color: '#298dff', fontSize: scale(23) }}
            onPress={navigateToSignUpPage}
          />
          <Button
            title={'免费试玩'}
            containerStyle={[
              styles.button,
              {
                backgroundColor: '#ffffff',
                borderColor: '#298dff',
                borderWidth: scale(1),
              },
            ]}
            titleStyle={{ color: '#298dff', fontSize: scale(23) }}
            onPress={tryPlay}
          />
        </View>
      </ScrollView>
    </>
  )
}

const SignInForm = (props: SignInRenderFormProps) => {
  const { topLabel, topLabelLogo } = props
  return (
    <>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: scale(10) }}>
        <FastImage source={{ uri: topLabelLogo }} style={{ width: scale(20), aspectRatio: 1 }} />
        <Text style={{ fontSize: scale(30), fontWeight: '600', marginLeft: scale(10) }}>{topLabel}</Text>
      </View>
      <FormComponent
        {...props}
        showLeftIcon={false}
        containerStyle={{ marginBottom: scale(20), backgroundColor: '#C4E1FF' }}
        inputContainerStyle={{ borderColor: '#d9d9d9' }}
        leftIconContainerStyle={{ width: null }}
        closeEyeColor={'#000000'}
      />
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
    paddingTop: scale(25),
    marginBottom: scaleHeight(70),
  },
  button: {
    width: '100%',
    marginTop: scale(20),
    marginBottom: scale(5),
    aspectRatio: 8,
    borderRadius: scale(400),
  },
})

export default BYSignInPage
