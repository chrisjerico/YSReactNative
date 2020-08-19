import React from 'react'
import { View, Text, TouchableWithoutFeedback, Platform } from 'react-native'
import { useDimensions } from '@react-native-community/hooks'
import LinearGradient from 'react-native-linear-gradient'
import { push } from '../../../public/navigation/RootNavigation'
import { PageName } from '../../../public/navigation/Navigation'
import APIRouter from '../../../public/network/APIRouter'
import { OCHelper } from '../../../public/define/OCHelper/OCHelper'
import { UGStore } from '../../../redux/store/UGStore'
import { ActionType } from '../../../redux/store/ActionTypes'
import {hideLoading, showLoading, UGLoadingType} from "../../../public/widget/UGLoadingCP";
import {ANHelper, CMD, NA_DATA} from "../../../public/define/ANHelper/ANHelper";
import {Toast} from "../../../public/tools/ToastUtils";
const Account = () => {
  const { width } = useDimensions().screen
  const testPlay = async () => {
    try {

      showLoading({ type: UGLoadingType.Loading });

      const { data, status } = await APIRouter.user_guestLogin()

      switch (Platform.OS) {
        case 'ios':
          await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
          //@ts-ignore
          await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data.data)]);
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
      const { data: userInfo } = await APIRouter.user_info()

      switch (Platform.OS) {
        case "ios":
          //TODO
          break;
        case "android":
          await ANHelper.callAsync(CMD.SAVE_DATA,
            {
              key: NA_DATA.USER_INFO,
              ...userInfo?.data
            })
          break;
      }

      UGStore.dispatch({ type: 'merge', userInfo: userInfo?.data });
      UGStore.save();

      Toast('登录成功！')
      // OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);

    } catch (error) {
      console.log(error)
    }

    hideLoading()
  }
  return (
    <View style={{ width: width - 20, alignSelf: 'center', height: 68, paddingBottom: 5, flexDirection: 'row', marginTop: 5 }}>
      <TouchableWithoutFeedback onPress={() => {
        push(PageName.KSLogin)
      }}>
        <View style={{ flex: 1, backgroundColor: "#3a3a41", borderRadius: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: "white" }}>登录</Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {
        push(PageName.KSRegister)
      }}>
        <LinearGradient colors={["#eb5d4d", "#fb7a24"]} style={{ flex: 1, borderRadius: 5, marginRight: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: "white" }}>注册</Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={testPlay}>
        <LinearGradient colors={["#eb5d4d", "#fb2464"]} style={{ flex: 1, borderRadius: 5, justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, color: "white" }}>试玩</Text>
        </LinearGradient>
      </TouchableWithoutFeedback>
    </View>
  )
}
export default Account
