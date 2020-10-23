import React, { useEffect, useState } from 'react'
import { Text, View, ScrollView } from 'react-native'
import AutoHeightCouponComponent from '../../public/components/tars/AutoHeightCouponComponent'
import { pop } from '../../public/navigation/RootNavigation'
import APIRouter from '../../public/network/APIRouter'
import List from '../../public/views/tars/List'
import MineHeader from '../../public/views/tars/MineHeader'
import ProgressCircle from '../../public/views/tars/ProgressCircle'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import TabComponent from '../../public/components/tars/TabComponent'
import { scale } from '../../public/tools/Scale'

const PromotionPage = () => {
  const [loading, setLoading] = useState(true)
  const [showCategory, setShowCategory] = useState(false)
  const [style, setStyle] = useState<'slide' | 'popup' | 'page'>('popup')
  const [list, setList] = useState([])
  const [categories, setCategories] = useState({})

  useEffect(() => {
    APIRouter.system_promotions().then((response) => {
      const value = response?.data?.data
      const { showCategory, style, list } = value
      setLoading(false)
      // @ts-ignore
      setStyle(style)
      setList(list)
      setShowCategory(showCategory)
      setCategories(categories)
      console.log('-------showCategory-----', showCategory)
    })
  }, [])
  if (loading) {
    return (
      <>
        <SafeAreaHeader headerColor={'red'} />
        <ProgressCircle />
      </>
    )
  } else {
    return (
      <>
        <SafeAreaHeader headerColor={'red'}>
          <MineHeader showBackBtn={true} onPressBackBtn={pop} />
        </SafeAreaHeader>
        {showCategory ? (
          <ScrollView horizontal={true}>
            {Object.values(categories).map((item, index) => {
              return (
                <Text key={index} style={{ marginHorizontal: scale(10), color: '#000000' }}>
                  {item}
                </Text>
              )
            })}
          </ScrollView>
        ) : (
          // <PromotionItem list={list} style2={style} />
          <List
            uniqueKey={'PromotionPage'}
            scrollEnabled={true}
            data={list}
            renderItem={({ item }) => {
              const { title, pic, content } = item
              console.log('--------item----', item)
              return (
                <AutoHeightCouponComponent
                  title={title}
                  pic={pic}
                  content={content}
                  onPress={() => {}}
                  // onPress={(setShowPop) => {
                  //   if (linkUrl) {
                  //     PushHelper.openWebView(linkUrl)
                  //   } else if (!linkCategory && !linkPosition) {
                  //     setShowPop(true)
                  //   } else {
                  //     PushHelper.pushCategory(linkCategory, linkPosition)
                  //   }
                  // }}
                />
              )
            }}
          />
        )}
      </>
    )
  }
}

export default PromotionPage
