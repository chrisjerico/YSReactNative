import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Platform, StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import { ANHelper } from '../../public/define/ANHelper/ANHelper'
import { CMD } from '../../public/define/ANHelper/hp/CmdDefine'
import { OCHelper } from '../../public/define/OCHelper/OCHelper'
import { pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
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

  useEffect(() => {
    APIRouter.system_promotions().then((response) => {
      const value = response?.data?.data
      const { showCategory, style, list, categories } = value
      totalList.current = list?.map((item) => Object.assign({}, item, { clsName: 'UGPromoteModel' }))
      setLoading(false)
      // @ts-ignore
      setStyle(style)
      setList(totalList.current)
      setShowCategory(showCategory)
      setCategories(Object.assign({}, categories, { '0': '全部' }))
    })
  }, [])

  const categoriesKey = Object.keys(categories)

  const handleOnPress = ({ setShowPop, item, index }) => {
    const { linkCategory, linkPosition } = item ?? {}
    switch (Platform.OS) {
      case 'ios':
        OCHelper.call('UGNavigationController.current.pushViewControllerWithLinkCategory:linkPosition:', [linkCategory, linkPosition]).then((ret) => {
          if (ret) return
          switch (style) {
            // 内页
            case 'page': {
              OCHelper.call(({ vc }) => ({
                vc: {
                  selectors: 'UGPromoteDetailController.new[setItem:]',
                  args1: [item],
                },
                ret: {
                  selectors: 'UGNavigationController.current.pushViewController:animated:',
                  args1: [vc, true],
                },
              }))
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
        })
        break
      case 'android':
        ANHelper.callAsync(CMD.OPEN_COUPON, {
          ...item,
          style,
        })
        break
    }
  }

  // console.log('------list-----', list)
  if (loading) {
    return (
      <>
        <SafeAreaHeader headerColor={Skin1.themeColor}>
          <MineHeader showBackBtn={showBackBtn} onPressBackBtn={pop} title={'优惠活动'} titleStyle={{ color: Skin1.headerTintColor }} backBtnColor={Skin1.headerTintColor} />
        </SafeAreaHeader>
        <ProgressCircle />
      </>
    )
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={Skin1.themeColor}>
          <MineHeader showBackBtn={showBackBtn} onPressBackBtn={pop} title={'优惠活动'} titleStyle={{ color: Skin1.headerTintColor }} backBtnColor={Skin1.headerTintColor} />
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
                    <View style={selectedTabIndex == item ? { backgroundColor: '#d9d9d9' } : {}}>
                      <Text style={styles.tabText}>{categories[item]}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              }}
            />
            <List
              uniqueKey={'PromotionPage_true'}
              scrollEnabled={true}
              style={styles.list}
              data={list}
              ListFooterComponent={<BottomGap />}
              renderItem={({ item, index }) => {
                const { title, pic, content } = item
                const onPress = (setShowPop: any) => handleOnPress({ item, setShowPop, index })
                return <AutoHeightCouponComponent title={title} pic={pic} content={content} onPress={onPress} slide={style == 'slide' && selectedItemIndex == index} />
              }}
            />
          </>
        ) : (
          <List
            uniqueKey={'PromotionPage_false'}
            scrollEnabled={true}
            style={styles.list}
            data={list}
            ListFooterComponent={<BottomGap />}
            renderItem={({ item, index }) => {
              const { title, pic, content } = item
              const onPress = (setShowPop: any) => handleOnPress({ item, setShowPop, index })
              return <AutoHeightCouponComponent title={title} pic={pic} content={content} onPress={onPress} slide={style == 'slide' && selectedItemIndex == index} />
            }}
          />
        )}
      </>
    )
  }
}

const styles = StyleSheet.create({
  list: {
    backgroundColor: '#ffffff',
    flex: 1,
    paddingHorizontal: scale(10),
  },
  tabText: {
    margin: scale(20),
  },
})

export default PromotionPage

//OCHelper.call('PromotePopView.alloc.initWithFrame:[setItem:].show', [NSValue.CGRectMake(20, AppDefine.height * 0.1, AppDefine.width - 40, AppDefine.height * 0.8)], [item])
