import { View, Text, ScrollView, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList, StyleSheet, Dimensions, Alert, ImageBackground, Platform } from "react-native"
import React, { useEffect, useState, useCallback, useRef } from 'react'
import { useSafeArea } from 'react-native-safe-area-context'
import FastImage, { FastImageProperties } from "react-native-fast-image"
import { colorEnum, } from "../enum/colorEnum"
import LinearGradient from "react-native-linear-gradient"
import PushHelper from "../../../public/define/PushHelper"
import { MarqueeHorizontal } from 'react-native-marquee-ab';
import { UGUserCenterType } from "../../../redux/model/全局/UGSysConfModel"
import { PageName } from '../../../public/navigation/Navigation';
import { IGlobalState, UGStore } from "../../../redux/store/UGStore";
import APIRouter from '../../../public/network/APIRouter';
import { BannerModel } from "../../../public/network/Model/BannerModel"
import { Icon, Button } from 'react-native-elements';
import { httpClient } from "../../../public/network/httpClient"
import Carousel from 'react-native-banner-carousel';
import usePopUpView from "../../../public/hooks/usePopUpView"
import UGUserModel from "../../../redux/model/全局/UGUserModel"
import { push, navigate } from "../../../public/navigation/RootNavigation"
import AppDefine from "../../../public/define/AppDefine"
import useGetHomeInfo from "../../../public/hooks/useGetHomeInfo"
import { useDimensions } from '@react-native-community/hooks'
import useAutoRenewUserInfo from "../../../public/hooks/useAutoReNewUserInfo"
import { OCHelper } from "../../../public/define/OCHelper/OCHelper"
import { NSValue } from "../../../public/define/OCHelper/OCBridge/OCCall"
import { TurntableListModel } from "../../../public/network/Model/TurntableListModel"
import RedBagItem from "../../../public/components/RedBagItem"
import { useNavigationState } from "@react-navigation/native"
import AutoHeightWebView from 'react-native-autoheight-webview'
import useRandomString from "../../../public/hooks/useRandomString"
import Header from "./Header"
import HomeBase from "../../../public/components/HomeBase"
import Account from "./Account"
import QuickStart from "./QuickStart"
import RankListCP from "../../../public/widget/RankList"


