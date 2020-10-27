import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import FormComponent, { FormComponentProps } from '../../public/components/tars/FormComponent'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { PageName } from '../../public/navigation/Navigation'
import { popToRoot } from '../../public/navigation/RootNavigation'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import LinearBadge from '../../public/views/tars/LinearBadge'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignUpFormList from '../../public/views/tars/SignUpFormList'

const JXHSignUpPage = () => {
  const { show, slideCodeRef, label, onChange, sign, valid, passwordLimit, navigateTo } = useSignUpPage({
    homePage: PageName.JXHHomePage,
    signInPage: PageName.JXHSignInPage,
  })

  const { signUp } = sign

  const { navigateToSignInPage } = navigateTo

  return (
    <>
      <SafeAreaHeader headerColor={'#000000'}>
        <MineHeader showBackBtn={true} onPressBackBtn={popToRoot} showRightTitle={false} backBtnColor={'#cfa461'} />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <Text style={{ color: '#ffffff', fontSize: scale(40), fontWeight: '500' }}>{'欢迎注冊'}</Text>
          <View style={{ flexDirection: 'row', marginVertical: scale(20) }}>
            <Text style={{ color: '#ffffff' }}>{'我已有帐号，立即'}</Text>
            <TouchableWithoutFeedback onPress={navigateToSignInPage}>
              <Text style={{ color: '#cfa461' }}>{'登陆'}</Text>
            </TouchableWithoutFeedback>
          </View>
          <SignUpFormList slideCodeRef={slideCodeRef} slideCodeColor={'#000000'} show={show} label={label} passwordLimit={passwordLimit} onChange={onChange} Form={SignUpForm} />
          <LinearBadge
            colors={['#cfa461', '#cfa461']}
            containerStyle={[styles.button, { height: null }]}
            title={'注册'}
            textStyle={{ color: '#ffffff', fontSize: scale(23) }}
            showIcon={false}
            showLogo={false}
            onPress={signUp}
          />
          <Button title={'返回首页'} containerStyle={styles.popButton} titleStyle={{ color: '#ffffff', fontSize: scale(23) }} onPress={popToRoot} />
        </View>
      </ScrollView>
    </>
  )
}

const SignUpForm = (props: FormComponentProps) => {
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
      labelTextStyle={{ fontWeight: 'normal' }}
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
    marginVertical: scale(20),
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

export default JXHSignUpPage
