import { View, Text, TouchableWithoutFeedback, FlatList } from "react-native"
import { Header, HeaderProps, Button } from 'react-native-elements';
import { Skin1 } from '../../public/theme/UGSkinManagers';
import LinearGradient from "react-native-linear-gradient";
import { useDimensions } from '@react-native-community/hooks'
import React, { useEffect, useState, useRef } from 'react'
import { useSafeArea } from "react-native-safe-area-context";
import { pop } from "../../public/navigation/RootNavigation";
import { OCHelper } from "../../public/define/OCHelper/OCHelper";
import { useNavigationState } from "@react-navigation/native";
import ScrollableTabView, { TabBarProps, ScrollableTabBar } from "react-native-scrollable-tab-view";
import APIRouter from "../../public/network/APIRouter";
import { PromotionsModel } from "../../public/network/Model/PromotionsModel";
import WebView from "react-native-webview";
import FastImage, { FastImageProperties } from "react-native-fast-image";
import usePopUpView from "../../public/hooks/usePopUpView";
import AppDefine from "../../public/define/AppDefine";
import AutoHeightWebView from 'react-native-autoheight-webview'
import { NSValue } from "../../public/define/OCHelper/OCBridge/OCCall";
const PromotionListPage = ({ navigation }) => {
  const { width, height } = useDimensions().window
  const { top } = useSafeArea()
  const state = useNavigationState(state => state);
  const [categories, setCategories] = useState<string[]>()
  useEffect(() => {
    init()
  }, [])
  const [promotionData, setPromotionData] = useState<PromotionsModel>()
  const init = async () => {
    try {
      const { data, status } = await APIRouter.system_promotions()
      setPromotionData(data)
      let categoriesArray = []
      data.data.list.map((res) => {
        categoriesArray.push(res.category)
      })
      categoriesArray = [...new Set(categoriesArray)];
      categoriesArray.sort()
      setCategories(categoriesArray)
    } catch (error) {

    }

  }
  return (
    <View style={{ flex: 1 }}>
      <LinearGradient style={{ height: top, width: width }} colors={Skin1.navBarBgColor}></LinearGradient>
      <LinearGradient style={{ height: 44, width, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} colors={Skin1.navBarBgColor}>
        {state.index == 2 ? null : <Button
          icon={{ name: 'ios-arrow-back', type: 'ionicon', color: 'white' }}
          buttonStyle={[{ backgroundColor: 'transparent', position: 'absolute', left: 8 },]}
          onPress={() => {
            pop()
            OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
          }}
        />}

        <Text style={{ textAlign: 'center', position: 'absolute', color: Skin1.textColor4, fontSize: 16, fontWeight: "bold" }}>优惠活动</Text>
      </LinearGradient>

      <LinearGradient style={{ flex: 1, paddingBottom: 50 }} colors={Skin1.bgColor}>
        {categories?.length > 0 ? <ScrollableTabView
          renderTabBar={(props: TabBarProps) => {
            return (<RenderTabBar props={props} />
            );
          }}>
          {categories?.map((res) => {
            return <PromotionLists promotionData={promotionData} tabLabel={promotionData?.data?.categories?.[res] ?? "全部"} dataSource={promotionData} filter={res} />
          })}
        </ScrollableTabView> : null}


      </LinearGradient>
    </View>
  )
}
const PromotionLists = ({ dataSource, filter, promotionData }: { dataSource: PromotionsModel, filter?: string, promotionData: PromotionsModel }) => {
  const [selectId, setSelectedId] = useState(-1)
  const { width } = useDimensions().window
  const { onPopViewPress } = usePopUpView()
  console.log(dataSource.data.list.filter((res) => res.category == filter))
  return (
    <FlatList data={filter != "0" ? dataSource.data.list.filter((res) => res.category == filter) : dataSource?.data?.list} renderItem={({ item, index }) => {
      return <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
        <TouchableWithoutFeedback onPress={onPopViewPress.bind(null, item, promotionData?.data?.style ?? 'popup', () => {
          if (selectId == index) {
            setSelectedId(-1)
          } else {
            setSelectedId(index)
          }
        })}>
          <View style={{}}>
            <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 5 }}>{item.title}</Text>
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
  )
}
const FastImageAutoHeight = (props: FastImageProperties) => {
  const [picHeight, setPicHeight] = useState(100)
  const { cardMargin, marginHorizontal } = usePopUpView()
  return (
    <FastImage {...props} style={[props.style, { height: picHeight }]} onLoad={(e) => {
      setPicHeight((((AppDefine.width - 20) - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height)
    }} />
  )
}
const RenderTabBar = (props: TabBarProps & { hidden: boolean; titles: string[] }) => {
  if (props.hidden) {
    return null;
  }
  console.log(props)
  const { tabs } = props;
  return (
    <View style={{ marginLeft: 5, flexDirection: 'row', height: 45 }}>
      {tabs?.map((title, idx) => {
        return (
          <Text
            onPress={() => {
              props.goToPage(idx);
            }}
            style={{
              marginTop: 11,
              marginHorizontal: 5,
              width: 42,
              height: 27,
              paddingTop: 6,
              backgroundColor: idx == props.activeTab ? Skin1.themeColor : 'transparent',
              textAlign: 'center',
              fontSize: 15,
              color: idx == props.activeTab ? 'white' : Skin1.bgTextColor,
              borderRadius: 3,
            }}>
            {title}
          </Text>
        );
      })}
    </View>
  );
}
export default PromotionListPage