import React, { useEffect, useRef, useState } from 'react'
import { View, Animated, TouchableWithoutFeedback, Text } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { pop } from '../../public/navigation/RootNavigation'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/tars/MineHeader'
import APIRouter from '../../public/network/APIRouter'
import ProgressCircle from '../../public/views/temp/ProgressCircle'

const ApplyReward = ({ tabLabel }) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollableTabView tabBarUnderlineStyle={{ backgroundColor: Skin1.themeColor }} tabBarActiveTextColor={Skin1.themeColor}>
        <View tabLabel={'全部'}></View>
        <View tabLabel={'热门'}></View>
        <View tabLabel={'未分类'}></View>
        <View tabLabel={'彩票'}></View>
        <View tabLabel={'体育'}></View>
      </ScrollableTabView>
    </View>
  )
}

const ApplyFeedBack = ({ tabLabel }) => {
  return <View style={{ flex: 1, marginTop: 35 }}></View>
}

const ActivityRewardPage = () => {
  const x = useRef(new Animated.Value(83)).current
  const inAnimated = useRef(false)

  const move = (index: number) => {
    Animated.timing(x, {
      toValue: index ? 297 : 82,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      inAnimated.current = false
    })
  }

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    APIRouter.activity_winApplyList()
      .then((value) => {
        const list = value?.data?.data?.list
        console.log('--------list-------', list)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])

  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'活动彩金'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <View style={{ flex: 1 }}>
        {loading ? (
          <ProgressCircle />
        ) : (
          <ScrollableTabView
            style={{ flex: 1 }}
            renderTabBar={(props) => {
              const { tabs, activeTab, goToPage } = props
              return (
                <>
                  <View style={{ width: '100%', height: 40, flexDirection: 'row' }}>
                    {tabs?.map((item, index) => {
                      return (
                        <TouchableWithoutFeedback
                          onPress={() => {
                            if (!inAnimated.current) {
                              inAnimated.current = true
                              goToPage(index)
                              move(index)
                            }
                          }}>
                          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Text style={{ color: '#000000', fontSize: 12 }}>{item}</Text>
                          </View>
                        </TouchableWithoutFeedback>
                      )
                    })}
                  </View>
                  <Animated.View style={{ width: 50, backgroundColor: '#000000', height: 5, transform: [{ translateX: x }] }} />
                </>
              )
            }}>
            <ApplyReward tabLabel={'申请彩金'} />
            <ApplyFeedBack tabLabel={'申请反馈'} />
          </ScrollableTabView>
        )}
      </View>
    </>
  )
}

export default ActivityRewardPage
