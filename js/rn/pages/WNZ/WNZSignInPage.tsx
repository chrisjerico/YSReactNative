import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import FormComponent from '../../public/components/tars/FormComponent'
import MenuModalComponent from '../../public/components/tars/MenuModalComponent'
import PushHelper from '../../public/define/PushHelper'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import { GameType } from '../../public/models/Enum'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot } from '../../public/navigation/RootNavigation'
import { skinColors } from '../../public/theme/const/UGSkinColor'
import { scale } from '../../public/tools/Scale'
import { goToUserCenterType } from '../../public/tools/tars'
import BottomGap from '../../public/views/tars/BottomGap'
import Button from '../../public/views/tars/Button'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignInFormList, { SignInRenderFormProps } from '../../public/views/tars/SignInFormList'
import config from './config'
import MenuButton from './views/MenuButton'
import SignHeader from './views/SignHeader'

const WNZSignInPage = () => {
  const openMenu = () => {
    menu?.current?.open()
  }

  const closeMenu = () => {
    menu?.current?.close()
  }

  const menu = useRef(null)

  const { sign, value, onChange, navigateTo, show, reference, valid, info } = useSignInPage({
    homePage: PageName.WNZHomePage,
    signUpPage: PageName.WNZSignUpPage,
    onSuccessSignOut: closeMenu,
  })

  const { menus, sysInfo } = info
  const { appVersion } = sysInfo
  const { navigateToSignUpPage } = navigateTo

  const { signIn, tryPlay, signOut } = sign

  const defaultMenus = config.menuSignIn.concat(config.menus)

  const { showFacebookSignIn } = show
  return (
    <>
      <SafeAreaHeader headerColor={skinColors.themeColor.威尼斯}>
        <SignHeader onPressLeftTool={pop} onPressMenu={openMenu} onPressSign={navigateToSignUpPage} />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignInFormList slideCodeColor={'#f2f2f2'} reference={reference} show={show} onChange={onChange} value={value} renderForm={SignInForm} />
          <Button
            disabled={!valid}
            title={'登录'}
            containerStyle={[styles.loginButton, { backgroundColor: '#dd524d' }]}
            disabledContainerStyle={styles.loginButton}
            titleStyle={{ color: '#ffffff', fontSize: scale(25) }}
            onPress={signIn}
          />
          {showFacebookSignIn && <Button title={'使用Facebook登录'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={() => {}} />}
          <Button title={'立即注册'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={navigateToSignUpPage} />
          <Button title={'在线客服'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={goToUserCenterType.在线客服} />
          <Button title={'免费试玩'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={tryPlay} />
          <Button title={'返回首页'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={popToRoot} />
          <MenuModalComponent
            ref={menu}
            menus={menus?.length ? menus : defaultMenus}
            renderMenuItem={({ item }) => {
              const { name, gameId, title, onPress } = item
              return (
                <MenuButton
                  title={name ?? title}
                  subTitle={'(' + appVersion + ')'}
                  showSubTitle={gameId == GameType.APP版本号}
                  onPress={() => {
                    if (gameId == GameType.登出) {
                      signOut()
                    } else {
                      closeMenu()
                      if (onPress) {
                        onPress()
                      } else {
                        PushHelper.pushHomeGame(item)
                      }
                    }
                  }}
                />
              )
            }}
          />
        </View>
        <BottomGap />
      </ScrollView>
    </>
  )
}

const SignInForm = (props: SignInRenderFormProps) => {
  const { leftIconTitle } = props
  return (
    <FormComponent
      {...props}
      containerStyle={{ marginBottom: scale(10) }}
      inputContainerStyle={styles.inputContainerStyle}
      leftIconContainerStyle={styles.leftIconContainerStyle}
      renderLeftIcon={() => <Text style={styles.leftIconText}>{leftIconTitle}</Text>}
      placeholderTextColor={'#9D9D9D'}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: skinColors.homeContentSubColor.威尼斯,
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
