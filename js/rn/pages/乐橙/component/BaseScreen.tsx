import * as React from 'react'
import { SafeAreaView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { pop } from '../../../public/navigation/RootNavigation'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'

interface BaseScreenProps {
    children?: any
    screenName: string
    style?: StyleProp<ViewStyle>
    icon?: 'angle-left' | 'home'
    rightButton?: JSX.Element
}

export const BaseScreen = ({children, screenName, style, icon, rightButton}: BaseScreenProps) => {
    return (
        <View style={[{flex: 1, backgroundColor: Skin1.homeContentColor}, style]}>
            <SafeAreaView style={{backgroundColor: Skin1.themeColor, borderBottomColor: "#cccccc", borderBottomWidth: 1}}>
                <View style={{
                    backgroundColor: Skin1.themeColor, //根据当前主题来
                    width: scale(540),
                    flexDirection: "row",
                    alignItems: "center",
                    alignSelf: "center",
                }}>
                    <Text style={{
                        paddingTop: scale(20),
                        paddingBottom: scale(20),
                        textAlign: "center",
                        fontSize: scale(24),
                        width: "100%",
                        alignSelf: "center",
                        color: Skin1.navBarTitleColor //根据当前主题来
                    }}>{screenName}</Text>
                    <TouchableOpacity style={{width: 30, position: "absolute", left: 20}} onPress={() => pop()}>
                        <Icon size={33} name={icon || 'angle-left'}
                              color={ Skin1.navBarTitleColor } //根据当前主题来
                        />
                    </TouchableOpacity>
                    <View style={_styles.right_container}>
                        {
                            rightButton
                        }
                    </View>
                </View>
            </SafeAreaView>
            {children}
        </View>
    )
}

const _styles = StyleSheet.create({
    container: {},
    right_container: {
        width: '100%',
        position: 'absolute',
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

})

