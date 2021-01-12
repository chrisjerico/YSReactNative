import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import FormComponent, {FormComponentProps} from '../../public/components/tars/FormComponent'
import PushHelper from '../../public/define/PushHelper'
import useSignInPage from '../../public/hooks/tars/useSignInPage'
import {PageName} from '../../public/navigation/Navigation'
import {pop, popToRoot} from '../../public/navigation/RootNavigation'
import {scale, scaleHeight} from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/temp/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import {UGUserCenterType} from '../../redux/model/全局/UGSysConfModel'
import {ugLog} from "../../public/tools/UgLog";
import SignInFormList, { SignInRenderFormProps } from '../../public/views/tars/SignInFormList'
import {httpClient} from "../../public/network/httpClient";
import AppDefine from "../../public/define/AppDefine";
import { skinColors } from '../../public/theme/const/UGSkinColor'

const LEFSignInPage = () => {

  const {
    sign,
    value,
    onChange,
    navigateTo,
    show,
    reference,
    valid,
  } = useSignInPage({
    homePage: PageName.LEFHomePage,
    signUpPage: PageName.LEFSignUpPage,
  })

  const {navigateToSignUpPage} = navigateTo

  const {signIn, tryPlay} = sign

  return (
    <>
      <SafeAreaHeader headerColor={skinColors.themeColor.乐FUN}>
        <MineHeader
          title={'登录'}
          backTitle={'首页'}
          titleColor={skinColors.textColor2.乐FUN}
          showBackBtn={true}
          onPressBackBtn={
            popToRoot
          }
          showCustomerService={false}
          onPressCustomerService={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        />
      </SafeAreaHeader>
      <ScrollView style={_styles.container} showsVerticalScrollIndicator={false}>
        <View style={_styles.formContainer}>
          <SignInFormList slideCodeColor={'white'}
                          reference={reference}
                          show={show}
                          onChange={onChange}
                          value={value}
                          showCheckBox={false}
                          renderForm={SignInForm} />
          <Button
            title={'立即登录'}
            disabled={!valid}
            containerStyle={[
              _styles.button,
              {backgroundColor: skinColors.textColor2.乐FUN,},
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

// const SignInForm = (props: FormComponentProps) => (
//   <FormComponent
//     {...props}
//     containerStyle={_styles.input}
//     inputContainerStyle={{borderColor: 'transparent'}}
//     leftIcon={{
//       ...props.leftIcon,
//       color: skinColors.textColor2.乐FUN,
//     }}
//   />
// )

const SignInForm = (props: SignInRenderFormProps) => {
  // const { leftIconTitle } = props
  return (
    <FormComponent
      {...props}
      containerStyle={{ marginBottom: scale(10) }}
      inputContainerStyle={_styles.input}
      leftIconProps={{
        ...props.leftIconProps,
        color: skinColors.textColor2.乐FUN,
      }}
      placeholderTextColor={'#9D9D9D'}
    />
  )
}

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
    borderColor: skinColors.textColor2.乐FUN,
    borderWidth: scale(2),
    flex: 1,
    borderRadius: scale(8),
    marginTop: scale(20),
  },
  try_text: {
    color: skinColors.themeColor.乐FUN,
    fontSize: scale(20)
  },
  signUpText: {
    color: skinColors.themeColor.乐FUN,
    fontSize: scale(23)
  },
})

export default LEFSignInPage
