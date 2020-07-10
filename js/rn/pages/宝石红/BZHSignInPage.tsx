import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView
} from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { useDispatch, useSelector } from 'react-redux'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import PushHelper from '../../public/define/PushHelper'
import useLoginIn from '../../public/hooks/useLoginIn'
import useTryPlay from '../../public/hooks/useTryPlay'
import { PageName } from '../../public/navigation/Navigation'
import {
  navigate,
  pop,
  popToRoot,
} from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale } from '../../public/tools/Scale'
import Header from '../../public/views/tars/Header'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import { ActionType } from '../../redux/store/ActionTypes'
import { IGlobalState } from '../../redux/store/UGStore'
import { BZHSignInStore } from './BZHSignInProps'
import Form from './views/Form'

const BZHSignInPage = () => {
  const dispatch = useDispatch()
  const { loginSuccessHandle } = useLoginIn()
  const { tryPlay } = useTryPlay({ enablePop: true })
  const signInStore = useSelector((state: IGlobalState) => state.BZHSignInReducer)
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

  const valid =
    account &&
    password

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
      <ScrollView style={styles.container}>
        <View style={styles.whiteBlock}>
          <Form
            show={true}
            placeholder={'请输入会员帐号'}
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
            show={true}
            rightIconProps={{
              color: hidePassword ? '#d9d9d9' : '#84C1FF',
              onPress: () => {
                setHidePassword(!hidePassword)
              },
            }}
            placeholder={'请输入密码'}
            leftIcon={{
              name: 'lock',
            }}
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
            showRightIcon
          />
          <CheckBox
            check={isRemember}
            onPress={() =>
              dispatch({
                type: ActionType.BZHSignInPage_SetProps,
                props: { isRemember: !isRemember },
              })
            }
          />
          <Button
            title={'立即登陆'}
            disabled={!valid}
            buttonStyle={styles.button}
            titleStyle={{ color: '#ffffff' }}
            onPress={async () => {
              try {
                if (account && password) {
                  OCHelper.call('SVProgressHUD.showWithStatus:', [
                    '正在登录...',
                  ])
                  const { data } = await APIRouter.user_login(
                    account,
                    password.md5()
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
              width: '100%'
            }}
            titleStyle={{ color: '#EA0000' }}
            onPress={() => {
              navigate(PageName.BZHRegisterPage, {})
            }}
          />
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity onPress={tryPlay}>
              <Text>{'免费试玩'}</Text>
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
      </ScrollView>
    </SafeAreaView>
  )
}

const CheckBox = ({ check, onPress }) => (
  <TouchableOpacity
    style={{
      width: '100%',
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
    backgroundColor: BZHThemeColor.宝石红.themeColor,
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: '#d9d9d9',
  },
  whiteBlock: {
    backgroundColor: '#ffffff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
    paddingTop: scale(25),
    flexWrap: 'wrap'
  },
  buttonContainer: {
    width: '100%',
    justifyContent: 'space-between',
    marginTop: scale(20),
    aspectRatio: 4,
  },
  bottomButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingVertical: scale(25)
  },
  button: {
    backgroundColor: BZHThemeColor.宝石红.themeColor,
    width: '100%',
    marginVertical: scale(20),
  },
})

export default BZHSignInPage
