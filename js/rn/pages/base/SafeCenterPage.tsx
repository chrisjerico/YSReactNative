import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import FormComponent from '../../public/components/tars/FormComponent'
import ScrollableTabViewComponent from '../../public/components/tars/ScrollableTabViewComponent'
import { pop } from '../../public/navigation/RootNavigation'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import Button from '../../public/views/tars/Button'
import MineHeader from '../../public/views/tars/MineHeader'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'

const Form = ({ title, placeholder }) => (
  <>
    <Text style={{ paddingLeft: '3%', marginBottom: 10 }}>{title}</Text>
    <FormComponent
      placeholder={placeholder}
      visible
      containerStyle={{ paddingHorizontal: '3%' }}
      leftIconContainerStyle={{ width: null, marginRight: null }}
      placeholderTextColor={'#8E8E8E'}
      inputStyle={{ fontSize: 13 }}
    />
  </>
)

const SignInPassword = ({ tabLabel }) => {
  return (
    <View style={{ flex: 1, marginTop: 35 }}>
      <Form title={'原登录密码'} placeholder={'请输入原登录密码'} />
      <Form title={'新密码'} placeholder={'请输入6到13位长度的密码'} />
      <Form title={'确认新密码'} placeholder={'请输入6到13位长度的密码'} />
      <Button title={'提交'} titleStyle={{ color: '#ffffff' }} containerStyle={styles.button} />
    </View>
  )
}

const TakeMoneyPassword = ({ tabLabel }) => {
  return (
    <View style={{ flex: 1, marginTop: 35 }}>
      <Form title={'旧取款密码'} placeholder={'请输入旧取款密码'} />
      <Form title={'新密码'} placeholder={'请输4位数字取款新密码'} />
      <Form title={'确认新密码'} placeholder={'请输4位数字取款新密码'} />
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
        <SignInPassword tabLabel={'登录密码'} />
        <TakeMoneyPassword tabLabel={'取款密码'} />
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
