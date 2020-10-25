import { Alert, Platform } from 'react-native'
import { UGStore } from '../../../redux/store/UGStore'
import { ANHelper } from '../../define/ANHelper/ANHelper'
import { CMD } from '../../define/ANHelper/hp/CmdDefine'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import APIRouter from '../../network/APIRouter'

interface Options {
  onStart?: () => any
  onSuccess?: () => any
  onError?: (error: any) => any
}

const useSignOut = (options: Options = {}) => {
  const { onStart, onSuccess, onError } = options
  const requestLogOut = async () => {
    try {
      onStart && onStart()
      await APIRouter.user_logout()
      switch (Platform.OS) {
        case 'ios':
          await Promise.all([
            OCHelper.call('UGUserModel.setCurrentUser:', []),
            OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'roomName']),
            OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'roomId']),
            OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']),
            OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0]),
          ])
          break
        case 'android':
          await ANHelper.callAsync(CMD.LOG_OUT)
          break
      }
      UGStore.dispatch({ type: 'reset', userInfo: {} })
      UGStore.save()
      onSuccess && onSuccess()
    } catch (error) {
      onError && onError(error)
    }
  }
  const signOut = () => {
    Alert.alert('温馨提示', '确定退出账号', [
      { text: '取消', style: 'cancel' },
      {
        text: '确定',
        onPress: requestLogOut,
      },
    ])
  }
  return { signOut }
}
export default useSignOut
