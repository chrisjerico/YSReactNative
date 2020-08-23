import React, { useEffect, useState } from 'react'
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import { Button, Icon } from 'react-native-elements'
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
import { IGlobalState, UGStore } from '../../redux/store/UGStore'
import Form from './views/Form'
import { UGBasePageProps } from '../base/UGPage'
import {showLoading, UGLoadingType} from "../../public/widget/UGLoadingCP";
import {Toast} from "../../public/tools/ToastUtils";

// store
export interface BZHSignInStore extends UGBasePageProps<BZHSignInStore> {
  isRemember?: boolean;
  account?: string;
  password?: string | any;
}


const BZHSignInPage = (props: BZHSignInStore) => {
  const { loginSuccessHandle } = useLoginIn()
  const { tryPlay } = useTryPlay({ onSuccess: popToRoot })
  const signInStore = UGStore.getPageProps(PageName.BZHSignInPage);
  const { isRemember, account, password }: BZHSignInStore = signInStore
  const { setProps }: BZHSignInStore = props
  const [hidePassword, setHidePassword] = useState(true)

  useEffect(() => {
    if (!isRemember) {
      console.log('----忘記帳密----')
      setProps({ account: null, password: null })
    }
  }, [])

  const valid = account && password

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
              setProps({ account: value });
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
              setProps({ password: value })
            }
            secureTextEntry={hidePassword}
            showRightIcon
          />
          <CheckBox
            check={isRemember}
            onPress={() =>
              setProps({ isRemember: !isRemember })
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
                  // OCHelper.call('SVProgressHUD.showWithStatus:', [
                  //   '正在登录...',
                  // ])
                  showLoading({ type: UGLoadingType.Loading, text: '正在登录...' });
                  const { data } = await APIRouter.user_login(
                    account,
                    password.md5()
                  )
                  if (data.data == null) {
                    const error = data?.msg
                    // OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
                    //   error ?? '登录失敗！',
                    // ])
                    Toast('登录失敗！');
                  } else {
                    // OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [
                    //   '登录成功！',
                    // ])
                    Toast('登录成功！');
                    await loginSuccessHandle(data, {
                      account,
                      pwd: password,
                      isRemember,
                    })
                  }
                }
              } catch (error) {
                Toast('登入失败！');
                // OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
                //   error ?? '登入失败',
                // ])
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
            <TouchableOpacity onPress={popToRoot}>
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
    backgroundColor: BZHThemeColor.宝石红.bgColor?.[0],
    marginBottom: scale(70),
  },
  whiteBlock: {
    backgroundColor: '#ffffff',
    width: '95%',
    alignSelf: 'center',
    borderRadius: scale(10),
    marginTop: scale(15),
    paddingHorizontal: scale(25),
    paddingTop: scale(25),
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
