import React from 'react'
import { View, Text, Platform, TouchableWithoutFeedback } from 'react-native'
import { useDimensions } from '@react-native-community/hooks'
import { useSafeArea } from 'react-native-safe-area-context'
import FastImage from 'react-native-fast-image'
import { useSelector } from 'react-redux'
import { IGlobalState, UGStore } from '../../../redux/store/UGStore'
import { getLanguageCode } from '../../../public/tools/getLanguageString'
import { push } from '../../../public/navigation/RootNavigation'
import { PageName } from '../../../public/navigation/Navigation'
import { OCHelper } from '../../../public/define/OCHelper/OCHelper'
import APIRouter from '../../../public/network/APIRouter'
import { ActionType } from '../../../redux/store/ActionTypes'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import { useLanguageContext } from '../../../public/context/LanguageContextProvider'
import PushHelper from '../../../public/define/PushHelper'
import { UGUserCenterType } from '../../../redux/model/全局/UGSysConfModel'
import { NSValue } from '../../../public/define/OCHelper/OCBridge/OCCall'
import AppDefine from '../../../public/define/AppDefine'

const Header = () => {
  const { width } = useDimensions().screen
  const { top } = useSafeArea()
  const { mobile_logo } = useSelector((state: IGlobalState) => state.SysConfReducer)
  const { uid = "" } = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const testPlay = async () => {
    try {
      const { data, status } = await APIRouter.user_guestLogin()
      if (Platform.OS == 'ios') {
        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationTryPlay']);
        //@ts-ignore
        await OCHelper.call('UGUserModel.setCurrentUser:', [UGUserModel.getYS(data.data)]);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setBool:forKey:', ['', 'isRememberPsd']);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userName']);
        await OCHelper.call('NSUserDefaults.standardUserDefaults.setObject:forKey:', ['', 'userPsw']);
        await OCHelper.call('NSNotificationCenter.defaultCenter.postNotificationName:object:', ['UGNotificationLoginComplete']);
        await OCHelper.call('UGNavigationController.current.popToRootViewControllerAnimated:', [true]);
        const { data: userInfo } = await APIRouter.user_info()
        UGStore.dispatch({ type: ActionType.UpdateUserInfo, props: userInfo?.data });
        UGStore.save();
        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
      }
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <View style={{ width, height: 45 }}>
      <View style={{ height: top, width }}></View>
      {uid != "" ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10 }}>
        <FastImage resizeMode={"contain"} style={{ width: 130, height: 36, marginLeft: 30 }} source={{ uri: mobile_logo }} />
        <View style={{ borderColor: 'rgba(100,111,149,0.5)', paddingVertical: 7, borderRadius: 4, flexDirection: 'row', paddingHorizontal: 7, position: 'absolute', right: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
            <TouchableWithoutFeedback onPress={() => {
              PushHelper.pushUserCenterType(UGUserCenterType.站内信)
            }}>
              <FastImage resizeMode={'contain'} style={{ width: 33, height: 33 }} source={{ uri: "http://test24.6yc.com/images/icon-message-24.png" }} />
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={() => {
              OCHelper.call('UGYYRightMenuView.alloc.initWithFrame:[setTitleType:].show', [NSValue.CGRectMake(AppDefine.width / 2, 0, AppDefine.width / 2, AppDefine.height), "1"]);
            }}>
              <FastImage resizeMode={'contain'} style={{ width: 33, height: 33 }} source={{ uri: "http://test24.6yc.com/views/mobileTemplate/26/images/menu24.png" }} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View> : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', paddingHorizontal: 10 }}>

          <FastImage resizeMode={"contain"} style={{ width: 130, height: 36, marginLeft: 30 }} source={{ uri: mobile_logo }} />
          <View style={{ borderWidth: 1, borderColor: 'rgba(100,111,149,0.5)', paddingVertical: 7, borderRadius: 4, flexDirection: 'row', paddingHorizontal: 7, position: 'absolute', right: 10 }}>
            <Text onPress={() => {
              push(PageName.VietnamLogin)
            }} style={{ color: "#646f95" }}>登录<Text>/</Text></Text>
            <Text onPress={() => {
              push(PageName.VietnamRegister)
            }} style={{ color: "#646f95" }}>注册<Text>/</Text></Text>
            <Text onPress={testPlay} style={{ color: "#646f95" }}>试玩</Text>
          </View>
        </View>}

    </View>
  )
}
export default Header