import UGUserModel from "../../redux/model/全局/UGUserModel";
import { UGStore } from "../../redux/store/UGStore";
import { OCHelper } from "../define/OCHelper/OCHelper";
import { popToRoot } from "../navigation/RootNavigation";
import APIRouter from "../network/APIRouter";
import { LoginModel } from "../network/Model/LoginModel";

/**
 * data:API response
 */

interface UseLoginIn {
    onSuccess?: () => any;
    onError?: (error: any) => any;
}

interface Options {
    enableCleanOldUser: boolean;
    enableNativeNotification: boolean;
}

const useLoginIn = (params: UseLoginIn = { onSuccess: popToRoot }) => {
    const { onSuccess, onError } = params
    const loginSuccessHandle = async (data: LoginModel, accountData: {
        isRemember: boolean,
        account: string,
        pwd: string,
    }, options: Options = { enableCleanOldUser: true, enableNativeNotification: true }) => {
        const { account, pwd, isRemember } = accountData
        const { enableCleanOldUser, enableNativeNotification } = options
        try {
            const user = await OCHelper.call('UGUserModel.currentUser');
            if (enableCleanOldUser && user) {
                const sessid = await OCHelper.call('UGUserModel.currentUser.sessid');
                await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }]);
                await OCHelper.call('UGUserModel.setCurrentUser:');
                await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
                console.log("------CleanOldUser------")
            }
            // 保存数据
            //@ts-ignore
            await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data?.data)]);
            await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [isRemember, 'isRememberPsd']);
            await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [isRemember ? account : '', 'userName']);
            await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [isRemember ? pwd : '', 'userPsw']);
            enableNativeNotification && await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
            await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
            const { data: UserInfo, } = await APIRouter.user_info()
            await OCHelper.call('UGUserModel.setCurrentUser:', [{ ...UserInfo?.data, ...UGUserModel.getYS(data?.data) }]);
            UGStore.dispatch({ type: 'merge', userInfo: UserInfo?.data });
            UGStore.save();
            onSuccess && onSuccess();
        } catch (error) {
            onError && onError(error)
        }

    }
    return { loginSuccessHandle }
}
export default useLoginIn