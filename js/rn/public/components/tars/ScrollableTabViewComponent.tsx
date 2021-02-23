import React, { useRef } from 'react'
import { Animated, StyleProp, StyleSheet, Text, TouchableWithoutFeedback, View, ViewStyle, ScrollView } from 'react-native'
import ScrollableTabView from 'react-native-scrollable-tab-view'
import AppDefine from '../../define/AppDefine'
import { UGText } from '../../../../doy/publicComponent/Button之类的基础组件/DoyButton'

interface ScrollableTabViewComponentProps {
  children?: any
  indicatorStyle?: StyleProp<ViewStyle>
  showIndicator?: boolean
  renderTabBar?: ({ activeTab, goToPage }: RenderTabBar) => any
  tabBarScrollEnabled?: boolean
  fixedTabWidth?: number
  minTabWidth?: number
  enableMinWidth?: boolean
  initialTabIndex?: number
  activeTabStyle?: StyleProp<ViewStyle>
  tabStyle?: StyleProp<ViewStyle>
  indicatorContainerStyle?: StyleProp<ViewStyle>
}

interface RenderTabBar {
  activeTab: number
  goToPage: (pageNumber: number) => any
}

const ScrollableTabViewComponent = ({
  children,
  indicatorStyle,
  showIndicator = true,
  renderTabBar,
  tabBarScrollEnabled = true,
  fixedTabWidth,
  enableMinWidth,
  minTabWidth,
  initialTabIndex = 0,
  activeTabStyle,
  tabStyle,
  indicatorContainerStyle,
}: ScrollableTabViewComponentProps) => {
  const x = useRef(new Animated.Value(0)).current
  const inAnimated = useRef(false)
  const scroll = useRef(null)
  const tabCount = children?.length

  const indicatorMoveTo = (value: number) => {
    Animated.timing(x, {
      toValue: value,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      inAnimated.current = false
    })
  }

  const getTabWidth = () => {
    if (fixedTabWidth) {
      return fixedTabWidth
    }
    const width = tabCount ? AppDefine.width / tabCount : 0
    if (enableMinWidth && width < minTabWidth) {
      return minTabWidth
    } else {
      return width
    }
  }

  const tabWidth = getTabWidth()

  const getScrollViewXPosition = (index: number) => {
    const maxWidth = tabWidth * tabCount
    const windowsContainTab = AppDefine.width / tabWidth
    const scrllToEndIndex = tabCount - windowsContainTab
    const halfTab = windowsContainTab / 2
    const tabIndex = index > scrllToEndIndex ? 2 * index - halfTab - scrllToEndIndex : index - halfTab - 1
    const x = tabIndex * tabWidth
    if (x >= maxWidth) {
      return maxWidth
    } else if (x <= 0) {
      return 0
    } else {
      return x
    }
  }

  const scrollTabTo = (x: number) => {
    scroll?.current?.scrollTo({
      x: x,
      y: 0,
      animated: true,
    })
  }

  const changeIndex = ({ i }) => {
    // const height = getSceneHeight(i)
    // setHeight(height)
    const x = getScrollViewXPosition(i)
    scrollTabTo(x)
    indicatorMoveTo(tabWidth * i)
  }

  return (
    <ScrollableTabView
      style={{ flex: 1 }}
      onChangeTab={changeIndex}
      renderTabBar={(props) => {
        const { tabs, activeTab, goToPage } = props
        return renderTabBar ? (
          renderTabBar({ activeTab, goToPage })
        ) : (
          <View style={styles.tabBarScrollViewContainer}>
            <ScrollView
              scrollEnabled={tabBarScrollEnabled}
              ref={scroll}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              contentOffset={{ x: getScrollViewXPosition(initialTabIndex), y: 0 }}
              scrollEventThrottle={5000}>
              <View style={styles.tabBarContainer}>
                <View style={{ flexDirection: 'row', flex: 35 }}>
                  {tabs?.map((item, index) => {
                    return (
                      <TouchableWithoutFeedback
                        key={index}
                        onPress={() => {
                          if (!inAnimated.current) {
                            inAnimated.current = true
                            goToPage(index)
                            indicatorMoveTo(tabWidth * index)
                          }
                        }}>
                        <View
                          style={[
                            styles.tab,
                            activeTab == index ? activeTabStyle : tabStyle,
                            {
                              width: tabWidth,
                            },
                          ]}>
                          <UGText style={styles.tabText}>{item}</UGText>
                        </View>
                      </TouchableWithoutFeedback>
                    )
                  })}
                </View>
                {showIndicator && (
                  <Animated.View style={[styles.indicatorContainer, indicatorContainerStyle, { width: tabWidth, transform: [{ translateX: x }] }]}>
                    <View style={[styles.indicator, indicatorStyle]} />
                  </Animated.View>
                )}
              </View>
            </ScrollView>
          </View>
        )
      }}>
      {children}
    </ScrollableTabView>
  )
}

const styles = StyleSheet.create({
  tabBarScrollViewContainer: {
    width: '100%',
    height: 40,
  },
  tabBarContainer: {
    height: 40,
    backgroundColor: 'transparent',
  },
  tab: {
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
