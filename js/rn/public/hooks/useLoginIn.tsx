import { OCHelper } from "../define/OCHelper/OCHelper";
import { LoginModel } from "../network/Model/LoginModel";
import { IGlobalStateHelper } from "../../redux/store/IGlobalStateHelper";
import { pop, popToRoot } from "../navigation/RootNavigation";
import UGUserModel from "../../redux/model/全局/UGUserModel";

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
        const user = await OCHelper.call('UGUserModel.currentUser');
        if (user) {
            const sessid = await OCHelper.call('UGUserModel.currentUser.sessid');
            await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{ token: sessid }]);
            await OCHelper.call('UGUserModel.setCurrentUser:');
            await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
        }
        // 保存数据
        //@ts-ignore
        await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data.data)]);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [isRemember, 'isRememberPsd']);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [isRemember ? account : '', 'userName']);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [isRemember ? pwd : '', 'userPsw']);
        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
        await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
        IGlobalStateHelper.updateUserInfo()
        popToRoot();
    }
    return { loginSuccessHandle }
}
export default useLoginIn