import { View, Dimensions, TouchableWithoutFeedback, Text, TouchableOpacity, FlatList, Image, Platform, Animated, } from "react-native"
import React, { useEffect, useRef, useState, useMemo } from 'react';
import useGetHomeInfo from "../../../public/hooks/useGetHomeInfo";

import Carousel from "react-native-banner-carousel";
import { useDimensions } from "@react-native-community/hooks";
import { BannerModel } from "../../../public/network/Model/BannerModel";
import PushHelper from "../../../public/define/PushHelper";
import FastImage, { FastImageProperties } from "react-native-fast-image";
import { Icon, Button } from 'react-native-elements';
import { MarqueeHorizontal } from 'react-native-marquee-ab';
import AutoHeightWebView from "react-native-autoheight-webview";

import Header from "./Header";
import { NavBtn, navBarConfig } from "./HomeConfig";

import ScrollableTabView, { ScrollableTabBar } from "react-native-scrollable-tab-view";
import TabContainer from "./GameContainer";
import HomeBase from "../../../public/components/HomeBase";
import { PageName } from "../../../public/navigation/Navigation";

import usePopUpView from "../../../public/hooks/usePopUpView";
import AppDefine from "../../../public/define/AppDefine";
import { push } from "../../../public/navigation/RootNavigation";

import { useLanguageContext } from "../../../public/context/LanguageContextProvider";
import RankListCP from "../../../public/widget/RankList";
import useSpriteImage from "../../../public/hooks/useSpriteImage";

