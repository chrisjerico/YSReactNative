import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { Button } from 'react-native-elements'
import ReloadSlidingVerification from '../../public/components/tars/ReloadSlidingVerification'
import PushHelper from '../../public/define/PushHelper'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import { PageName } from '../../public/navigation/Navigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import CheckBox from '../../public/views/tars/CheckBox'
import Form from '../../public/views/tars/Form'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'

const BZHSignInPage = (props: any) => {
  // yellowBox
  console.disableYellowBox = true
  // functions
  const { navigation } = props
  const {
    goBack,
    goToRegisterPage,
    goToHomePage,
    onChangeAccount,
    onChangePassword,
    onChangeIsRemember,
    onChanePasswordSecure,
    onChangeSlidingVerification,
    signIn,
    tryPlay,
    account,
    password,
    isRemember,
    loginVCode,
    valid,
    showPassword,
    slidingVerificationRrf,
  } = useSignInPage({
    navigation: navigation,
    homePage: PageName.BZHHomePage,
    registerPage: PageName.BZHRegisterPage,
  })

  return (
    <>
      <SafeAreaHeader headerColor={BZHThemeColor.宝石红.themeColor}>
        <MineHeader
          title={'登录'}
          showBackBtn={true}
          onPressLeftTool={goBack}
          shoeRightTool={true}
          onPressRightTool={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.whiteBlock}>
          <Form
            show={true}
            placeholder={'请输入会员帐号'}
            // value={account}
            onChangeText={onChangeAccount}
            leftIcon={{
              name: 'user-circle',
              type: 'font-awesome'
            }}
          />
          <Form
            show={true}
            rightIconProps={{
              onPress: onChanePasswordSecure,
            }}
            placeholder={'请输入密码'}
            leftIcon={{
              name: 'unlock-alt',
              type: 'font-awesome'
            }}
            // value={password}
            onChangeText={onChangePassword}
            secureTextEntry={!showPassword}
            showRightIcon
          />
          <CheckBox check={isRemember} onPress={onChangeIsRemember} />
          {loginVCode ? (
            <ReloadSlidingVerification
              ref={slidingVerificationRrf}
              onChange={onChangeSlidingVerification}
              containerStyle={{ marginBottom: scale(20) }}
            />
          ) : null}
          <Button
            title={'立即登录'}
            disabled={!valid}
            buttonStyle={styles.button}
            titleStyle={{ color: '#ffffff' }}
            onPress={signIn}
            activeOpacity={1}
          />
          <Button
            title={'快速注册'}
            buttonStyle={{
              backgroundColor: '#ffffff',
              borderColor: '#F0F0F0',
              borderWidth: scale(1),
              width: '100%',
            }}
            titleStyle={{ color: '#EA0000' }}
            onPress={goToRegisterPage}
            activeOpacity={1}
          />
          <View style={styles.bottomButtonContainer}>
            <TouchableWithoutFeedback onPress={tryPlay}>
              <Text style={{ color: "#666" }}>{'免费试玩'}</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={goToHomePage}>
              <Text style={{ color: "#666" }}>{'返回首页'}</Text>
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
  },
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
  },
})

export default BZHSignInPage
