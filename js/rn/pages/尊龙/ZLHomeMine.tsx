import { View, TouchableOpacity, Text, ScrollView, FlatList } from "react-native"
import React, { useCallback, useEffect } from 'react'
import { useSafeArea } from "react-native-safe-area-context"
import { useSelector, useDispatch } from "react-redux"
import { IGlobalState } from "../../redux/store/UGStore"
import FastImage from "react-native-fast-image"
import { colorEnum } from "./enum/colorEnum"
import { Icon } from "react-native-elements"
import PushHelper from "../../public/define/PushHelper"
import { UGUserCenterType } from "../../redux/model/全局/UGSysConfModel"
import LinearGradient from "react-native-linear-gradient"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import APIRouter from "../../public/network/APIRouter"
import { ActionType } from "../../redux/store/ActionTypes"
import UGUserModel from "../../redux/model/全局/UGUserModel"
import { OCHelper } from "../../public/define/OCHelper/OCHelper"
import useMemberItems from "../../public/hooks/useMemberItems"
import useLoginOut from "../../public/hooks/useLoginOut"
import { useFocusEffect } from "@react-navigation/native"
import { IGlobalStateHelper } from "../../redux/store/IGlobalStateHelper"
import { useDimensions } from "@react-native-community/hooks"
import { PageName } from "../../public/navigation/Navigation"
const ZLHomeMine = ({ navigation }) => {
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const { width, } = useDimensions().window
    const { uid = "", curLevelTitle, usr, balance } = userStore
    const dispatch = useDispatch()
    const updateUserInfo = useCallback(
        (props: UGUserModel) => dispatch({ type: ActionType.UpdateUserInfo, props: props }),
        [dispatch]
    )
    const { loginOut } = useLoginOut(PageName.ZLHomePage)
    const { UGUserCenterItem } = useMemberItems()
    const requestBalance = async () => {
        try {
            const { data, status } = await APIRouter.user_balance_token()
            updateUserInfo({ ...userStore, balance: data.data.balance })
        } catch (error) {

        }
    }
    return <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ZLHeader />
        <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
            <View style={{ height: 180, width: "100%", backgroundColor: "#2c2e36", borderRadius: 8, overflow: "hidden", flexDirection: 'row', marginBottom: 10, marginTop: 10 }}>
                <FastImage style={{ width: 47, aspectRatio: 1, justifyContent: 'flex-end', alignItems: 'center', marginLeft: 20, marginTop: 30 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/memberGrade2.png" }} >
                    <Text style={{ marginBottom: 5, color: '#d68b74' }}>{curLevelTitle}</Text>
                </FastImage>
                <Text style={{ fontSize: 22.5, color: 'white', marginTop: 10, marginLeft: 10, marginRight: 20 }}>{usr}</Text>
                <FastImage style={{ width: 164, height: 184 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/lmgbh.png" }} />
                <LinearGradient style={{ height: 75, width: "100%", position: 'absolute', bottom: 0, flexDirection: 'row' }} colors={colorEnum.gradientColor}>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>实名认证</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>账户安全</Text>
                    </View>
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: 'white' }}>银行卡管理</Text>
                    </View>
                </LinearGradient>
            </View>
            <LinearGradient colors={colorEnum.gradientColor} style={{ height: 150, width: "100%", backgroundColor: "#2c2e36", marginBottom: 10, borderRadius: 8, overflow: "hidden" }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginHorizontal: 10, marginTop: 30 }}>
                    <Text style={{ fontSize: 21, color: 'white', }}>我的账户</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: 'white', marginRight: 20 }}> ¥ {balance}</Text>
                        <TouchableWithoutFeedback onPress={requestBalance}>
                            <Icon name="refresh" type="materialIcon" color="#8c9ba7" size={24} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{ flex: 1, flexDirection: 'row' }} >
                    <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.存款)
                    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/depositlogo.png" }} />
                        <Text style={{ color: 'white', fontSize: 21 }}> 存款</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.额度转换)
                    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/xima.png" }} />
                        <Text style={{ color: 'white', fontSize: 21 }}> 额度转换</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.取款)
                    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/withdrawlogo.png" }} />
                        <Text style={{ color: 'white', fontSize: 21 }}> 取款</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <LinearGradient colors={colorEnum.gradientColor} style={{ paddingVertical: 20, width: "100%", backgroundColor: "#2c2e36", marginBottom: 10, borderRadius: 8, paddingHorizontal: 10, paddingTop: 20 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 21, color: 'white', }}>我的晋级之路</Text>
                    <Text style={{ fontSize: 12, color: '#bfb9b9', marginRight: 20 }}> 每周一进行星级更新</Text>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 14 }}>{usr}  <Text style={{ fontSize: 12 }}>{curLevelTitle}</Text></Text>
                    <FastImage source={{ uri: "http://test10.6yc.com/images/centerRwdt.svg" }} style={{ width: 124, height: 36 }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 14 }}>{userStore.fullName}:  <Text style={{ fontSize: 12 }}>{userStore.balance}</Text></Text>
                    <FastImage source={{ uri: "http://test10.6yc.com/images/centerRwdt.svg" }} style={{ width: 124, height: 36 }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 14 }}>{userStore.taskRewardTitle}:  <Text style={{ fontSize: 12 }}>{userStore.taskRewardTotal}</Text></Text>
                    <FastImage source={{ uri: "http://test10.6yc.com/images/centerRwdt.svg" }} style={{ width: 124, height: 36 }} />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 14 }}>成长值:</Text>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'right', marginRight: 20, color: 'white' }}>距离下一级还差{(parseInt(userStore.nextLevelInt) - parseInt(userStore.curLevelInt)).toFixed(2)}分</Text>
                        <View style={{ backgroundColor: '#2c2e36', height: 13, width: width * 0.7, borderRadius: 8, marginHorizontal: 10 }}>
                            <View style={{ height: "100%", width: userStore?.curLevelInt && userStore?.nextLevelInt ? width * 0.7 * (parseInt(userStore?.curLevelInt) / parseInt(userStore?.nextLevelInt)) : 0 }}></View>
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <FastImage style={{ width: 18, aspectRatio: 1 }} source={{ uri: "http://test10.6yc.com/images/vip.png" }} />
                                <Text style={{ color: 'white' }}>{userStore.curLevelTitle}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <FastImage style={{ width: 18, aspectRatio: 1 }} source={{ uri: "http://test10.6yc.com/images/vip.png" }} />
                                <Text style={{ color: 'white' }}>{userStore.nextLevelTitle}</Text>
                            </View>
                        </View>

                    </View>
                    {/* <FastImage source={{ uri: "http://test10.6yc.com/images/centerRwdt.svg" }} style={{ width: 124, height: 36 }} /> */}
                </View>



            </LinearGradient>
            <FlatList columnWrapperStyle={{ paddingVertical: 10 }} numColumns={3} style={{ backgroundColor: '#34343b', borderRadius: 8, paddingVertical: 10 }} renderItem={({ item }) => {
                return (
                    <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(item.code)
                    }} style={{ width: (width - 40) / 3, justifyContent: 'center', alignItems: 'center' }}>
                        <FastImage resizeMode={'contain'} style={{ width: (width - 20) / 3 > 90 ? 90 : 70, aspectRatio: 1, tintColor: 'white' }} source={{ uri: item.logo }} />
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
const ZLHeader = () => {
    const { width, height } = useDimensions().window
    const insets = useSafeArea();

    return (
        <View style={{
            width, height: 68 + insets.top, paddingTop: insets.top, backgroundColor: colorEnum.mainColor, justifyContent: 'space-between',
            flexDirection: 'row', shadowColor: "white", borderBottomWidth: 0.5, alignItems: 'center',
            paddingHorizontal: 20
        }}>
            <TouchableOpacity onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.站内信)
            }} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <FastImage style={{ width: 27, height: 24, marginBottom: 5 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/notice.png" }} />
                <Text style={{ color: "white", fontSize: 18 }}>消息</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
            }} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <FastImage style={{ width: 27, height: 24, marginBottom: 5 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/service2.png" }} />
                <Text style={{ color: "white", fontSize: 18 }}>客服</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ZLHomeMine