const KSHomePage = ({ navigation }) => {
  const { width, } = useDimensions().window
  const { onPopViewPress } = usePopUpView()
  const userStore = UGStore.globalProps.userInfo;
  const { uid = "" } = userStore
  const systemStore = UGStore.globalProps.sysConf;
  const { notice, homeGames, couponListData, rankList, redBag, floatAds, onlineNum, loading, } = useGetHomeInfo()
  const [originalNoticeString, setOriginalNoticeString] = useState<string>()
  const [noticeFormat, setnoticeFormat] = useState<{ label: string, value: string }[]>()
  const state = useNavigationState(state => state);
  const [selectId, setSelectedId] = useState(-1)
  const [show, setShow] = useState(false)
  const [content, setContent] = useState("")
  const { top } = useSafeArea()
  useEffect(() => {
    let string = ""
    const noticeData = notice?.data?.scroll?.map((res) => {
      string += res.content
      return { label: res.id, value: res.title }
    }) ?? []
    if (notice?.data?.popup) {
      openPopup(notice)
    }
    setnoticeFormat(noticeData)
    setOriginalNoticeString(string)
  }, [notice])

  const openPopup = (data: any) => {
    const dataModel = data.data?.popup.map((item, index) => {
      return Object.assign({ clsName: 'UGNoticeModel', hiddenBottomLine: 'No' }, item);

    })
    if (Platform.OS != 'ios') return;
    OCHelper.call('UGPlatformNoticeView.alloc.initWithFrame:[setDataArray:].show', [NSValue.CGRectMake(20, 60, AppDefine.width - 40, AppDefine.height * 0.8)], [dataModel]);
  }
  const init = async () => {
    try {
      // const { } = await APIRouter.system_config()
      // OCHelper.call("NSNotificationCenter.defaultCenter.postNotificationName:[object:]", ["UGNotificationGetSystemConfigComplete", "nil"])
    } catch (error) {

    }
  }
  const [] = useAutoRenewUserInfo(navigation)
  const value = useRandomString("200000000", 2000000000, 2999999999)
  const thirdPartGamePress = (index: number) => {
    if (uid == '') {
      navigate(PageName.ZLLoginPage, {})
    } else {
      PushHelper.pushHomeGame(homeGames?.data?.icons?.[0]?.list?.[index])
    }

  }
  return (
    <HomeBase needPadding={false} backgroundColor={'black'} loginPage={PageName.ZLLoginPage}>
      <View style={{ height: top, backgroundColor: "#1d2128" }}></View>
      <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: "#1d2128", borderBottomColor: "#444", borderBottomWidth: 0.5, }}>
        <Text style={{ color: '#999999', fontSize: 12 }}>公告:</Text>
        <MarqueeHorizontal
          bgContainerStyle={{ backgroundColor: '#00000000', }}
          textStyle={{ color: "white", fontSize: 12 }}
          width={width - 50}
          height={34}
          speed={35}
          onTextClick={() => {
            PushHelper.pushNoticePopUp(originalNoticeString)
          }}

          textList={noticeFormat} />
      </View>
      <Header />
      <Account />
      <QuickStart />
      {/* <AcctountDetail /> */}
      <View style={{ flex: 1, height: 223 / 375 * width, flexDirection: 'row', paddingHorizontal: 10 }}>
        <TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 0)}>
          <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[0]?.logo }} style={{
            flex: 0.6,
            marginRight: 8,
            borderRadius: 10, paddingLeft: 5, paddingTop: 10,
            justifyContent: 'space-between', backgroundColor: "#3a3a41"
          }} >
            <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>{homeGames?.data?.icons?.[0]?.list?.[0]?.name}</Text>
            <Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>{homeGames?.data?.icons?.[0]?.list?.[0]?.subtitle}</Text>
          </FastImage>
        </TouchableWithoutFeedback>

        <View style={{ flexDirection: 'column', flex: 0.4, justifyContent: 'space-between', borderRadius: 10, }}>
          <TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 1)}>
            <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[1]?.logo }} style={{ flex: 6, marginBottom: 8, borderRadius: 10, paddingLeft: 5, paddingTop: 10, backgroundColor: "#3a3a41" }}>
              <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>{homeGames?.data?.icons?.[0]?.list?.[1]?.name}</Text>
            </FastImage>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={thirdPartGamePress.bind(null, 2)}>
            <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[2]?.logo }} style={{ flex: 4, borderRadius: 10, paddingLeft: 5, paddingTop: 10, backgroundColor: "#3a3a41" }}>
              <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>{homeGames?.data?.icons?.[0]?.list?.[2]?.name}</Text>
            </FastImage>
          </TouchableWithoutFeedback>
        </View>
      </View>
      <View style={{ flexDirection: 'row', height: 136, marginTop: 10, paddingHorizontal: 10 }}>
        <View style={{ flex: 0.65, borderRadius: 10, marginRight: 8, padding: 5, backgroundColor: "#3a3a41" }}>
          <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Text style={{ textAlign: 'center', fontSize: 12, color: "#d19881", letterSpacing: 2, marginBottom: 5 }}>电子游戏</Text>
              <Text style={{ textAlign: 'center', fontSize: 12, color: "#d19881", letterSpacing: 2 }}>奖金池</Text>
            </View>
            <View style={{
              height: "100%", width: "70%", borderRadius: 20,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 1 },
              shadowOpacity: 0.8,
              shadowRadius: 1,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <Text style={{ color: 'white', fontSize: 15 }}>{value}</Text>
            </View>
          </View>
          <View style={{ height: 0.5, width: "100%", backgroundColor: "#97989d" }}></View>
          <View style={{ flex: 3, flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
            <TouchableOpacity onPress={thirdPartGamePress.bind(null, 3)} style={{ alignItems: 'center' }}>
              <FastImage style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: homeGames?.data?.icons?.[0]?.list?.[3]?.logo }} />
              <Text style={{ fontSize: 12, color: "#97989d" }}>{homeGames?.data?.icons?.[0]?.list?.[3]?.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={thirdPartGamePress.bind(null, 4)} style={{ alignItems: 'center' }}>
              <FastImage style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: homeGames?.data?.icons?.[0]?.list?.[4]?.logo }} />
              <Text style={{ fontSize: 12, color: "#97989d" }}>{homeGames?.data?.icons?.[0]?.list?.[4]?.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={thirdPartGamePress.bind(null, 5)} style={{ alignItems: 'center' }}>
              <FastImage style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: homeGames?.data?.icons?.[0]?.list?.[5]?.logo }} />
              <Text style={{ fontSize: 12, color: "#97989d" }}>{homeGames?.data?.icons?.[0]?.list?.[5]?.name}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={thirdPartGamePress.bind(null, 6)} style={{ alignItems: 'center' }}>
              <FastImage style={{ width: 42, height: 42, borderRadius: 8, marginBottom: 10 }} source={{ uri: homeGames?.data?.icons?.[0]?.list?.[6]?.logo }} />
              <Text style={{ fontSize: 12, color: "#97989d" }}>{homeGames?.data?.icons?.[0]?.list?.[6]?.name}</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableWithoutFeedback style={styles.buttonContainer} onPress={thirdPartGamePress.bind(null, 7)}>
          <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[7]?.logo }}
            style={{ flex: 0.35, backgroundColor: "#3a3a41", borderRadius: 10, paddingLeft: 5, paddingTop: 10, justifyContent: 'space-between' }}>
            <Text style={{ color: colorEnum.titleColor, fontSize: 16.5 }}>{homeGames?.data?.icons?.[0]?.list?.[7]?.name}</Text>
            <Text style={{ margin: 5, color: "rgba(167,171,179,.99)", fontSize: 12 }}>{homeGames?.data?.icons?.[0]?.list?.[7]?.subtitle}</Text>
          </FastImage>
        </TouchableWithoutFeedback>
      </View>
      <View style={{ flexDirection: 'row', height: 67, marginTop: 7, paddingHorizontal: 10 }}>
        <TouchableOpacity style={styles.buttonContainer} onPress={thirdPartGamePress.bind(null, 8)}>
          <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[8]?.logo }}
            style={{ borderRadius: 10, paddingVertical: 10, paddingLeft: 5, }}>
            <Text style={{ color: colorEnum.titleColor, fontSize: 12 }}>{homeGames?.data?.icons?.[0]?.list?.[8]?.name}</Text>
            <Text style={{ color: "rgba(167,171,179,.99)", fontSize: 12, marginTop: 10 }}>{homeGames?.data?.icons?.[0]?.list?.[8]?.subtitle}</Text>
          </FastImage>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={thirdPartGamePress.bind(null, 9)}>
          <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[9]?.logo }}
            style={{ borderRadius: 10, height: 67, paddingLeft: 5, paddingTop: 10 }}>
            <Text style={{ color: colorEnum.titleColor, fontSize: 12 }}>{homeGames?.data?.icons?.[0]?.list?.[9]?.logo}</Text>
          </FastImage>
        </TouchableOpacity>
        <TouchableOpacity style={styles.buttonContainer} onPress={thirdPartGamePress.bind(null, 10)}>
          <FastImage source={{ uri: homeGames?.data?.icons?.[0]?.list?.[10]?.logo }}
            style={{ flex: 1, backgroundColor: "#3a3a41", borderRadius: 10, paddingLeft: 5, paddingTop: 10, }}>
            <Text style={{ color: colorEnum.titleColor, fontSize: 12 }}>{homeGames?.data?.icons?.[0]?.list?.[10]?.name}</Text>
          </FastImage>
        </TouchableOpacity>
      </View>
      <View style={{ backgroundColor: "#3a3a41", marginHorizontal: 10, marginTop: 10, borderRadius: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 10 }}>
          <View style={{ flexDirection: 'row' }} >
            <Image style={{ width: 13, height: 13, tintColor: 'white', marginRight: 5 }} source={{ uri: "礼品-(1)" }} />
            <Text style={{ color: 'white', fontWeight: "bold" }}>优惠活动</Text>
          </View>
          <TouchableWithoutFeedback onPress={() => {
            push(PageName.PromotionListPage)
          }}>
            <Text style={{ color: 'white', fontWeight: "bold" }}>{"查看更多>>"}</Text>
          </TouchableWithoutFeedback>
        </View>

        <FlatList style={{ marginTop: 10 }} data={couponListData?.data?.list?.filter((res, index) => index < 3)} renderItem={({ item, index }) => {
          return <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
            <TouchableWithoutFeedback onPress={onPopViewPress.bind(null, item, couponListData?.data?.style ?? 'popup', () => {
              if (selectId == index) {
                setSelectedId(-1)
              } else {
                setSelectedId(index)
              }
            })}>
              <View>
                <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5, color: 'white', textAlign: 'center' }}>{item.title}</Text>
                <FastImageAutoHeight source={{ uri: item.pic }} />
              </View>
            </TouchableWithoutFeedback>
            {selectId == index ? <AutoHeightWebView
              style={{ width: width - 20, backgroundColor: 'white' }}
              // scalesPageToFit={true}
              viewportContent={'width=device-width, user-scalable=no'}
              source={{
                html: `<head>
                        <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>
                        <style>img{width:auto !important;max-width:100%;height:auto !important}</style>
                        <style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style>
                      </head>` +
                  `<script>
                        window.onload = function () {
                          window.location.hash = 1;
                          document.title = document.body.scrollHeight;
                        }
                      </script>`+ item.content
              }}></AutoHeightWebView> : null
            }

          </View >
        }} />
      </View>
      <View style={{ marginHorizontal: 10, marginTop: 10 }}>
        <RankListCP timing={10000} backgroundColor={"#3a3a41"} textColor={'white'} width={width - 24} ranks={rankList} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', paddingHorizontal: 10, marginTop: 10 }}>
        <Text onPress={() => {
          console.log(httpClient.defaults.baseURL + '/index2.php')
          PushHelper.openWebView(httpClient.defaults.baseURL + '/index2.php')
        }} style={{ color: 'white', textAlign: 'center', marginRight: 20, marginBottom: 5 }} >💻电脑版</Text>
        <Text style={{ color: 'white', textAlign: 'center' }} onPress={() => {
          push(PageName.PromotionListPage)
        }}>🎁优惠活动</Text>
      </View>
      <Text style={{ color: 'white', textAlign: 'center' }}>COPYRIGHT © {systemStore.webName} RESERVED</Text>
      <View style={{ height: 100 }}></View>

      {/* <RedBagItem loginPage={PageName.ZLHomePage} redBag={redBag} />
      <TurntableListItem /> */}
      <MarqueePopupView onPress={() => {
        setShow(false)
      }} content={content} show={show} onDismiss={() => {
        setShow(false)
      }} />
    </HomeBase>
  )
}

