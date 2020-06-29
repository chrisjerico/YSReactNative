import { OCHelper } from "../define/OCHelper/OCHelper";
import { LoginModel } from "../network/Model/LoginModel";
import { IGlobalStateHelper, updateUserInfo } from "../../redux/store/IGlobalStateHelper";
import { pop, popToRoot } from "../navigation/RootNavigation";
import UGUserModel from "../../redux/model/全局/UGUserModel";
import APIRouter from "../network/APIRouter";

/**
 * data:API response
 */
const useLoginIn = () => {
    const loginSuccessHandle = async (data: LoginModel, accountData: {
        isRemember: boolean,
        account: string,
        pwd: string
    }) => {
        const { account, pwd, isRemember } = accountData
        try {

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
            updateUserInfo()
            popToRoot();
        } catch (error) {
            console.log(error)
            debugger
        }

    }
    return { loginSuccessHandle }
}
export default useLoginIn