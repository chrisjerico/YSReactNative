import { number } from 'prop-types'
import React, { memo } from 'react'
import { StyleSheet, View, ViewStyle, StyleProp } from 'react-native'
import { Button } from 'react-native-elements'

interface NavBlockProps {
  navs: any[]
  containerStyle?: StyleProp<ViewStyle>
  renderNav: (item: any, index: number) => any
  visible?: boolean
}

const NavBlock = ({ renderNav, navs = [], containerStyle, visible }: NavBlockProps) => {
  if (visible) {
    let navCounts = 5
    if (navs?.length % 5 && !(navs?.length % 4)) {
      navCounts = 4
    }

    // 处理成多行数据
    const lineDatas: any[][] = []
    let i = 0
    while (i < navs?.length) {
      lineDatas.push(navs?.slice(i, Math.min(i + navCounts, navs?.length)))
      i += navCounts
    }
    const children = lineDatas?.map((v) => {
      const cells = v?.map(renderNav)
      for (i = 0; i < navCounts - v?.length; i++) {
        cells.push(<View style={{ flex: 1 }} />)  // 使最后一行少于 navCounts 的按钮显示在左侧（默认是在中间）
      }
      return <View style={{ flexDirection: 'row' }}>{cells}</View>
    })

    // return <View>{navs?.slice(0, navCounts).map(renderNav)}</View>
    return (
      <View style={[styles.container, containerStyle]}>
        {children}
      </View>
    )
  } else {
    return null
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#ffffff',
  },
})

export default memo(NavBlock)
