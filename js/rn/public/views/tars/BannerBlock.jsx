"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var Scale_1 = require("../../tools/Scale");
var UGSwiper_1 = require("../../widget/swp/UGSwiper");
var BannerBlock = function (_a) {
    var _b = _a.onlineNum, onlineNum = _b === void 0 ? 0 : _b, _c = _a.banners, banners = _c === void 0 ? [] : _c, renderBanner = _a.renderBanner, _d = _a.showOnlineNum, showOnlineNum = _d === void 0 ? true : _d, autoplayTimeout = _a.autoplayTimeout, _e = _a.visible, visible = _e === void 0 ? true : _e, containerStyle = _a.containerStyle, badgeStyle = _a.badgeStyle, _f = _a.showsPagination, showsPagination = _f === void 0 ? true : _f;
    if (visible) {
        return (<react_native_1.View style={[styles.container, containerStyle]}>
        <UGSwiper_1.default autoplay={autoplayTimeout > 0} autoplayTimeout={autoplayTimeout} showsPagination={showsPagination} paginationStyle={{
            bottom: 10,
            left: null,
            right: 10,
        }} dotColor={'#ffffff'} activeDotColor={'#fff000'}>
          {banners === null || banners === void 0 ? void 0 : banners.map(renderBanner)}
        </UGSwiper_1.default>
        {showOnlineNum && (<react_native_elements_1.Badge textStyle={{ fontSize: Scale_1.scale(18) }} badgeStyle={[
            styles.badge,
            {
                top: Scale_1.scale(-200),
                right: Scale_1.scale(10),
            },
            badgeStyle,
        ]} value={'当前在线:' + onlineNum}/>)}
      </react_native_1.View>);
    }
    else {
        return null;
    }
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 540 / 128,
    },
    badge: {
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.4)',
        borderColor: 'rgba(0,0,0,0)',
    },
});
exports.default = BannerBlock;
