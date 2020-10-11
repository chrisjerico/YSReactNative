import * as React from "react"
import { useEffect, useState } from "react"
import {
  Alert,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  Platform,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native"
import Icon from "react-native-vector-icons/FontAwesome"
import { HomeHeaderButtonBar } from "./component/homePage/HomeHeaderButtonBar"
import { HomeTabView } from "./component/homePage/homeTabView/HomeTabView"
import useGetHomeInfo from "../../public/hooks/useGetHomeInfo"
import { navigate, push } from "../../public/navigation/RootNavigation"
import { PageName } from "../../public/navigation/Navigation"
import { useDimensions } from "@react-native-community/hooks"
import { OCHelper } from "../../public/define/OCHelper/OCHelper"
import { PromotionsModel } from "../../public/network/Model/PromotionsModel"
import APIRouter from "../../public/network/APIRouter"
import usePopUpView from "../../public/hooks/usePopUpView"
import AutoHeightWebView from "react-native-autoheight-webview"
import FastImage from "react-native-fast-image"
import RedBagItem from "../../public/components/RedBagItem"
import { UGStore } from "../../redux/store/UGStore"
import { TurntableListModel } from "../../public/network/Model/TurntableListModel"
import { NSValue } from "../../public/define/OCHelper/OCBridge/OCCall"
import AppDefine from "../../public/define/AppDefine"
import PushHelper from "../../public/define/PushHelper"
import { updateUserInfo } from "../../redux/store/IGlobalStateHelper"
import { ActionType } from "../../redux/store/ActionTypes"
import PromotionsBlock from "../../public/components/PromotionsBlock"
import RankListCP from "../../public/widget/RankList"
import { MarqueeHorizontal } from "react-native-marquee-ab"
import Carousel from "react-native-banner-carousel"
import { BannerModel } from "../../public/network/Model/BannerModel"
import { httpClient } from "../../public/network/httpClient"
import { ANHelper } from "../../public/define/ANHelper/ANHelper"
import { CMD } from "../../public/define/ANHelper/hp/CmdDefine"
import { NA_DATA } from "../../public/define/ANHelper/hp/DataDefine"
import { HomeADModel } from "../../public/network/Model/HomeADModel"
import GameButton from "../../public/views/tars/GameButton"
import { scale } from "../../public/tools/Scale"
import NavBlock from "./component/homePage/NavBlock"

const LCHomePage = ({ navigation }) => {
  const { banner, notice, rankList, redBag, onlineNum, onRefresh, loading, systemHomeAds, homeGames } = useGetHomeInfo()
  const [categories, setCategories] = useState<string[]>()
  const { webName, rankingListSwitch } = UGStore.globalProps.sysConf
  const [promotionData, setPromotionData] = useState<PromotionsModel>()
  const { width } = useDimensions().screen
  const [originalNoticeString, setOriginalNoticeString] = useState<string>()
  const [noticeFormat, setnoticeFormat] = useState<{ label: string, value: string }[]>()
  const [show, setShow] = useState(false)
  const [content, setContent] = useState("")
  const [randomString, setRandomString] = useState(`¥ 2${(Math.random() * 100000).toFixed(2)}`)
  useEffect(() => {
    initPromotions()
    const timer = setInterval(() => {
      getRandomString()
    }, 500)
    return (() => clearInterval(timer))
  }, [])

  const getRandomString = () => {
    const num = ((2 + Math.random()) * 100000).toFixed(2)
    setRandomString("¥ " + num)
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

  const openPopup = (data: any) => {
    const dataModel = data.data?.popup.map((item, index) => {
      return Object.assign({ clsName: "UGNoticeModel", hiddenBottomLine: "No" }, item)

    })
    switch (Platform.OS) {
      case "ios":
        OCHelper.call("UGPlatformNoticeView.alloc.initWithFrame:[setDataArray:].show", [NSValue.CGRectMake(20, 60, AppDefine.width - 40, AppDefine.height * 0.8)], [dataModel])
        break
      case "android":
        ANHelper.callAsync(CMD.OPEN_POP_NOTICE, data.data)
        break
    }
  }
  const reloadData = async () => {
    let user

    switch (Platform.OS) {
      case "ios":
        user = await OCHelper.call("UGUserModel.currentUser")
        break
      case "android":
        user = await ANHelper.callAsync(CMD.LOAD_DATA, { key: NA_DATA.USER_INFO })
        break
    }

    if (!user) {
      UGStore.dispatch({ type: ActionType.Clear_User })
      UGStore.save()
    } else {
      UGStore.dispatch({ type: ActionType.UpdateUserInfo, props: user })
      UGStore.save()
    }
  }
  useEffect(() => {
    const timer = setInterval(() => {
      reloadData()
      updateUserInfo()
    }, 2000)
    return (() => {
      clearInterval(timer)
    })
  }, [])
  const initPromotions = async () => {
    try {
      const { data, status } = await APIRouter.system_promotions()
      debugger
      setPromotionData(data)
      let categoriesArray = []
      data.data.list.map((res) => {
        categoriesArray.push(res.category)
      })
      categoriesArray = [...new Set(categoriesArray)]
      categoriesArray.sort()
      setCategories(categoriesArray)
    } catch (error) {
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <HomeHeaderButtonBar/>
      <ScrollView showsVerticalScrollIndicator={false}
                  refreshControl={<RefreshControl style={{ backgroundColor: "#ffffff" }} refreshing={loading}
                                                  onRefresh={onRefresh}/>}
      >
        <Banner onlineNum={onlineNum} bannerData={banner}/>
        <View style={{
          flexDirection: "row",
          alignItems: "center",
          backgroundColor: "white",
          marginHorizontal: 10,
          marginVertical: 10,
          borderRadius: 16,
          paddingLeft: 5,
        }}>
          <FastImage source={{ uri: "http://test61f.fhptcdn.com/views/mobileTemplate/19/images/notice.png" }}
                     style={{ width: 12, height: 12, marginRight: 4 }}/>
          <MarqueeHorizontal textStyle={{ color: "black", fontSize: 16 }}
                             bgContainerStyle={{ backgroundColor: "white" }}
                             width={width - 50}
                             height={18}
                             speed={60}
                             onTextClick={() => {
                               setShow(true)
                               setContent(originalNoticeString)
                             }}
                             textList={noticeFormat}/>
        </View>
        {systemHomeAds?.data &&
        <Banner onlineNum={onlineNum} bannerData={systemHomeAds} showOnlineCount={false} customHeight={150}/>}
        {homeGames?.data?.navs?.length > 0 && (
          <NavBlock
            navs={homeGames?.data?.navs?.sort((a: any, b: any) => a.sort - b.sort)?.slice(0, 4)}
            containerStyle={{ alignItems: "center" }}
            renderNav={(item, index) => {
              const { icon, name, logo, gameId } = item
              return (
                <GameButton
                  showSecondLevelIcon={false}
                  key={index}
                  containerStyle={{ width: "25%" }}
                  imageContainerStyle={{ width: "45%" }}
                  enableCircle={false}
                  logo={icon ? icon : logo}
                  title={name}
                  titleStyle={{ fontSize: scale(25) }}
                  titleContainerStyle={{ aspectRatio: 3 }}
                  onPress={() => {
                    if (gameId == 9) {
                      push(PageName.JDPromotionListPage, {
                        containerStyle: {
                          backgroundColor: "#ffffff",
                        },
                      })
                    } else {
                      PushHelper.pushHomeGame(item)
                    }
                  }}
                />
              )
            }}
          />
        )}
        <HomeTabView/>
        <View style={{ flexDirection: "row", alignItems: "center", marginHorizontal: 10 }}>
          <Icon style={{ paddingRight: 4 }} size={16} name={"gift"}/>
          <TouchableWithoutFeedback onPress={() => {
            push(PageName.PromotionListPage)
          }}>
            <Text style={{ fontSize: 16, color: "#333333", lineHeight: 22, marginVertical: 10 }}>优惠活动</Text>
          </TouchableWithoutFeedback>
          <View style={{ flex: 1 }}/>
          <TouchableWithoutFeedback onPress={() => {
            push(PageName.PromotionListPage)
          }}>
            <Text style={{ fontSize: 16, color: "#333333", textAlign: "center" }}>查看更多>></Text>
          </TouchableWithoutFeedback>
        </View>
        <View>
          <PromotionsBlock/>
        </View>
        {rankingListSwitch === 1 ? <SafeAreaView style={{ marginHorizontal: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon style={{ paddingRight: 4 }} size={16} name={"bar-chart-o"}/>
              <Text style={{ fontSize: 16, lineHeight: 22, color: "#3c3c3c", marginVertical: 10 }}>中奖排行榜</Text>
            </View>
            <RankListCP titleVisible={false} timing={10000} backgroundColor={"white"} textColor={"black"}
                        width={Dimensions.get("screen").width - 24} ranks={rankList}/>
          </SafeAreaView> :
          <SafeAreaView style={{ marginHorizontal: 10 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Icon style={{ paddingRight: 4 }} size={16} name={"bar-chart-o"}/>
              <Text style={{
                fontSize: 16,
                lineHeight: 22,
                color: "#3c3c3c",
                marginVertical: 10,
              }}>投注排行榜</Text>
            </View>
            <RankListCP titleVisible={false} timing={5000} backgroundColor={"white"} textColor={"black"}
                        width={Dimensions.get("screen").width - 24} ranks={rankList}/>
          </SafeAreaView>}
        <View style={{ flexDirection: "row", justifyContent: "center", marginTop: 10 }}>
          <Text onPress={() => {
            PushHelper.openWebView(httpClient.defaults.baseURL + "/index2.php")
          }} style={{ color: "black", textAlign: "center", marginRight: 20, marginBottom: 5 }}>💻 电 脑 版</Text>
          <Text style={{ color: "black", textAlign: "center" }} onPress={() => {
            push(PageName.PromotionListPage)
          }}>🎁优惠活动</Text>
        </View>
        <Text style={{ color: "black", textAlign: "center" }}>COPYRIGHT © {webName} RESERVED</Text>
        <Text style={{ color: "#000000", textAlign: "center" }}>{"VERSION : 02"}</Text>
        <View style={{ height: 100 }}/>
      </ScrollView>
      <RedBagItem redBag={redBag}/>
      <TurntableListItem/>
      <MarqueePopupView onPress={() => {
        setShow(false)
      }} content={content} show={show} onDismiss={() => {
        setShow(false)
      }}/>
    </View>
  )
}

const PromotionLists = ({ dataSource, filter, promotionData }: { dataSource: PromotionsModel, filter?: string, promotionData: PromotionsModel }) => {
  const [selectId, setSelectedId] = useState(-1)
  const { width } = useDimensions().window
  const { onPopViewPress } = usePopUpView()
  const webViewSource = (item: any) => {
    return {
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
          </script>` + item.content,
    }
  }
  return (
    <FlatList
      style={{ backgroundColor: "#ffffff", borderRadius: 10 }}
      keyExtractor={(item, index) => `LCHome` + item.id + index}
      data={filter != "0" ? dataSource.data.list.filter((res, index) => res.category == filter) : dataSource?.data?.list}
      renderItem={({ item, index }) => {
        return <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
          <TouchableWithoutFeedback
            onPress={onPopViewPress.bind(null, item, promotionData?.data?.style ?? "popup", () => {
              if (selectId == index) {
                setSelectedId(-1)
              } else {
                setSelectedId(index)
              }
            })}>
            <View style={{}}>
              <Text style={{
                fontSize: 16,
                marginBottom: 5,
              }}>{item.title}</Text>
              <FastImage style={{ width: Dimensions.get("screen").width - 16, height: 350 }}
                         source={{ uri: item.pic }}/>
            </View>
          </TouchableWithoutFeedback>
          {selectId == index ? <AutoHeightWebView
            style={{ width: width - 20, backgroundColor: "white" }}
            viewportContent={"width=device-width, user-scalable=no"}
            source={webViewSource(item)}/> : null
          }
        </View>
      }}/>
  )
}
const MarqueePopupView = ({ content, show, onPress, onDismiss }) => {
  const { width, height } = useDimensions().screen
  if (show) {
    return (
      <View style={{
        width,
        height,
        position: "absolute",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
        marginBottom: 10,
        backgroundColor: "rgba(153,153,153,0.5)",
      }}>
        <View style={{ width: "90%", height: "45%"}}>
          <View style={{
            width: "100%",
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderBottomColor: "#cccccc",
            borderBottomWidth: 0.5,
            borderTopRightRadius: 15,
            borderTopLeftRadius: 15,
            backgroundColor: "rgba(246,246,246, 0.95)"
          }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>公告</Text>
          </View>
          <View style={{ flex: 1, paddingHorizontal: 10, backgroundColor: "white" }}>
            <AutoHeightWebView style={{ width: width * 0.9 - 20, marginVertical: 8 }} source={{ html: content }}/>
          </View>
          <View style={{
            height: 70,
            paddingBottom: 10,
            paddingHorizontal: 5,
            justifyContent: "space-between",
            width: "100%",
            backgroundColor: "white",
            flexDirection: "row",
            borderBottomRightRadius: 15,
            borderBottomLeftRadius: 15,
          }}>
            <TouchableWithoutFeedback onPress={onDismiss}>
              <View style={{
                flex: 1, justifyContent: "center", alignItems: "center",
                height: 50,
                backgroundColor: "white",
                borderRadius: 5,
                borderColor: "#cccccc",
                borderWidth: 0.5,
                marginHorizontal: 10
              }}>
                <Text>取消</Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={onPress}>
              <View style={{
                justifyContent: "center",
                alignItems: "center",
                height: 50,
                backgroundColor: "#FE8A23",
                borderRadius: 5,
                borderColor: "gray",
                flex: 1,
                marginHorizontal: 10
              }}>
                <Text style={{ color: "white" }}>确定</Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>

      </View>
    )
  } else {
    return null
  }

}
const TurntableListItem = () => {
  const { width, height } = useDimensions().screen
  const { isTest = false, uid = "" } = UGStore.globalProps.userInfo
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
            {
              text: "取消", onPress: () => {
              }, style: "cancel",
            },
            {
              text: "马上登录", onPress: () => {
                navigate(PageName.ZLLoginPage, {})
              },
            },
          ])
        } else if (isTest) {
          Alert.alert("温馨提示", "请先登录您的正式帐号", [
            {
              text: "取消", onPress: () => {
              }, style: "cancel",
            },
            {
              text: "马上登录", onPress: () => PushHelper.pushLogin(),
            },
          ])
        } else {
          if (Platform.OS != "ios") return
          const turntableListModel = Object.assign({ clsName: "DZPModel" }, turntableList?.[0])
          OCHelper.call(({ vc }) => ({
            vc: {
              selectors: "DZPMainView.alloc.initWithFrame:[setItem:]",
              args1: [NSValue.CGRectMake(100, 100, AppDefine.width - 60, AppDefine.height - 60)],
              args2: [turntableListModel],
            },
            ret: {
              selectors: "SGBrowserView.showMoveView:yDistance:",
              args1: [vc, 100],
            },
          }))
        }
      }}>
        <ImageBackground style={{ width: 95, height: 95, position: "absolute", top: height / 2, right: 20 }}
                         source={{ uri: "dzp_btn" }}>
          <TouchableWithoutFeedback onPress={() => {
            setTurntableListVisiable(false)
          }}>
            <Image style={{ width: 20, height: 20, right: 0, top: 0, position: "absolute" }}
                   source={{ uri: "dialog_close" }}/>
          </TouchableWithoutFeedback>
        </ImageBackground>
      </TouchableWithoutFeedback>)
  } else {
    return null
  }

}
const Banner = ({ bannerData, onlineNum = 0, showOnlineCount = true, customHeight }: { bannerData: BannerModel | HomeADModel, onlineNum: number, showOnlineCount?: boolean, customHeight?: number }) => {
  const { width } = useDimensions().window
  const BannerRef = React.useRef<Carousel>()
  const [height, setHeight] = useState(100)
  useEffect(() => {
    const timer = setInterval(() => {
        //@ts-ignore
        BannerRef?.current?.gotoNextPage()
      },
      bannerData?.data?.interval ?
        parseInt(bannerData?.data?.interval) : parseInt(bannerData?.info?.runtime) ? parseInt(bannerData?.info?.runtime) : 2000)
    return (() => {
      clearInterval(timer)
    })
  }, [bannerData])

  useEffect(() => {
    customHeight && setHeight(customHeight)
  }, [customHeight])

  if (bannerData?.data?.list?.length > 0 || bannerData?.data?.length > 0) {
    return (
      <View style={{ marginBottom: 10 }}>
        <Carousel
          autoplay
          index={0}
          ref={BannerRef}
          loop
          pageSize={width}
        >
          {bannerData?.data?.list ? bannerData?.data?.list?.map((res, index) => {
            return (
              <TouchableWithoutFeedback onPress={() => {
                PushHelper.pushCategory(res.linkCategory, res.linkPosition)
              }}>
                <FastImage onLoad={(e) => {
                  setHeight(e.nativeEvent.height * ((width) / e.nativeEvent.width))
                }} key={"banner" + index} style={{ width: width, height: height }}
                           source={{ uri: res.pic }}>

                </FastImage>
              </TouchableWithoutFeedback>)
          }) : bannerData?.data?.map((res, index) => {
            return (
              <TouchableWithoutFeedback onPress={() => {
                PushHelper.pushCategory(res.linkCategory, res.linkPosition)
              }}>
                <FastImage onLoad={(e) => {
                  setHeight(e.nativeEvent.height * ((width) / e.nativeEvent.width))
                }} key={"banner" + index} style={{ width: width, height: height }}
                           source={{ uri: res.image }}>

                </FastImage>
              </TouchableWithoutFeedback>)
          })}
        </Carousel>
        {showOnlineCount && <View style={{
          position: "absolute",
          top: 10,
          right: 10,
          backgroundColor: "rgba(0,0,0,0.2)",
          borderRadius: 16,
          padding: 5,
        }}>
          <Text style={{ color: "white" }}>当前在线:{onlineNum}</Text>
        </View>}
      </View>
    )
  } else {
    return <View style={{ height: (Dimensions.get("screen").width) / 2 }}/>
  }

}
export default LCHomePage
