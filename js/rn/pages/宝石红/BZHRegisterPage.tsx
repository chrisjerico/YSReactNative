import React, { useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { scale } from '../../helpers/function'
import PushHelper from '../../public/define/PushHelper'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, pop } from '../../public/navigation/RootNavigation'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import Header from '../../views/Header'
import Form from './views/Form'

const BZHRegisterPage = () => {
  let account = useRef(null).current
  let password = useRef(null).current

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        color={'#e53333'}
        title={'注册'}
        onPressBack={pop}
        onPressCustomerService={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.QQ客服)
        }}
      />
      <View style={styles.container}>
        <View style={styles.whiteBlock}>
          <View style={styles.formContainer}>
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => (account = value)}
              label={'推荐人ID，如没有可不填写'}
              labelStyle={styles.warningText}
              placeholder={'推荐人ID'}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => (password = value)}
              label={'为了您的资料安全，请使用真实资料!'}
              labelStyle={styles.warningText}
              placeholder={'帐号'}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => (password = value)}
              label={'*请使用6-15位英文或数字的组合'}
              labelStyle={styles.warningText}
              placeholder={'密码'}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => (password = value)}
              label={'*请使用至少6位字符'}
              labelStyle={styles.warningText}
              placeholder={'确认密码'}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => (password = value)}
              label={'*必须与您的银行账户名称相同，以免未能到账！'}
              labelStyle={styles.warningText}
              placeholder={'真实姓名'}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => (password = value)}
              label={'*请输入4数字取款密码'}
              labelStyle={styles.warningText}
              placeholder={'取款密码'}
            />
          </View>
          <View style={{ flex: 10 }}></View>
          <View style={{ flex: 50, justifyContent: 'space-between' }}>
            <Button
              title={'注册'}
              buttonStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#F0F0F0',
                borderWidth: scale(1),
                width: '100%',
              }}
              titleStyle={{ color: '#EA0000' }}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              flex: 65,
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <TouchableOpacity
              onPress={() => {
                navigate(PageName.BZHSignInPage, {})
              }}
            >
              <Text>{'返回登录'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              navigate(PageName.BZHHomePage, {})
            }}>
              <Text>{'返回首页'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#e53333',
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  whiteBlock: {
    backgroundColor: '#ffffff',
    width: '95%',
    aspectRatio: 485 / 655,
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
  },
  formContainer: {
    flex: 440,
    justifyContent: 'space-around',
  },
  warningText: {
    color: '#FF7575',
    fontSize: scale(15),
  },
})
export default BZHRegisterPage
