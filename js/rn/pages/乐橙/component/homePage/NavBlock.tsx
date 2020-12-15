import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native'
import React, { useEffect } from 'react'
import useHomePage from '../../../../public/hooks/tars/useHomePage'

interface NavBlockProps {
    navs: any[];
    containerStyle?: ViewStyle;
    renderNav: (item: any, index: number) => any;
}

const NavBlock = ({renderNav, containerStyle}: NavBlockProps) => {
    const { info } = useHomePage({})
    const { homeInfo } = info
    const { navs} = homeInfo
    return (
        <ScrollView showsHorizontalScrollIndicator={false} bounces={false} contentContainerStyle={{ backgroundColor: '#ffffff'}} horizontal={true}>
            {navs.map(renderNav)}
        </ScrollView>
    )
}

export default NavBlock
