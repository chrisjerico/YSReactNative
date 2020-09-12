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
import { IGlobalState, UGStore } from "../../redux/store/UGStore";
import APIRouter from '../../public/network/APIRouter';
import { BannerModel, } from "../../public/network/Model/BannerModel"
import { Icon, Button } from 'react-native-elements';
import { httpClient } from "../../public/network/httpClient"
import Carousel from 'react-native-banner-carousel';
import usePopUpView from "../../public/hooks/usePopUpView"
import UGUserModel from "../../redux/model/全局/UGUserModel"
import { push, navigate } from "../../public/navigation/RootNavigation"
import AppDefine from "../../public/define/AppDefine"
import useGetHomeInfo from "../../public/hooks/useGetHomeInfo"
import { useDimensions } from '@react-native-community/hooks'
import useAutoRenewUserInfo from "../../public/hooks/useAutoReNewUserInfo"
import { RedBagDetailActivityModel } from "../../public/network/Model/RedBagDetailActivityModel"
import { TurntableListModel } from "../../public/network/Model/TurntableListModel"
import ScrollableTabView, { ScrollableTabBar } from 'react-native-scrollable-tab-view';
import { List, HomeGamesModel } from "../../public/network/Model/HomeGamesModel"
import { OCHelper } from "../../public/define/OCHelper/OCHelper"
import HomeBase from "../../public/components/HomeBase"
import HotRecycleList from "./RecycleList/HotRecycleList"
import RankListCP from "../../public/widget/RankList"
import AutoHeightWebView from "react-native-autoheight-webview"
import { NSValue } from "../../public/define/OCHelper/OCBridge/OCCall"
import Banner from "../尊龙/CP/Banner"
import {ANHelper} from "../../public/define/ANHelper/ANHelper";
import {CMD} from "../../public/define/ANHelper/hp/CmdDefine";
const GDBHomePage = ({ navigation }) => {
  const { width, height } = useDimensions().window
  const { onPopViewPress } = usePopUpView()
  const userStore = UGStore.globalProps.userInfo
  const { uid = "" } = userStore
  const [show, setShow] = useState(false)
  const { banner, notice, homeGames, couponListData, rankList, redBag, floatAds, onlineNum, loading, onlineSwitch } = useGetHomeInfo()
  const [originalNoticeString, setOriginalNoticeString] = useState<string>()
  const [noticeFormat, setnoticeFormat] = useState<{ label: string, value: string }[]>()
  const { top } = useSafeArea()
  const [selectId, setSelectedId] = useState(-1)
  const openPopup = (data: any) => {
    const dataModel = data.data?.popup.map((item, index) => {
      return Object.assign({ clsName: 'UGNoticeModel', hiddenBottomLine: 'No' }, item);

    })
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGPlatformNoticeView.alloc.initWithFrame:[setDataArray:].show', [NSValue.CGRectMake(20, 60, AppDefine.width - 40, AppDefine.height * 0.8)], [dataModel]);
        break;
      case 'android':
        ANHelper.callAsync(CMD.OPEN_POP_NOTICE, data.data);
        break;
    }

  }
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

  const [content, setContent] = useState("")
  const [] = useAutoRenewUserInfo(navigation)
  const [tbxIndex, setTbxIndex] = useState<number>(0)
  return (
    <HomeBase globalEvents={<MarqueePopupView onPress={() => {
      setShow(false)
    }} content={content} show={show} onDismiss={() => {
      setShow(false)
    }} />} loginPage={PageName.GDLoginPage} header={<View style={{ height: top }}></View>}
      backgroundSource={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/bg-black.png" }}>
      <Banner size={{ width: width - 20, height: 0 }} onlineSwitch={onlineSwitch} onlineNum={onlineNum} bannerData={banner} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: '#999999', fontSize: 12 }}>公告:</Text>
        <MarqueeHorizontal
          bgContainerStyle={{ backgroundColor: '#00000000', }}
          textStyle={{ color: "white", fontSize: 12 }}
          width={width - 50}
          height={34}
          speed={35}
          onTextClick={() => {
            setShow(true)
            setContent(originalNoticeString)
          }}

          textList={noticeFormat} />
      </View>

      <AcctountDetail />
      {homeGames?.data?.icons?.length > 0 ? <ScrollableTabView
        onChangeTab={({ i }) => {
          setTbxIndex(i)
        }}
        style={{ borderBottomWidth: 0, height: homeGames.data.icons[tbxIndex].name == "热门" || homeGames.data.icons[tbxIndex].name == '热门游戏' ? 900 : (Math.round(homeGames.data.icons[tbxIndex].list.length / 2)) * 143 + 20 }}
        initialPage={0}
        tabBarUnderlineStyle={{ backgroundColor: "#cfa461", marginBottom: 10, height: 2, }}
        tabBarTextStyle={{ fontSize: 13.2, textAlign: 'center' }}
        renderTabBar={() => <ScrollableTabBar style={{ borderWidth: 0, }} inactiveTextColor={'white'} activeTextColor={"#cfa461"} />}
      >
        {homeGames?.data?.icons?.map((res) => {
          return <TabContainer homeGames={homeGames} isHot={homeGames.data.icons[tbxIndex].name == "热门" || homeGames.data.icons[tbxIndex].name == '热门游戏'} tabLabel={res.name} data={res.list} />
        })}
      </ScrollableTabView> : null}
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10 }}>
        <View style={{ flexDirection: 'row' }} >
          <Image style={{ width: 13, height: 13, tintColor: 'white', marginRight: 5 }} source={{ uri: "礼品-(1)" }} />
          <Text style={{ color: 'white', fontWeight: "bold" }}>优惠活动</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => {
          push(PageName.JDPromotionListPage)
        }}>
          <Text style={{ color: 'white', fontWeight: "bold" }}>查看更多>></Text>
        </TouchableWithoutFeedback>
      </View>
      <FlatList style={{ marginTop: 10 }} data={couponListData?.data?.list?.filter((res, index) => index < 5)} renderItem={({ item, index }) => {
        return <View style={{ paddingHorizontal: 10, marginBottom: 10 }}>
          <TouchableWithoutFeedback onPress={onPopViewPress.bind(null, item, couponListData?.data?.style ?? 'popup', () => {
            if (selectId == index) {
              setSelectedId(-1)
            } else {
              setSelectedId(index)
            }
          })}>
            <View>
              <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5, color: 'white' }}>{item.title}</Text>
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
      <RankListCP timing={10000} backgroundColor={'white'} titleTextStyle={{
        color: 'white', fontWeight: "bold",
        fontSize: 14,
        marginLeft: -20
      }} textColor={'black'} width={width - 24} ranks={rankList} />

      <View style={{ height: 100 }}></View>

    </HomeBase>
  )
}

