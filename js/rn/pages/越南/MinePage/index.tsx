import {View, TouchableOpacity, Text, ScrollView, FlatList, Image, Platform} from "react-native"
import React, { useCallback, useEffect } from 'react'
import { useSafeArea } from "react-native-safe-area-context"
import FastImage from "react-native-fast-image"
import { Icon } from "react-native-elements"
import LinearGradient from "react-native-linear-gradient"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { useDimensions } from "@react-native-community/hooks"
import { IGlobalState, UGStore } from "../../../redux/store/UGStore"
import { ActionType } from "../../../redux/store/ActionTypes"
import UGUserModel from "../../../redux/model/全局/UGUserModel"
import useLoginOut from "../../../public/hooks/useLoginOut"
import useMemberItems from "../../../public/hooks/useMemberItems"
import { PageName } from "../../../public/navigation/Navigation"
import { OCHelper } from "../../../public/define/OCHelper/OCHelper"
import APIRouter from "../../../public/network/APIRouter"
import PushHelper from "../../../public/define/PushHelper"
import { UGUserCenterType } from "../../../redux/model/全局/UGSysConfModel"
import { useLanguageContext } from "../../../public/context/LanguageContextProvider"
import { pop } from "../../../public/navigation/RootNavigation"
const MinePage = ({ navigation }) => {
  const userStore = UGStore.globalProps.userInfo;
  const { width, } = useDimensions().window
  const { uid = "", curLevelTitle, usr, balance, unreadMsg } = userStore
  const { loginOut } = useLoginOut(PageName.ZLHomePage)
  const { UGUserCenterItem } = useMemberItems()
  const requestBalance = async () => {
    try {
      OCHelper.call('SVProgressHUD.showWithStatus:', ['正在刷新金额...']);
      const { data, status } = await APIRouter.user_balance_token()
      UGStore.dispatch({ type: 'merge', userInfo: { balance: data.data.balance } });
      OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['刷新成功！']);
    } catch (error) {
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '刷新失败请稍后再试']);
      console.log(error)
    }
  }
  useEffect(() => {

    navigation.addListener('focus', async () => {
      const { data: userInfo } = await APIRouter.user_info()
      UGStore.dispatch({ type:'merge', userInfo: userInfo?.data });
      UGStore.save();
    });
    return (() => {
      navigation.removeListener('focus', null);
    })
  }, [])
  return <View style={{ flex: 1, backgroundColor: 'white' }}>
    <Header />
    <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <View style={{
        width: width - 24, marginBottom: 10, backgroundColor: 'white',
        alignSelf: 'center', borderRadius: 8, shadowColor: "#444",
        minHeight: 130,
        shadowOpacity: 0.2,
        shadowRadius: 2,
        paddingVertical: 7,
        shadowOffset: {
          height: 0,
          width: 0,
        },
        marginTop: 10
      }}>
        <View style={{ flex: 1, flexDirection: 'row', paddingHorizontal: 33, borderBottomColor: "#f2f2f2", borderBottomWidth: 1, alignItems: 'flex-end', paddingBottom: 10 }}>
          <FastImage style={{ width: 63, height: 63, borderRadius: 63 / 2, marginRight: 11 }} source={{ uri: "http://test24.6yc.com/views/mobileTemplate/2/images/money-2.png" }} />
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ fontWeight: "bold", fontSize: 21 }}>龘{usr}</Text>
            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={{ width: 52, height: 27, justifyContent: 'center', alignItems: 'center' }} colors={['#d5b69d', '#eddbcd']}>
              <Text style={{ fontSize: 16, color: 'white' }}>{curLevelTitle}</Text>
            </LinearGradient>
          </View>

        </View>
        <View style={{ flex: 1, paddingHorizontal: 6, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ color: "#8e8e93", marginTop: 10 }}>余额（元）</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
              <Text style={{ fontSize: 14, color: '#fb9802', marginRight: 3, fontWeight: "bold" }}> {parseFloat(balance).toFixed(2)}</Text>
              <TouchableWithoutFeedback onPress={requestBalance}>
                <Icon name="refresh" type="materialIcon" color="#8c9ba7" size={24} />
              </TouchableWithoutFeedback>
            </View>
          </View>
          <View style={{ height: "80%", backgroundColor: "#f2f2f2", width: 1, marginRight: 10 }}></View>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <Text style={{ color: "#8e8e93", marginTop: 10 }}>積分</Text>
          </View>
        </View>
      </View>
      <View style={{
        width: width - 24, marginBottom: 10, backgroundColor: 'white',
        alignSelf: 'center', borderRadius: 8, shadowColor: "#444",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        paddingVertical: 10,
        shadowOffset: {
          height: 0,
          width: 0,
        },
      }}>
        <View style={{ flex: 1, flexDirection: 'row', marginVertical: 10 }} >
          <TouchableOpacity onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.利息宝)
          }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test24.6yc.com/views/mobileTemplate/26/images/tgzq.png" }} />
            <Text style={{ color: '#333333', fontSize: 14, marginTop: 3, }}>掙錢</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.存款)
          }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test24.6yc.com/views/mobileTemplate/26/images/cqk.png" }} />
            <Text style={{ color: '#333333', fontSize: 14, marginTop: 3, }}>存款</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={loginOut} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test24.6yc.com/views/mobileTemplate/26/images/tx.png" }} />
            <Text style={{ color: '#333333', fontSize: 14, marginTop: 3, }}>退出登录</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.银行卡管理)
          }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test24.6yc.com/views/mobileTemplate/26/images/yhk.png" }} />
            <Text style={{ color: '#333333', fontSize: 14, marginTop: 3, }}>銀行卡</Text>
          </TouchableOpacity>
        </View>
      </View>
      {/* <View style={{
        width: width - 24, marginBottom: 10, backgroundColor: 'white',
        alignSelf: 'center', borderRadius: 8, shadowColor: "#444",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        paddingVertical: 10,
        shadowOffset: {
          height: 0,
          width: 0,
        },
        marginTop: 10,
        paddingHorizontal: 10
      }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 15, color: '#333333', }}>我的晋级之路</Text>
          <Text style={{ fontSize: 12, color: '#bfb9b9', marginRight: 10 }}> 每周一进行星级更新</Text>
        </View>
        <View style={{ height: 1, width: "95%", backgroundColor: "#444", alignSelf: 'center', marginVertical: 10 }}></View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
          <Text style={{ color: '#333333', fontSize: 14 }}>{usr}  <Text style={{ fontSize: 12 }}>{curLevelTitle}</Text></Text>
          <TouchableOpacity onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.任务中心)
          }}>
            <Image source={{ uri: "missionhall" }} style={{ height: 18, aspectRatio: 150 / 39 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 5 }}>
          <Text style={{ color: '#333333', fontSize: 14, marginBottom: 5 }}>利息宝:  <Text style={{ fontSize: 12 }}>{userStore.balance}</Text></Text>
          <TouchableOpacity onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.每日签到)
          }}>
            <Image source={{ uri: "dailysign" }} style={{ height: 18, aspectRatio: 150 / 39 }} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <Text style={{ color: '#333333', fontSize: 14 }}>{userStore.taskRewardTitle}:  <Text style={{ fontSize: 12 }}>{userStore.taskRewardTotal}</Text></Text>
          <FastImage source={{ uri: "http://test10.6yc.com/images/centerRwdt.svg" }} style={{ width: 124, height: 36 }} />
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <Text style={{ color: '#333333', fontSize: 14 }}>成长值:</Text>
          <View style={{ flexDirection: 'column' }}>
            <Text style={{ textAlign: 'right', marginRight: 20, color: '#333333', marginBottom: 3, fontSize: 12, fontWeight: "400" }}>距离下一级还差{(parseInt(userStore.nextLevelInt) - parseInt(userStore.curLevelInt)).toFixed(2)}分</Text>
            <View style={{ backgroundColor: '#2c2e36', height: 13, width: width * 0.7, borderRadius: 8, marginHorizontal: 10 }}>
              <View style={{ height: "100%", width: userStore?.curLevelInt && userStore?.nextLevelInt ? isNaN(width * 0.7 * (parseInt(userStore?.curLevelInt) / parseInt(userStore?.nextLevelInt))) ? 0 : (width * 0.7 * (parseInt(userStore?.curLevelInt) / parseInt(userStore?.nextLevelInt))) : 0 }}></View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginTop: 4 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <FastImage style={{ width: 18, aspectRatio: 1 }} source={{ uri: "http://test10.6yc.com/images/vip.png" }} />
                <Text style={{ color: '#333333' }}>{userStore.curLevelTitle}</Text>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                <FastImage style={{ width: 18, aspectRatio: 1 }} source={{ uri: "http://test10.6yc.com/images/vip.png" }} />
                <Text style={{ color: '#333333' }}>{userStore.nextLevelTitle}</Text>
              </View>
            </View>

          </View>
        </View>

      </View> */}
      <FlatList style={{ overflow: "visible", width: width - 24, alignSelf: 'center', }} contentContainerStyle={{
        marginBottom: 100, backgroundColor: 'white',
        alignSelf: 'center', borderRadius: 8, shadowColor: "#444",
        shadowOpacity: 0.2,
        shadowRadius: 2,
        shadowOffset: {
          height: 0,
          width: 0,
        },
        paddingHorizontal: 10,
        paddingLeft: 13,
        width: width - 24,
      }} renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => {
            PushHelper.pushUserCenterType(item.code)
          }} style={{ height: 51, borderBottomWidth: 1, borderBottomColor: "#f2f2f2" }}>
            <View style={{ alignItems: 'center', flexDirection: 'row', height: 51, }} >
              <FastImage resizeMode={'contain'} style={{ width: 22 * 1.2, height: 17.5 * 1.2, tintColor: 'white', overflow: "visible", marginRight: 18 }} source={{ uri: item.logo }} >
                {item.code == 9 && unreadMsg > 0 ? <View style={{
                  position: 'absolute', right: 0, top: 0, backgroundColor: 'red',
                  height: 10, width: 10,
                  borderRadius: 5, justifyContent: 'center', alignItems: 'center'
                }}>
                  <Text style={{ color: 'white', fontSize: 10 }}>{unreadMsg}</Text>
                </View> : null}
              </FastImage>
              <Text style={{ color: '#47535b' }}>{item.name}</Text>
            </View>
          </TouchableOpacity>
        )
      }} data={UGUserCenterItem} />
    </ScrollView>
  </View>
}
const Header = () => {
  const { top } = useSafeArea()
  return (
    <View>
      <View style={{ height: top }}></View>
      <View style={{ height: 45, backgroundColor: "white", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
        <TouchableOpacity style={{ position: 'absolute', left: 15 }} onPress={() => {
          pop();
          switch (Platform.OS) {
            case 'ios':
              OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
              break;
            case 'android':

              break;
          }
        }}>
          <Icon name='ios-arrow-back' type="ionicon" color="rgba(142, 142, 147,1)" size={30} />
        </TouchableOpacity >
        <Text style={{ color: 'black', fontSize: 20, fontWeight: "bold" }}>我的页</Text>
      </View>
    </View>
  )
}

export default MinePage
