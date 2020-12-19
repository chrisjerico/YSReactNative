import React, { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FormComponent from '../../public/components/tars/FormComponent'
import ScrollableTabViewComponent from '../../public/components/tars/ScrollableTabViewComponent'
import { pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { showError, showLoading, showSuccess } from '../../public/widget/UGLoadingCP'

const Form = ({ title, placeholder, onChangeText }) => {
  return (
    <>
      <Text style={{ paddingLeft: '3%', marginBottom: 10 }}>{title}</Text>
      <FormComponent
        placeholder={placeholder}
        visible
        containerStyle={{ paddingHorizontal: '3%' }}
        leftIconContainerStyle={{ width: null, marginRight: null }}
        placeholderTextColor={'#8E8E8E'}
        inputStyle={{ fontSize: 13 }}
        onChangeText={onChangeText}
      />
    </>
  )
}

const SignInPassword = ({ tabLabel }) => {
  const oldPwd = useRef(null)
  const newPwd = useRef(null)
  const confirmNewPwd = useRef(null)

  return (
    <View style={{ flex: 1, marginTop: 35 }}>
      <Form
        title={'原登录密码'}
        placeholder={'请输入原登录密码'}
        onChangeText={(text) => {
          oldPwd.current = text
        }}
      />
      <Form
        title={'新密码'}
        placeholder={'请输入6到13位长度的密码'}
        onChangeText={(text) => {
          newPwd.current = text
        }}
      />
      <Form
        title={'确认新密码'}
        placeholder={'请输入6到13位长度的密码'}
        onChangeText={(text) => {
          confirmNewPwd.current = text
        }}
      />
      <Button
        title={'提交'}
        titleStyle={{ color: '#ffffff' }}
        containerStyle={styles.button}
        onPress={() => {
          if (newPwd.current == confirmNewPwd.current) {
            showLoading()
            APIRouter.user_changeLoginPwd({
              oldPwd: oldPwd.current?.md5(),
              newPwd: newPwd.current?.md5(),
            })
              .then((value) => {
                const code = value?.data?.code
                const msg = value?.data?.msg
                if (code) {
                  showError(msg)
                } else {
                  showSuccess(msg)
                }
              })
              .catch((error) => {
                showError(error)
              })
          } else {
            showError('新密码不一致')
          }
        }}
      />
    </View>
  )
}

const TakeMoneyPassword = ({ tabLabel }) => {
  const oldPassword = useRef(null)
  const newPassword = useRef(null)
  const confirmNewPwd = useRef(null)

  return (
    <View style={{ flex: 1, marginTop: 35 }}>
      <Form
        title={'旧取款密码'}
        placeholder={'请输入旧取款密码'}
        onChangeText={(text) => {
          oldPassword.current = text
        }}
      />
      <Form
        title={'新密码'}
        placeholder={'请输4位数字取款新密码'}
        onChangeText={(text) => {
          newPassword.current = text
        }}
      />
      <Form
        title={'确认新密码'}
        placeholder={'请输4位数字取款新密码'}
        onChangeText={(text) => {
          confirmNewPwd.current = text
        }}
      />
      <Button title={'提交'} titleStyle={{ color: '#ffffff' }} containerStyle={styles.button} />
    </View>
  )
}

const SafeCenterPage = () => {
  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'安全中心'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <ScrollableTabViewComponent indicatorStyle={{ width: '23%', backgroundColor: Skin1.themeColor }}>
        <SignInPassword tabLabel={'登录密码'} key={'登录密码'} />
        <TakeMoneyPassword tabLabel={'取款密码'} key={'取款密码'} />
      </ScrollableTabViewComponent>
    </>
  )
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: Skin1.themeColor,
    width: 300,
    aspectRatio: 7,
    borderRadius: 5,
    alignSelf: 'center',
  },
})

export default SafeCenterPage
