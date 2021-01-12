import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import FormComponent from '../../public/components/tars/FormComponent'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { PageName } from '../../public/navigation/Navigation'
import { popToRoot, push } from '../../public/navigation/RootNavigation'
import { skinColors } from '../../public/theme/const/UGSkinColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import { goToUserCenterType } from '../../public/tools/tars'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignUpFormList, { SignUpRenderFormProps } from '../../public/views/tars/SignUpFormList'

const LHTSignUpPage = () => {
  const { show, reference, label, onChange, sign, passwordLimit, value, placeholder } = useSignUpPage({
    homePage: PageName.LHTHomePage,
    signInPage: PageName.LHTSignInPage,
  })

  const { signUp } = sign

  return (
    <>
      <SafeAreaHeader headerColor={skinColors.themeColor.六合厅}>
        <MineHeader title={'注册'} showBackBtn={true} onPressBackBtn={popToRoot} showRightTitle={true} onPressRightTitle={goToUserCenterType.在线客服} />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignUpFormList
            slideCodeColor={'#ffffff'}
            reference={reference}
            show={show}
            label={label}
            placeholder={placeholder}
            passwordLimit={passwordLimit}
            onChange={onChange}
            value={value}
            renderForm={SignUpForm}
          />
          <Button
            title={'注册'}
            containerStyle={[
              styles.button,
              {
                backgroundColor: skinColors.themeColor.六合厅,
              },
            ]}
            disabledContainerStyle={styles.button}
            titleStyle={[styles.buttonTitleStyle, { color: '#ffffff' }]}
            onPress={signUp}
          />
          <Button
            title={'返回登录'}
            containerStyle={styles.button}
            titleStyle={styles.buttonTitleStyle}
            onPress={() => {
              push(PageName.LHTSignInPage, {})
            }}
          />
          <Button title={'返回首页'} containerStyle={styles.button} titleStyle={styles.buttonTitleStyle} onPress={popToRoot} />
        </View>
      </ScrollView>
    </>
  )
}

const SignUpForm = (props: SignUpRenderFormProps) => {
  return <FormComponent {...props} containerStyle={{ marginBottom: scale(10) }} inputContainerStyle={{ borderColor: '#d9d9d9' }} />
}

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

export default LHTSignUpPage
