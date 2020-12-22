import React, { useRef } from 'react'
import { Animated, StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import AppDefine from '../../define/AppDefine'

interface ScrollableTabViewComponentProps {
  children?: any
  indicatorStyle?: StyleProp<ViewStyle>
}

const ScrollableTabViewComponent = ({ children, indicatorStyle }: ScrollableTabViewComponentProps) => {
  const x = useRef(new Animated.Value(0)).current
  const inAnimated = useRef(false)

  const move = (value: number) => {
    Animated.timing(x, {
      toValue: value,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      inAnimated.current = false
    })
  }

  return (
    <ScrollableTabView
      style={{ flex: 1 }}
      renderTabBar={(props) => {
        const { tabs, activeTab, goToPage } = props
        const tabCount = tabs?.length
        const tabWidth = AppDefine.width / tabCount
        return (
          <>
            <View style={styles.container}>
              {tabs?.map((item, index) => {
                return (
                  <TouchableWithoutFeedback
                    onPress={() => {
                      if (!inAnimated.current) {
                        inAnimated.current = true
                        goToPage(index)
                        move(tabWidth * index)
                      }
                    }}>
                    <View style={styles.tab}>
                      <Text style={styles.tabText}>{item}</Text>
                    </View>
                  </TouchableWithoutFeedback>
                )
              })}
            </View>
            <Animated.View style={[styles.indicatorContainer, { width: AppDefine.width / tabCount, transform: [{ translateX: x }] }]}>
              <View style={[styles.indicator, indicatorStyle]} />
            </Animated.View>
          </>
        )
      }}>
      {children}
    </ScrollableTabView>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabText: {
    color: '#000000',
    fontSize: 12,
  },
  indicatorContainer: {
    backgroundColor: 'transparent',
    height: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicator: {
    backgroundColor: '#000000',
    width: '50%',
    height: '100%',
  },
})

export default ScrollableTabViewComponent
