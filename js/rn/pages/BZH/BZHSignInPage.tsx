import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FormComponent from '../../public/components/tars/FormComponent'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot } from '../../public/navigation/RootNavigation'
import { skinColors } from '../../public/theme/const/UGSkinColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import { goToUserCenterType } from '../../public/tools/tars'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignInFormList, { SignInRenderFormProps } from '../../public/views/tars/SignInFormList'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const BZHSignInPage = () => {
  const { sign, value, onChange, navigateTo, show, reference, valid } = useSignInPage({
    homePage: PageName.BZHHomePage,
    signUpPage: PageName.BZHSignUpPage,
  })

  const { navigateToSignUpPage } = navigateTo

  const { signIn, tryPlay } = sign

  return (
    <>
      <SafeAreaHeader headerColor={skinColors.themeColor.宝石红}>
        <MineHeader title={'登录'} showBackBtn={true} onPressBackBtn={pop} showRightTitle={true} onPressRightTitle={goToUserCenterType.在线客服} />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignInFormList slideCodeColor={'#ffffff'} reference={reference} show={show} onChange={onChange} value={value} renderForm={SignInForm} />
          <Button
            title={'立即登录'}
            disabled={!valid}
            containerStyle={[
              styles.button,
              {
                backgroundColor: skinColors.themeColor.宝石红,
              },
            ]}
            disabledContainerStyle={styles.button}
            titleStyle={{ color: '#ffffff', fontSize: scale(23) }}
            onPress={signIn}
          />
          <Button title={'快速注册'} containerStyle={styles.signUpButton} titleStyle={{ color: 'red', fontSize: scale(23) }} onPress={navigateToSignUpPage} />
          <View style={styles.bottomButtonContainer}>
            <TouchableWithoutFeedback onPress={tryPlay}>
              <UGText style={{ color: '#666' }}>{'免费试玩'}</UGText>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={popToRoot}>
              <UGText style={{ color: '#666' }}>{'返回首页'}</UGText>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const SignInForm = (props: SignInRenderFormProps) => <FormComponent {...props} containerStyle={{ marginBottom: scale(20) }} inputContainerStyle={{ borderColor: '#d9d9d9' }} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: skinColors.homeContentSubColor.宝石红,
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
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: scale(25),
    marginTop: scale(10),
  },
  button: {
    width: '100%',
    marginTop: scale(20),
    marginBottom: scale(25),
    aspectRatio: 8,
    borderRadius: scale(5),
  },
  signUpButton: {
    backgroundColor: '#ffffff',
    borderColor: '#F0F0F0',
    borderWidth: scale(1),
    width: '100%',
    aspectRatio: 8,
    borderRadius: scale(5),
  },
})

export default BZHSignInPage
