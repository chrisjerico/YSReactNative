import { useDimensions } from '@react-native-community/hooks'
import { useNavigationState } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { FlatList, Linking, Platform, Text, TouchableWithoutFeedback, View } from 'react-native'
import AutoHeightWebView from 'react-native-autoheight-webview'
import { Button } from 'react-native-elements'
import FastImage, { FastImageProperties } from 'react-native-fast-image'
import LinearGradient from 'react-native-linear-gradient'
import { useSafeArea } from 'react-native-safe-area-context'
import ScrollableTabView, { TabBarProps } from 'react-native-scrollable-tab-view'
import AppDefine from '../../public/define/AppDefine'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import PushHelper from '../../public/define/PushHelper'
import usePopUpView from '../../public/hooks/usePopUpView'
import { popToRoot } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { List, PromotionsModel } from '../../public/network/Model/PromotionsModel'
import { Skin1 } from '../../public/theme/UGSkinManagers'

const PromotionListPage = ({ navigation }) => {
  const { width, height } = useDimensions().window
  const { top } = useSafeArea()
  const state = useNavigationState((state) => state)
  const [categories, setCategories] = useState<string[]>()
  useEffect(() => {
    init()
    let unsubscribe
    switch (Platform.OS) {
      case 'ios':
        unsubscribe = navigation.addListener('focus', async () => {
          const index = await OCHelper.call('UGTabbarController.shared.selectedIndex')
          setCurrentNativeSelectedTab(index)
        })
        break
      case 'android':
        //TODO
        setCurrentNativeSelectedTab(0)
        break
    }

    return unsubscribe
  }, [])

  const [promotionData, setPromotionData] = useState<PromotionsModel>()
  const [currentNativeSelectedTab, setCurrentNativeSelectedTab] = useState(-1)

  const init = async () => {
    try {
      const { data, status } = await APIRouter.system_promotions()
      setPromotionData(data)
      let categoriesArray = []
      data.data.list.map((res) => {
        categoriesArray.push(res.category)
      })
      categoriesArray = [...new Set(categoriesArray)]
      categoriesArray.sort()
      setCategories(categoriesArray)
    } catch (error) {}
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'balck' }}>
      <LinearGradient style={{ height: top, width: width }} colors={Skin1.navBarBgColor}></LinearGradient>
      <LinearGradient style={{ height: 44, width, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }} colors={Skin1.navBarBgColor}>
        {state.index != 15 || currentNativeSelectedTab == 0 ? (
          <View style={{ position: 'absolute', left: 8 }}>
            <Button
              icon={{ name: 'ios-arrow-back', type: 'ionicon', color: 'white' }}
              buttonStyle={[{ backgroundColor: 'transparent', left: 0, top: 0, alignSelf: 'flex-start' }]}
              onPress={() => {
                popToRoot()
                switch (Platform.OS) {
                  case 'ios':
                    break
                  case 'android':
                    OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true])
                    break
                }
              }}
            />
          </View>
        ) : null}
        <Text
          style={{
            textAlign: 'center',
            color: Skin1.isBlack ? 'white' : Skin1.textColor3,
            fontSize: 18,
            fontWeight: 'bold',
          }}>
          优惠活动
        </Text>
      </LinearGradient>
      <LinearGradient style={{ flex: 1, paddingBottom: 50 }} colors={Skin1.bgColor}>
        {categories?.length > 0 ? (
          <ScrollableTabView
            renderTabBar={(props: TabBarProps) => {
              return <RenderTabBar props={props} />
            }}>
            {categories?.map((res) => {
              return <PromotionLists promotionData={promotionData} tabLabel={promotionData?.data?.categories?.[res] ?? '全部'} dataSource={promotionData} filter={res} />
            })}
          </ScrollableTabView>
        ) : null}
      </LinearGradient>
    </View>
  )
}

export const PromotionLists = ({ dataSource, filter, promotionData }: { dataSource: PromotionsModel; filter?: string; promotionData: PromotionsModel }) => {
  const [selectId, setSelectedId] = useState(-1)
  const { width } = useDimensions().window
  const { onPopViewPress } = usePopUpView()
  const onPromotionItemPress = (data: List, type: 'page' | 'popup' | 'slide', onPress?: () => void) => {
    if (data?.linkUrl != '') {
      Linking.openURL(data?.linkUrl)
    } else if (data.linkCategory == 0 && data.linkPosition == 0) {
      onPopViewPress(data, type, onPress ? onPress : () => {})
    } else {
      PushHelper.pushCategory(data.linkCategory, data.linkPosition)
    }
  }
  return (
    <FlatList
      keyExtractor={(item, index) => item.id + index}
      data={filter != '0' ? dataSource.data.list.filter((res) => res.category == filter) : dataSource?.data?.list}
      renderItem={({ item, index }) => {
        return (
          <View style={{ paddingHorizontal: 10, marginBottom: 20 }}>
            <TouchableWithoutFeedback
              onPress={onPromotionItemPress.bind(null, item, promotionData?.data?.style ?? 'popup', () => {
                if (selectId == index) {
                  setSelectedId(-1)
                } else {
                  setSelectedId(index)
                }
              })}>
              <View style={{}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: 16,
                    marginBottom: 5,
                    color: Skin1.textColor1,
                  }}>
                  {item.title}
                </Text>
                <FastImageAutoHeight source={{ uri: item.pic }} />
              </View>
            </TouchableWithoutFeedback>
            {selectId == index ? (
              <AutoHeightWebView
                style={{ width: width - 20, backgroundColor: 'white' }}
                // scalesPageToFit={true}
                viewportContent={'width=device-width, user-scalable=no'}
                source={{
                  html:
                    `<head>
            <meta name='viewport' content='initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no'>
            <style>img{width:auto !important;max-width:100%;height:auto !important}</style>
            <style>body{width:100%;word-break: break-all;word-wrap: break-word;vertical-align: middle;overflow: hidden;margin:0}</style>
          </head>` +
                    `<script>
            window.onload = function () {
              window.location.hash = 1;
              document.title = document.body.scrollHeight;
            }
          </script>` +
                    item.content,
                }}></AutoHeightWebView>
            ) : null}
          </View>
        )
      }}
    />
  )
}
const FastImageAutoHeight = (props: FastImageProperties) => {
  const [picHeight, setPicHeight] = useState(100)
  const { cardMargin, marginHorizontal } = usePopUpView()
  return (
    <FastImage
      {...props}
      style={[props.style, { height: picHeight }]}
      onLoad={(e) => {
        setPicHeight(((AppDefine.width - 20 - (cardMargin + marginHorizontal) * 2) / e.nativeEvent.width) * e.nativeEvent.height)
      }}
    />
  )
}
const RenderTabBar = (props: TabBarProps & { hidden: boolean; titles: string[] }) => {
  if (props.hidden) {
    return null
  }
  console.log(props)
  const { tabs } = props
  return (
    <View style={{ marginLeft: 5, flexDirection: 'row', height: 45 }}>
      {tabs?.map((title, idx) => {
        return (
          <Text
            onPress={() => {
              props.goToPage(idx)
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
              color: idx == props.activeTab ? Skin1.textColor1 : Skin1.textColor2,
              borderRadius: 3,
            }}>
            {title}
          </Text>
        )
      })}
    </View>
  )
}
export default PromotionListPage
