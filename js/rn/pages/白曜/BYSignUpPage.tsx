import React from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import FormComponent, { FormComponentProps } from '../../public/components/tars/FormComponent'
import PushHelper from '../../public/define/PushHelper'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot, push } from '../../public/navigation/RootNavigation'
import { BYThemeColor } from '../../public/theme/colors/BYThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignUpFormList from '../../public/views/tars/SignUpFormList'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'

const BYSignUpPage = () => {
  const {
    show,
    slideCodeRef,
    phoneNumber,
    label,
    onChange,
    sign,
    valid,
    passwordLimit,
  } = useSignUpPage({
    homePage: PageName.BYHomePage,
    signInPage: PageName.BYSignInPage,
  })

  const { signUp } = sign

  return (
    <>
      <SafeAreaHeader headerColor={BYThemeColor.白曜.tabBarBgColor}>
        <MineHeader
          title={'注册'}
          titleColor={BYThemeColor.白曜.themeColor}
          showBackBtn={true}
          onPressBackBtn={pop}
          showCustomerService={true}
          onPressCustomerService={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignUpFormList
            slideCodeRef={slideCodeRef}
            phoneNumber={phoneNumber}
            slideCodeColor={'#ffffff'}
            show={show}
            label={label}
            passwordLimit={passwordLimit}
            onChange={onChange}
            Form={SignUpForm}
          />
          <Button
            title={'注册'}
            disabled={!valid}
            containerStyle={[
              styles.button,
              {
                backgroundColor: BYThemeColor.白曜.themeColor,
              },
            ]}
            disabledContainerStyle={styles.button}
            titleStyle={{ color: '#ffffff', fontSize: scale(23) }}
            onPress={signUp}
          />
          <View style={styles.bottomButtonContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                push(PageName.BYSignInPage, {})
              }}
            >
              <Text style={{ fontWeight: '300' }}>{'返回登录'}</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={popToRoot}>
              <Text style={{ fontWeight: '300' }}>{'返回首页'}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const SignUpForm = (props: FormComponentProps) => {
  return (
    <FormComponent
      {...props}
      containerStyle={{ marginBottom: scale(10) }}
      inputContainerStyle={{ borderColor: '#d9d9d9' }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BYThemeColor.白曜.homeContentSubColor,
  },
  formContainer: {
    backgroundColor: '#ffffff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
    paddingTop: scale(25),
    marginBottom: scaleHeight(70),
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: scale(25),
  },
  button: {
    width: '100%',
    marginVertical: scale(20),
    aspectRatio: 8,
    borderRadius: scale(5),
  },
})

export default BYSignUpPage
