import {StyleSheet, View, ViewStyle} from "react-native";
import React, { useEffect } from 'react'
import useHomePage from '../../../../public/hooks/tars/useHomePage'

interface NavBlockProps {
    navs: any[];
    containerStyle?: ViewStyle;
    renderNav: (item: any, index: number) => any;
}

const NavBlock = ({renderNav, containerStyle}: NavBlockProps) => {
    const { value } = useHomePage({})
    const { homeInfo } = value
    const { navs} = homeInfo
    return (
        <View style={[styles.container, containerStyle]}>
            {navs.map(renderNav)}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 540 / 130,
        backgroundColor: '#ffffff',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})

export default NavBlock
