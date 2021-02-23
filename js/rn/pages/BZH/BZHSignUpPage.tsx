import React from 'react'
import { ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import FormComponent from '../../public/components/tars/FormComponent'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot, push } from '../../public/navigation/RootNavigation'
import { skinColors } from '../../public/theme/const/UGSkinColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import { goToUserCenterType } from '../../public/tools/tars'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignUpFormList, { SignUpRenderFormProps } from '../../public/views/tars/SignUpFormList'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const BZHSignUpPage = () => {
  const { show, reference, label, onChange, sign, passwordLimit, value, placeholder } = useSignUpPage({
    homePage: PageName.BZHHomePage,
    signInPage: PageName.BZHSignInPage,
  })

  const { signUp } = sign

  return (
    <>
      <SafeAreaHeader headerColor={skinColors.themeColor.宝石红}>
        <MineHeader title={'注册'} showBackBtn={true} onPressBackBtn={pop} showRightTitle={true} onPressRightTitle={goToUserCenterType.在线客服} />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignUpFormList
            slideCodeColor={'#ffffff'}
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
            title={'注册'}
            containerStyle={[
              styles.button,
              {
                backgroundColor: skinColors.themeColor.宝石红,
              },
            ]}
            disabledContainerStyle={styles.button}
            titleStyle={{ color: '#ffffff', fontSize: scale(23) }}
            onPress={signUp}
          />
          <View style={styles.bottomButtonContainer}>
            <TouchableWithoutFeedback
              onPress={() => {
                push(PageName.BZHSignInPage, {})
              }}>
              <UGText style={{ fontWeight: '300' }}>{'返回登录'}</UGText>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={popToRoot}>
              <UGText style={{ fontWeight: '300' }}>{'返回首页'}</UGText>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const SignUpForm = (props: SignUpRenderFormProps) => {
  return <FormComponent {...props} containerStyle={{ marginBottom: scale(10) }} inputContainerStyle={{ borderColor: '#d9d9d9' }} />
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: skinColors.homeContentSubColor.宝石红,
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

export default BZHSignUpPage
