import { View, useWindowDimensions, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from "react-native"
import React, { useEffect, useState } from 'react'
import { SafeAreaView, useSafeArea } from 'react-native-safe-area-context'
import FastImage from "react-native-fast-image"
import { colorEnum, } from "./enum/colorEnum"
import LinearGradient from "react-native-linear-gradient"
import Swiper from "react-native-swiper"
import NetworkRequest1 from "../../public/network/NetworkRequest1"
import { XBJHomeProps } from "../香槟金/XBJHomeProps"
import PushHelper from "../../public/define/PushHelper"
import { MarqueeHorizontal } from 'react-native-marquee-ab';
import { UGUserCenterType } from "../../redux/model/全局/UGSysConfModel"
import { useNavigation } from '@react-navigation/native';
import { Navigation, PageName } from '../../public/navigation/Navigation';
import { useSelector } from "react-redux"
import { IGlobalState } from "../../redux/store/UGStore";
const ZLHomePage = () => {
    const { width, } = useWindowDimensions()
    const [data, setData] = useState<XBJHomeProps>()
    const init = async () => {
        const homeInfoResp = await NetworkRequest1.homeInfo()
        setData(homeInfoResp)

    }
    const navigation = useNavigation()
    useEffect(() => {
        init()
    }, [])
    const userStore = useSelector((state: IGlobalState) => state.UserInfoReducer)
    const { uid = "" } = userStore
    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <ZLHeader />
            <ScrollView style={{ flex: 1, paddingHorizontal: 10, backgroundColor: 'black' }}>
                <LinearGradient colors={colorEnum.gradientColor} style={{ height: 62, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    {uid == "" ? <>
                        <TouchableWithoutFeedback onPress={() => {
                            Navigation.push(PageName.ZLLoginPage);
                        }}>
                            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={{ fontSize: 18, color: 'white' }}>登录</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ fontSize: 18, color: 'white' }}>注册</Text>
                        </View>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ width: '80%', height: "70%", backgroundColor: '#B47265', borderRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                                <View style={{}}>

                                </View>
                                <View style={{ backgroundColor: 'white', height: '40%', width: 1 }}></View>
                                <Text style={{ color: 'white' }}>取款</Text>

                            </View>
                        </View></> : <></>}

                </LinearGradient>
                {/* <Marquee/> */}

                <MarqueeHorizontal textStyle={{ color: "white", fontSize: 13.2 }} bgContainerStyle={{ backgroundColor: colorEnum.marqueeBg }} width={width - 20} height={34} textList={[{ label: "1", value: "dsfdsfsdfsd" }]} />
                {data?.banner?.list?.length ?? 0 > 0 ? <View style={{ height: width / 480 * 100, width: width - 20, marginBottom: 5 }}>
                    <Swiper style={{ flex: 1, }}>
                        {data?.banner?.list?.map((res, index) => {
                            return <FastImage key={'banner' + index} style={{ width, height: width / 480 * 100, borderRadius: 10 }} source={{ uri: res.pic }} />
                        })}
                    </Swiper>
                </View> : null}
                <View style={{ flex: 1, height: 233 / 375 * width, flexDirection: 'row', }}>
                    <TouchableWithoutFeedback onPress={() => {
                        PushHelper.pushHomeGame(data?.game?.icons[0]?.list[1])
                    }}>
                        <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/agqjt.png" }} style={{
                            flex: 0.6,
                            backgroundColor: 'white', marginRight: 5,
                            borderRadius: 10, paddingLeft: 5, paddingTop: 10,
                            justifyContent: 'space-between'
                        }} >
                            <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>AG旗舰厅</Text>
                            <Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>百家乐 轮盘 骰宝 {'\n'}高额投注 豪客专享</Text>
                        </FastImage>
                    </TouchableWithoutFeedback>

                    <View style={{ flexDirection: 'column', flex: 0.4, justifyContent: 'space-between', borderRadius: 10, }}>
                        <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/aggjt.png" }} style={{ flex: 6, marginBottom: 5, borderRadius: 10, paddingLeft: 5, paddingTop: 10, }}>
                            <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>AG国际厅</Text>
                        </FastImage>
                        <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/aszrqp.png" }} style={{ flex: 4, borderRadius: 10, paddingLeft: 5, paddingTop: 10, }}>
                            <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>开元棋牌</Text>
                        </FastImage>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', height: 136, marginTop: 7 }}>
                    <View style={{ flex: 0.65, backgroundColor: colorEnum.gameitemBgColor, borderRadius: 10, marginRight: 5 }}></View>
                    <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/agbyw.png" }}
                        style={{ flex: 0.35, backgroundColor: 'red', borderRadius: 10, paddingLeft: 5, paddingTop: 10, justifyContent: 'space-between' }}>
                        <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>AG捕鱼王</Text>
                        <Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>花式捕鱼 爽快捞金</Text>
                    </FastImage>
                </View>
                <View style={{ flexDirection: 'row', height: 67, marginTop: 7 }}>
                    <TouchableWithoutFeedback onPress={() => {
                        PushHelper.pushHomeGame(data?.game?.icons[1].list[0])
                    }}>
                        <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/lottery.png" }}
                            style={{ flex: 1, backgroundColor: 'green', borderRadius: 10, marginRight: 5, paddingLeft: 5, paddingTop: 10, }}>
                            <Text style={{ color: colorEnum.titleColor, fontSize: 12 }}>彩票</Text>
                            <Text style={{ color: "rgba(167,171,179,.99)", fontSize: 12, marginTop: 10 }}>六合彩{'\n'}刮刮乐</Text>
                        </FastImage>
                    </TouchableWithoutFeedback>
                    <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/sport.png" }}
                        style={{ flex: 1, backgroundColor: 'red', borderRadius: 10, marginRight: 5, paddingLeft: 5, paddingTop: 10, }}>
                        <Text style={{ color: colorEnum.titleColor, fontSize: 12 }}>体育</Text>
                    </FastImage>
                    <FastImage source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/bbinzr.png" }}
                        style={{ flex: 1, backgroundColor: 'red', borderRadius: 10, paddingLeft: 5, paddingTop: 10, }}>
                        <Text style={{ color: colorEnum.titleColor, fontSize: 12 }}>BBIN真人</Text>

                    </FastImage>
                </View>
            </ScrollView>
        </View >
    )
}
const ZLHeader = () => {
    const { width, height } = useWindowDimensions()
    const insets = useSafeArea();
    return (
        <View style={{
            width, height: 68 + insets.top, paddingTop: insets.top, backgroundColor: colorEnum.mainColor, justifyContent: 'space-between',
            flexDirection: 'row', shadowColor: "white", borderBottomWidth: 0.5, alignItems: 'center'
        }}>
            <FastImage style={{ width: 210, height: 58 }} source={{ uri: "https://cdn01.njhthb.cn/upload/t010/customise/images/m_logo.jpg?v=1578471928" }} />
            <TouchableOpacity onPress={() => {
                PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
            }} style={{ flexDirection: 'column', marginRight: 20 }}>
                <FastImage style={{ width: 27, height: 24 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/service1.png" }} />
                <Text style={{ color: "#8c9ea7" }}>客服</Text>
            </TouchableOpacity>
        </View>
    )
}
export default ZLHomePage