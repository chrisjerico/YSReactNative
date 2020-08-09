import UGUserModel from "../../redux/model/全局/UGUserModel";
import { updateUserInfo } from "../../redux/store/IGlobalStateHelper";
import { OCHelper } from "../define/OCHelper/OCHelper";
import { popToRoot } from "../navigation/RootNavigation";
import APIRouter from "../network/APIRouter";
import { LoginModel } from "../network/Model/LoginModel";
import {Platform} from "react-native";
import {Toast} from "../tools/ToastUtils";
import {ANHelper, CMD, NA_DATA} from "../define/ANHelper/ANHelper";
import {ugError, ugLog} from "../tools/UgLog";

/**
 * data:API response
 */

interface UseLoginIn {
    onSuccess?: () => any;
    onError?: (error: any) => any;
}

const useLoginIn = (params: UseLoginIn = { onSuccess: popToRoot }) => {
    const { onSuccess, onError } = params
    const loginSuccessHandle = async (data: LoginModel, accountData: {
        isRemember: boolean,
        account: string,
        pwd: string
    }) => {
        // ugLog("accountData=%s, data=%s", accountData, JSON.stringify(data));
        const { account, pwd, isRemember } = accountData
        try {
            switch (Platform.OS) {
                case "ios":
                    const user = await OCHelper.call('UGUserModel.currentUser');
                    if (user) {
                        const sessid = await OCHelper.call('UGUserModel.currentUser.sessid');
                        await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }]);
                        await OCHelper.call('UGUserModel.setCurrentUser:');
                        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
                    }
                    // 保存数据
                    //@ts-ignore
                    await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data?.data)]);
                    await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [isRemember, 'isRememberPsd']);
                    await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [isRemember ? account : '', 'userName']);
                    await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [isRemember ? pwd : '', 'userPsw']);
                    await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
                    await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
                    const response = await APIRouter.user_info()
                    await OCHelper.call('UGUserModel.setCurrentUser:', [{ ...response.data.data, ...UGUserModel.getYS(data?.data) }]);
                    break;
                case "android":
                    await ANHelper.callAsync(CMD.SAVE_DATA,
                        {
                            key: NA_DATA.LOGIN_INFO,
                            ...accountData,
                            ...data?.data
                        });

                    const userInfo = await APIRouter.user_info();

                    await ANHelper.callAsync(CMD.SAVE_DATA,
                        {
                            key: NA_DATA.USER_INFO,
                            ...userInfo?.data?.data
                        })
                    break;

            }
            updateUserInfo()
            onSuccess && onSuccess();
        } catch (error) {
            ugError(error)
            onError && onError(error)
            debugger
        }

    }
    return { loginSuccessHandle }
}
export default useLoginIn
