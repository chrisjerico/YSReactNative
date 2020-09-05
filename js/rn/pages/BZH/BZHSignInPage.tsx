import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import FormComponent, { FormComponentProps } from '../../public/components/tars/FormComponent'
import ReloadSlidingVerification from '../../public/components/tars/ReloadSlidingVerification'
import PushHelper from '../../public/define/PushHelper'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot } from '../../public/navigation/RootNavigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import CheckBox from '../../public/views/tars/CheckBox'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'

const BZHSignInPage = () => {
  console.disableYellowBox = true

  const { sign, value, onChange, goTo, show, ref, valid } = useSignInPage({
    homePage: PageName.BZHHomePage,
    signUpPage: PageName.BZHSignUpPage,
  })

  const { remember, account, password } = value

  const {
    onChangePassword,
    onChangeAccount,
    onChangeRemember,
    onChangeSlideCode,
  } = onChange

  const { goToRegisterPage } = goTo

  const { slideCode } = ref

  const { loginVCode } = show

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
        <View style={styles.whiteBlock}>
          <SignInForm
            show={true}
            placeholder={'请输入会员帐号'}
            onChangeText={onChangeAccount}
            leftIcon={{
              name: 'user-circle',
              type: 'font-awesome',
            }}
            defaultValue={account}
            enableLabel={false}
          />
          <SignInForm
            enableLabel={false}
            show={true}
            placeholder={'请输入密码'}
            leftIcon={{
              name: 'unlock-alt',
              type: 'font-awesome',
            }}
            onChangeText={onChangePassword}
            showRightIcon
            defaultValue={password}
            rightIconType={'eye'}
          />
          <CheckBox
            onPress={onChangeRemember}
            label={'记住密码'}
            containerStyle={{ alignSelf: 'flex-start' }}
            defaultValue={remember}
          />
          <ReloadSlidingVerification
            ref={slideCode}
            show={loginVCode}
            onChange={onChangeSlideCode}
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
            onPress={goToRegisterPage}
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
  whiteBlock: {
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
