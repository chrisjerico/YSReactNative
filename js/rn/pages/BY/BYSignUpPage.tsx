import React from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import FormComponent, { FormComponentProps } from '../../public/components/tars/FormComponent'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { PageName } from '../../public/navigation/Navigation'
import { pop, popToRoot } from '../../public/navigation/RootNavigation'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignUpFormList from '../../public/views/tars/SignUpFormList'

const BYSignUpPage = () => {
  const { show, slideCodeRef, label, onChange, sign, passwordLimit } = useSignUpPage({
    homePage: PageName.BYHomePage,
    signInPage: PageName.BYSignInPage,
  })

  const { signUp } = sign

  return (
    <>
      <SafeAreaHeader headerColor={'#ffffff'}>
        <MineHeader
          title={'注册'}
          showBackBtn={true}
          onPressBackBtn={pop}
          showRightTitle={true}
          rightTitle={'返回首页'}
          titleStyle={{ color: '#000000' }}
          backBtnColor={'#000000'}
          rightTitleStyle={{ color: '#298dff' }}
          onPressRightTitle={popToRoot}
        />
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.formContainer}>
          <SignUpFormList slideCodeRef={slideCodeRef} slideCodeColor={'#ffffff'} show={show} label={label} passwordLimit={passwordLimit} onChange={onChange} Form={SignUpForm} />
          <Button
            title={'注册'}
            containerStyle={[
              styles.button,
              {
                backgroundColor: '#298dff',
              },
            ]}
            disabledContainerStyle={styles.button}
            titleStyle={{ color: '#ffffff', fontSize: scale(23) }}
            onPress={signUp}
          />
          <Button
            title={'已有账号，点击登录'}
            containerStyle={[
              styles.button,
              {
                backgroundColor: '#ffffff',
                borderColor: '#298dff',
                borderWidth: scale(1),
                borderRadius: scale(400),
              },
            ]}
            titleStyle={{ color: '#298dff', fontSize: scale(23) }}
            onPress={() => {}}
          />
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
      leftIconProps={{ color: '#298dff' }}
      labelTextStyle={{ fontSize: scale(17) }}
    />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
