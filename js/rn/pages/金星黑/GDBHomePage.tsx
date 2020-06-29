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
import HomeBase from "../../public/components/HomeBase"
const GDBHomePage = ({ navigation }) => {
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
  const [tbxIndex, setTbxIndex] = useState<number>(0)
  return (
    <HomeBase loginPage={PageName.GDLoginPage} header={<View style={{ height: top }}></View>}
      backgroundSource={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/bg-black.png" }}>
      <Banner onlineNum={onlineNum} bannerData={banner} />
      <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: '#999999', fontSize: 12 }}>公告:</Text>
        <MarqueeHorizontal
          bgContainerStyle={{ backgroundColor: '#00000000', }}
          textStyle={{ color: "white", fontSize: 12 }}
          width={width - 50}
          height={34}
          speed={60}
          onTextClick={() => {
            PushHelper.pushNoticePopUp(originalNoticeString)
          }}

          textList={noticeFormat} />
      </View>

      <AcctountDetail />
      {homeGames?.data?.icons?.length > 0 ? <ScrollableTabView
        onChangeTab={({ i }) => {
          setTbxIndex(i)
        }}
        style={{ marginTop: 20, borderBottomWidth: 0, height: (Math.round(homeGames.data.icons[tbxIndex].list.length / 2)) * 143 + 20 }}
        initialPage={0}
        tabBarUnderlineStyle={{ backgroundColor: "#cfa461", marginBottom: 10, height: 2, width: 49 / 2, marginLeft: (49 / 2) - 3.5 }}
        renderTabBar={() => <ScrollableTabBar style={{ borderWidth: 0, }} inactiveTextColor={'white'} activeTextColor={"#cfa461"} />}
      >
        {homeGames?.data?.icons?.map((res) => {
          return <TabContainer isHot={homeGames.data.icons[tbxIndex].name == "热门"} tabLabel={res.name} data={res.list} />
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
      <FlatList style={{ marginTop: 20 }} data={couponListData?.data?.list?.filter((res, index) => index < 3)} renderItem={({ item }) => {
        return <TouchableWithoutFeedback onPress={onPopViewPress.bind(null, item, couponListData?.data?.style ?? 'popup')}>
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white', alignSelf: 'flex-start', marginLeft: 10, marginBottom: 5 }}>{item.title}</Text>
            <FastImageAutoHeight resizeMode={"contain"} style={{ width: width - 40, marginBottom: 10 }} source={{ uri: item.pic }} />
          </View>
        </TouchableWithoutFeedback>
      }} />

      <View style={{ flexDirection: 'row', alignItems: 'center' }} >
        <Image style={{ width: 15, height: 15, tintColor: 'white', marginRight: 5 }} source={{ uri: "outline_analytics_black_18dp" }} />
        <Text style={{ color: 'white', fontWeight: "bold" }}>投注排行榜</Text>
      </View>
      {systemStore.rankingListSwitch == 0 ? null : <View >
        <View style={{ flexDirection: 'row', marginTop: 20 }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>用户名称</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>游戏名称</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ color: 'white' }}>投注金额</Text>
          </View>
        </View>
        <FlatList keyExtractor={(item, index) => {
          return item.username + index
        }} style={{ marginTop: 20, height: 200 }} data={rankList?.data?.list ?? []} renderItem={({ item }) => {
          return <View style={{ flexDirection: 'row', }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>{item.username}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>{item.type}</Text>
            </View>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white' }}>{item.coin}</Text>
            </View>
          </View>
        }} />
      </View>}
      <View style={{ height: 50 }}></View>
    </HomeBase>
  )
}
const TabContainer = ({ data, isHot }: { data: List[], isHot: boolean }) => {
  const { width } = useDimensions().screen
  if (isHot) {
    return <View style={{ backgroundColor: "#282828", width: width - 20, borderRadius: 8, paddingVertical: 20, paddingHorizontal: 10 }}>
      <Text style={{ color: '#d3d3d3', fontSize: 25 }}> 热门游戏</Text>
      <View style={{ flexDirection: 'row', marginVertical: 20 }}>
        <Text style={{ color: "#676767", fontSize: 14 }}>北京赛车     </Text>
        <Text style={{ color: "#676767", fontSize: 14 }}>开元棋牌     </Text>
        <Text style={{ color: "#676767", fontSize: 14 }}>AG视讯</Text>
      </View>
      <View style={{ flexDirection: 'row' }}>
        <Text style={{ color: "#676767", fontSize: 14 }}>开心捕鱼     </Text>
        <Text style={{ color: "#676767", fontSize: 14 }}>JDB电子     </Text>
        <Text style={{ color: "#676767", fontSize: 14 }}>IBC沙巴</Text>
      </View>
      <FastImage style={{ width: 129, height: 106, position: 'absolute', right: 10, bottom: 20 }} source={{ uri: "http://test05.6yc.com/views/mobileTemplate/18/images/01.png" }} />
    </View>
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
const Banner = ({ bannerData, onlineNum = 0 }: { bannerData: BannerModel, onlineNum: number }) => {
  const { width, } = useDimensions().window
  const BannerRef = useRef<Carousel>()
  const [height, setHeight] = useState(100)
  useEffect(() => {
    const timer = setInterval(() => {
      //@ts-ignore
      BannerRef?.current?.gotoNextPage()
    }, 2000);
    return (() => {
      clearInterval(timer)
    })
  }, [bannerData])
  if (bannerData?.data?.list?.length > 0) {
    return (
      <View style={{ marginBottom: 10, }}>

        <Carousel
          autoplay
          index={0}
          ref={BannerRef}
          loop
          pageSize={width - 20}
        >
          {bannerData?.data?.list?.map((res, index) => {
            return <FastImage onLoad={(e) => {
              console.log(e.nativeEvent.height, e.nativeEvent.width, e.nativeEvent.height * ((width - 20) / e.nativeEvent.width))
              setHeight(e.nativeEvent.height * ((width - 20) / e.nativeEvent.width))

            }} key={'banner' + index} style={{ width: width - 20, height: height, borderRadius: 10 }} source={{ uri: res.pic }} >

            </FastImage>
          })}
        </Carousel>
        <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 5 }}>
          <Text style={{ color: 'white' }}>当前在线:{onlineNum}</Text>
        </View>
      </View>
    )

  } else {
    return <View style={{ height: (Dimensions.get("screen").width - 20) / 2, }}></View>
  }

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
            <Text style={{ fontSize: 18, color: "#676767" }}>账户余额</Text>
            <TouchableOpacity onPress={() => {
              setHideAmount(hideAmount => !hideAmount)
            }}>
              <Icon name={!hideAmount ? 'md-eye-off' : 'md-eye'} type="ionicon" size={22} color={"rgba(255, 255, 255, 0.3)"} containerStyle={{ marginLeft: 15, marginRight: 4 }} />
            </TouchableOpacity>
          </View>

          <Text style={{ fontSize: 40, color: "#cfa461" }}>{hideAmount ? getHideAmount() : userStore.balance}</Text>
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
          <Text style={{ color: 'white', fontSize: 16.5, marginLeft: 3 }}>登录</Text>
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
const styles = StyleSheet.create({
  buttonContainer: {
    flex: 1,
    marginRight: 5,
  }
})
export default GDBHomePage