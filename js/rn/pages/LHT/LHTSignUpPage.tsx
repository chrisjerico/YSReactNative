import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import FormComponent, { FormComponentProps } from '../../public/components/tars/FormComponent'
import PushHelper from '../../public/define/PushHelper'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { PageName } from '../../public/navigation/Navigation'
import { popToRoot, push } from '../../public/navigation/RootNavigation'
import { LHThemeColor } from '../../public/theme/colors/LHThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignUpFormList from '../../public/views/tars/SignUpFormList'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'

const LHTSignUpPage = () => {
  const { show, slideCodeRef, label, onChange, sign, valid, passwordLimit } = useSignUpPage({
    homePage: PageName.LHTHomePage,
    signInPage: PageName.LHTSignInPage,
  })

  const { signUp } = sign

  return (
    <>
      <SafeAreaHeader headerColor={LHThemeColor.六合厅.themeColor}>
        <MineHeader
          title={'注册'}
          showBackBtn={true}
          onPressBackBtn={popToRoot}
          showCustomerService={true}
          onPressCustomerService={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignUpFormList slideCodeRef={slideCodeRef} slideCodeColor={'#ffffff'} show={show} label={label} passwordLimit={passwordLimit} onChange={onChange} Form={SignUpForm} />
          <Button
            disabled={!valid}
            title={'注册'}
            containerStyle={[
              styles.button,
              {
                backgroundColor: LHThemeColor.六合厅.themeColor,
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

const SignUpForm = (props: FormComponentProps) => {
  return <FormComponent {...props} containerStyle={{ marginBottom: scale(10) }} inputContainerStyle={{ borderColor: '#d9d9d9' }} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: LHThemeColor.六合厅.homeContentSubColor,
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
    color: LHThemeColor.六合厅.themeColor,
    fontSize: scale(23),
  },
})

export default LHTSignUpPage
