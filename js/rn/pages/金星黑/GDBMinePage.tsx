import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, StyleSheet, Dimensions, Alert, ImageBackground, Platform } from "react-native"
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'
import FastImage, { FastImageProperties } from "react-native-fast-image"
import { colorEnum, } from "./enum/colorEnum"
import LinearGradient from "react-native-linear-gradient"
import PushHelper from "../../public/define/PushHelper"
import { MarqueeHorizontal } from 'react-native-marquee-ab';
import { UGUserCenterType } from "../../redux/model/全局/UGSysConfModel"
import { PageName } from '../../public/navigation/Navigation';
import { useSelector, useDispatch } from "react-redux"
import { IGlobalState, UGStore } from "../../redux/store/UGStore";
import APIRouter from '../../public/network/APIRouter';
import { BannerModel, } from "../../public/network/Model/BannerModel"
import { Icon, Button } from 'react-native-elements';
import { httpClient } from "../../public/network/httpClient"
import Carousel from 'react-native-banner-carousel';
import usePopUpView from "../../public/hooks/usePopUpView"
import { ActionType } from "../../redux/store/ActionTypes"
import UGUserModel from "../../redux/model/全局/UGUserModel"
import { push, navigate } from "../../public/navigation/RootNavigation"
import AppDefine from "../../public/define/AppDefine"
import useGetHomeInfo from "../../public/hooks/useGetHomeInfo"
import { useDimensions } from '@react-native-community/hooks'
import useAutoRenewUserInfo from "../../public/hooks/useAutoReNewUserInfo"
import { RedBagDetailActivityModel } from "../../public/network/Model/RedBagDetailActivityModel"
import { TurntableListModel } from "../../public/network/Model/TurntableListModel"
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { List } from "../../public/network/Model/HomeGamesModel"
import { OCHelper } from "../../public/define/OCHelper/OCHelper"
import useMemberItems from "../../public/hooks/useMemberItems"
const GDBMinePage = ({ navigation }) => {
  const { width, height } = useDimensions().window
  const { onPopViewPress } = usePopUpView()
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { uid = "" } = userStore
  const systemStore = useSelector((state: IGlobalState) => state.SysConfReducer)

  const { banner, notice, homeGames, couponListData, rankList, redBag, floatAds, onlineNum, loading, } = useGetHomeInfo()
  const [originalNoticeString, setOriginalNoticeString] = useState<string>()
  const [noticeFormat, setnoticeFormat] = useState<{ label: string, value: string }[]>()
  const { top } = useSafeArea()
  useEffect(() => {
    let string = ""
    const noticeData = notice?.data?.scroll?.map((res) => {
      string += res.content
      return { label: res.id, value: res.title }
    }) ?? []
    setnoticeFormat(noticeData)
    setOriginalNoticeString(string)
  }, [notice])

  const [] = useAutoRenewUserInfo(navigation)
  return (
    <FastImage source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/bg-black.png" }} style={{ width: width, height: height, }}>
      <ScrollView style={{ flex: 1, paddingHorizontal: 10, paddingTop: top }}>
        <View style={{ flexDirection: 'row', marginBottom: 20, alignItems: 'center' }}>
          <FastImage style={{ width: 96, height: 96, borderRadius: 48 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/2/images/money-2.png" }} />
          <View style={{ flexDirection: 'column', marginLeft: 10 }}>
            <Text style={{ color: "#a0a0a0", fontSize: 16, marginBottom: 10 }}>{userStore.curLevelTitle}</Text>
            <Text style={{ color: "#cfa461" }}>{userStore.curLevelGrade}</Text>
          </View>
          <TouchableOpacity style={{ position: 'absolute', right: 10 }} onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.每日签到)
          }}>
            <Image source={{ uri: "dailysign" }} style={{ height: 18, aspectRatio: 150 / 39 }} />
          </TouchableOpacity>
        </View>
        <AcctountDetail />
        <View style={{ height: 50 }}></View>
      </ScrollView>
    </FastImage>
  )
}
const AcctountDetail = () => {
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { uid = "", balance = 0 } = userStore
  const dispatch = useDispatch()
  const updateUserInfo = useCallback(
    (props: UGUserModel) => dispatch({ type: ActionType.UpdateUserInfo, props: props }),
    [dispatch]
  )
  const [hideAmount, setHideAmount] = useState(false)
  const requestBalance = async () => {
    try {
      //@ts-ignore
      const { data, status } = await APIRouter.user_balance_token()
      updateUserInfo({ ...userStore, balance: data.data.balance })
    } catch (error) {

    }
  }
  const testPlay = async () => {
    try {
      OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
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
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '登入失败']);
      console.log(error)
    }
  }
  const getHideAmount = () => {
    let str = ""
    for (let index = 0; index < userStore.balance.length; index++) {
      const element = userStore.balance[index];
      str += "*"
    }
    return str
  }
  const { width } = useDimensions().screen
  const { UGUserCenterItem } = useMemberItems()
  return (
    <View style={{ width: "100%", backgroundColor: "#242424", borderRadius: 8 }}>
      <View style={{ backgroundColor: "#242424", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: 20, paddingVertical: 10 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text style={{ fontSize: 18, color: "#676767" }}>账户余额</Text>
          <TouchableOpacity onPress={() => {
            setHideAmount(hideAmount => !hideAmount)
          }}>
            <Icon name={hideAmount ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={"rgba(255, 255, 255, 0.3)"} containerStyle={{ marginLeft: 15, marginRight: 4 }} />
          </TouchableOpacity>
        </View>

        <Text style={{ fontSize: 40, color: "#cfa461" }}>{hideAmount ? getHideAmount() : userStore.balance}</Text>
      </View>
      <View style={{ height: 38, backgroundColor: "#2a2a2a", paddingLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.存款)
        }}>
          <FastImage style={{ width: 22, height: 22 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/chong%20Zhi.png" }} />
          <Text style={{ color: '#cfa461', fontSize: 12, marginLeft: 3 }}>充值</Text>
        </TouchableOpacity>
        <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center' }} onPress={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.取款)
        }}>
          <FastImage style={{ width: 22, height: 22 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/tiSian.png" }} />
          <Text style={{ color: '#a0a0a0', fontSize: 12, marginLeft: 3 }}>提现</Text>
        </TouchableOpacity>

      </View>
      <FlatList numColumns={3} renderItem={({ item }) => {
        return <TouchableOpacity style={{ width: (width - 20) / 3, justifyContent: 'center', alignItems: 'center', marginBottom: 20, marginTop: 30 }}>
          <FastImage source={{ uri: item.logo }} style={{ width: 45, height: 45 }} />
          <Text style={{ color: '#a0a0a0', marginTop: 5 }}>{item.name}</Text>
        </TouchableOpacity>
      }} data={UGUserCenterItem} style={{ flex: 1 }} />
    </View>
  )
}
const FastImageAutoHeight = (props: FastImageProperties) => {
  const [picHeight, setPicHeight] = useState(100)
  const { cardMargin, marginHorizontal } = usePopUpView()
  return (
    <FastImage {...props} style={[props.style, { height: picHeight }]} onLoad={(e) => {
      setPicHeight(((AppDefine.width - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height)
    }} />
  )
}
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    marginRight: 5,
  }
})
export default GDBMinePage