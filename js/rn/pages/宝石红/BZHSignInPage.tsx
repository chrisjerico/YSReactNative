import React, { useEffect, useState } from 'react'
import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { useDispatch, useSelector } from 'react-redux'
import { scale } from '../../helpers/function'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import PushHelper from '../../public/define/PushHelper'
import useLoginIn from '../../public/hooks/useLoginIn'
import useTryPlay from '../../public/hooks/useTryPlay'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import { ActionType } from '../../redux/store/ActionTypes'
import { IGlobalState } from '../../redux/store/UGStore'
import Header from '../../views/Header'
import { BZHSignInStore } from './BZHSignInProps'
import Form from './views/Form'

const BZHSignInPage = () => {
  const dispatch = useDispatch()
  const { loginSuccessHandle } = useLoginIn()
  const { tryPlay } = useTryPlay({ enablePop: true })
  const signInStore = useSelector(
    (state: IGlobalState) => state.BZHSignInReducer
  )
  const { isRemember, account, password }: BZHSignInStore = signInStore
  const [hidePassword, setHidePassword] = useState(true)

  useEffect(() => {
    if (!isRemember) {
      console.log('----忘記帳密----')
      dispatch({
        type: ActionType.BZHSignInPage_SetProps,
        props: {
          account: null,
          password: null,
        },
      })
    }
  }, [])

  return (
    <SafeAreaView style={styles.safeArea}>
      <Header
        color={'#e53333'}
        title={'登陆'}
        onPressBack={pop}
        onPressCustomerService={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.QQ客服)
        }}
      />
      <View style={styles.container}>
        <View style={styles.whiteBlock}>
          <View style={styles.formContainer}>
            <Form
              placeholder={'请输入会员帐号'}
              iconName={'user-circle'}
              value={account}
              onChangeText={(value: any) => {
                dispatch({
                  type: ActionType.BZHSignInPage_SetProps,
                  props: {
                    account: value,
                  },
                })
                // UGStore.save()
              }}
            />
            <Form
              rightIconProps={{
                color: hidePassword ? '#d9d9d9' : '#84C1FF',
                onPress: () => {
                  setHidePassword(!hidePassword)
                },
              }}
              placeholder={'请输入密码'}
              iconName={'lock'}
              value={password}
              onChangeText={(value: any) =>
                dispatch({
                  type: ActionType.BZHSignInPage_SetProps,
                  props: {
                    password: value,
                  },
                })
              }
              secureTextEntry={hidePassword}
            />
          </View>
          <CheckBox
            check={isRemember}
            onPress={() =>
              dispatch({
                type: ActionType.BZHSignInPage_SetProps,
                props: { isRemember: !isRemember },
              })
            }
          />
          <View
            style={{
              flex: 115,
              justifyContent: 'space-between',
              marginTop: scale(20),
            }}
          >
            <Button
              title={'立即登陆'}
              buttonStyle={{
                backgroundColor: account && password ? '#EA0000' : '#D0D0D0',
                width: '100%',
              }}
              titleStyle={{ color: '#ffffff' }}
              onPress={async () => {
                try {
                  if (account && password) {
                    OCHelper.call('SVProgressHUD.showWithStatus:', [
                      '正在登录...',
                    ])
                    const { data } = await APIRouter.user_login(
                      account,
                      password.md5(),
                      ''
                    )
                    if (data.data == null) {
                      const error = data?.msg
                      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
                        error ?? '登录失敗！',
                      ])
                    } else {
                      OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [
                        '登录成功！',
                      ])
                      await loginSuccessHandle(data, {
                        account,
                        pwd: password,
                        isRemember,
                      })
                    }
                  }
                } catch (error) {
                  OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
                    error ?? '登入失败',
                  ])
                }
              }}
            />
            <Button
              title={'快速注册'}
              buttonStyle={{
                backgroundColor: '#ffffff',
                borderColor: '#F0F0F0',
                borderWidth: scale(1),
                width: '100%',
              }}
              titleStyle={{ color: '#EA0000' }}
              onPress={() => {
                navigate(PageName.BZHRegisterPage, {})
              }}
            />
          </View>
          <View style={styles.bottomContainer}>
            <TouchableOpacity onPress={tryPlay}>
              <Text>{'免费试玩'}</Text>
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

const CheckBox = ({ check, onPress }) => (
  <TouchableOpacity
    style={{
      flexDirection: 'row',
      alignItems: 'flex-end',
    }}
    onPress={onPress}
  >
    {check ? (
      <Icon
        type={'feather'}
        name={'check'}
        color={'#ffffff'}
        containerStyle={{
          width: scale(25),
          backgroundColor: 'blue',
          aspectRatio: 1,
          justifyContent: 'center',
        }}
        size={scale(20)}
      />
    ) : (
        <View
          style={{
            width: scale(25),
            aspectRatio: 1,
            borderColor: 'blue',
            borderWidth: scale(1),
          }}
        ></View>
      )}
    <Text style={{ paddingLeft: scale(10) }}>{'记住密码'}</Text>
  </TouchableOpacity>
)

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
    aspectRatio: 485 / 375,
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
  },
  formContainer: {
    flex: 160,
    justifyContent: 'center',
  },
  bottomContainer: {
    flexDirection: 'row',
    flex: 75,
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
  },
})

export default BZHSignInPage
