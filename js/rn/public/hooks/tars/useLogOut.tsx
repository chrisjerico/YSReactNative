import { Alert, Platform } from 'react-native'
import { UGStore } from '../../../redux/store/UGStore'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import APIRouter from '../../network/APIRouter'
import { ToastError, ToastSuccess, ToastStatus } from '../../tools/tars'

interface Options {
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const useLogOut = (options: Options = {}) => {
  const { onSuccess, onError } = options
  const requestLogOut = async () => {
    try {
      if (Platform.OS == 'ios') {
        ToastStatus('正在退出...')
        await APIRouter.user_logout()
        await OCHelper.call('UGUserModel.setCurrentUser:', [])
        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout'])
        // await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0])
        UGStore.dispatch({ type: 'reset', userInfo: {} })
        UGStore.save()
        onSuccess && onSuccess()
      }
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