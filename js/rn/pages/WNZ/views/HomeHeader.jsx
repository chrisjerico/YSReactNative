"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var MaterialCommunityIcons_1 = require("react-native-vector-icons/MaterialCommunityIcons");
var Scale_1 = require("../../../public/tools/Scale");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var RootNavigation_1 = require("../../../public/navigation/RootNavigation");
var OCHelper_1 = require("../../../public/define/OCHelper/OCHelper");
var AppDefine_1 = require("../../../public/define/AppDefine");
var HomeHeader = function (_a) {
    var name = _a.name, logo = _a.logo, balance = _a.balance, onPressMenu = _a.onPressMenu, onPressComment = _a.onPressComment, onPressUser = _a.onPressUser, uid = _a.uid;
    var _b = react_1.useState(false), showBackBtn = _b[0], setShowBackBtn = _b[1];
    AppDefine_1.default.checkHeaderShowBackButton(function (show) {
        show != showBackBtn && setShowBackBtn(show);
    });
    return (<react_native_1.View style={styles.container}>
      {showBackBtn ? (<AntDesign_1.default name={'left'} color={'#ffffff'} size={Scale_1.scale(25)} onPress={function () {
        if (!RootNavigation_1.pop()) {
            switch (react_native_1.Platform.OS) {
                case 'ios':
                    OCHelper_1.OCHelper.call('UGNavigationController.current.popViewControllerAnimated:', [true]);
                    break;
                case 'android':
                    break;
            }
        }
    }}/>) : uid ? (<react_native_fast_image_1.default source={{
        uri: logo,
    }} style={{ width: '35%', height: '100%' }} resizeMode={'contain'}/>) : (<react_native_1.View style={{ flex: 1 }}/>)}
      {!uid && !showBackBtn && (<react_native_fast_image_1.default source={{
        uri: logo,
    }} style={{ width: '35%', height: '100%' }} resizeMode={'contain'}/>)}
      {(<react_native_1.View style={styles.rightContainer}>
          {uid && (<react_native_1.TouchableWithoutFeedback onPress={onPressUser}>
              <react_native_1.View style={{
        flexDirection: 'row',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'flex-end',
    }}>
                <react_native_1.Text style={styles.nameText} numberOfLines={1}>
                  {name}
                </react_native_1.Text>
                <react_native_1.View style={styles.balanceContainer}>
                  <react_native_1.Text style={styles.balanceText}>{balance}</react_native_1.Text>
                  <AntDesign_1.default name={'pluscircle'} color={'#ffffff'} style={{ margin: 0, padding: 0, marginLeft: Scale_1.scale(5) }}/>
                </react_native_1.View>
              </react_native_1.View>
            </react_native_1.TouchableWithoutFeedback>)}
          <react_native_1.TouchableWithoutFeedback onPress={onPressComment}>
            <react_native_1.View style={{
        marginRight: Scale_1.scale(5),
        height: '100%',
        justifyContent: 'center',
    }}>
              <FontAwesome_1.default name={'commenting'} size={Scale_1.scale(20)} color={'#ffffff'}/>
            </react_native_1.View>
          </react_native_1.TouchableWithoutFeedback>
          <react_native_1.TouchableWithoutFeedback onPress={onPressMenu}>
            <react_native_1.View style={{
        flexDirection: 'row',
        alignItems: 'center',
        height: '100%',
    }}>
              <MaterialCommunityIcons_1.default name={'settings-outline'} size={Scale_1.scale(20)} style={{ marginRight: Scale_1.scale(5) }} color={'#ffffff'}/>
              <react_native_1.Text style={{ fontSize: Scale_1.scale(20), color: '#ffffff' }}>{'菜单'}</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.TouchableWithoutFeedback>
        </react_native_1.View>)}
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        height: '100%',
    },
    rightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        flex: 1,
    },
    balanceContainer: {
        backgroundColor: '#df2128',
        borderRadius: Scale_1.scale(20),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: Scale_1.scale(5),
        paddingVertical: Scale_1.scale(5),
        marginRight: Scale_1.scale(10),
    },
    nameText: {
        fontSize: Scale_1.scale(18),
        marginRight: Scale_1.scale(5),
        color: '#ffffff',
        width: '30%',
        textAlign: 'right',
    },
    balanceText: {
        color: '#ffffff',
        fontSize: Scale_1.scale(16),
    },
});
exports.default = HomeHeader;
