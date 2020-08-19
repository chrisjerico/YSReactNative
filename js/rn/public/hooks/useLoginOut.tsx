import { Alert, Platform } from 'react-native'
import { UGStore } from '../../redux/store/UGStore'
import { OCHelper } from '../define/OCHelper/OCHelper'
import { PageName } from '../navigation/Navigation'
import { navigate } from '../navigation/RootNavigation'
import APIRouter from '../network/APIRouter'
import { Toast } from '../tools/ToastUtils'
import {ANHelper, CMD, NA_DATA} from "../define/ANHelper/ANHelper";

const useLoginOut = (pageName: PageName) => {
  const requestLoginOut = async () => {
    try {
      await APIRouter.user_logout()
      switch (Platform.OS) {
        case 'ios':
          await OCHelper.call('UGUserModel.setCurrentUser:', [])
          await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout'])
          await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0])
          break;
        case 'android':
          await ANHelper.callAsync(CMD.SAVE_DATA, { key: NA_DATA.LOGIN_INFO });
          await ANHelper.callAsync(CMD.SAVE_DATA, { key: NA_DATA.USER_INFO });
          break;
      }
      UGStore.dispatch({ type: 'reset', userInfo: {} })
      UGStore.save()
      console.log("---------------登出成功---------------")
      navigate(pageName, {})

    } catch (error) {
      console.log(error)
      Toast('退出失败，请稍后再试')
    }
  }
  const loginOut = () => {
    Alert.alert('温馨提示', '确定退出账号', [
      { text: '取消', style: 'cancel' },
      {
        text: '确定',
        onPress: requestLoginOut,
      },
    ])
  }
  return { loginOut }
}
export default useLoginOut
