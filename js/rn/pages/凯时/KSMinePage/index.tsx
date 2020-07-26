import { View, TouchableOpacity, Text, ScrollView, FlatList, Image } from "react-native"
import React, { useCallback, useEffect, useState } from 'react'
import { useSafeArea } from "react-native-safe-area-context"
import { useSelector, useDispatch } from "react-redux"
import FastImage from "react-native-fast-image"
import { Icon } from "react-native-elements"
import LinearGradient from "react-native-linear-gradient"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import { useDimensions } from "@react-native-community/hooks"
import { IGlobalState, UGStore } from "../../../redux/store/UGStore"
import UGUserModel from "../../../redux/model/全局/UGUserModel"
import { ActionType } from "../../../redux/store/ActionTypes"
import { YueBaoStatModel } from "../../../public/network/Model/YueBaoStatModel"
import { PageName } from "../../../public/navigation/Navigation"
import useLoginOut from "../../../public/hooks/useLoginOut"
import useMemberItems from "../../../public/hooks/useMemberItems"
import { OCHelper } from "../../../public/define/OCHelper/OCHelper"
import APIRouter from "../../../public/network/APIRouter"
import { UGUserCenterType } from "../../../redux/model/全局/UGSysConfModel"
import PushHelper from "../../../public/define/PushHelper"
import { pop } from "../../../public/navigation/RootNavigation"
const KSMine = ({ navigation }) => {
  const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
  const { width, } = useDimensions().window
  const { uid = "", curLevelTitle, usr, balance, unreadMsg } = userStore
  const dispatch = useDispatch()
  const updateUserInfo = useCallback(
    (props: UGUserModel) => dispatch({ type: ActionType.UpdateUserInfo, props: props }),
    [dispatch]
  )
  const [infoModel, setInfoModel] = useState<YueBaoStatModel>()
  const { loginOut } = useLoginOut(PageName.KSHomePage)
  const { UGUserCenterItem } = useMemberItems()
  const requestBalance = async () => {
    try {
      OCHelper.call('SVProgressHUD.showWithStatus:', ['正在刷新金额...']);
      const { data, status } = await APIRouter.user_balance_token()
      updateUserInfo({ ...userStore, balance: data.data.balance })
      OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['刷新成功！']);
    } catch (error) {
      OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '刷新失败请稍后再试']);
      console.log(error)
    }
  }
  const init = async () => {
    try {
      const { data, status } = await APIRouter.yuebao_stat()
      setInfoModel(data)
    } catch (error) {

    }
  }
  useEffect(() => {
    init()
  }, [userStore?.uid])
  useEffect(() => {

    navigation.addListener('focus', async () => {
      const { data: userInfo } = await APIRouter.user_info()
      UGStore.dispatch({ type: ActionType.UpdateUserInfo, props: userInfo?.data });
      UGStore.save();
    });
    return (() => {
      navigation.removeListener('focus', null);
    })
  }, [])
  return <View style={{ flex: 1, backgroundColor: 'black' }}>
    <Header />
    <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
      <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} colors={["#eb5d4d", "#fb2464"]} style={{ width: "100%", backgroundColor: "#2c2e36", borderRadius: 8, overflow: "hidden", flexDirection: 'column', marginBottom: 10, paddingBottom: 20 }}>
        <View>
          <Text style={{ fontSize: 22, color: 'white', marginTop: 10, marginLeft: 10, marginRight: 20 }}>{usr}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 10, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row' }}>
              <FastImage style={{ width: 26, height: 26 }} source={{ uri: "http://test60f.fhptcdn.com/views/mobileTemplate/22/images/touxiang.png" }} />
              <Text style={{ marginLeft: 10, color: 'white', fontSize: 15 }}>{userStore.curLevelGrade}</Text>
            </View>
            <View style={{ flexDirection: 'column' }}>
              <TouchableOpacity style={{ marginBottom: 10 }} onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.任务中心)
              }}>
                <Image source={{ uri: "missionhall" }} style={{ height: 18, aspectRatio: 150 / 39 }} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.每日签到)
              }}>
                <Image source={{ uri: "dailysign" }} style={{ height: 18, aspectRatio: 150 / 39 }} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View style={{ flexDirection: 'row', marginTop: 30 }}>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.个人信息)
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon type={'font-awesome'} name={"address-card-o"} size={15} color={'white'} />
              <Text style={{ color: 'white', marginLeft: 5 }}>实名认证</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.安全中心)
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon type={'font-awesome'} name={"check-square-o"} size={15} color={'white'} />

              <Text style={{ color: 'white', marginLeft: 5 }}>账户安全</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.银行卡管理)
          }}>
            <View style={{ flexDirection: 'row' }}>
              <Icon type={'font-awesome'} name={"credit-card"} size={15} color={'white'} />

              <Text style={{ color: 'white', marginLeft: 5 }}>银行卡管理</Text>
            </View>


          </TouchableOpacity>
        </View>
      </LinearGradient>
      <LinearGradient colors={["#3a3a41"]} start={{ x: 0.5, y: 0.6 }} style={{ height: 80, width: "100%", backgroundColor: "#2c2e36", borderRadius: 8, overflow: "hidden", paddingVertical: 15 }}>
        <View style={{ flex: 1, flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', marginHorizontal: 10, }}>
          <Text style={{ fontSize: 16, color: 'white', fontWeight: "bold", marginBottom: 10 }}>总资产</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage style={{ width: 25, aspectRatio: 1 }} source={{ uri: "http://test60f.fhptcdn.com/views/mobileTemplate/22/images/yuanIcon.png" }} />
            <Text style={{ fontSize: 22, color: 'white', marginRight: 20, marginLeft: 10 }}> {balance}</Text>
            <TouchableWithoutFeedback onPress={requestBalance}>
              <Icon name="refresh" type="materialIcon" color="#8c9ba7" size={24} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </LinearGradient>
      <View style={{ flex: 1, flexDirection: 'row', marginTop: 15, marginBottom: 10 }} >
        <TouchableOpacity onPress={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.存款)
        }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', marginRight: 10 }}>
          <LinearGradient style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', height: 62, borderRadius: 8 }} colors={['#eb5d4d', "#fb7a24"]}>
            <FastImage style={{ width: 27, height: 20 }} resizeMode={'contain'} source={{ uri: "http://test60f.fhptcdn.com/views/mobileTemplate/22/images/depositlogo.png" }} />
            <Text style={{ color: 'white', fontSize: 14 }}> 存款</Text>
          </LinearGradient>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.额度转换)
        }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: "#3a3a41", marginRight: 10, borderRadius: 8 }}>
          <FastImage style={{ width: 20, height: 20 }} source={{ uri: "http://test60f.fhptcdn.com/views/mobileTemplate/22/images/xima.png" }} />
          <Text style={{ color: 'white', fontSize: 14 }}> 额度转换</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.取款)
        }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row', backgroundColor: "#3a3a41", borderRadius: 8 }}>
          <FastImage style={{ width: 27, height: 20 }} source={{ uri: "http://test60f.fhptcdn.com/views/mobileTemplate/22/images/withdrawlogo.png", }} />
          <Text style={{ color: 'white', fontSize: 14 }}> 取款</Text>
        </TouchableOpacity>
      </View>

      <FlatList columnWrapperStyle={{ paddingVertical: 10 }} numColumns={3} style={{ backgroundColor: '#34343b', borderRadius: 8, paddingVertical: 10 }} renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => {
            PushHelper.pushUserCenterType(item.code)
          }} style={{ width: (width - 40) / 3, justifyContent: 'center', alignItems: 'center' }}>
            <FastImage resizeMode={'contain'} style={{ width: (width - 20) / 3 > 50 ? 50 : 30, aspectRatio: 1, tintColor: 'white', overflow: "visible" }} source={{ uri: item.logo }} >
              {item.code == 9 && unreadMsg > 0 ? <View style={{
                position: 'absolute', right: -5, top: 3, backgroundColor: 'red',
                height: 20, width: 20,
                borderRadius: 10, justifyContent: 'center', alignItems: 'center'
              }}>
                <Text style={{ color: 'white', fontSize: 10 }}>{unreadMsg}</Text>
              </View> : null}
            </FastImage>
            <Text style={{ color: 'white', marginTop: 10 }}>{item.name}</Text>

          </TouchableOpacity>
        )
      }} data={UGUserCenterItem} />
      <TouchableOpacity onPress={loginOut} style={{ height: 55, backgroundColor: '#34343b', justifyContent: 'center', alignItems: 'center', borderRadius: 8, marginTop: 10, marginBottom: 150 }}>
        <Text style={{ color: 'white', fontSize: 21 }}>退出登录</Text>
      </TouchableOpacity>
    </ScrollView>
  </View>
}
const Header = () => {
  const { top } = useSafeArea()
  return (
    <View style={{ backgroundColor: "#1a1a1e", }}>
      <View style={{ height: top }}></View>
      <View style={{ height: 45, backgroundColor: "#1a1a1e", flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingHorizontal: 15 }}>
        <TouchableOpacity style={{ position: 'absolute', left: 15 }} onPress={() => {
          pop();
          OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
        }}>
          <Icon name='ios-arrow-back' type="ionicon" color="white" size={30} />
        </TouchableOpacity >
        <Text style={{ color: 'white', fontSize: 20, fontWeight: "bold" }}>个人中心</Text>
      </View>
    </View>
  )
}
export default KSMine
