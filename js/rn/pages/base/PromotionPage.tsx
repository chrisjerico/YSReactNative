import React, { useEffect, useRef, useState } from 'react'
import { Platform, PointPropType, ScrollView, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import { cond } from 'react-native-reanimated'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import { ANHelper } from '../../public/define/ANHelper/ANHelper'
import { CMD } from '../../public/define/ANHelper/hp/CmdDefine'
import AppDefine from '../../public/define/AppDefine'
import PushHelper from '../../public/define/PushHelper'
import { pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { skinColors } from '../../public/theme/const/UGSkinColor'
import UGSkinManagers, { skin1, Skin1 } from '../../public/theme/UGSkinManagers'
import { scale } from '../../public/tools/Scale'
import { stringToNumber } from '../../public/tools/tars'
import { ugLog } from '../../public/tools/UgLog'
import BottomGap from '../../public/views/tars/BottomGap'
import List from '../../public/views/tars/List'
import MineHeader from '../../public/views/tars/MineHeader'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import { UGText } from '../../../doy/publicComponent/Button之类的基础组件/DoyButton'
import UGUserModel from '../../redux/model/全局/UGUserModel'
import { UGStore } from '../../redux/store/UGStore'

const PromotionPage = (props: any) => {
  const { showBackBtn } = props?.route?.params ?? {}
  const [loading, setLoading] = useState(true)
  const [showCategory, setShowCategory] = useState(false)
  const [showCategoryKey, setShowCategoryKey] = useState([])
  const [style, setStyle] = useState<'slide' | 'popup' | 'page'>('popup')
  const [list, setList] = useState([])
  const [categories, setCategories] = useState({})
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1)
  const totalList = useRef([])
  const showUnderline = Skin1?.skitType?.indexOf('威尼斯') != -1
  const Venice = UGStore.globalProps.sysConf?.mobileTemplateCategory == '23'
  const scroll = useRef(null)
  const [scrollX, setScrollX] = useState(0)

  useEffect(() => {
    APIRouter.system_promotions().then((response) => {
      const value = response?.data?.data
      const { showCategory, style, list, categories } = value
      const newCategories = value.newCategories
      totalList.current = list?.map((item) => Object.assign({}, item, { clsName: 'UGPromoteModel' }))
      let filterCategory = []
      list?.forEach((ele) => (filterCategory[ele?.category] = categories[ele?.category]))
      let newFilterCategory = {}
      let keys = [0]
      newCategories.forEach((ele, index) => {
        if (filterCategory.includes(ele.name)) {
          newFilterCategory[ele.id] = ele.name
          keys.push(ele.id)
        }
      })
      newFilterCategory["0"] = '全部'
      
      setLoading(false)
      // @ts-ignore
      setStyle(style)
      setList(totalList.current)
      setShowCategory(showCategory)
      
      setCategories(newFilterCategory)
      setShowCategoryKey(keys)
    })
  }, [])

  useEffect(() => {
  },[categories])

  useEffect(() => {
    scroll?.current?.scrollToOffset({
      offset: scrollX,
      animated: true,
    })
  }, [scrollX])
  const onPressPrevious = () => {
    scroll?.current?.scrollToIndex({ animated: true, index: 0 });
  };

  const onPressNext = () => {
    scroll?.current?.scrollToIndex({animated: true, index: 1});
  };

  const handleOnPress = ({ setShowPop, item, index }) => {
    // ugLog("handleOnPress = " + style)
    switch (Platform.OS) {
      case 'ios':
        switch (style) {
          // 内页
          case 'page': {
            PushHelper.pushPromoteDetail(item)
            break
          }
          // 弹框
          case 'popup': {
            setShowPop(true)
            break
          }
          case 'slide': {
            if (index == selectedItemIndex) {
              setSelectedItemIndex(-1)
            } else {
              setSelectedItemIndex(index)
            }
            break
          }
        }
        break
      case 'android':
        switch (style) {
          // 内页
          case 'page': {
            PushHelper.pushPromoteDetail(item)
            break
          }
          // 弹框
          case 'popup': {
            // 弹框
            // ANHelper.callAsync(CMD.OPEN_COUPON, {
            //   ...item,
            //   style,
            // })
            setShowPop(true)
            break
          }
          case 'slide': {
            if (index == selectedItemIndex) {
              setSelectedItemIndex(-1)
            } else {
              setSelectedItemIndex(index)
            }
            break
          }
        }
        break
    }
  }
  if (loading) {
    return (
      <>
        <SafeAreaHeader headerColor={Skin1?.themeColor}>
          <MineHeader showBackBtn={showBackBtn} onPressBackBtn={pop} title={'优惠活动'} titleStyle={{ color: Skin1?.promotion?.headerTintColor }} backBtnColor={Skin1?.promotion?.headerTintColor} />
        </SafeAreaHeader>
        <ProgressCircle />
      </>
    )
  } else { 
    return (
      <>
        <SafeAreaHeader headerColor={Skin1?.themeColor}>
          <MineHeader showBackBtn={showBackBtn} onPressBackBtn={pop} title={'优惠活动'} titleStyle={{ color: Skin1?.promotion?.headerTintColor }} backBtnColor={Skin1?.promotion?.headerTintColor} />
        </SafeAreaHeader>
        {showCategory ? (
          <>
            <FlatList
              ref={scroll}
              style={{ flexGrow: 0 }}
              horizontal={true}
              scrollEnabled={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              data={showCategoryKey}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={(event) => {
                      const i = showCategoryKey.indexOf(item)
                      scroll?.current?.scrollToIndex({animated: true, index: i, viewPosition: 0.5});
                      const filterList = totalList.current?.filter((ele) => ele?.category == item)
                      setSelectedTabIndex(stringToNumber(item))
                      setSelectedItemIndex(-1)
                      setList(item == '0' ? totalList.current : filterList)
                    }}>
                    <View
                      style={
                        selectedTabIndex == item 
                          ? { backgroundColor: skinColors.promotion.selectedTabBgColor[Skin1.skitType],
                              borderBottomWidth: scale(2),
                              borderColor: skin1.themeColor } 
                          : { backgroundColor: skinColors.promotion.tabBgColor[Skin1.skitType],
                              borderBottomWidth: scale(0)}}>
                      <UGText
                        style={
                          selectedTabIndex == item
                            ? [styles.tabText, { color: skinColors.themeColor }]
                            : [styles.tabText, { color: skinColors.promotion.tabTextColor[Skin1.skitType] }]
                        }>
                        {categories[item]}
                      </UGText>
                    </View>
                  </TouchableWithoutFeedback>
                )
              }}
            />
            <View style={{ height: 1, width: AppDefine.width, backgroundColor: '#ccc' }} />
            <List
              uniqueKey={'PromotionPage_true'}
              scrollEnabled={true}
              style={[styles.list, { backgroundColor: Skin1?.promotion?.listBgColor }]}
              data={list}
              ListFooterComponent={<BottomGap />}
              renderItem={({ item, index }) => {
                const { title, pic, content, linkUrl, linkCategory, linkPosition} = item
                const onPress = (setShowPop: any) => handleOnPress({ item, setShowPop, index })
                const titleStyle = Venice ? { height: title?.length ? -5 : 0, marginBottom: scale(10), color: 'black', alignSelf: 'center' } : undefined
                const containerStyle = Venice ? { borderWidth: 1.5, borderRadius: 8, borderColor: '#b06065', marginTop: 10, paddingHorizontal: scale(10), paddingBottom: scale(10) } : {}
                return (
                  <AutoHeightCouponComponent
                    title={title?.length ? title : '优惠活动'}
                    pic={pic}
                    content={content}
                    onPress={onPress}
                    slide={style == 'slide' && selectedItemIndex == index}
                    containerStyle={containerStyle}
                    titleStyle={{ ...titleStyle}}
                    item={item}
                  />
                )
              }}
            />
          </>
        ) : (
          <List
            uniqueKey={'PromotionPage_false'}
            scrollEnabled={true}
            style={[styles.list, { backgroundColor: Skin1?.promotion?.listBgColor }]}
            data={list}
            ListFooterComponent={<BottomGap />}
            renderItem={({ item, index }) => {
              const { title, pic, content, linkUrl, linkCategory, linkPosition } = item
              const onPress = (setShowPop: any) => handleOnPress({ item, setShowPop, index })
              const titleStyle = Venice ? { height: title?.length ? -5 : 0, marginVertical: 0, color: 'black', alignSelf: 'center' } : undefined
              const containerStyle = Venice ? { borderWidth: 1.5, borderRadius: 8, borderColor: '#b06065', marginTop: 10, padding: 9 } : {}
              return (
                <AutoHeightCouponComponent
                  title={title?.length ? title : '优惠活动'}
                  pic={pic}
                  content={content}
                  onPress={onPress}
                  slide={style == 'slide' && selectedItemIndex == index}
                  containerStyle={containerStyle}
                  titleStyle={{ color: Skin1?.promotion?.couponTitleColor, ...titleStyle }}
                  item={item}
                />
              )
            }}
          />
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    paddingHorizontal: scale(10),
  },
  tabText: {
    margin: scale(20),
  },
})

export default PromotionPage

//OCHelper.call('PromotePopView.alloc.initWithFrame:[setItem:].show', [NSValue.CGRectMake(20, AppDefine.height * 0.1, AppDefine.width - 40, AppDefine.height * 0.8)], [item])
// OCHelper.call('UGNavigationController.current.pushViewControllerWithLinkCategory:linkPosition:', [linkCategory, linkPosition]).then((ret) => {
//   if (ret) return
//   switch (style) {
//     // 内页
//     case 'page': {
//       OCHelper.call(({ vc }) => ({
//         vc: {
//           selectors: 'UGPromoteDetailController.new[setItem:]',
//           args1: [item],
//         },
//         ret: {
//           selectors: 'UGNavigationController.current.pushViewController:animated:',
//           args1: [vc, true],
//         },
//       }))
//       break
//     }
//     // 弹框
//     case 'popup': {
//       setShowPop(true)
//       break
//     }
//     case 'slide': {
//       if (index == selectedItemIndex) {
//         setSelectedItemIndex(-1)
//       } else {
//         setSelectedItemIndex(index)
//       }
//       break
//     }
//   }
// })
// break
