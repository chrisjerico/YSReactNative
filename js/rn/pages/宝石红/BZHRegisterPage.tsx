import React, { useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { Button } from 'react-native-elements'
import { scale } from '../../helpers/function'
import PushHelper from '../../public/define/PushHelper'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, pop, popToRoot } from '../../public/navigation/RootNavigation'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import Header from '../../views/Header'
import Form from './views/Form'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import APIRouter from '../../public/network/APIRouter'
import { ActionType } from '../../redux/store/ActionTypes'
import { UGStore } from '../../redux/store/UGStore'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'

const BZHRegisterPage = () => {
  const [recommendGuy, setRecommendGuy] = useState(null)
  const [account, setAccount] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)
  const [realName, setRealName] = useState(null)
  const [fundPassword, setFundPassword] = useState(null)

  const [hidePassword, setHidePassword] = useState(true)
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true)
  const [hideFundPassword, setHideFundPassword] = useState(true)

  const valid =
    recommendGuy &&
    account &&
    password &&
    confirmPassword &&
    realName &&
    fundPassword
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
              onChangeText={(value: any) => setRecommendGuy(value)}
              label={'推荐人ID，如没有可不填写'}
              labelStyle={styles.warningText}
              placeholder={'推荐人ID'}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => setAccount(value)}
              label={'为了您的资料安全，请使用真实资料!'}
              labelStyle={styles.warningText}
              placeholder={'帐号'}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => setPassword(value)}
              label={'*请使用6-15位英文或数字的组合'}
              labelStyle={styles.warningText}
              placeholder={'密码'}
              secureTextEntry={hidePassword}
              showRightIcon
              rightIconProps={{
                color: hidePassword ? '#d9d9d9' : '#84C1FF',
                onPress: () => {
                  setHidePassword(!hidePassword)
                }
              }}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => setConfirmPassword(value)}
              label={'*请使用至少6位字符'}
              labelStyle={styles.warningText}
              placeholder={'确认密码'}
              secureTextEntry={hideConfirmPassword}
              showRightIcon
              rightIconProps={{
                color: hideConfirmPassword ? '#d9d9d9' : '#84C1FF',
                onPress: () => {
                  setHideConfirmPassword(!hideConfirmPassword)
                }
              }}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => setRealName(value)}
              label={'*必须与您的银行账户名称相同，以免未能到账！'}
              labelStyle={styles.warningText}
              placeholder={'真实姓名'}
            />
            <Form
              iconName={'user-circle'}
              onChangeText={(value: any) => setFundPassword(value)}
              label={'*请输入4数字取款密码'}
              labelStyle={styles.warningText}
              placeholder={'取款密码'}
              secureTextEntry={hideFundPassword}
              showRightIcon
              rightIconProps={{
                color: hideFundPassword ? '#d9d9d9' : '#84C1FF',
                onPress: () => {
                  setHideFundPassword(!hideFundPassword)
                }
              }}
            />
          </View>
          <View style={{ flex: 10 }}></View>
          <View style={{ flex: 50, justifyContent: 'space-between' }}>
            <Button
              title={'注册'}
              buttonStyle={
                valid
                  ? {
                    backgroundColor: '#ffffff',
                    borderColor: '#F0F0F0',
                    borderWidth: scale(1),
                    width: '100%',
                  }
                  : { backgroundColor: '#D0D0D0' }
              }
              titleStyle={{ color: valid ? '#EA0000' : '#ffffff' }}
              onPress={async () => {
                try {
                  if (valid) {
                    OCHelper.call('SVProgressHUD.showWithStatus:', [
                      '正在注册...',
                    ])
                    const params: any = {
                      inviter: recommendGuy,
                      usr: account,
                      pwd: password.md5(),
                      fundPwd: confirmPassword.md5(),
                      fullName: realName,
                      regType: 'user',
                    }
                    const { data } = await APIRouter.user_reg(params)
                    if (data?.data == null) {
                      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
                        data?.msg ?? '注册失败',
                      ])
                    } else {
                      if (data?.data?.autoLogin == false) {
                        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [data.msg ?? "注册成功"]);
                        popToRoot();
                      } else {
                        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [
                          '注册成功',
                        ])
                        const user = await OCHelper.call('UGUserModel.currentUser');
                        if (user) {
                          // 退出舊帳號
                          const sessid = await OCHelper.call('UGUserModel.currentUser.sessid');
                          await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }]);
                          await OCHelper.call('UGUserModel.setCurrentUser:');
                          await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
                          UGStore.dispatch({ type: ActionType.Clear_User })
                        }
                        const { data: loginData }: any = await APIRouter.user_login(data.data?.usr, password)
                        await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(loginData?.data)]);
                        await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [false, 'isRememberPsd']);
                        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName']);
                        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw']);
                        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
                        await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
                        updateUserInfo()
                        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["登录成功"]);
                        popToRoot();
                      }
                    }
                  }
                } catch (error) {
                  OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
                    error?.message ?? '注册失败',
                  ])
                }
              }}
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
            <TouchableOpacity
              onPress={() => {
                popToRoot()
              }}
            >
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
