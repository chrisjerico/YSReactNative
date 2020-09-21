import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import FormComponent, { FormComponentProps } from '../../public/components/tars/FormComponent'
import PushHelper from '../../public/define/PushHelper'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot } from '../../public/navigation/RootNavigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignInFormList from '../../public/views/tars/SignInFormList'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'

const BZHSignInPage = () => {
  console.disableYellowBox = true

  const {
    sign,
    value,
    onChange,
    navigateTo,
    show,
    slideCodeRef,
    valid,
  } = useSignInPage({
    homePage: PageName.BZHHomePage,
    signUpPage: PageName.BZHSignUpPage,
  })

  const { navigateToSignUpPage } = navigateTo

  const { signIn, tryPlay } = sign

  return (
    <>
      <SafeAreaHeader headerColor={BZHThemeColor.宝石红.themeColor}>
        <MineHeader
          title={'登录'}
          showBackBtn={true}
          onPressBackBtn={pop}
          showCustomerService={true}
          onPressCustomerService={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignInFormList
            slideCodeRef={slideCodeRef}
            slideCodeColor={'#ffffff'}
            show={show}
            onChange={onChange}
            value={value}
            Form={SignInForm}
          />
          <Button
            title={'立即登录'}
            disabled={!valid}
            containerStyle={[
              styles.button,
              {
                backgroundColor: BZHThemeColor.宝石红.themeColor,
              },
            ]}
            disabledContainerStyle={styles.button}
            titleStyle={{ color: '#ffffff', fontSize: scale(23) }}
            onPress={signIn}
          />
          <Button
            title={'快速注册'}
            containerStyle={styles.signUpButton}
            titleStyle={{ color: 'red', fontSize: scale(23) }}
            onPress={navigateToSignUpPage}
          />
          <View style={styles.bottomButtonContainer}>
            <TouchableWithoutFeedback onPress={tryPlay}>
              <Text style={{ color: '#666' }}>{'免费试玩'}</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={popToRoot}>
              <Text style={{ color: '#666' }}>{'返回首页'}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const SignInForm = (props: FormComponentProps) => (
  <FormComponent
    {...props}
    containerStyle={{ marginBottom: scale(20) }}
    inputContainerStyle={{ borderColor: '#d9d9d9' }}
  />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BZHThemeColor.宝石红.homeContentSubColor,
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
