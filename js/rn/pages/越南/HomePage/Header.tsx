import React from 'react'
import { View, Text, Platform } from 'react-native'
import { useDimensions } from '@react-native-community/hooks'
import { useSafeArea } from 'react-native-safe-area-context'
import FastImage from 'react-native-fast-image'
import { IGlobalState, UGStore } from '../../../redux/store/UGStore'
import { getLanguageCode } from '../../../public/tools/getLanguageString'
import { push } from '../../../public/navigation/RootNavigation'
import { PageName } from '../../../public/navigation/Navigation'
import { OCHelper } from '../../../public/define/OCHelper/OCHelper'
import APIRouter from '../../../public/network/APIRouter'
import UGUserModel from '../../../redux/model/全局/UGUserModel'
import { useLanguageContext } from '../../../public/context/LanguageContextProvider'

const Header = () => {
  const { width } = useDimensions().screen
  const { top } = useSafeArea()
  const { mobile_logo } = UGStore.globalProps.sysConf;
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
        UGStore.dispatch({ type: 'merge', userInfo: userInfo?.data });
        UGStore.save();
        OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['登录成功！']);
      }
    } catch (error) {
      console.log(error)
    }
  }
  const { currcentLanguagePackage } = useLanguageContext()
  return (
    <View style={{ width, height: 46 }}>
      <View style={{ height: top, width }}></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 10 }}>
        <View>
        </View>
        <FastImage resizeMode={"contain"} style={{ width: 130, height: 36 }} source={{ uri: mobile_logo }} />
        <View style={{ borderWidth: 1, borderColor: 'rgba(100,111,149,0.5)', paddingVertical: 7, borderRadius: 4, flexDirection: 'row', paddingHorizontal: 7, position: 'absolute', right: 10 }}>
          <Text onPress={() => {
            push(PageName.VietnamLogin)
          }} style={{ color: "#646f95" }}>{currcentLanguagePackage?.["app.log.in"]}/</Text>
          <Text onPress={() => {
            push(PageName.VietnamRegister)
          }} style={{ color: "#646f95" }}>{currcentLanguagePackage?.["app.registered"]}/</Text>
          <Text onPress={testPlay} style={{ color: "#646f95" }}>{currcentLanguagePackage?.["app.demo1"]}</Text>
        </View>
      </View>
    </View>
  )
}
export default Header