const TurntableListItem = () => {
  const { width, height } = useDimensions().screen
  const { isTest = false, uid = "" } = UGStore.globalProps.userInfo;
  const [turntableListVisiable, setTurntableListVisiable] = useState(false)
  const [turntableList, setTurntableList] = useState<TurntableListModel>()
  useEffect(() => {
    if (turntableList && turntableList != null) {
      setTurntableListVisiable(true)
    }
  }, [turntableList])
  const getTurntableList = async () => {
    try {
      const { data, status } = await APIRouter.activity_turntableList()
      setTurntableList(data.data)
    } catch (error) {

    }
  }
  useEffect(() => {
    if (uid != "") {
      getTurntableList()
    }
  }, [uid])
  if (turntableListVisiable) {
    return (
      <TouchableWithoutFeedback onPress={() => {
        if (uid == "") {
          Alert.alert("温馨提示", "您还未登录", [
            { text: "取消", onPress: () => { }, style: "cancel" },
            {
              text: "马上登录", onPress: () => {
                navigate(PageName.ZLLoginPage, {})
              },
            }
          ])
        } else if (isTest) {
          Alert.alert("温馨提示", "请先登录您的正式帐号", [
            { text: "取消", onPress: () => { }, style: "cancel" },
            {
              text: "马上登录", onPress: () => {
                navigate(PageName.ZLLoginPage, {})
              },
            }
          ])
        } else {
          if (Platform.OS != 'ios') return;
          const turntableListModel = Object.assign({ clsName: 'DZPModel' }, turntableList?.[0]);
          OCHelper.call(({ vc }) => ({
            vc: {
              selectors: 'DZPMainView.alloc.initWithFrame:[setItem:]',
              args1: [NSValue.CGRectMake(100, 100, AppDefine.width - 60, AppDefine.height - 60),],
              args2: [turntableListModel]
            },
            ret: {
              selectors: 'SGBrowserView.showMoveView:yDistance:',
              args1: [vc, 100],
            },
          }));
        }
      }}>
        <ImageBackground style={{ width: 95, height: 95, position: 'absolute', top: height / 2, right: 20 }} source={{ uri: "dzp_btn" }} >
          <TouchableWithoutFeedback onPress={() => {
            setTurntableListVisiable(false)
          }}>
            <Image style={{ width: 20, height: 20, right: 0, top: 0, position: 'absolute' }} source={{ uri: "dialog_close" }} />
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>)
  } else {
    return null
  }

}
const ZLHeader = () => {
  const { width, height } = useDimensions().window
  const insets = useSafeArea();
  const userStore = UGStore.globalProps.userInfo;
  const { uid = "" } = userStore
  const sysStore = UGStore.globalProps.sysConf;
  const { mobile_logo = "" } = sysStore
  return (
    <View style={{
      width, height: 68 + insets.top, paddingTop: insets.top, backgroundColor: colorEnum.mainColor, justifyContent: 'space-between',
      flexDirection: 'row', shadowColor: "#444", borderBottomWidth: 0.5, alignItems: 'center', borderColor: "#444"
    }}>
      <FastImage resizeMode={'contain'} style={{ width: 210, height: 58 }} source={{ uri: mobile_logo }} />
      <View style={{ flexDirection: 'row' }}>
        {
          uid != "" ? <TouchableOpacity onPress={() => {
            PushHelper.pushUserCenterType(UGUserCenterType.站内信)
          }} style={{ flexDirection: 'column', marginRight: 20 }}>
            <Icon type={'materialIcon'} color={'white'} name={"notifications"} size={25} />
            <Text style={{ color: "#8c9ea7", marginTop: 3 }}>消息</Text>
          </TouchableOpacity> : null
        }

        <TouchableOpacity onPress={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.在线客服)
        }} style={{ flexDirection: 'column', marginRight: 20 }}>
          <FastImage style={{ width: 27, height: 24 }} source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/service1.png" }} />
          <Text style={{ color: "#8c9ea7", marginTop: 3 }}>客服</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}
