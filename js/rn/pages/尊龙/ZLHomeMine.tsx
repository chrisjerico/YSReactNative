import {View, TouchableOpacity, Text, ScrollView, FlatList, Image, Platform} from "react-native"
import React, { useCallback, useEffect, useState } from 'react'
import { useSafeArea } from "react-native-safe-area-context"
import { IGlobalState, UGStore } from "../../redux/store/UGStore"
import FastImage from "react-native-fast-image"
import { colorEnum } from "./enum/colorEnum"
import { Icon } from "react-native-elements"
import PushHelper from "../../public/define/PushHelper"
import UGSysConfModel, { UGUserCenterType } from "../../redux/model/全局/UGSysConfModel"
import LinearGradient from "react-native-linear-gradient"
import { TouchableWithoutFeedback } from "react-native-gesture-handler"
import APIRouter from "../../public/network/APIRouter"
import UGUserModel from "../../redux/model/全局/UGUserModel"
import useMemberItems from "../../public/hooks/useMemberItems"
import useLoginOut from "../../public/hooks/useLoginOut"
import { useDimensions } from "@react-native-community/hooks"
import { PageName } from "../../public/navigation/Navigation"
import { OCHelper } from "../../public/define/OCHelper/OCHelper"
import { IGlobalStateHelper } from "../../redux/store/IGlobalStateHelper"
import Axios from "axios"
import { httpClient } from "../../public/network/httpClient"
import { YueBaoStatModel } from "../../public/network/Model/YueBaoStatModel"
const ZLHomeMine = ({ navigation }) => {
    const userStore = UGStore.globalProps.userInfo
    const { width, } = useDimensions().window
    const { uid = "", curLevelTitle, usr, balance, unreadMsg } = userStore
    const [infoModel, setInfoModel] = useState<YueBaoStatModel>()
    const { loginOut } = useLoginOut(PageName.ZLHomePage)
    const { UGUserCenterItem } = useMemberItems()
    const requestBalance = async () => {
        try {
            switch (Platform.OS) {
              case 'ios':
                  OCHelper.call('SVProgressHUD.showWithStatus:', ['正在刷新金额...']);
                break;
              case 'android':
                  //TODO
                break;
            }
            const { data, status } = await APIRouter.user_balance_token()
            UGStore.dispatch({ type: 'merge', userInfo: { balance: data.data.balance } })

            switch (Platform.OS) {
                case 'ios':
                    OCHelper.call('SVProgressHUD.showSuccessWithStatus:', ['刷新成功！']);
                    break;
                case 'android':
                    //TODO
                    break;
            }
        } catch (error) {
            switch (Platform.OS) {
              case 'ios':
                  OCHelper.call('SVProgressHUD.showErrorWithStatus:', [error?.message ?? '刷新失败请稍后再试']);
                break;
              case 'android':
                //TODO
                break;
            }
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
            UGStore.dispatch({ type: 'merge', userInfo: userInfo?.data });
            UGStore.save();
        });
        return (() => {
            navigation.removeListener('focus', null);
        })
    }, [])
    return <View style={{ flex: 1, backgroundColor: 'black' }}>
        <ZLHeader />
        <ScrollView style={{ flex: 1, paddingHorizontal: 20 }}>
            <View style={{ height: 130, width: "100%", backgroundColor: "#2c2e36", borderRadius: 8, overflow: "hidden", flexDirection: 'row', marginBottom: 10 }}>
                <FastImage style={{ width: 47, aspectRatio: 1, justifyContent: 'flex-end', alignItems: 'center', marginLeft: 20, marginTop: 20 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/memberGrade2.png" }} >
                    <Text style={{ marginBottom: 5, color: '#d68b74' }}>{userStore.curLevelGrade}</Text>
                </FastImage>
                <Text style={{ fontSize: 16.5, color: 'white', marginTop: 10, marginLeft: 10, marginRight: 20 }}>{usr}</Text>
                <FastImage style={{ width: 121, height: 135, position: 'absolute', right: 20 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/lmgbh.png" }} />

                <LinearGradient style={{ height: 55, width: "100%", position: 'absolute', bottom: 0, flexDirection: 'row' }} colors={colorEnum.gradientColor}>
                    <View style={{ width: '100%', backgroundColor: "#30323b", height: 1, position: 'absolute', top: 0 }}></View>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.个人信息)
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon type={'font-awesome'} name={"address-card-o"} size={15} color={'gray'} />
                            <Text style={{ color: 'white', marginLeft: 5 }}>实名认证</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.安全中心)
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon type={'font-awesome'} name={"check-square-o"} size={15} color={'gray'} />

                            <Text style={{ color: 'white', marginLeft: 5 }}>账户安全</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.银行卡管理)
                    }}>
                        <View style={{ flexDirection: 'row' }}>
                            <Icon type={'font-awesome'} name={"credit-card"} size={15} color={'gray'} />

                            <Text style={{ color: 'white', marginLeft: 5 }}>银行卡管理</Text>
                        </View>


                    </TouchableOpacity>
                </LinearGradient>
            </View>
            <LinearGradient colors={colorEnum.gradientColor} start={{ x: 0.5, y: 0.6 }} style={{ height: 110, width: "100%", backgroundColor: "#2c2e36", marginBottom: 10, borderRadius: 8, overflow: "hidden", paddingVertical: 15 }}>
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginHorizontal: 10, }}>
                    <Text style={{ fontSize: 15, color: 'white', }}>我的账户</Text>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ fontSize: 14, color: 'white', marginRight: 20 }}> ¥ {balance}</Text>
                        <TouchableWithoutFeedback onPress={requestBalance}>
                            <Icon name="refresh" type="materialIcon" color="#8c9ba7" size={24} />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={{ height: 1, width: "95%", backgroundColor: "#444", alignSelf: 'center', marginTop: 10 }}></View>
                <View style={{ flex: 1, flexDirection: 'row', marginTop: 15 }} >
                    <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.存款)
                    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/depositlogo.png" }} />
                        <Text style={{ color: 'white', fontSize: 15 }}> 存款</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.额度转换)
                    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/xima.png" }} />
                        <Text style={{ color: 'white', fontSize: 15 }}> 额度转换</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.取款)
                    }} style={{ flex: 1, alignItems: 'center', justifyContent: 'center', flexDirection: 'row' }}>
                        <FastImage style={{ width: 34, height: 34 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/withdrawlogo.png" }} />
                        <Text style={{ color: 'white', fontSize: 15 }}> 取款</Text>
                    </TouchableOpacity>
                </View>
            </LinearGradient>
            <LinearGradient colors={colorEnum.gradientColor} style={{ paddingVertical: 20, width: "100%", backgroundColor: "#2c2e36", marginBottom: 10, borderRadius: 8, paddingHorizontal: 10, paddingTop: 15 }}>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Text style={{ fontSize: 15, color: 'white', }}>我的晋级之路</Text>
                    <Text style={{ fontSize: 12, color: '#bfb9b9', marginRight: 10 }}> 每周一进行星级更新</Text>
                </View>
                <View style={{ height: 1, width: "95%", backgroundColor: "#444", alignSelf: 'center', marginVertical: 10 }}></View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ color: 'white', fontSize: 14 }}>{usr}</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: "#55c6ff", borderRadius: 4, marginLeft: 10, padding: 3 }}>
                            <Text style={{ fontSize: 12, color: 'white' }}>{userStore.curLevelGrade}</Text>
                        </View>

                    </View>
                    <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.任务中心)
                    }}>
                        <Image source={{ uri: "missionhall" }} style={{ height: 18, aspectRatio: 150 / 39 }} />
                    </TouchableOpacity>
                </View>

                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 10 }}>
                    <Text style={{ fontSize: 14, color: 'white' }}>{"积 分："}<Text style={{ fontSize: 14 }}>{userStore.taskReward}</Text></Text>
                    <TouchableOpacity onPress={() => {
                        PushHelper.pushUserCenterType(UGUserCenterType.每日签到)
                    }}>
                        <Image source={{ uri: "dailysign" }} style={{ height: 18, aspectRatio: 150 / 39 }} />
                    </TouchableOpacity>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 5 }}>
                    <Text style={{ color: 'white', fontSize: 14, marginBottom: 5 }}>利息宝:  <Text style={{ fontSize: 12 }}>{infoModel?.data?.balance}</Text></Text>

                </View>

                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Text style={{ color: 'white', fontSize: 14 }}>成长值:</Text>
                    <View style={{ flexDirection: 'column' }}>
                        <Text style={{ textAlign: 'right', marginRight: 20, color: 'white', marginBottom: 3, fontSize: 12, fontWeight: "400" }}>{parseInt(userStore.nextLevelInt) - parseInt(userStore.taskRewardTotal) <= 0 ? "恭喜您已经是最高等级" : "距离下一级还差" + (parseInt(userStore.nextLevelInt) - parseInt(userStore.taskRewardTotal)).toFixed(2) + "分"}</Text>
                        <View style={{ backgroundColor: '#2c2e36', height: 13, width: width * 0.7, borderRadius: 8, marginHorizontal: 10 }}>
                            {
                                parseInt(userStore.nextLevelInt) - parseInt(userStore.taskRewardTotal) <= 0 ?
                                    <View style={{ justifyContent: "center", alignItems: 'center', backgroundColor: 'red', borderRadius: 8, height: "100%", width: width * 0.7 }}>
                                        {/* <Text style={{ color: 'white', fontSize: 4, width: width * 0.7 }}>100%</Text> */}
                                    </View> : <View style={{ justifyContent: "center", alignItems: 'center', backgroundColor: 'red', borderRadius: 8, height: "100%", width: userStore?.taskRewardTotal && userStore?.nextLevelInt ? isNaN(width * 0.7 * (parseInt(userStore?.taskRewardTotal) / parseInt(userStore?.nextLevelInt))) ? 0 : Math.min((width * 0.7 * (parseInt(userStore?.taskRewardTotal) / parseInt(userStore?.nextLevelInt))), width * 0.7) : 0 }}>
                                        {/* <Text style={{ color: 'white', fontSize: 4, width: userStore?.taskRewardTotal && userStore?.nextLevelInt ? isNaN(width * 0.7 * (parseInt(userStore?.taskRewardTotal) / parseInt(userStore?.nextLevelInt))) ? 0 : Math.min((width * 0.7 * (parseInt(userStore?.taskRewardTotal) / parseInt(userStore?.nextLevelInt))), width * 0.7) : 0 }}>{parseInt(userStore?.taskRewardTotal) / parseInt(userStore?.nextLevelInt) * 100}%</Text> */}
                                    </View>
                            }
                        </View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginRight: 20, marginTop: 4 }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <FastImage style={{ width: 18, aspectRatio: 1 }} source={{ uri: "http://test10.6yc.com/images/vip.png" }} />
                                <Text style={{ color: 'white' }}>{userStore.curLevelGrade}</Text>
                            </View>
                            {parseInt(userStore.nextLevelInt) - parseInt(userStore.taskRewardTotal) == 0 ? <></> : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <FastImage style={{ width: 18, aspectRatio: 1 }} source={{ uri: "http://test10.6yc.com/images/vip.png" }} />
                                <Text style={{ color: 'white' }}>{userStore.nextLevelGrade}</Text>
                            </View>}
                        </View>

                    </View>
                </View>



            </LinearGradient>
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
const ZLHeader = () => {
    const { width, height } = useDimensions().window
    const insets = useSafeArea();
    const userStore = UGStore.globalProps.userInfo;
    const { uid = "", unreadMsg } = userStore
    return (
        <View style={{
            width, height: 68 + insets.top, paddingTop: insets.top, backgroundColor: '#1a1a1e', justifyContent: 'space-between',
            flexDirection: 'row', shadowColor: "white", borderBottomWidth: 0.5, alignItems: 'center',
            paddingHorizontal: 20
        }}>
            <TouchableOpacity onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.站内信)
            }} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <FastImage style={{ width: 27, height: 24, marginBottom: 5 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/notice.png" }} />
                <Text style={{ color: "white", fontSize: 14 }}>消息</Text>
                {unreadMsg > 0 ? <View style={{
                    position: 'absolute', right: 0, top: -5, backgroundColor: 'red',
                    height: 15, width: 15,
                    borderRadius: 7.5, justifyContent: 'center', alignItems: 'center'
                }}>
                    <Text style={{ color: 'white', fontSize: 10 }}>{unreadMsg}</Text>
                </View> : null}

            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
            }} style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                <FastImage style={{ width: 27, height: 24, marginBottom: 5 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/service2.png" }} />
                <Text style={{ color: "white", fontSize: 14 }}>客服</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ZLHomeMine
