import { Platform } from 'react-native'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { OCHelper } from '../define/OCHelper/OCHelper'
import APIRouter from '../network/APIRouter'

interface UseTryPlay {
  onSuccess?: () => any;
}

const useTryPlay = (params: UseTryPlay) => {
  const { onSuccess } = params
  const tryPlay = async () => {
    try {
      const { data } = await APIRouter.user_guestLogin()
      const user: any = data?.data
      if (Platform.OS == 'ios') {
        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
        //@ts-ignore
        await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data.data)]);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd']);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName']);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw']);
        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
        await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
        await updateUserInfo()
        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
        onSuccess && onSuccess()
      } else {
        // for android
      }
    } catch (error) {
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [
        error ?? '試玩失败',
      ])
      console.log(error)
    }
  }

  return { tryPlay }
}

export default useTryPlay
