"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_native_marquee_ab_1 = require("react-native-marquee-ab");
var Scale_1 = require("../../../public/tools/Scale");
var StringUtils_1 = require("../../../public/tools/StringUtils");
var HeadlineBlock = function (_a) {
    var onPressHeadline = _a.onPressHeadline, headlines = _a.headlines, _b = _a.headLineLogo, headLineLogo = _b === void 0 ? '' : _b, containerStyle = _a.containerStyle;
    var _c = react_1.useState(true), display = _c[0], setDisplay = _c[1];
    var cleanContents = headlines.map(function (headline, index) { return ({ label: index.toString(), value: StringUtils_1.default.getInstance().deleteHtml(headline === null || headline === void 0 ? void 0 : headline.content) }); });
    return display ? (<react_native_1.View style={[styles.container, containerStyle]}>
      <react_native_1.View style={{ flex: 70 }}>
        <react_native_fast_image_1.default resizeMode={'contain'} style={{ width: '90%', height: '90%' }} source={{ uri: headLineLogo }}/>
      </react_native_1.View>
      <react_native_1.View style={{ flex: 300 }}>
        <react_native_marquee_ab_1.MarqueeVertical width={Scale_1.scale(390)} height={Scale_1.scale(100)} textList={cleanContents} numberOfLines={1} onTextClick={onPressHeadline} speed={60} onPressText={onPressHeadline}/>
      </react_native_1.View>
      <react_native_1.TouchableWithoutFeedback onPress={function () { return setDisplay(false); }}>
        <react_native_1.View style={styles.closeButton}>
          <react_native_elements_1.Icon type={'antdesign'} name={'close'} color={'#ffffff'} size={Scale_1.scale(12)}/>
        </react_native_1.View>
      </react_native_1.TouchableWithoutFeedback>
    </react_native_1.View>) : null;
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 540 / 112,
        backgroundColor: '#ffffff',
        borderRadius: Scale_1.scale(15),
        paddingLeft: Scale_1.scale(15),
        paddingRight: Scale_1.scale(15),
        flexDirection: 'row',
        alignItems: 'center',
    },
    closeButton: {
        width: Scale_1.scale(20),
        aspectRatio: 1,
        backgroundColor: '#ff861b',
        position: 'absolute',
        top: Scale_1.scale(5),
        right: Scale_1.scale(5),
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Scale_1.scale(20),
        paddingTop: Scale_1.scale(2),
    },
});
exports.default = HeadlineBlock;
