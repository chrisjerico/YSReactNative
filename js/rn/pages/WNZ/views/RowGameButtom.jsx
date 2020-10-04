"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var Scale_1 = require("../../../public/tools/Scale");
var RowGameButtom = function (_a) {
    var logo = _a.logo, name = _a.name, desc = _a.desc, logoBallText = _a.logoBallText, onPress = _a.onPress, _b = _a.showRightBorder, showRightBorder = _b === void 0 ? false : _b;
    return (<react_native_1.TouchableWithoutFeedback onPress={onPress}>
      <react_native_1.View style={styles.container}>
        
        <react_native_1.View style={styles.logoBall}>
          <react_native_1.Text style={{ color: '#ffffff', fontSize: Scale_1.scale(15) }}>{logoBallText}</react_native_1.Text>
        </react_native_1.View>
        
        <react_native_1.View style={styles.logoContainer}>
          <react_native_1.View style={{
        flexDirection: 'row',
        flex: 1,
        marginLeft: Scale_1.scale(20),
    }}>
            <react_native_fast_image_1.default source={{ uri: logo }} style={{ width: Scale_1.scale(60), aspectRatio: 1 }} resizeMode={'contain'}/>
            <react_native_1.View style={{
        justifyContent: 'center',
        marginLeft: Scale_1.scale(5),
        width: Scale_1.scale(150),
    }}>
              <react_native_1.Text numberOfLines={1} style={{ fontSize: Scale_1.scale(20), fontWeight: '300' }}>
                {name}
              </react_native_1.Text>
              <react_native_1.Text style={{
        fontSize: Scale_1.scale(15),
        color: '#666',
        paddingTop: Scale_1.scale(5),
    }} numberOfLines={1}>
                {desc}
              </react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>
          {showRightBorder && <react_native_1.View style={{ width: Scale_1.scale(1), backgroundColor: '#d9d9d9', height: Scale_1.scale(50), marginTop: Scale_1.scale(10) }}/>}
        </react_native_1.View>
        
      </react_native_1.View>
    </react_native_1.TouchableWithoutFeedback>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '50%',
        height: Scale_1.scale(100),
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: Scale_1.scale(1),
    },
    logoBall: {
        width: '10%',
        aspectRatio: 1,
        borderRadius: 100,
        backgroundColor: '#f6a518',
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: Scale_1.scale(5),
        marginTop: Scale_1.scale(5),
        position: 'absolute',
        right: 0,
        top: 0,
    },
    logoContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
});
exports.default = RowGameButtom;