const TabContainer = ({ data, isHot, homeGames }: { data: List[], isHot: boolean, homeGames: HomeGamesModel }) => {
  const { width } = useDimensions().screen
  const userStore = UGStore.globalProps.userInfo;
  const { uid = "" } = userStore
  const thirdPartGamePress = (subIndex, index: number) => {
    if (uid == '') {
      navigate(PageName.GDLoginPage, {})
    } else {
      PushHelper.pushHomeGame(homeGames?.data?.icons?.[0]?.list?.[subIndex].subType[index])
    }

  }
  if (isHot) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ backgroundColor: "#282828", borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column', paddingTop: 20, }}>
            <Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{homeGames?.data?.icons?.[0]?.list?.[0]?.name}</Text>

            <FlatList keyExtractor={item => item.title}
              style={{ width: (width - 20) * 0.6 }}
              columnWrapperStyle={{ justifyContent: 'space-between', }} scrollEnabled={false} data={homeGames?.data?.icons?.[0]?.list[0].subType ?? []}
              numColumns={3} renderItem={({ item, index }) => {
                return <Text onPress={thirdPartGamePress.bind(null, 0, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</Text>
              }} />
          </View>
          <FastImage resizeMode={'contain'} style={{ width: 129, height: 106 }} source={{ uri: homeGames?.data?.icons?.[0]?.logo }} />
        </View>
        <View style={{ flexDirection: 'row' }}>

          <View style={{ backgroundColor: "#282828", flex: 1, borderRadius: 8, marginBottom: 10, marginRight: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', paddingVertical: 20, }}>
              <Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{homeGames?.data?.icons?.[0]?.list?.[1]?.name}</Text>
              <FlatList keyExtractor={item => item.title}
                scrollEnabled={false} data={homeGames?.data?.icons?.[0]?.list[1]?.subType ?? []}
                renderItem={({ item, index }) => {
                  return <Text onPress={thirdPartGamePress.bind(null, 1, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</Text>
                }} />
            </View>
            <FastImage resizeMode={'contain'} source={{ uri: homeGames?.data?.icons?.[1].logo }} style={{ width: 67, height: 104, }} />

          </View>

          <View style={{ backgroundColor: "#282828", flex: 1, borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', paddingVertical: 20, }}>
              <Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{homeGames?.data?.icons?.[0]?.list?.[2]?.name}</Text>
              <FlatList keyExtractor={item => item.title}
                scrollEnabled={false} data={homeGames?.data?.icons?.[0]?.list[2]?.subType ?? []}
                renderItem={({ item, index }) => {
                  return <Text onPress={thirdPartGamePress.bind(null, 2, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</Text>
                }} />
            </View>
            <FastImage resizeMode={'contain'} source={{ uri: homeGames?.data?.icons?.[1].logo }} style={{ width: 67, height: 104, }} />

          </View>


        </View>

        <View style={{ backgroundColor: "#282828", borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column', paddingTop: 20, }}>
            <Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{homeGames?.data?.icons?.[0]?.list?.[3]?.name}</Text>

            <FlatList keyExtractor={item => item.title}
              style={{ width: (width - 20) * 0.6 }}
              columnWrapperStyle={{ justifyContent: 'space-between', }} scrollEnabled={false} data={homeGames?.data?.icons?.[0]?.list[3]?.subType ?? []}
              numColumns={3} renderItem={({ item, index }) => {
                return <Text onPress={thirdPartGamePress.bind(null, 3, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</Text>
              }} />
          </View>
          <FastImage resizeMode={'contain'} style={{ width: 129, height: 106 }} source={{ uri: homeGames?.data?.icons?.[0]?.logo }} />
        </View>

        <View style={{ backgroundColor: "#282828", borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column', paddingTop: 20, }}>
            <Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{homeGames?.data?.icons?.[0]?.list?.[4]?.name}</Text>

            <FlatList keyExtractor={item => item.title}
              style={{ width: (width - 20) * 0.6 }}
              columnWrapperStyle={{ justifyContent: 'space-between', }} scrollEnabled={false} data={homeGames?.data?.icons?.[0]?.list[4]?.subType ?? []}
              numColumns={3} renderItem={({ item, index }) => {
                return <Text onPress={thirdPartGamePress.bind(null, 4, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</Text>
              }} />
          </View>
          <FastImage resizeMode={'contain'} style={{ width: 129, height: 106 }} source={{ uri: homeGames?.data?.icons?.[0]?.logo }} />
        </View>
        <View style={{ flexDirection: 'row' }}>

          <View style={{ backgroundColor: "#282828", flex: 1, borderRadius: 8, marginBottom: 10, marginRight: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', paddingVertical: 20, }}>
              <Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{homeGames?.data?.icons?.[0]?.list?.[5]?.name}</Text>
              <FlatList keyExtractor={item => item.title}
                scrollEnabled={false} data={homeGames?.data?.icons?.[0]?.list[5]?.subType ?? []}
                renderItem={({ item, index }) => {
                  return <Text onPress={thirdPartGamePress.bind(null, 5, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</Text>
                }} />
            </View>
            <FastImage resizeMode={'contain'} source={{ uri: homeGames?.data?.icons?.[1].logo }} style={{ width: 67, height: 104, }} />

          </View>

          <View style={{ backgroundColor: "#282828", flex: 1, borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'column', paddingVertical: 20, }}>
              <Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{homeGames?.data?.icons?.[0]?.list?.[6]?.name}</Text>
              <FlatList keyExtractor={item => item.title}
                scrollEnabled={false} data={homeGames?.data?.icons?.[0]?.list[6]?.subType ?? []}
                renderItem={({ item, index }) => {
                  return <Text onPress={thirdPartGamePress.bind(null, 6, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</Text>
                }} />
            </View>
            <FastImage resizeMode={'contain'} source={{ uri: homeGames?.data?.icons?.[1].logo }} style={{ width: 67, height: 104, }} />

          </View>


        </View>
        <View style={{ backgroundColor: "#282828", borderRadius: 8, marginBottom: 10, paddingHorizontal: 10, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column', paddingTop: 20, }}>
            <Text style={{ color: "#D3D3D3", fontSize: 17, fontWeight: 'bold', marginBottom: 20 }}>{homeGames?.data?.icons?.[0]?.list?.[7]?.name}</Text>

            <FlatList keyExtractor={item => item.title}
              style={{ width: (width - 20) * 0.6 }}
              columnWrapperStyle={{ justifyContent: 'space-between', }} scrollEnabled={false} data={homeGames?.data?.icons?.[0]?.list[7]?.subType ?? []}
              numColumns={3} renderItem={({ item, index }) => {
                return <Text onPress={thirdPartGamePress.bind(null, 7, index)} style={{ color: "#676767", marginBottom: 20, marginRight: 5 }}>{item.title}</Text>
              }} />
          </View>
          <FastImage resizeMode={'contain'} style={{ width: 129, height: 106 }} source={{ uri: homeGames?.data?.icons?.[0]?.logo }} />
        </View>
      </View>
    )
  } else {
    return (

      <FlatList style={{ flex: 1 }} scrollEnabled={false} numColumns={2} renderItem={({ item }) => {
        return (
          <TouchableOpacity onPress={() => {
            PushHelper.pushHomeGame(item)
          }} style={{ width: (width - 20) / 2 }}>
            <FastImage source={{ uri: item.logo }} style={{ width: (width - 20) / 2, aspectRatio: 1.44, marginBottom: 20 }} />
          </TouchableOpacity>

        )
      }} data={data ?? []} />
    )
  }

}


const AcctountDetail = () => {
  const userStore = UGStore.globalProps.userInfo
  const { uid = "", balance = 0 } = userStore
  const [hideAmount, setHideAmount] = useState(false)
  const requestBalance = async () => {
    try {
      //@ts-ignore
      const { data, status } = await APIRouter.user_balance_token()
      UGStore.dispatch({ type: 'merge', userInfo: { balance: data.data.balance } });
    } catch (error) {

    }
  }
  const testPlay = async () => {
    try {
      OCHelper.call('SVProgressHUD.showWithStatus:', ['正在登录...']);
      const { data, status } = await APIRouter.user_guestLogin()
      debugger
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

  if (uid != "") {
    return (
      <View style={{ width: "100%", backgroundColor: "#2a2a2a", borderRadius: 8 }}>
        <View style={{ height: 38, paddingHorizontal: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <FastImage style={{ width: 25, height: 25, borderRadius: 12.6 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/money-2.png" }} />
            <Text style={{ color: '#a0a0a0', fontSize: 13.2, marginLeft: 3 }}>{userStore.curLevelTitle}</Text>
            <View style={{ height: 18, backgroundColor: "#cfa461", padding: 3, borderRadius: 2, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }}>
              <Text style={{ fontSize: 12 }}>{userStore.curLevelGrade}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => {
            push(PageName.JDPromotionListPage)
          }}>
            <FastImage style={{ width: 86, height: 24 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/yhdh.png" }} />
          </TouchableOpacity>
        </View>
        <View style={{ backgroundColor: "#242424", flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-start', paddingLeft: 20, paddingVertical: 10 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontSize: 12.54, color: "#676767" }}>账户余额</Text>
            <TouchableOpacity onPress={() => {
              setHideAmount(hideAmount => !hideAmount)
            }}>
              <Icon name={hideAmount ? 'md-eye-off' : 'md-eye'} type="ionicon" size={15} color={"rgba(255, 255, 255, 0.3)"} containerStyle={{ marginLeft: 15, marginRight: 4 }} />
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 27.5, color: "#cfa461" }}>{hideAmount ? getHideAmount() : userStore.balance}</Text>
        </View>
        <View style={{ height: 38, paddingLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
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
      </View>
    )
  } else {
    return <View style={{ width: "100%", backgroundColor: "#2a2a2a", borderRadius: 8 }}>
      <View style={{ height: 38, paddingLeft: 20, flexDirection: 'row', alignItems: 'center' }}>
        <FastImage style={{ width: 25, height: 25, borderRadius: 12.6 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/money-2.png" }} />
        <Text style={{ color: '#a0a0a0', fontSize: 13.2, marginLeft: 3 }}>尊敬的来宾，您好，请登录</Text>
      </View>
      <View style={{ height: 66, backgroundColor: "#242424", flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => {
          navigate(PageName.GDLoginPage, {})
        }} style={{ backgroundColor: '#cfa461', width: 115, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
          <Text style={{ color: 'white', fontSize: 16.5, marginLeft: 3 }}>登录A</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
          navigate(PageName.GDRegisterPage, {})
        }} style={{ borderWidth: 1, borderColor: '#cfa461', width: 115, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 4 }}>
          <Text style={{ color: '#cfa461', fontSize: 16.5, marginLeft: 3 }}>注册</Text>
        </TouchableOpacity>
      </View>
      <View style={{ height: 38, paddingLeft: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
        <Text style={{ color: '#a0a0a0', fontSize: 12, marginLeft: 3 }}>忘记密码</Text>
        <TouchableOpacity onPress={testPlay}>
          <Text style={{ color: '#cfa461', fontSize: 12, marginLeft: 3 }}>免费试玩</Text>
        </TouchableOpacity>
      </View>
    </View>
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
export default GDBHomePage
