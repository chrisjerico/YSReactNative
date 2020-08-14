import React, { useEffect, useRef, useState } from 'react'
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View
} from 'react-native'
import { Button, Icon } from 'react-native-elements'
import AntDesign from 'react-native-vector-icons/AntDesign'
import SlidingVerification from '../../public/components/SlidingVerification'
import ReloadSlidingVerification from '../../public/components/tars/ReloadSlidingVerification'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import PushHelper from '../../public/define/PushHelper'
import useLogIn from '../../public/hooks/tars/useLogIn'
import useTryPlay from '../../public/hooks/tars/useTryPlay'
import { PageName } from '../../public/navigation/Navigation'
import { navigate, pop } from '../../public/navigation/RootNavigation'
import { BZHThemeColor } from '../../public/theme/colors/BZHThemeColor'
import { scale, scaleHeight } from '../../public/tools/Scale'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import UGSysConfModel, { UGUserCenterType } from '../../redux/model/全局/UGSysConfModel'
import { UGStore } from '../../redux/store/UGStore'
import { UGBasePageProps } from '../base/UGPage'
import Form from './components/Form'

interface SlidingVerification {
  nc_csessionid: string;
  nc_token: string;
  nc_sig: string;
}

// store
export interface BZHSignInStore extends UGBasePageProps<BZHSignInStore> {
  isRemember?: boolean;
  account?: string;
  password?: string | any;
}

const BZHSignInPage = (props: BZHSignInStore) => {
  const {
    isRemember,
    account,
    password,
    navigation,
    setProps,
  }: BZHSignInStore = props
  const [hidePassword, setHidePassword] = useState(true)
  const reloadSliding = useRef(null)

  const { loginVCode }: UGSysConfModel = UGStore.globalProps.sysConf

  // states
  const [slidingVerification, setSlidingVerification] =
    useState<SlidingVerification>
      ({
        nc_csessionid: undefined,
        nc_token: undefined,
        nc_sig: undefined,
      })

  const { type }: any = navigation?.dangerouslyGetState()

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
      console.log('----忘記帳密----')
      setProps({ account: null, password: null })
    }
  }

  const { logIn } = useLogIn({
    onSuccess: () => {
      jumpToHomePage()
    },
    onError: () => {
      setSlidingVerification({
        nc_csessionid: undefined,
        nc_token: undefined,
        nc_sig: undefined,
      })
      reloadSliding?.current?.reload()
    },
  })

  const { tryPlay } = useTryPlay({
    onSuccess: () => {
      jumpToHomePage()
    },
    onError: () => { },
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

  const { nc_csessionid, nc_token, nc_sig } = slidingVerification

  const loginVCode_valid = (nc_csessionid && nc_token && nc_sig) || !loginVCode
  const valid = account && password && loginVCode_valid

  return (
    <>
      <SafeAreaHeader headerColor={BZHThemeColor.宝石红.themeColor}>
        <TouchableWithoutFeedback onPress={jump}>
          <AntDesign name={'left'} color={'#ffffff'} size={scale(25)} />
        </TouchableWithoutFeedback>
        <Text style={styles.headerTitle}>{'登录'}</Text>
        <TouchableWithoutFeedback
          onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
          }}
        >
          <Text style={styles.headerTitle}>{'客服'}</Text>
        </TouchableWithoutFeedback>
      </SafeAreaHeader>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <View style={styles.whiteBlock}>
          <Form
            show={true}
            placeholder={'请输入会员帐号'}
            value={account}
            onChangeText={(value: any) => {
              setProps({ account: value })
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
            onChangeText={(value: any) => setProps({ password: value })}
            secureTextEntry={hidePassword}
            showRightIcon
          />
          <CheckBox
            check={isRemember}
            onPress={() => setProps({ isRemember: !isRemember })}
          />
          {loginVCode ? (
            <ReloadSlidingVerification
              ref={reloadSliding}
              onChange={setSlidingVerification}
              containerStyle={{ marginBottom: scale(20) }}
            />
          ) : null}
          <Button
            title={'立即登录'}
            disabled={!valid}
            buttonStyle={styles.button}
            titleStyle={{ color: '#ffffff' }}
            onPress={() => {
              logIn({
                account,
                password: password?.md5(),
                isRemember,
              })
            }}
            activeOpacity={1}
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
            activeOpacity={1}
          />
          <View style={styles.bottomButtonContainer}>
            <TouchableWithoutFeedback onPress={tryPlay}>
              <Text>{'免费试玩'}</Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={jumpToHomePage}>
              <Text>{'返回首页'}</Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </>
  )
}

const CheckBox = ({ check, onPress }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View
      style={{
        width: '100%',
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}
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
    </View>
  </TouchableWithoutFeedback>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BZHThemeColor.宝石红.homeContentSubColor,
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
  headerTitle: {
    color: '#ffffff',
    fontSize: scale(25),
  },
})

export default BZHSignInPage
