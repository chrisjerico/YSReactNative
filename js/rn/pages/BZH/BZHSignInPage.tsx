import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native'
import FormComponent from '../../public/components/tars/FormComponent'
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
    registerPage: PageName.BZHRegisterPage,
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
          onPressLeftTool={pop}
          showRightTool={true}
          onPressRightTool={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.whiteBlock}>
          <FormComponent
            show={true}
            placeholder={'请输入会员帐号'}
            onChangeText={onChangeAccount}
            leftIcon={{
              name: 'user-circle',
              type: 'font-awesome',
            }}
            defaultValue={account}
          />
          <FormComponent
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
            containerStyle={{ marginBottom: scale(20) }}
          />
          <Button
            title={'立即登录'}
            disabled={!valid}
            containerStyle={styles.button}
            titleStyle={{ color: '#ffffff', fontSize: scale(23) }}
            onPress={signIn}
          />
          <Button
            title={'快速注册'}
            containerStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#F0F0F0',
              borderWidth: scale(1),
              width: '100%',
              aspectRatio: 8,
              borderRadius: scale(5),
            }}
            titleStyle={{ color: '#EA0000', fontSize: scale(23) }}
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
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: scale(20),
    aspectRatio: 4,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: scale(25),
  },
  button: {
    backgroundColor: BZHThemeColor.宝石红.themeColor,
    width: '100%',
    marginVertical: scale(20),
    aspectRatio: 8,
    borderRadius: scale(5),
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
  },
})

export default BZHSignInPage
