import React, { useEffect, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button, Icon } from 'react-native-elements'
import { useSafeArea } from 'react-native-safe-area-context'
import { useSelector } from 'react-redux'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import PushHelper from '../../public/define/PushHelper'
import useLoginIn from '../../public/hooks/useLoginIn'
import useTryPlay from '../../public/hooks/useTryPlay'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import Header from '../../public/views/tars/Header'
import { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import { ActionType } from '../../redux/store/ActionTypes'
import { IGlobalState, UGStore } from '../../redux/store/UGStore'
import { BZHSignInStore } from './BZHSignInProps'
import Form from './views/Form'

const BZHSignInPage = ({ navigation }) => {
  // const dispatch = useDispatch()
  const signInStore = useSelector(
    (state: IGlobalState) => state.BZHSignInReducer
  )
  const safeArea = useSafeArea()
  const { isRemember, account, password }: BZHSignInStore = signInStore
  const [hidePassword, setHidePassword] = useState(true)

  const { type } = navigation?.dangerouslyGetState()

  const jump = () => {
    switch (type) {
      case 'tab':
        navigate(PageName.BZHHomePage, {})
        break
      case 'stack':
        pop()
        break
      default:
        console.log('------no navigation type------')
    }
  }

  const jumpToHomePage = () => {
    navigate(PageName.BZHHomePage, {})
  }

  const cleanAccountPassword = (isRemember: boolean) => {
    if (!isRemember) {
      UGStore.dispatch({
        type: ActionType.BZHSignInPage_SetProps,
        props: {
          account: null,
          password: null,
        },
      })
      UGStore.save()
      console.log('---------忘記帳密---------')
    }
  }

  const { loginSuccessHandle } = useLoginIn({
    onSuccess: () => {
      jumpToHomePage()
      OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！'])
    },
    onError: (error) => {
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
        error ?? '登录失敗！',
      ])
    },
  })
  const { tryPlay } = useTryPlay({
    onSuccess: () => {
      jumpToHomePage()
      OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！'])
    },
    onError: (error) => {
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error ?? '試玩失败'])
    },
  })

  useEffect(() => {
    switch (type) {
      case 'tab':
        const unsubscribe = navigation.addListener('focus', async () => {
          const isRemember = await OCHelper.call(
            'NSUserDefaults.standardUserDefaults.boolForKey:',
            ['isRememberPsd']
          )
          cleanAccountPassword(isRemember)
        })
        return unsubscribe
      case 'stack':
        cleanAccountPassword(isRemember)
        break
      default:
        console.log('------no navigation type------')
    }
  }, [])

  const valid = account && password

  return (
    <>
      <Header
        marginTop={safeArea?.top}
        backgroundColor={BZHThemeColor.宝石红.themeColor}
        title={'登陆'}
        onPressBack={jump}
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
              UGStore.dispatch({
                type: ActionType.BZHSignInPage_SetProps,
                props: {
                  account: value,
                },
              })
              UGStore.save()
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
            onChangeText={(value: any) => {
              UGStore.dispatch({
                type: ActionType.BZHSignInPage_SetProps,
                props: {
                  password: value,
                },
              })
              UGStore.save()
            }}
            secureTextEntry={hidePassword}
            showRightIcon
          />
          <CheckBox
            check={isRemember}
            onPress={() => {
              OCHelper.call(
                'NSUserDefaults.standardUserDefaults.setBool:forKey:',
                [!isRemember, 'isRememberPsd']
              )
              UGStore.dispatch({
                type: ActionType.BZHSignInPage_SetProps,
                props: { isRemember: !isRemember },
              })
              UGStore.save()
            }}
          />
          <Button
            title={'立即登陆'}
            disabled={!valid}
            buttonStyle={styles.button}
            titleStyle={{ color: '#ffffff' }}
            onPress={async () => {
              try {
                OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...'])
                const { data } = await APIRouter.user_login(
                  account,
                  password?.md5()
                )
                console.log('---------------data-----------', data)
                if (data?.data) {
                  await loginSuccessHandle(
                    data,
                    {
                      account,
                      pwd: password,
                      isRemember,
                    },
                    {
                      enableCleanOldUser: false,
                      enableNativeNotification: false,
                    }
                  )
                } else {
                  const error = data?.msg
                  OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
                    error ?? '登录失敗！',
                  ])
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
          <View style={styles.bottomButtonContainer}>
            <TouchableOpacity onPress={tryPlay}>
              <Text>{'免费试玩'}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={jumpToHomePage}>
              <Text>{'返回首页'}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
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
  container: {
    flex: 1,
    backgroundColor: BZHThemeColor.宝石红.bgColor?.[0],
  },
  whiteBlock: {
    backgroundColor: '#ffffff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
    paddingTop: scale(25),
    marginBottom: scaleHeight(70),
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
    paddingVertical: scale(25),
  },
  button: {
    backgroundColor: BZHThemeColor.宝石红.themeColor,
    width: '100%',
    marginVertical: scale(20),
  },
})

export default BZHSignInPage
