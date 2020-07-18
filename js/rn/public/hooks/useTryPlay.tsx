import { Platform } from 'react-native'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { OCHelper } from '../define/OCHelper/OCHelper'
import APIRouter from '../network/APIRouter'

interface UseTryPlay {
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const useTryPlay = (params?: UseTryPlay) => {
  const { onSuccess, onError } = params
  const tryPlay = async () => {
    try {
      OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...'])
      const { data } = await APIRouter.user_guestLogin()
      if (Platform.OS == 'ios') {
        // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
        //@ts-ignore
        await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data?.data)]);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd']);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName']);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw']);
        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
        await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
        await updateUserInfo()
        onSuccess && onSuccess()
      } else {
        // for android
      }
    } catch (error) {
      console.log(error)
      onError && onError(error)
    }
  }

  return { tryPlay }
}

export default useTryPlay
