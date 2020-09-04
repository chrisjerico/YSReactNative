import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import ReloadSlidingVerification from '../../public/components/tars/ReloadSlidingVerification'
import PushHelper from '../../public/define/PushHelper'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import { PageName } from '../../public/navigation/Navigation'
import { popToRoot } from '../../public/navigation/RootNavigation'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import CheckBox from '../../public/views/tars/CheckBox'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import MenuModalComponent from './components/MenuModalComponent'
import WNZFormComponent from './components/WNZFormComponent'
import config from './config'
import Menu from './views/Menu'
import SignInHeader from './views/SignInHeader'

const WNZSignInPage = () => {
  const menu = useRef(null)

  const { sign, value, onChange, goTo, show, ref, valid } = useSignInPage({
    homePage: PageName.WNZHomePage,
    signUpPage: PageName.WNZSignUpPage,
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
  console.log("------valid------", valid)
  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <SignInHeader
          onPressLeftTool={popToRoot}
          onPressMenu={() => {
            menu?.current?.open()
          }}
          onPressRegister={goToRegisterPage}
        />
      </SafeAreaHeader>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <WNZFormComponent
            show={true}
            leftIconContainerStyle={{ width: scale(75) }}
            containerStyle={{ marginTop: scale(43), aspectRatio: null }}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            placeholder={'请输入用户名'}
            onChangeText={onChangeAccount}
            showRightIcon={false}
            showLeftIcon={true}
            enableLabel={false}
            defaultValue={account}
            title={'帐号'}
          />
          <WNZFormComponent
            show={true}
            leftIconContainerStyle={{ width: scale(75) }}
            containerStyle={{ marginTop: scale(8), aspectRatio: null }}
            inputContainerStyle={styles.inputContainerStyle}
            inputStyle={styles.inputStyle}
            placeholder={'请输入密码'}
            onChangeText={onChangePassword}
            showRightIcon={false}
            showLeftIcon={true}
            enableLabel={false}
            defaultValue={password}
            title={'密码'}
          />
          <View style={styles.checkBoxBlock}>
            <CheckBox
              onPress={onChangeRemember}
              label={'记住帐号密码'}
              labelTextStyle={{ color: '#888888' }}
              defaultValue={remember}
            />
            <Text style={{ color: '#888888' }}>{'忘记密码'}</Text>
          </View>
          <Button
            disabled={!valid}
            title={'登陆'}
            containerStyle={[styles.loginButton, { backgroundColor: '#dd524d', }]}
            disabledContainerStyle={styles.loginButton}
            titleStyle={{ color: '#ffffff', fontSize: scale(25) }}
            onPress={signIn}
          />
          <ReloadSlidingVerification
            ref={slideCode}
            show={loginVCode}
            onChange={onChangeSlideCode}
            containerStyle={{
              marginBottom: scale(20),
              backgroundColor: '#f2f2f2',
            }}
            backgroundColor={'#f2f2f2'}
          />
          <Button
            title={'立即注册'}
            containerStyle={styles.whiteButton}
            titleStyle={styles.whitwButtonTitle}
            onPress={goToRegisterPage}
          />
          <Button
            title={'在线客服'}
            containerStyle={styles.whiteButton}
            titleStyle={styles.whitwButtonTitle}
            onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
            }}
          />
          <Button
            title={'免费试玩'}
            containerStyle={styles.whiteButton}
            titleStyle={styles.whitwButtonTitle}
            onPress={tryPlay}
          />
          <Button
            title={'返回首页'}
            containerStyle={styles.whiteButton}
            titleStyle={styles.whitwButtonTitle}
            onPress={popToRoot}
          />
          <MenuModalComponent
            ref={menu}
            menus={
              // @ts-ignore
              config?.menuSignIn?.concat(config?.menus)
            }
            renderMenu={({ item }) => {
              const { title, onPress } = item
              return (
                <Menu
                  color={WNZThemeColor.威尼斯.themeColor}
                  title={title}
                  onPress={() => {
                    menu?.current?.close()
                    onPress && onPress()
                  }}
                />
              )
            }}
          />
        </View>
      </ScrollView>
    </>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    paddingHorizontal: scale(20),
  },
  inputContainerStyle: {
    borderWidth: scale(1),
    borderRadius: scale(10),
    backgroundColor: '#ffffff',
    borderColor: '#d9d9d9',
    paddingLeft: scale(20),
    height: scale(63),
  },
  inputStyle: {
    paddingLeft: scale(10),
  },
  inputTitleContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: scale(60),
  },
  inputText: { fontSize: scale(25) },
  loginButton: {
    width: '100%',
    marginTop: scale(32),
    aspectRatio: 10,
    borderRadius: scale(5),
    marginBottom: scale(38),
  },
  checkBoxBlock: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    aspectRatio: 6,
  },
  whiteButton: {
    width: '100%',
    backgroundColor: '#ffffff',
    marginTop: scale(15),
    aspectRatio: 10,
    borderRadius: scale(5),
    borderColor: '#ccc',
    borderWidth: scale(1),
  },
  whitwButtonTitle: {
    color: '#f13031',
    fontSize: scale(25),
    fontWeight: '300'
  },
})
export default WNZSignInPage
