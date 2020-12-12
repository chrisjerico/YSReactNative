import React, { useEffect, useRef, useState } from 'react'
import { View, Animated, TouchableWithoutFeedback, Text, Modal, Image } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { pop } from '../../public/navigation/RootNavigation'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/tars/MineHeader'
import APIRouter from '../../public/network/APIRouter'
import ProgressCircle from '../../public/views/temp/ProgressCircle'
import List from '../../public/views/tars/List'
import Button from '../../public/views/tars/Button'
import AppDefine from '../../public/define/AppDefine'
import { TextInput } from 'react-native-gesture-handler'

interface ApplyRewardProps {
  tabLabel: string
  list: any[]
  onPress: () => any
  onPressApply: () => any
}

const RewardList = ({ data, uniqueKey, onPress, onPressApply }) => (
  <List
    uniqueKey={uniqueKey}
    data={data}
    scrollEnabled={true}
    renderItem={({ item }) => {
      const { name } = item
      return (
        <>
          <TouchableWithoutFeedback onPress={onPress}>
            <View style={{ width: '100%', aspectRatio: 3, backgroundColor: 'red' }}>
              <View style={{ flex: 3 }}></View>
              <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.3)', justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ color: '#ffffff' }}>{name}</Text>
              </View>
            </View>
          </TouchableWithoutFeedback>
          <Button
            title={'点击申请'}
            containerStyle={{ width: 100, height: 30, backgroundColor: '#AE0000', borderRadius: 5, alignSelf: 'center', marginVertical: 10 }}
            titleStyle={{ color: '#ffffff' }}
            onPress={onPressApply}
          />
        </>
      )
    }}
  />
)

const ApplyReward = ({ tabLabel, list, onPress, onPressApply }: ApplyRewardProps) => {
  return (
    <View style={{ flex: 1 }}>
      <ScrollableTabView tabBarUnderlineStyle={{ backgroundColor: Skin1.themeColor }} tabBarActiveTextColor={Skin1.themeColor}>
        <View tabLabel={'全部'}>
          <RewardList uniqueKey={'ApplyReward_全部'} data={list} onPress={onPress} onPressApply={onPressApply} />
        </View>
        <View tabLabel={'热门'}>
          <RewardList uniqueKey={'ApplyReward_热门'} data={list?.filter((item) => item?.category == '1')} onPress={onPress} onPressApply={onPressApply} />
        </View>
        <View tabLabel={'未分类'}>
          <RewardList uniqueKey={'ApplyReward_未分类'} data={list?.filter((item) => item?.category == '-1')} onPress={onPress} onPressApply={onPressApply} />
        </View>
        <View tabLabel={'彩票'}>
          <RewardList uniqueKey={'ApplyReward_彩票'} data={list?.filter((item) => item?.category == '2')} onPress={onPress} onPressApply={onPressApply} />
        </View>
        <View tabLabel={'体育'}>
          <RewardList uniqueKey={'ApplyReward_体育'} data={list?.filter((item) => item?.category == '7')} onPress={onPress} onPressApply={onPressApply} />
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
  const [activityVisible, setActivityVisible] = useState(false)
  const [applyVisible, setApplyVisible] = useState(false)

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
            <ApplyReward
              tabLabel={'申请彩金'}
              list={list}
              onPress={() => {
                setActivityVisible(true)
              }}
              onPressApply={() => {
                setApplyVisible(true)
              }}
            />
            <ApplyFeedBack tabLabel={'申请反馈'} />
          </ScrollableTabView>
        )}
      </View>
      <Modal transparent={true} style={{ flex: 1, backgroundColor: 'transparent' }} visible={activityVisible}>
        <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '75%', height: 200, backgroundColor: '#ffffff', borderRadius: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '500', marginVertical: 10 }}>{'彩金活动'}</Text>
            <Image
              source={{
                uri:
                  'data:image/jpeg;base64,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',
              }}
              style={{ width: '90%', aspectRatio: 3 }}
              resizeMode={'stretch'}
            />
            <View style={{ flexDirection: 'row', width: '100%', flex: 1, marginTop: 10, borderTopWidth: AppDefine.onePx, borderColor: '#d9d9d9' }}>
              <Button
                title={'确认'}
                containerStyle={{ flex: 1, borderColor: '#d9d9d9', borderRightWidth: AppDefine.onePx }}
                titleStyle={{ color: '#2894FF', fontSize: 20 }}
                onPress={() => {
                  setActivityVisible(false)
                }}
              />
              <Button
                title={'关闭'}
                containerStyle={{ flex: 1 }}
                titleStyle={{ color: '#2894FF', fontSize: 20 }}
                onPress={() => {
                  setActivityVisible(false)
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
      <Modal transparent={true} style={{ flex: 1, backgroundColor: 'transparent' }} visible={applyVisible}>
        <View style={{ backgroundColor: 'transparent', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ width: '75%', height: '60%', backgroundColor: '#ffffff', borderRadius: 10, alignItems: 'center' }}>
            <Text style={{ fontSize: 15, marginVertical: 10 }}>{'彩金活动'}</Text>
            <View style={{ width: '100%', marginVertical: 10, paddingHorizontal: 20 }}>
              <Text style={{ marginBottom: 10 }}>{'活动说明'}</Text>
              <Text>{'AAAAAAAAAA'}</Text>
            </View>
            <TextInput style={{ borderColor: '#d9d9d9', width: '90%', height: 30, paddingHorizontal: 10, borderWidth: AppDefine.onePx, borderRadius: 5, marginBottom: 10 }} placeholder={'申请金额'} />
            <TextInput style={{ borderColor: '#d9d9d9', width: '90%', height: 100, paddingHorizontal: 10, borderWidth: AppDefine.onePx, borderRadius: 5 }} placeholder={'申请说明'} numberOfLines={5} />
            <View style={{ flexDirection: 'row', flex: 1, alignItems: 'flex-end', justifyContent: 'space-around', width: '100%', paddingBottom: 20 }}>
              <Button
                title={'关闭'}
                containerStyle={{ width: '25%', borderWidth: 1, borderColor: '#8E8E8E', borderRadius: 5, height: 30 }}
                onPress={() => {
                  setApplyVisible(false)
                }}
              />
              <Button
                title={'确认'}
                containerStyle={{ width: '25%', borderWidth: 1, borderColor: 'transparent', borderRadius: 5, height: 30, backgroundColor: Skin1.themeColor }}
                titleStyle={{ color: '#ffffff' }}
                onPress={() => {
                  setApplyVisible(false)
                }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </>
  )
}

export default ActivityRewardPage