const UserStatusBar = () => {
  const sysConf = UGStore.globalProps.sysConf;
  const userStore = UGStore.globalProps.userInfo;
  const { uid = "", curLevelTitle, usr, curLevelInt, nextLevelInt } = userStore
  return (
    <LinearGradient colors={colorEnum.gradientColor} style={{ height: 62, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
      {uid == "" ? <>
        <TouchableWithoutFeedback onPress={() => {
          push(PageName.ZLLoginPage);
        }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: 'white' }}>登录</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={() => {
          push(PageName.ZLRegisterPage);
        }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: 'white' }}>注册</Text>
          </View>
        </TouchableWithoutFeedback>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => {
            push(PageName.ZLLoginPage);
          }} style={{ width: '90%', height: "70%", backgroundColor: '#B47265', borderRadius: 3, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
            <>
              <Icon name="credit-card" type="materialIcon" color="white" size={24} />
              <View style={{ backgroundColor: 'white', height: '40%', width: 1 }}></View>
              <Text style={{ color: 'white' }}>取款</Text>
            </>
          </TouchableOpacity >
        </View></> : <TouchableOpacity onPress={() => {
          PushHelper.pushUserCenterType(UGUserCenterType.我的页);
        }} style={{ flexDirection: 'row', alignItems: 'flex-start', flex: 1, paddingLeft: 10 }}>

          <FastImage style={{ width: 47, aspectRatio: 1, justifyContent: 'flex-end', alignItems: 'center' }}
            source={{ uri: "http://test10.6yc.com/views/mobileTemplate/16/images/memberGrade2.png" }} >
            <Text style={{ marginBottom: 5, color: '#d68b74' }}>{curLevelTitle}</Text>
          </FastImage>
          <View style={{ flexDirection: 'column', marginLeft: 10, justifyContent: 'space-between', height: 47 }}>
            <Text style={{ color: 'white', fontSize: 16 }}>{usr}</Text>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: "400" }}>距离下一级还差{(parseFloat(nextLevelInt) - parseFloat(curLevelInt)).toFixed(2)}分   </Text>
          </View>
          <TouchableOpacity style={{
            position: 'absolute',
            bottom: 0,
            right: 10
          }}>
            <Icon name="chevron-right" type="materialIcon" color="#8c9ba7" size={27} />
          </TouchableOpacity>
        </TouchableOpacity>}

    </LinearGradient>
  )
}
const MarqueePopupView = ({ content, show, onPress, onDismiss }) => {
  const { width, height } = useDimensions().screen
  if (show) {
    return (
      <View style={{ width, height, position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 1000, marginBottom: 10 }}>
        <View style={{ width: '90%', height: '75%', backgroundColor: 'white', borderRadius: 15 }}>
          <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: "gray", borderBottomWidth: 0.5 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>公告详情</Text>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10 }}>
            <AutoHeightWebView style={{ width: width * 0.9 - 20 }} source={{ html: content }}></AutoHeightWebView>
          </View>
          <View style={{ height: 70, paddingBottom: 10, paddingHorizontal: 5, justifyContent: 'space-between', width: "100%", flexDirection: 'row' }}>
            <TouchableOpacity onPress={onDismiss} style={{
              justifyContent: 'center', alignItems: 'center',
              width: "47%", height: 50, backgroundColor: 'white',
              borderRadius: 5, borderColor: "gray", borderWidth: 0.5
            }}>
              <Text>取消</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress} style={{
              justifyContent: 'center',
              alignItems: 'center', width: "47%", height: 50,
              backgroundColor: '#46A3FF', borderRadius: 5,
              borderColor: "gray", borderWidth: 0.5
            }}>
              <Text style={{ color: 'white' }}>确定</Text>
            </TouchableOpacity>
          </View>
        </View>

      </View>
    )
  } else {
    return null
  }

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
    backgroundColor: "#3a3a41",
    borderRadius: 8
  }
})
export default KSHomePage