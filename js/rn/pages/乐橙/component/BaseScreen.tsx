import * as React from 'react'
import { SafeAreaView, StyleProp, StyleSheet, Text, TouchableOpacity, View, ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import { pop } from '../../../public/navigation/RootNavigation'
import { scale } from '../../../public/tools/Scale'
import { Skin1 } from '../../../public/theme/UGSkinManagers'
import { UGColor } from '../../../public/theme/UGThemeColor'
import { TouchableHighlight } from 'react-native-gesture-handler'
import { clearAllHtml } from '../../../public/tools/StringUtil'
import { UGText } from '../../../../doy/public/Button之类的基础组件/DoyButton'

interface BaseScreenProps {
    hideBar?: boolean //隐藏标题栏
    children?: any
    screenName: string //标题
    style?: StyleProp<ViewStyle>
    icon?: 'angle-left' | 'home'
    hideLeft?: boolean // 隐藏左边的按钮
    rightButton?: JSX.Element
}

export const BaseScreen = ({ hideBar, children, screenName, style, icon, hideLeft, rightButton }: BaseScreenProps) => {
    return (
        <View style={[{ flex: 1, backgroundColor: Skin1.homeContentColor }, style]}>
            <SafeAreaView style={{ backgroundColor: Skin1.themeColor }}>
                {
                    hideBar ?
                        null
                        : <View style={{
                            backgroundColor: Skin1.themeColor, //根据当前主题来
                            width: scale(540),
                            flexDirection: "row",
                            alignItems: "center",
                            alignSelf: "center",
                        }}>
                            <UGText style={{
                                paddingTop: scale(20),
                                paddingBottom: scale(20),
                                textAlign: "center",
                                fontSize: scale(24),
                                width: "100%",
                                alignSelf: "center",
                                color: Skin1.navBarTitleColor //根据当前主题来
                            }}>{clearAllHtml(screenName)}</UGText>
                            {
                                <TouchableOpacity style={{ width: 60, height: 40, position: "absolute",  }}
                                    onPress={() => {
                                        pop()
                                    }}
                                >
                                    {

                                        <View style={{ left: 20,  }} >
                                            <Icon size={33} name={icon || 'angle-left'}
                                                color={Skin1.navBarTitleColor} //根据当前主题来
                                            />
                                        </View>
                                    }
                                </TouchableOpacity>

                            }
                            <View style={_styles.right_container} pointerEvents={'box-none'}>
                                {
                                    rightButton
                                }
                            </View>
                        </View>
                }
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

