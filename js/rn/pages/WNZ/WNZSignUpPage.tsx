import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import FormComponent from '../../public/components/tars/FormComponent'
import MenuModalComponent from '../../public/components/tars/MenuModalComponent'
import PushHelper from '../../public/define/PushHelper'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { GameType } from '../../public/models/Enum'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot } from '../../public/navigation/RootNavigation'
import { skinColors } from '../../public/theme/const/UGSkinColor'
import { scale } from '../../public/tools/Scale'
import { goToUserCenterType } from '../../public/tools/tars'
import BottomGap from '../../public/views/tars/BottomGap'
import Button from '../../public/views/tars/Button'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignUpFormList, { SignUpRenderFormProps } from '../../public/views/tars/SignUpFormList'
import config from './config'
import MenuButton from './views/MenuButton'
import SignHeader from './views/SignHeader'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const WNZSignUpPage = () => {
  const openMenu = () => {
    menu?.current?.open()
  }

  const closeMenu = () => {
    menu?.current?.close()
  }

  const menu = useRef(null)

  const { reference, show, label, onChange, sign, passwordLimit, navigateTo, value, placeholder, info } = useSignUpPage({
    homePage: PageName.WNZHomePage,
    signInPage: PageName.WNZSignInPage,
    onSuccessSignOut: closeMenu,
  })

  const { menus, sysInfo } = info
  const { appVersion } = sysInfo
  const { signUp, tryPlay, signOut } = sign

  const { navigateToSignInPage } = navigateTo
  const defaultMenus = config.menuSignIn.concat(config.menus)

  return (
    <>
      <SafeAreaHeader headerColor={skinColors.themeColor.威尼斯}>
        <SignHeader onPressLeftTool={pop} onPressMenu={openMenu} onPressSign={navigateToSignInPage} />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignUpFormList
            slideCodeColor={'#f2f2f2'}
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
            title={'立即注册'}
            containerStyle={styles.signUpButton}
            disabledContainerStyle={[
              styles.signUpButton,
              {
                opacity: 0.5,
                backgroundColor: '#dd524d',
              },
            ]}
            titleStyle={{ color: '#ffffff', fontSize: scale(23) }}
            onPress={signUp}
          />
          <Button title={'已有帐号，直接登录'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={pop} />
          <Button title={'免费试玩'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={tryPlay} />
          <Button title={'在线客服'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={goToUserCenterType.在线客服} />
          <Button title={'返回首页'} containerStyle={styles.whiteButton} titleStyle={styles.whitwButtonTitle} onPress={popToRoot} />
        </View>
        <BottomGap />
      </ScrollView>
      <MenuModalComponent
        ref={menu}
        menus={menus?.length > 0 ? menus : defaultMenus}
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
    </>
  )
}
const SignUpForm = (props: SignUpRenderFormProps) => {
  const { leftIconTitle } = props
  return (
    <FormComponent
      {...props}
      containerStyle={{ marginBottom: scale(15) }}
      inputContainerStyle={styles.inputContainerStyle}
      leftIconContainerStyle={styles.leftIconContainerStyle}
      rightIconContainerStyle={{ marginRight: scale(10) }}
      renderLeftIcon={() => <UGText style={styles.leftIconText}>{leftIconTitle}</UGText>}
      labelTextStyle={{ paddingLeft: scale(20) }}
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
    marginTop: scale(23),
    marginBottom: scale(100),
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#dd524d',
    marginTop: scale(12),
    aspectRatio: 10,
    borderRadius: scale(5),
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
    fontSize: scale(23),
    fontWeight: '300',
  },
  inputContainerStyle: {
    borderWidth: scale(1),
    borderRadius: scale(10),
    backgroundColor: '#ffffff',
    borderColor: '#d9d9d9',
    height: scale(63),
  },
  leftIconText: {
    fontSize: scale(23),
    fontWeight: '400',
  },
  leftIconContainerStyle: {
    width: scale(120),
    marginLeft: 0,
    marginRight: 0,
    alignItems: 'flex-start',
    paddingLeft: scale(20),
  },
})

export default WNZSignUpPage
