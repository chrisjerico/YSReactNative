import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import FormComponent from '../../public/components/tars/FormComponent'
import MenuModalComponent from '../../public/components/tars/MenuModalComponent'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot } from '../../public/navigation/RootNavigation'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale } from '../../public/tools/Scale'
import { goToUserCenterType } from '../../public/tools/tars'
import Button from '../../public/views/tars/Button'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignUpFormList, { SignUpRenderFormProps } from '../../public/views/tars/SignUpFormList'
import config from './config'
import MenuButton from './views/MenuButton'
import SignHeader from './views/SignHeader'

const WNZSignUpPage = () => {
  const menu = useRef(null)

  const { reference, show, label, onChange, sign, passwordLimit, navigateTo, value, placeholder } = useSignUpPage({
    homePage: PageName.WNZHomePage,
    signInPage: PageName.WNZSignInPage,
  })

  const { signUp, tryPlay } = sign

  const { navigateToSignInPage } = navigateTo

  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <SignHeader
          onPressLeftTool={pop}
          onPressMenu={() => {
            menu?.current?.open()
          }}
          onPressSign={navigateToSignInPage}
        />
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
      </ScrollView>
      <MenuModalComponent
        ref={menu}
        menus={
          // @ts-ignore
          config?.menuSignIn?.concat(config?.menus)
        }
        renderMenuItem={({ item }) => {
          const { title, onPress } = item
          return (
            <MenuButton
              title={title}
              onPress={() => {
                menu?.current?.close()
                onPress && onPress()
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
      renderLeftIcon={() => <Text style={styles.leftIconText}>{leftIconTitle}</Text>}
      labelTextStyle={{ paddingLeft: scale(20) }}
      placeholderTextColor={'#9D9D9D'}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WNZThemeColor.威尼斯.homeContentSubColor,
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
