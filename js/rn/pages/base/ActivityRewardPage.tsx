import React, { useEffect, useRef, useState } from 'react'
import { View, Animated, TouchableWithoutFeedback, Text } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { pop } from '../../public/navigation/RootNavigation'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/tars/MineHeader'
import APIRouter from '../../public/network/APIRouter'
import ProgressCircle from '../../public/views/temp/ProgressCircle'
import List from '../../public/views/tars/List'
import Button from '../../public/views/tars/Button'

interface ApplyRewardProps {
  tabLabel: string
  list: any[]
}

const RewardList = ({ data, uniqueKey }) => (
  <List
    uniqueKey={uniqueKey}
    data={data} // list?.filter((item) => item?.category == '1')
    scrollEnabled={true}
    renderItem={({ item }) => {
      const { name } = item
      return (
        <>
          <View style={{ width: '100%', aspectRatio: 3, backgroundColor: 'red' }}>
            <View style={{ flex: 3 }}></View>
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#ffffff' }}>{name}</Text>
            </View>
          </View>
          <Button
            title={'点击申请'}
            containerStyle={{ width: 100, height: 30, backgroundColor: '#AE0000', borderRadius: 5, alignSelf: 'center', marginVertical: 10 }}
            titleStyle={{ color: '#ffffff' }}
          />
        </>
      )
    }}
  />
)

const ApplyReward = ({ tabLabel, list }: ApplyRewardProps) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollableTabView tabBarUnderlineStyle={{ backgroundColor: Skin1.themeColor }} tabBarActiveTextColor={Skin1.themeColor}>
        <View tabLabel={'全部'}>
          <RewardList uniqueKey={'ApplyReward_全部'} data={list} />
        </View>
        <View tabLabel={'热门'}>
          <RewardList uniqueKey={'ApplyReward_热门'} data={list?.filter((item) => item?.category == '1')} />
        </View>
        <View tabLabel={'未分类'}>
          <RewardList uniqueKey={'ApplyReward_未分类'} data={list?.filter((item) => item?.category == '-1')} />
        </View>
        <View tabLabel={'彩票'}>
          <RewardList uniqueKey={'ApplyReward_彩票'} data={list?.filter((item) => item?.category == '2')} />
        </View>
        <View tabLabel={'体育'}>
          <RewardList uniqueKey={'ApplyReward_体育'} data={list?.filter((item) => item?.category == '7')} />
        </View>
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
  const [list, setList] = useState([])

  useEffect(() => {
    APIRouter.activity_winApplyList()
      .then((value) => {
        const list = value?.data?.data?.list
        setList(list)
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
            <ApplyReward tabLabel={'申请彩金'} list={list} />
            <ApplyFeedBack tabLabel={'申请反馈'} />
          </ScrollableTabView>
        )}
      </View>
    </>
  )
}

export default ActivityRewardPage
