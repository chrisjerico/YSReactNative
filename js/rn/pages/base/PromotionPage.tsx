import React, { useEffect, useRef, useState } from 'react'
import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import { ANHelper } from '../../public/define/ANHelper/ANHelper'
import { CMD } from '../../public/define/ANHelper/hp/CmdDefine'
import AppDefine from '../../public/define/AppDefine'
import PushHelper from '../../public/define/PushHelper'
import { pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import { skinColors } from '../../public/theme/const/UGSkinColor'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import { scale } from '../../public/tools/Scale'
import { stringToNumber } from '../../public/tools/tars'
import BottomGap from '../../public/views/tars/BottomGap'
import List from '../../public/views/tars/List'
import MineHeader from '../../public/views/tars/MineHeader'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'

const PromotionPage = (props: any) => {
  const { showBackBtn } = props?.route?.params ?? {}
  const [loading, setLoading] = useState(true)
  const [showCategory, setShowCategory] = useState(false)
  const [style, setStyle] = useState<'slide' | 'popup' | 'page'>('popup')
  const [list, setList] = useState([])
  const [categories, setCategories] = useState({})
  const [selectedTabIndex, setSelectedTabIndex] = useState(0)
  const [selectedItemIndex, setSelectedItemIndex] = useState(-1)
  const totalList = useRef([])
  const showUnderline = Skin1.skitType.indexOf('威尼斯') != -1
  const showItemBorder = Skin1.skitType.indexOf('威尼斯') != -1

  useEffect(() => {
    APIRouter.system_promotions().then((response) => {
      const value = response?.data?.data
      const { showCategory, style, list, categories } = value
      totalList.current = list?.map((item) => Object.assign({}, item, { clsName: 'UGPromoteModel' }))
      let filterCategory = {}
      list?.forEach((ele) => (filterCategory[ele?.category] = categories[ele?.category]))
      setLoading(false)
      // @ts-ignore
      setStyle(style)
      setList(totalList.current)
      setShowCategory(showCategory)
      setCategories(Object.assign({}, filterCategory, { '0': '全部' }))
    })
  }, [])

  const categoriesKey = Object.keys(categories)

  const handleOnPress = ({ setShowPop, item, index }) => {
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
        ANHelper.callAsync(CMD.OPEN_COUPON, {
          ...item,
          style,
        })
        break
    }
  }
  if (loading) {
    return (
      <>
        <SafeAreaHeader headerColor={Skin1?.promotion?.headerBgColor}>
          <MineHeader showBackBtn={showBackBtn} onPressBackBtn={pop} title={'优惠活动'} titleStyle={{ color: Skin1?.promotion?.headerTintColor }} backBtnColor={Skin1?.promotion?.headerTintColor} />
        </SafeAreaHeader>
        <ProgressCircle />
      </>
    )
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={Skin1?.promotion?.headerBgColor}>
          <MineHeader showBackBtn={showBackBtn} onPressBackBtn={pop} title={'优惠活动'} titleStyle={{ color: Skin1?.promotion?.headerTintColor }} backBtnColor={Skin1?.promotion?.headerTintColor} />
        </SafeAreaHeader>
        {showCategory ? (
          <>
            <List
              uniqueKey={'PromotionPage_Tab'}
              style={{ flexGrow: 0 }}
              horizontal={true}
              scrollEnabled={true}
              data={categoriesKey}
              renderItem={({ item }) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      const filterList = totalList.current?.filter((ele) => ele?.category == item)
                      setSelectedTabIndex(stringToNumber(item))
                      setSelectedItemIndex(-1)
                      setList(item == '0' ? totalList.current : filterList)
                    }}>
                    <View
                      style={
                        selectedTabIndex == item ? { backgroundColor: skinColors.promotion.selectedTabBgColor[Skin1.skitType] } : { backgroundColor: skinColors.promotion.tabBgColor[Skin1.skitType] }
                      }>
                      <Text
                        style={
                          selectedTabIndex == item
                            ? [styles.tabText, { color: skinColors.promotion.selectedTabTextColor[Skin1.skitType] }]
                            : [styles.tabText, { color: skinColors.promotion.tabTextColor[Skin1.skitType] }]
                        }>
                        {categories[item]}
                      </Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              }}
            />
            {showUnderline && <View style={{ height: 1, width: AppDefine.width, backgroundColor: '#ccc' }} />}
            <List
              uniqueKey={'PromotionPage_true'}
              scrollEnabled={true}
              style={[styles.list, { backgroundColor: Skin1?.promotion?.listBgColor }]}
              data={list}
              ListFooterComponent={<BottomGap />}
              renderItem={({ item, index }) => {
                const { title, pic, content } = item
                const onPress = (setShowPop: any) => handleOnPress({ item, setShowPop, index })
                const titleStyle = showItemBorder ? { height: title?.length ? -5 : 0, marginVertical: 0 } : undefined
                const containerStyle = showItemBorder ? { borderWidth: 1.5, borderRadius: 8, borderColor: '#b06065', marginTop: 10, padding: 9 } : {}
                return (
                  <AutoHeightCouponComponent
                    title={title?.length ? title : '优惠活动'}
                    pic={pic}
                    content={content}
                    onPress={onPress}
                    slide={style == 'slide' && selectedItemIndex == index}
                    containerStyle={containerStyle}
                    titleStyle={{ color: skinColors.promotion.couponTitleColor[Skin1.skitType], ...titleStyle }}
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
              const { title, pic, content } = item
              const onPress = (setShowPop: any) => handleOnPress({ item, setShowPop, index })
              const titleStyle = showItemBorder ? { height: title?.length ? -5 : 0, marginVertical: 0 } : undefined
              const containerStyle = showItemBorder ? { borderWidth: 1.5, borderRadius: 8, borderColor: '#b06065', marginTop: 10, padding: 9 } : {}
              return (
                <AutoHeightCouponComponent
                  title={title?.length ? title : '优惠活动'}
                  pic={pic}
                  content={content}
                  onPress={onPress}
                  slide={style == 'slide' && selectedItemIndex == index}
                  containerStyle={containerStyle}
                  titleStyle={{ color: Skin1?.promotion?.couponTitleColor, ...titleStyle }}
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
