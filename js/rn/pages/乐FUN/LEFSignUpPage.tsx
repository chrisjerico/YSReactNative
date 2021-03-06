import React, { useRef } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import FormComponent, { FormComponentProps } from '../../public/components/tars/FormComponent'
import PushHelper from '../../public/define/PushHelper'
import useSignUpPage from '../../public/hooks/tars/useSignUpPage'
import { PageName } from '../../public/navigation/Navigation'
import {pop, popToRoot, push} from '../../public/navigation/RootNavigation'
import { scale } from '../../public/tools/Scale'
import Button from '../../public/views/tars/Button'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import SignUpFormList from '../../public/views/tars/SignUpFormList'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import MenuModalComponent from './components/MenuModalComponent'
import config from './config'
import Menu from './views/Menu'
import SignHeader from './views/SignHeader'
import MineHeader from "../../public/views/temp/MineHeader";
import { skinColors } from '../../public/theme/const/UGSkinColor'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'

const LEFSignUpPage = () => {
  const menu = useRef(null)

  const { reference, show, label, onChange, sign, passwordLimit, navigateTo, value, placeholder, rightMenus } = useSignUpPage({
    homePage: PageName.LEFHomePage,
    signInPage: PageName.LEFSignInPage,
  })

  const { signUp, tryPlay } = sign

  const { navigateToSignInPage } = navigateTo

  return (
    <>
      <SafeAreaHeader headerColor={skinColors.themeColor.乐FUN}>
        <MineHeader
          title={'注册'}
          backTitle={'首页'}
          titleColor={skinColors.textColor2.乐FUN}
          showBackBtn={true}
          onPressBackBtn={() => {
            popToRoot()
          }}
          showCustomerService={true}
          customerTitle={'登录'}
          onPressCustomerService={()=>{
            push(PageName.LEFSignInPage)
          }}
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
        </View>
      </ScrollView>
    </>
  )
}
const SignUpForm = (props: FormComponentProps & { leftIconTitle: string }) => (
  <FormComponent
    {...props}
    containerStyle={{ marginBottom: scale(15) }}
    inputContainerStyle={styles.inputContainerStyle}
    leftIconContainerStyle={styles.leftIconContainerStyle}
    rightIconContainerStyle={{ marginRight: scale(10) }}
    renderLeftIcon={() => <UGText style={styles.leftIconText}>{props?.leftIconTitle}</UGText>}
    labelTextStyle={{ paddingLeft: scale(20) }}
    placeholderTextColor={'#9D9D9D'}
  />
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: skinColors.homeContentSubColor.乐FUN,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    marginTop: scale(23),
    marginBottom: scale(100),
  },
  signUpButton: {
    width: '100%',
    backgroundColor: skinColors.textColor2.乐FUN,
    marginTop: scale(12),
    aspectRatio: 8,
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

export default LEFSignUpPage
