import { Alert, Platform } from 'react-native'
import { UGStore } from '../../../redux/store/UGStore'
import { OCHelper } from '../../define/OCHelper/OCHelper'
import APIRouter from '../../network/APIRouter'
import { ToastStatus } from '../../tools/tars'
import {logoutAndroid} from "../../define/ANHelper/InfoHelper";
import {ANHelper} from "../../define/ANHelper/ANHelper";
import {CMD} from "../../define/ANHelper/hp/CmdDefine";
import {hideLoading, showLoading, UGLoadingType} from "../../widget/UGLoadingCP";

interface Options {
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const useLogOut = (options: Options = {}) => {
  const { onSuccess, onError } = options
  const requestLogOut = async () => {
    try {
      showLoading({ type: UGLoadingType.Loading });

      await APIRouter.user_logout()

        switch (Platform.OS) {
          case 'ios':
            await OCHelper.call('UGUserModel.setCurrentUser:', [])
            await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout'])
            break;
        }
        // await OCHelper.call('UGTabbarController.shared.setSelectedIndex:', [0])
        UGStore.dispatch({ type: 'reset', userInfo: {} })
        UGStore.save()

      hideLoading()
        onSuccess && onSuccess()

      switch (Platform.OS) {
        case 'android':
          await ANHelper.callAsync(CMD.LOG_OUT)
          break;
      }
    } catch (error) {
      hideLoading()
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
