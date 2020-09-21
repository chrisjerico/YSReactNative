import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import FormComponent, { FormComponentProps } from '../../public/components/tars/FormComponent'
import PushHelper from '../../public/define/PushHelper'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import { PageName } from '../../public/navigation/Navigation'
import { popToRoot } from '../../public/navigation/RootNavigation'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignInFormList from '../../public/views/tars/SignInFormList'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import MenuModalComponent from './components/MenuModalComponent'
import config from './config'
import Menu from './views/Menu'
import SignHeader from './views/SignHeader'

const WNZSignInPage = () => {
  const menu = useRef(null)

  const {
    sign,
    value,
    onChange,
    goTo,
    show,
    slideCodeRef,
    valid,
  } = useSignInPage({
    homePage: PageName.WNZHomePage,
    signUpPage: PageName.WNZSignUpPage,
  })

  const { goToRegisterPage } = goTo

  const { signIn, tryPlay } = sign

  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <SignHeader
          onPressLeftTool={popToRoot}
          onPressMenu={() => {
            menu?.current?.open()
          }}
          onPressRegister={goToRegisterPage}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignInFormList
            slideCodeRef={slideCodeRef}
            slideCodeColor={'#f2f2f2'}
            show={show}
            onChange={onChange}
            value={value}
            Form={SignInForm}
          />
          <Button
            disabled={!valid}
            title={'登陆'}
            containerStyle={[
              styles.loginButton,
              { backgroundColor: '#dd524d' },
            ]}
            disabledContainerStyle={styles.loginButton}
            titleStyle={{ color: '#ffffff', fontSize: scale(25) }}
            onPress={signIn}
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

const SignInForm = (props: FormComponentProps) => (
  <FormComponent
    {...props}
    containerStyle={{ marginBottom: scale(10) }}
    inputContainerStyle={styles.inputContainerStyle}
    leftIconContainerStyle={styles.leftIconContainerStyle}
    rightIconContainerStyle={{ marginRight: scale(10) }}
    renderLeftIcon={() => (
      <Text style={styles.leftIconText}>{props?.leftIconTitle}</Text>
    )}
    placeholderTextColor={'#9D9D9D'}
  />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WNZThemeColor.威尼斯.homeContentSubColor,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    paddingTop: scale(40),
  },
  inputContainerStyle: {
    borderWidth: scale(1),
    borderRadius: scale(10),
    backgroundColor: '#ffffff',
    borderColor: '#d9d9d9',
    paddingLeft: scale(20),
    height: scale(63),
  },
  leftIconText: {
    fontSize: scale(23),
    fontWeight: '400',
  },
  loginButton: {
    width: '100%',
    marginTop: scale(32),
    aspectRatio: 10,
    borderRadius: scale(5),
    marginBottom: scale(38),
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
    fontWeight: '300',
  },
  leftIconContainerStyle: {
    width: scale(75),
    marginLeft: 0,
    marginRight: 0,
    alignItems: 'flex-start',
  },
})

export default WNZSignInPage
