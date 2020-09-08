import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import FormComponent, {
  FormComponentProps,
} from '../../public/components/tars/FormComponent'
import PushHelper from '../../public/define/PushHelper'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot } from '../../public/navigation/RootNavigation'
import { WNZThemeColor } from '../../public/theme/colors/WNZThemeColor'
import { scale } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignUpFormList from '../../public/views/tars/SugnUpFormList'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import MenuModalComponent from './components/MenuModalComponent'
import config from './config'
import Menu from './views/Menu'
import SignInHeader from './views/SignInHeader'

const WNZSignUpPage = () => {
  const menu = useRef(null)

  const {
    slideCodeRef,
    show,
    label,
    onChange,
    sign,
    valid,
    limit,
    goTo,
  } = useSignUpPage({
    homePage: PageName.WNZHomePage,
    signInPage: PageName.WNZSignInPage,
  })

  const { signUp, tryPlay } = sign

  const { goToSignInPage } = goTo

  return (
    <>
      <SafeAreaHeader headerColor={WNZThemeColor.威尼斯.themeColor}>
        <SignInHeader
          onPressLeftTool={pop}
          onPressMenu={() => {
            menu?.current?.open()
          }}
          onPressRegister={goToSignInPage}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignUpFormList
            reloadSlidingVerificationColor={'#f2f2f2'}
            slideCodeRef={slideCodeRef}
            show={show}
            label={label}
            limit={limit}
            onChange={onChange}
            SignUpForm={SignUpForm}
          />
          <Button
            disabled={!valid}
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
          <Button
            title={'已有帐号，直接登陆'}
            containerStyle={styles.whiteButton}
            titleStyle={styles.whitwButtonTitle}
            onPress={pop}
          />
          <Button
            title={'免费试玩'}
            containerStyle={styles.whiteButton}
            titleStyle={styles.whitwButtonTitle}
            onPress={tryPlay}
          />
          <Button
            title={'在线客服'}
            containerStyle={styles.whiteButton}
            titleStyle={styles.whitwButtonTitle}
            onPress={() =>
              PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
            }
          />
          <Button
            title={'返回首页'}
            containerStyle={styles.whiteButton}
            titleStyle={styles.whitwButtonTitle}
            onPress={popToRoot}
          />
        </View>
      </ScrollView>
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
    </>
  )
}
const SignUpForm = (props: FormComponentProps & { title: string }) => (
  <FormComponent
    {...props}
    containerStyle={{ marginBottom: scale(15) }}
    inputContainerStyle={styles.inputContainerStyle}
    leftIconContainerStyle={styles.leftIconContainerStyle}
    rightIconContainerStyle={{ marginRight: scale(10) }}
    renderLeftIcon={() => <Text style={styles.leftIconText}>{props?.leftIconTitle}</Text>}
    labelTextStyle={{ paddingLeft: scale(20) }}
    placeholderTextColor={"#9D9D9D"}
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
    marginTop: scale(23),
    marginBottom: scale(100),
  },
  signUpButton: {
    width: '100%',
    backgroundColor: '#dd524d',
    marginTop: scale(32),
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
    fontWeight: '400'
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
