import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import FormComponent, {FormComponentProps} from '../../public/components/temp/FormComponent'
import PushHelper from '../../public/define/PushHelper'
import useSignInPage from '../../public/hooks/temp/useSignInPage'
import {PageName} from '../../public/navigation/Navigation'
import {pop, popToRoot} from '../../public/navigation/RootNavigation'
import {BZHThemeColor} from '../../public/theme/colors/BZHThemeColor'
import {scale, scaleHeight} from '../../public/tools/Scale'
import Button from '../../public/views/temp/Button'
import MineHeader from '../../public/views/temp/MineHeader'
import SafeAreaHeader from '../../public/views/temp/SafeAreaHeader'
import {UGUserCenterType} from '../../redux/model/全局/UGSysConfModel'
import {LEFThemeColor} from "../../public/theme/colors/LEFThemeColor";
import {ugLog} from "../../public/tools/UgLog";
import SignInFormList from "./views/SignInFormList";
import {httpClient} from "../../public/network/httpClient";
import AppDefine from "../../public/define/AppDefine";

const LEFSignInPage = () => {
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
    homePage: PageName.LEFHomePage,
    signUpPage: PageName.LEFSignUpPage,
  })

  const {navigateToSignUpPage} = navigateTo

  const {signIn, tryPlay} = sign

  return (
    <>
      <SafeAreaHeader headerColor={LEFThemeColor.乐FUN.themeColor}>
        <MineHeader
          title={'登录'}
          backTitle={'首页'}
          titleColor={LEFThemeColor.乐FUN.textColor2}
          showBackBtn={true}
          onPressBackBtn={pop}
          showCustomerService={false}
          onPressCustomerService={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        />
      </SafeAreaHeader>
      <ScrollView style={_styles.container} showsVerticalScrollIndicator={false}>
        <View style={_styles.formContainer}>
          <SignInFormList
            slideCodeRef={slideCodeRef}
            slideCodeColor={'white'}
            show={show}
            onChange={onChange}
            value={value}
            Form={SignInForm}
            hideRemember={true}
          />
          <Button
            title={'立即登录'}
            disabled={!valid}
            containerStyle={[
              _styles.button,
              {backgroundColor: LEFThemeColor.乐FUN.textColor2,},
            ]}
            disabledContainerStyle={_styles.button}
            titleStyle={{color: '#ffffff', fontSize: scale(23)}}
            onPress={signIn}
          />
          <Button
            title={'马上注册'}
            containerStyle={_styles.signUpButton}
            titleStyle={_styles.signUpText}
            onPress={navigateToSignUpPage}
          />
          <View style={_styles.try_container}>
            <Button
              title={'免费试玩'}
              containerStyle={_styles.tryButton}
              titleStyle={_styles.try_text}
              onPress={tryPlay}
            />
            <Button
              title={'忘记密码'}
              containerStyle={_styles.tryButton}
              titleStyle={_styles.try_text}
              onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
              }}
            />
            <Button
              title={'转电脑版'}
              containerStyle={_styles.tryButton}
              titleStyle={_styles.try_text}
              onPress={() => {
                PushHelper.openPC()
              }}
            />
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const SignInForm = (props: FormComponentProps) => (
  <FormComponent
    {...props}
    containerStyle={_styles.input}
    inputContainerStyle={{borderColor: 'transparent'}}
    leftIcon={{
      ...props.leftIcon,
      color: LEFThemeColor.乐FUN.textColor2,
    }}
  />
)

const _styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  formContainer: {
    backgroundColor: '#ffffff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
    paddingTop: scale(25),
    paddingBottom: scale(44),
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
    marginTop: scale(16),
    aspectRatio: 8,
    borderRadius: scale(8),
  },
  input: {
    marginBottom: scale(20),
    borderWidth: scale(1),
    borderRadius: scale(8),
    borderColor: '#E4E399'
  },
  signUpButton: {
    backgroundColor: '#E0E1E2',
    width: '100%',
    aspectRatio: 8,
    borderRadius: scale(8),
    marginTop: scale(20),
  },
  try_container: {
    flexDirection: "row",
  },
  tryButton: {
    backgroundColor: 'white',
    paddingVertical: scale(12),
    marginHorizontal: scale(8),
    borderColor: LEFThemeColor.乐FUN.textColor2,
    borderWidth: scale(2),
    flex: 1,
    borderRadius: scale(8),
    marginTop: scale(20),
  },
  try_text: {
    color: LEFThemeColor.乐FUN.themeColor,
    fontSize: scale(20)
  },
  signUpText: {
    color: LEFThemeColor.乐FUN.themeColor,
    fontSize: scale(23)
  },
})

export default LEFSignInPage
