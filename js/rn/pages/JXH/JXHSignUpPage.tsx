import React, { useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import FormComponent, { FormComponentProps } from '../../public/components/tars/FormComponent'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { PageName } from '../../public/navigation/Navigation'
import { popToRoot } from '../../public/navigation/RootNavigation'
import { scale, scaleHeight } from '../../public/tools/Scale'
import LinearBadge from '../../public/views/tars/LinearBadge'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignUpFormList from '../../public/views/tars/SignUpFormList'

const JXHSignUpPage = () => {
  const { show, slideCodeRef, label, onChange, sign, valid, passwordLimit, navigateTo } = useSignUpPage({
    homePage: PageName.KSHomePage,
    signInPage: PageName.KSSignInPage,
  })

  const { signUp } = sign

  const { navigateToSignInPage } = navigateTo

  return (
    <>
      <SafeAreaHeader headerColor={'#000000'}>
        <MineHeader showBackBtn={true} onPressBackBtn={popToRoot} rightTitle={'登录'} showRightTitle={true} onPressRightTitle={navigateToSignInPage} />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignUpFormList slideCodeRef={slideCodeRef} slideCodeColor={'#ffffff'} show={show} label={label} passwordLimit={passwordLimit} onChange={onChange} Form={SignUpForm} />
          <LinearBadge
            colors={['#eb5d4d', '#fb2464']}
            containerStyle={[styles.button, { height: null }]}
            title={'注册'}
            textStyle={{ color: '#ffffff', fontSize: scale(23) }}
            showIcon={false}
            showLogo={false}
            onPress={signUp}
          />
        </View>
      </ScrollView>
    </>
  )
}

const SignUpForm = (props: FormComponentProps) => {
  const [focus, setFocuse] = useState(false)
  return (
    <FormComponent
      {...props}
      containerStyle={{ marginBottom: scale(10) }}
      inputContainerStyle={{ borderColor: '#d9d9d9', borderWidth: scale(1), borderRadius: scale(10), backgroundColor: focus ? '#ffffff' : '#949494', height: scale(63) }}
      leftIconContainerStyle={{ marginLeft: scale(10) }}
      rightIconContainerStyle={{ marginRight: scale(10) }}
      closeEyeColor={'#000000'}
      showLabel={false}
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
    marginVertical: scale(20),
    aspectRatio: 8,
    borderRadius: scale(5),
  },
})

export default JXHSignUpPage
