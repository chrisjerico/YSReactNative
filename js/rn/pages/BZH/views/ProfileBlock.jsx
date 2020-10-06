"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var BZHThemeColor_1 = require("../../../public/theme/colors/BZHThemeColor");
var Scale_1 = require("../../../public/tools/Scale");
var Avatar_1 = require("../../../public/views/tars/Avatar");
var LinearBadge_1 = require("../../../public/views/tars/LinearBadge");
var ReLoadBalanceComponent_1 = require("../../../public/components/tars/ReLoadBalanceComponent");
var ProfileBlock = function (_a) {
    var avatar = _a.avatar, balance = _a.balance, features = _a.features, renderFeature = _a.renderFeature, containerStyle = _a.containerStyle, name = _a.name, level = _a.level, onPressAvatar = _a.onPressAvatar;
    return (<react_native_1.View style={[styles.container, containerStyle]}>
      <react_native_1.View style={styles.redBlock}></react_native_1.View>
      <react_native_1.View style={styles.whiteBlock}>
        <react_native_1.View style={styles.profileContainer}>
          <Avatar_1.default uri={avatar} onPress={onPressAvatar}/>
          <react_native_1.View style={styles.moneyContainer}>
            <react_native_1.View style={{ flexDirection: 'row' }}>
              <react_native_1.Text style={styles.text}>{name}</react_native_1.Text>
              <LinearBadge_1.default containerStyle={{ borderRadius: Scale_1.scale(5), width: null }} textStyle={{ paddingHorizontal: Scale_1.scale(10) }} title={level} colors={['#0080FF', '#97CBFF']} showIcon={false}/>
            </react_native_1.View>
            <react_native_1.View style={{ flexDirection: 'row', alignItems: 'center', marginTop: Scale_1.scale(10) }}>
              <ReLoadBalanceComponent_1.default animatedContainerStyle={{ marginTop: Scale_1.scale(3) }} title={'余额 ¥ '} titleStyle={{ fontSize: Scale_1.scale(22) }} balance={balance} balanceStyle={{ color: '#000000', fontSize: Scale_1.scale(22) }} color={'#000000'} size={20}/>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.View style={styles.featureContainer}>{features.map(renderFeature)}</react_native_1.View>
      </react_native_1.View>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 500 / 250,
        backgroundColor: BZHThemeColor_1.BZHThemeColor.宝石红.homeContentSubColor,
        paddingBottom: Scale_1.scale(30),
    },
    whiteBlock: {
        height: '100%',
        backgroundColor: '#ffffff',
        borderRadius: Scale_1.scale(10),
        position: 'absolute',
        marginHorizontal: Scale_1.scale(15),
        top: Scale_1.scale(10),
        paddingTop: Scale_1.scale(15),
        width: '95%',
        alignSelf: 'center',
    },
    profileContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: Scale_1.scale(35),
    },
    featureContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: Scale_1.scale(35),
    },
    redBlock: {
        width: '100%',
        height: '50%',
        backgroundColor: BZHThemeColor_1.BZHThemeColor.宝石红.themeColor,
        borderBottomLeftRadius: Scale_1.scale(20),
        borderBottomRightRadius: Scale_1.scale(20),
    },
    text: {
        fontSize: Scale_1.scale(25),
        fontWeight: '400',
        paddingRight: Scale_1.scale(10),
    },
    moneyContainer: {
        flex: 1,
        paddingLeft: Scale_1.scale(30),
        justifyContent: 'flex-end',
        paddingBottom: Scale_1.scale(10),
    },
});
exports.default = ProfileBlock;
