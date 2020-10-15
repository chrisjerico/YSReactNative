import { Alert, Platform } from 'react-native'
import { UGStore } from '../../../redux/store/UGStore'
import { ANHelper } from '../../define/ANHelper/ANHelper'
import { CMD } from '../../define/ANHelper/hp/CmdDefine'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import APIRouter from '../../network/APIRouter'
import { ToastStatus } from '../../tools/tars'

interface Options {
  onStart?: () => any;
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const useLogOut = (options: Options = {}) => {
  const { onStart, onSuccess, onError } = options
  const requestLogOut = async () => {
    try {
      onStart && onStart()
      await APIRouter.user_logout()

      switch (Platform.OS) {
        case 'ios':
          await OCHelper.call('UGUserModel.setCurrentUser:', [])
          await OCHelper.call(
            'NSNotificationCenter.defaultCenter.postNotificationName:object:',
            ['UGNotificationUserLogout']
          )
          break
        case 'android':
          await ANHelper.callAsync(CMD.LOG_OUT)
          break;
      }

      UGStore.dispatch({ type: 'reset', userInfo: {} })
      UGStore.save()

      onSuccess && onSuccess()
    } catch (error) {
      onError && onError(error)
    }
  }
  const logOut = () => {
    Alert.alert('温馨提示', '确定退出账号', [
      { text: '取消', style: 'cancel' },
      {
        text: '确定',
        onPress: requestLogOut,
      },
    ])
  }
  return { logOut }
}
export default useLogOut
