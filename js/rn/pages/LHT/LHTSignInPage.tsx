import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import FormComponent from '../../public/components/tars/FormComponent'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import { PageName } from '../../public/navigation/Navigation'
import { popToRoot, pop } from '../../public/navigation/RootNavigation'
import { skinColors } from '../../public/theme/const/UGSkinColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignInFormList, { SignInRenderFormProps } from '../../public/views/tars/SignInFormList'

const LHTSignInPage = () => {
  const { sign, value, onChange, navigateTo, show, reference, valid } = useSignInPage({
    homePage: PageName.LHTHomePage,
    signUpPage: PageName.LHTSignUpPage,
  })

  const { navigateToSignUpPage } = navigateTo

  const { signIn, tryPlay } = sign
  return (
    <>
      <SafeAreaHeader headerColor={skinColors.themeColor.六合厅}>
        <MineHeader showBackBtn={true} onPressBackBtn={popToRoot} title={'登录'} />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignInFormList slideCodeColor={'#ffffff'} reference={reference} show={show} onChange={onChange} value={value} renderForm={SignInForm} />
          <Button
            disabled={!valid}
            title={'登录'}
            containerStyle={[
              styles.button,
              {
                backgroundColor: skinColors.themeColor.六合厅,
                marginTop: scale(20),
              },
            ]}
            disabledContainerStyle={[
              styles.button,
              {
                marginTop: scale(20),
              },
            ]}
            titleStyle={[styles.buttonTitleStyle, { color: '#ffffff' }]}
            onPress={signIn}
          />
          <Button title={'马上注册'} containerStyle={styles.button} titleStyle={styles.buttonTitleStyle} onPress={navigateToSignUpPage} />
          <Button title={'免费试玩'} containerStyle={styles.button} titleStyle={styles.buttonTitleStyle} onPress={tryPlay} />
          <Button title={'返回首页'} containerStyle={styles.button} titleStyle={styles.buttonTitleStyle} onPress={pop} />
        </View>
      </ScrollView>
    </>
  )
}

const SignInForm = (props: SignInRenderFormProps) => <FormComponent {...props} containerStyle={{ marginBottom: scale(20) }} inputContainerStyle={{ borderColor: '#d9d9d9' }} />

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: skinColors.homeContentSubColor.六合厅,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
    paddingVertical: scale(25),
    marginBottom: scaleHeight(70),
  },
  button: {
    width: '100%',
    marginVertical: scale(5),
    aspectRatio: 8,
    borderRadius: scale(5),
    backgroundColor: '#dedede',
  },
  buttonTitleStyle: {
    color: skinColors.themeColor.六合厅,
    fontSize: scale(23),
  },
})

export default LHTSignInPage
