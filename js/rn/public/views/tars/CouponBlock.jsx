"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Scale_1 = require("../../tools/Scale");
var List_1 = require("./List");
var CouponBlock = function (_a) {
    var visible = _a.visible, containerStyle = _a.containerStyle, _b = _a.coupons, coupons = _b === void 0 ? [] : _b, renderCoupon = _a.renderCoupon, onPressMore = _a.onPressMore, listContainerStyle = _a.listContainerStyle, titleContainerStyle = _a.titleContainerStyle, titleStyle = _a.titleStyle;
    if (visible) {
        return (<react_native_1.View style={[styles.container, containerStyle]}>
        <react_native_1.View style={[styles.titleContainer, titleContainerStyle]}>
          <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <react_native_1.Image style={{ width: Scale_1.scale(25), height: Scale_1.scale(25), tintColor: '#000000', marginRight: Scale_1.scale(5), marginBottom: Scale_1.scale(5) }} source={{ uri: '礼品-(1)' }}/>
            <react_native_1.Text style={[{ fontSize: Scale_1.scale(25) }, titleStyle]}>{'优惠活动'}</react_native_1.Text>
          </react_native_1.View>
          <react_native_1.TouchableWithoutFeedback onPress={onPressMore}>
            <react_native_1.Text style={[{ fontSize: Scale_1.scale(25) }, titleStyle]}>{'查看更多>>'}</react_native_1.Text>
          </react_native_1.TouchableWithoutFeedback>
        </react_native_1.View>
        <List_1.default uniqueKey={'CouponBlock'} style={[styles.listContainer, listContainerStyle]} data={coupons} renderItem={renderCoupon} removeClippedSubviews={true}/>
      </react_native_1.View>);
    }
    else {
        return null;
    }
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
    },
    listContainer: {
        width: '100%',
        backgroundColor: '#ffffff',
        paddingHorizontal: Scale_1.scale(15),
        paddingBottom: Scale_1.scale(20),
    },
    titleContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        padding: Scale_1.scale(20),
    },
});
exports.default = CouponBlock;
