import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native'
import React, { useEffect } from 'react'
import useHomePage from '../../../../public/hooks/tars/useHomePage'
import AppDefine from '../../../../public/define/AppDefine'

interface NavBlockProps {
  navs: any[];
  containerStyle?: ViewStyle;
  renderNav: (item: any, index: number) => any;
  info: any
}

const NavBlock = ({ renderNav, containerStyle, info }: NavBlockProps) => {
  const { homeInfo } = info
  const { navs } = homeInfo
  return (
    <View style={{marginHorizontal: 8,marginBottom: 8, padding:8, backgroundColor: '#ffffff', borderRadius: 16}}>
      <ScrollView showsHorizontalScrollIndicator={false} bounces={false}
                  contentContainerStyle={{ backgroundColor: '#ffffff'}}
                  horizontal={true}>
        {navs.map(renderNav)}
      </ScrollView>
    </View>
  )
}

export default NavBlock
