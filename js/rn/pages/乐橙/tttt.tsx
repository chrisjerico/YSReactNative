import md5 from "blueimp-md5";
import {OCHelper} from "../../public/define/OCHelper/OCHelper";
import APIRouter from "../../public/network/APIRouter";
import {UGStore} from "../../redux/store/UGStore";
import UGUserModel from "../../redux/model/全局/UGUserModel";
import {navigate, popToRoot} from "../../public/navigation/RootNavigation";
import {PageName} from "../../public/navigation/Navigation";
import {EventRegister} from "react-native-event-listeners";
import {Alert} from "react-native";

const onSubmit = async () => {
    try {
        const password = md5(pwd)
        OCHelper.call('SVProgressHUD.showWithStatus:', ['正在注册...']);

        // if (requestData.slideCode) {
        //     console.log(requestData.slideCode)
        //     requestData.smsCode = ""
        //     requestData.imgCode = ""
        //     requestData["slideCode[nc_sid]"] = requestData.slideCode["nc_csessionid"]
        //     requestData["slideCode[nc_token]"] = requestData.slideCode["nc_token"]
        //     requestData["slideCode[nc_sig]"] = requestData.slideCode["nc_sig"]
        //     delete requestData.slideCode
        // }

        const {data, status} =
            await APIRouter.user_reg({
                usr: acc,
                pwd: password,
                regType: regType,
            })
        debugger
        if (data?.data == null)
            throw {message: data?.msg}
        if (data?.data?.autoLogin) {
            const user = await OCHelper.call('UGUserModel.currentUser');

            OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["注册成功"]);
            const {data: loginData, status} = await APIRouter.user_login(data.data.usr, password)
            if (user) {
                console.log('退出旧账号');
                console.log(user);
                const sessid = await OCHelper.call('UGUserModel.currentUser.sessid');
                await OCHelper.call('CMNetwork.userLogoutWithParams:completion:', [{token: sessid}]);
                await OCHelper.call('UGUserModel.setCurrentUser:');
                await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationUserLogout']);
                UGStore.dispatch({type: 'reset'})
            }
            await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(loginData?.data)]);
            await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', [true, 'isRememberPsd']);
            await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [acc, 'userName']);
            await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', [pwd, 'userPsw']);
            await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
            await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
            const {data: UserInfo,} = await APIRouter.user_info()
            await OCHelper.call('UGUserModel.setCurrentUser:', [{...UserInfo.data, ...UGUserModel.getYS(loginData?.data)}]);
            UGStore.dispatch({type: 'merge', props: UserInfo?.data});

            UGStore.save();
            OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ["登录成功"]);
            popToRoot();
        }
        if (data?.data?.autoLogin == false) {
            OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [data.msg ?? ""]);
            popToRoot();
            navigate(PageName.LLLoginPage, {usr: acc, pwd: pwd})
        }
    } catch (error) {
        EventRegister.emit('reload')
        if (error.message.includes("推荐人")) {
            Alert.alert(error?.message, "")
            OCHelper.call('SVProgressHUD.showErrorWithStatus:', [""]);
        } else {
            OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '注册失败']);
        }

    }
}