const VietnamHomePage = () => {
  const { banner, notice, homeGames, couponListData, rankList, redBag, floatAds, onlineNum, loading, onRefresh, noticeFormat, originalNoticeString } = useGetHomeInfo()
  const [show, setShow] = useState(false)
  const [content, setContent] = useState("")
  const [navBarData, setNavBarData] = useState([])
  const [scollViewWidth, setScrollViewWidth] = useState(0)
  const [currentPosition, setCurrentPosition] = useState(0)
  const { width, height } = useDimensions().screen
  const [selectId, setSelectedId] = useState(-1)
  const { onPopViewPress } = usePopUpView()
  const { currcentLanguagePackage } = useLanguageContext()
  const { imageArray } = useSpriteImage({
    source: "http://test24.6yc.com/views/mobileTemplate/24/images/icon_game_type.png",
    size: {
      width: 100, height: 100
    },
    offset: {
      width: 100, height: 100
    },
    rowNum: 5,
    columnNum: 2
  })
  useEffect(() => {
    if (imageArray.length > 0) {
      let temp = []
      for (let index = 0; index < NavBtn.length; index++) {
        console.log(NavBtn[index])
        temp.push({
          title: NavBtn[index].title,
          image: imageArray[NavBtn[index].imageIndex]
        })
      }
      setNavBarData(temp)
    }
  }, [imageArray])
  const handleScroll = (event) => {
    setCurrentPosition((event.nativeEvent.contentOffset.x / scollViewWidth) * 150)
  }
  const onContentSizeChange = (w, h) => {
    setScrollViewWidth(w)
  }
  const [tbxIndex, setTbxIndex] = useState<number>(0)
  const [scrollableTabViewHeight, setScrollableTabViewHeight] = useState(0)
  useEffect(() => {
    console.log(homeGames)
    if (Array.isArray(homeGames?.data?.icons) && homeGames?.data?.icons.length > 0 && tbxIndex < navBarConfig.length) {
      let index = homeGames.data.icons.map((res) => res.id).indexOf(navBarConfig[tbxIndex].id)
      if (index != -1) {
        let dataLength = homeGames.data.icons[index].list.length
        setScrollableTabViewHeight(dataLength * 105 + 30)
      } else {
        setScrollableTabViewHeight(100)
      }

    } else {
      setScrollableTabViewHeight(100)
    }
    homeGames?.data?.icons?.filter((res) => res?.id == navBarConfig?.[tbxIndex]?.id)?.[0]?.list?.length * 105 + 30 ?? 100
  }, [tbxIndex, homeGames])
  return (
    <HomeBase loginPage={PageName.VietnamLogin} needPadding={false} backgroundColor={'white'} header={<Header />} marginTop={46}>
      <View style={{ alignItems: 'center', }}>
        <Banner bannerData={banner} onlineNum={onlineNum} />
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingLeft: -5 }}>
          <Icon name="ios-volume-high" type="ionicon" color="#646f95" size={24} />
          <MarqueeHorizontal textStyle={{ color: "white", fontSize: 13.2 }} bgContainerStyle={{ backgroundColor: 'white' }}
            width={width - 60}
            height={34}
            speed={40}
            onTextClick={() => {
              setShow(true)
              setContent(originalNoticeString)
              PushHelper.pushNoticePopUp(originalNoticeString)
            }}

            textList={noticeFormat} />
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
          <FlatList keyExtractor={(item, index) => item.title + index}
            onContentSizeChange={onContentSizeChange} onScroll={handleScroll} showsHorizontalScrollIndicator={false} horizontal={true} data={navBarData} renderItem={({ item, index }) => {
              return (
                <TouchableWithoutFeedback onPress={() => {
                  switch (index) {
                    case 0:
                    case 1:
                    case 2:
                    case 3:
                    case 4:
                      push(PageName.VietnamGameList, { homeGames: homeGames, index })
                      break;
                    // push(PageName)
                    case 5:
                      push(PageName.PromotionListPage)
                      break
                    // PushHelper.pushCategory("70")
                    default:
                      break;
                  }
                }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 10 }}>
                    <FastImage source={{ uri: item.image }} style={{ width: 50, height: 50, marginBottom: 5 }} />
                    <Text numberOfLines={2} style={{ color: "#8a8d96", fontSize: 12, width: 50, textAlign: 'center' }}>{currcentLanguagePackage?.[item?.title]}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )
            }} />
          <View style={{ width: 50, height: 2, backgroundColor: "#d8d8d8", alignSelf: 'center', marginVertical: 10, overflow: "hidden" }}>
            <View style={{ width: 25, height: 2, backgroundColor: "#71abff", position: "absolute", left: currentPosition }}></View>
          </View>
        </View>
        {homeGames?.data?.icons?.length > 0 ? <View style={{
          width: width - 24,
          minHeight: 100, marginBottom: 10, backgroundColor: 'white',
          alignSelf: 'center', borderRadius: 8, shadowColor: "#444",
          shadowOpacity: 0.2,
          shadowRadius: 2,
          shadowOffset: {
            height: 0,
            width: 0,
          },
          paddingHorizontal: 5
        }}>
          {homeGames?.data?.icons?.length > 0 ? <ScrollableTabView
            onChangeTab={({ i }) => {
              setTbxIndex(i)
            }}
            style={{
              borderBottomWidth: 0,
              height: scrollableTabViewHeight
            }}
            initialPage={0}
            tabBarUnderlineStyle={{ backgroundColor: "#71abff", height: 2, borderBottomWidth: 0 }}
            tabBarTextStyle={{ fontSize: 16, fontWeight: "bold", }}
            renderTabBar={() => <ScrollableTabBar
              tabsContainerStyle={{ width: width - 34, }}
              inactiveTextColor={'#8a8d96'} style={{
                height: 40, borderBottomWidth: 0.5,
                borderBottomColor: "#f2f2f2",
                width: "100%",
              }}
              activeTextColor={"#71abff"} />}
          >
            {navBarConfig?.map((res) => {
              return <TabContainer filter={res.id} homeGames={homeGames ? homeGames : []} tabLabel={res.title} />
            })}
          </ScrollableTabView> : null}
        </View> : null}

      </View>
      {couponListData?.data?.list.length > 0 ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 10, paddingHorizontal: 12 }}>
        <View style={{ flexDirection: 'row' }} >
          <Image style={{ width: 13, height: 13, tintColor: 'black', marginRight: 5 }} source={{ uri: "礼品-(1)" }} />
          <Text style={{ color: 'black', fontWeight: "bold" }}>{currcentLanguagePackage?.["app.promotions"]}</Text>
        </View>
        <TouchableWithoutFeedback onPress={() => {
          push(PageName.PromotionListPage)
        }}>
          <Text style={{ color: 'black', fontWeight: "bold", }}>{currcentLanguagePackage?.["app.see.details"]}>></Text>
        </TouchableWithoutFeedback>
      </View> : null}

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
              <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5, color: 'black' }}>{item.title}</Text>
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
      <RankListCP width={width - 24} ranks={rankList} />
      <View style={{ height: 100 }}></View>
      <MarqueePopupView onPress={() => {
        setShow(false)
      }} content={content} show={show} onDismiss={() => {
        setShow(false)
      }} />
    </HomeBase>
    // <View style={{ flex: 1, backgroundColor: 'white' }}>

    //   <ScrollView style={{ marginTop: 46, flex: 1 }}>

    //   </ScrollView>

    // </View >
  )
}
const Banner = ({ bannerData, onlineNum = 0 }: { bannerData: BannerModel, onlineNum: number }) => {
  const { width, } = useDimensions().window
  const BannerRef = useRef<Carousel>()
  const [height, setHeight] = useState(50)
  useEffect(() => {
    const timer = setInterval(() => {
      //@ts-ignore
      BannerRef?.current?.gotoNextPage()
    }, 2000);
    return (() => {
      clearInterval(timer)
    })
  }, [bannerData])
  const bannerWidth = width - 24
  const { currcentLanguagePackage } = useLanguageContext()
  if (bannerData?.data?.list?.length > 0) {
    return (
      <View style={{ marginBottom: 5, height: height }}>
        <Carousel
          autoplay
          index={0}
          ref={BannerRef}
          loop
          pageSize={bannerWidth}
        >
          {bannerData?.data?.list?.map((res, index) => {
            return (
              <TouchableWithoutFeedback key={index + res.linkCategory} onPress={() => {
                PushHelper.pushCategory(res.linkCategory, res.linkPosition)
              }}>
                <FastImage onLoad={(e) => {
                  setHeight(e.nativeEvent.height * ((bannerWidth) / e.nativeEvent.width))

                }} key={'banner' + index} style={{ width: bannerWidth, height: height, borderRadius: 10 }} source={{ uri: res.pic }} >

                </FastImage>
              </TouchableWithoutFeedback>)
          })}
        </Carousel>
        <View style={{ position: 'absolute', top: 10, right: 10, backgroundColor: "rgba(0,0,0,0.2)", borderRadius: 16, padding: 5 }}>
          <Text style={{ color: 'white' }}>{currcentLanguagePackage?.["app.online.num"]}:{onlineNum}</Text>
        </View>
      </View>
    )

  } else {
    return <View style={{ height: (Dimensions.get("screen").width - 20) / 2, }}></View>
  }

}
const MarqueePopupView = ({ content, show, onPress, onDismiss }) => {
  const { width, height } = useDimensions().screen
  const { currcentLanguagePackage } = useLanguageContext()
  if (show) {
    return (
      <View style={{ width, height, position: 'absolute', justifyContent: 'center', alignItems: 'center', zIndex: 1000, marginBottom: 10 }}>
        <View style={{ width: '90%', height: '75%', backgroundColor: 'white', borderRadius: 15 }}>
          <View style={{ width: '100%', height: 50, justifyContent: 'center', alignItems: 'center', borderBottomColor: "gray", borderBottomWidth: 0.5 }}>
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>{currcentLanguagePackage?.["app.announcement1"]}</Text>
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
              <Text>{currcentLanguagePackage?.["app.cancel"]}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onPress} style={{
              justifyContent: 'center',
              alignItems: 'center', width: "47%", height: 50,
              backgroundColor: '#46A3FF', borderRadius: 5,
              borderColor: "gray", borderWidth: 0.5
            }}>
              <Text style={{ color: 'white' }}>{currcentLanguagePackage?.["app.confirm"]}</Text>
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
export default VietnamHomePage