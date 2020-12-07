import React, { useRef } from 'react'
import { View, Text, TouchableWithoutFeedback, Animated } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import TabComponent from '../../public/components/tars/TabComponent'
import { pop } from '../../public/navigation/RootNavigation'
import { Skin1 } from '../../public/theme/UGSkinManagers'
import SafeAreaHeader from '../../public/views/tars/SafeAreaHeader'
import MineHeader from '../../public/views/temp/MineHeader'

const A = () => (
  <View>
    <Text>{'A'}</Text>
  </View>
)
const B = () => (
  <View>
    <Text>{'B'}</Text>
  </View>
)

const SafeCenterPage = () => {
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

  return (
    <>
      <SafeAreaHeader headerColor={Skin1.themeColor}>
        <MineHeader title={'安全中心'} showBackBtn onPressBackBtn={pop} />
      </SafeAreaHeader>
      <View>
        <ScrollableTabView
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
          <A tabLabel={'登录密码'} />
          <B tabLabel={'取款密码'} />
        </ScrollableTabView>
      </View>
    </>
  )
}

export default SafeCenterPage
