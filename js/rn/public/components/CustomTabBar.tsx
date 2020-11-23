import * as React from 'react'
import {ScrollView, Text, TouchableWithoutFeedback, View,} from 'react-native'
import AppDefine from "../define/AppDefine";

export const CustomTabBar = (props) => {
    // const renderButton = (name, page, isTabActive, onPressHandler) => {
    //     const textColor = isTabActive ? '#000000' : '#555'
    //     const backgroundColor = "#fff"
    //
    //     return (
    //         <TouchableWithoutFeedback
    //             style={{height: 25, backgroundColor}}
    //             key={name}
    //             accessible={true}
    //             accessibilityLabel={name}
    //             accessibilityTraits='button'
    //             onPress={() => onPressHandler(page)}
    //         >
    //             <View style={{
    //                 width: AppDefine.width / 5,
    //                 alignItems: 'center',
    //                 justifyContent: 'center',
    //             }}>
    //                 <View style={{
    //                     borderBottomWidth: 2,
    //                     borderBottomColor: isTabActive ? "#000000" : "#fff"
    //                 }}>
    //                     <Text style={[{color: textColor, marginVertical: 8, fontSize: 16}]}>
    //                         {name}
    //                     </Text>
    //                 </View>
    //             </View>
    //         </TouchableWithoutFeedback>
    //     )
    // }

    return (
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false} style={{
            flexDirection: 'row',
        }}>
            {props.tabs.map((name, page) => {
                const isTabActive = props.activeTab === page
                // const renderTab = renderButton
                // return renderTab(name, page, isTabActive, props.goToPage)
                const textColor = isTabActive ? '#000000' : '#555'
                const backgroundColor = "#fff"
                return (
                    <TouchableWithoutFeedback
                        key={name}
                        onPress={() => props.goToPage(page)}
                    >
                        <View style={{
                            height: 50,
                            backgroundColor,
                            width: AppDefine.width / 5,
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <View style={{
                                borderBottomWidth: 2,
                                borderBottomColor: isTabActive ? "#000000" : "#fff"
                            }}>
                                <Text style={[{color: textColor, marginVertical: 8, fontSize: 16}]}>
                                    {name}
                                </Text>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                )
            })}
        </ScrollView>
    )
}