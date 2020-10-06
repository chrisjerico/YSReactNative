"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var react_native_marquee_ab_1 = require("react-native-marquee-ab");
var Scale_1 = require("../../tools/Scale");
var AppDefine_1 = require("../../define/AppDefine");
var NoticeBlock = function (_a) {
    var logo = _a.logo, _b = _a.logoText, logoText = _b === void 0 ? '公 告' : _b, notices = _a.notices, containerStyle = _a.containerStyle, onPressNotice = _a.onPressNotice, iconContainerStyle = _a.iconContainerStyle, logoTextStyle = _a.logoTextStyle, textStyle = _a.textStyle, bgContainerStyle = _a.bgContainerStyle;
    var cleanContents = notices.map(function (notice, index) { return ({
        label: index.toString(),
        value: notice === null || notice === void 0 ? void 0 : notice.title,
        content: notice === null || notice === void 0 ? void 0 : notice.content,
    }); });
    return (<react_native_1.View style={[styles.container, containerStyle]}>
      <react_native_1.View style={[styles.iconContainer, iconContainerStyle]}>
        {logo ? <react_native_fast_image_1.default resizeMode={'stretch'} style={styles.iconImage} source={{ uri: logo }}/> : <react_native_1.Text style={[styles.logoTextStyle, logoTextStyle]}>{logoText}</react_native_1.Text>}
      </react_native_1.View>
      <react_native_1.View style={styles.noticContainer}>
        <react_native_marquee_ab_1.MarqueeHorizontal width={AppDefine_1.default.width * 0.85} height={null} textStyle={textStyle} textList={cleanContents} speed={60} onTextClick={onPressNotice} bgContainerStyle={bgContainerStyle}/>
      </react_native_1.View>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 540 / 50,
        backgroundColor: '#ffffff',
        borderRadius: Scale_1.scale(15),
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconContainer: {
        alignItems: 'center',
    },
    iconImage: {
        width: '100%',
        aspectRatio: 1,
    },
    noticContainer: {
        flex: 1,
        height: '100%',
        justifyContent: 'center',
    },
    textStyle: {
        color: '#999999',
        fontSize: Scale_1.scale(25),
    },
    logoTextStyle: {
        fontSize: Scale_1.scale(25),
    },
});
exports.default = NoticeBlock;
