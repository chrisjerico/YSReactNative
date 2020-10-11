"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomTabBar = void 0;
var React = require("react");
var react_native_1 = require("react-native");
var AppDefine_1 = require("../define/AppDefine");
exports.CustomTabBar = function (props) {
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
    return (<react_native_1.ScrollView horizontal={true} showsHorizontalScrollIndicator={false} bounces={false} style={{
        flexDirection: 'row',
    }}>
            {props.tabs.map(function (name, page) {
        var isTabActive = props.activeTab === page;
        // const renderTab = renderButton
        // return renderTab(name, page, isTabActive, props.goToPage)
        var textColor = isTabActive ? '#000000' : '#555';
        var backgroundColor = "#fff";
        return (<react_native_1.TouchableWithoutFeedback key={name} onPress={function () { return props.goToPage(page); }}>
                        <react_native_1.View style={{
            height: 50,
            backgroundColor: backgroundColor,
            width: AppDefine_1.default.width / 5,
            alignItems: 'center',
            justifyContent: 'center',
        }}>
                            <react_native_1.View style={{
            borderBottomWidth: 2,
            borderBottomColor: isTabActive ? "#000000" : "#fff"
        }}>
                                <react_native_1.Text style={[{ color: textColor, marginVertical: 8, fontSize: 16 }]}>
                                    {name}
                                </react_native_1.Text>
                            </react_native_1.View>
                        </react_native_1.View>
                    </react_native_1.TouchableWithoutFeedback>);
    })}
        </react_native_1.ScrollView>);
};
