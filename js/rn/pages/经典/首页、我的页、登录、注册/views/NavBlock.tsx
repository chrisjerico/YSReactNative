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

    const lineDatas = []
    let i = 0
    while (i < navs?.length) {
      lineDatas.push(navs?.slice(i, Math.min(i + navCounts, navs?.length)))
      i += navCounts
    }
    const children = lineDatas?.map((v) => {
      return <View style={{ flexDirection: 'row' }}>{v?.map(renderNav)}</View>
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
