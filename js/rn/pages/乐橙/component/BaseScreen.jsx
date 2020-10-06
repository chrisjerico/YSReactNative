"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_native_1 = require("react-native");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
var OCHelper_1 = require("../../../public/define/OCHelper/OCHelper");
exports.BaseScreen = function (_a) {
    var children = _a.children, screenName = _a.screenName, style = _a.style, icon = _a.icon;
    return (<react_native_1.View style={[{ flex: 1 }, style]}>
            <react_native_1.SafeAreaView style={{ backgroundColor: "#ffffff", borderBottomColor: "#cccccc", borderBottomWidth: 1 }}>
                <react_native_1.View style={{
        backgroundColor: "#ffffff",
        width: react_native_1.Dimensions.get("screen").width,
        flexDirection: "row",
        alignItems: "center",
        alignSelf: "center",
    }}>
                    <react_native_1.Text style={{
        paddingTop: 15,
        paddingBottom: 15,
        textAlign: "center",
        fontSize: 17,
        width: "100%",
        alignSelf: "center"
    }}>{screenName}</react_native_1.Text>
                    <react_native_1.TouchableOpacity style={{ width: 30, position: "absolute", left: 20 }} onPress={function () {
        RootNavigation_1.pop();
        switch (react_native_1.Platform.OS) {
            case 'ios':
                OCHelper_1.OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
                break;
            case 'android':
                break;
        }
    }}>
                        <FontAwesome_1.default size={33} name={icon || 'angle-left'}/>
                    </react_native_1.TouchableOpacity>
                </react_native_1.View>
            </react_native_1.SafeAreaView>
            {children}
        </react_native_1.View>);
};
