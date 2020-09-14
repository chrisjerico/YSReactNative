import { Platform } from 'react-native'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { updateUserInfo } from '../../redux/store/IGlobalStateHelper'
import { OCHelper } from '../define/OCHelper/OCHelper'
import APIRouter from '../network/APIRouter'
import {Toast} from "../tools/ToastUtils";
import {ANHelper} from "../define/ANHelper/ANHelper";
import {CMD} from "../define/ANHelper/hp/CmdDefine";
import {NA_DATA} from "../define/ANHelper/hp/DataDefine";

interface UseTryPlay {
  onSuccess?: () => any;
  onError?: (error: any) => any;
}

const useTryPlay = (params?: UseTryPlay) => {
  const { onSuccess, onError } = params
  const tryPlay = async () => {
    try {
      switch (Platform.OS) {
        case 'ios':
          OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...'])
          break;
        case 'android':
          Toast('正在登录...')
          break;
      }

      const { data } = await APIRouter.user_guestLogin()
      switch (Platform.OS) {
        case 'ios':
          // await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
          //@ts-ignore
          await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data?.data)]);
          await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd']);
          await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName']);
          await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw']);
          await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
          await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
          break;
        case 'android':
          await ANHelper.callAsync(CMD.SAVE_DATA,
            {
              key: NA_DATA.LOGIN_INFO,
              ...data?.data
            });
          break;
      }
      await updateUserInfo()
      onSuccess && onSuccess()
    } catch (error) {
      console.log(error)
      onError && onError(error)
    }
  }

  return { tryPlay }
}

export default useTryPlay
