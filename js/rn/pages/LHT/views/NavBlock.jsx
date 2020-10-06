"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var ReLoadBalanceComponent_1 = require("../../../public/components/tars/ReLoadBalanceComponent");
var LHThemeColor_1 = require("../../../public/theme/colors/LHThemeColor");
var Scale_1 = require("../../../public/tools/Scale");
var Button_1 = require("../../../public/views/tars/Button");
var NavBlock = function (_a) {
    var renderNav = _a.renderNav, renderLottery = _a.renderLottery, onPressSmileLogo = _a.onPressSmileLogo, onPressAd = _a.onPressAd, onPressSavePoint = _a.onPressSavePoint, onPressGetPoint = _a.onPressGetPoint, _b = _a.date, date = _b === void 0 ? 'date' : _b, _c = _a.navs, navs = _c === void 0 ? [] : _c, _d = _a.lotterys, lotterys = _d === void 0 ? [] : _d, _e = _a.advertisement, advertisement = _e === void 0 ? '' : _e, _f = _a.lotteryLogo, lotteryLogo = _f === void 0 ? '' : _f, _g = _a.customerServiceLogo, customerServiceLogo = _g === void 0 ? '' : _g, containerStyle = _a.containerStyle, balance = _a.balance, renderAd = _a.renderAd, balanceLogo = _a.balanceLogo;
    return (<react_native_1.View style={[styles.container, containerStyle]}>
      <react_native_1.View style={styles.topContainer}>
        <react_native_1.View style={styles.topLeftContainer}>
          <react_native_1.Text>{'余额'}</react_native_1.Text>
          <react_native_fast_image_1.default style={styles.balanceLogo} source={{ uri: balanceLogo }}/>
          <ReLoadBalanceComponent_1.default color={'#ff861b'} balance={balance}/>
        </react_native_1.View>
        <react_native_1.View style={styles.topRightContainer}>
          <Button_1.default title={'充值'} containerStyle={[styles.button, { backgroundColor: '#ff8610' }]} titleStyle={styles.title} onPress={onPressSavePoint}/>
          <Button_1.default title={'提现'} containerStyle={[styles.button, { backgroundColor: LHThemeColor_1.LHThemeColor.六合厅.themeColor }]} titleStyle={styles.title} onPress={onPressGetPoint}/>
          <react_native_1.TouchableWithoutFeedback onPress={onPressSmileLogo}>
            <react_native_1.View style={styles.smileImageContainer}>
              <react_native_fast_image_1.default style={styles.smileImage} source={{
        uri: customerServiceLogo,
    }}/>
            </react_native_1.View>
          </react_native_1.TouchableWithoutFeedback>
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.View style={styles.titleContainer}>
        <react_native_1.View style={styles.titleLeftContainer}>
          <react_native_fast_image_1.default style={styles.lotteryLogo} source={{ uri: lotteryLogo }}/>
          <react_native_1.Text style={{ paddingLeft: Scale_1.scale(5) }}>{'六合彩推荐资讯'}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={styles.awardsContainer}>
          <react_native_1.Text style={styles.awardsText}>{'第 '}</react_native_1.Text>
          <react_native_1.Text style={[styles.awardsText, { color: '#ff861b' }]}>{date}</react_native_1.Text>
          <react_native_1.Text style={styles.awardsText}>{' 期开奖结果'}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.View style={styles.lotterysCintainer}>{lotterys.map(renderLottery)}</react_native_1.View>
      {renderAd ? (renderAd()) : (<react_native_1.TouchableWithoutFeedback onPress={onPressAd}>
          <react_native_1.View style={{ flex: 90, alignItems: 'center' }}>
            <react_native_fast_image_1.default resizeMode={'contain'} style={styles.adImage} source={{ uri: advertisement }}/>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>)}
      <react_native_1.View style={styles.navsContainer}>{navs === null || navs === void 0 ? void 0 : navs.map(renderNav)}</react_native_1.View>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: Scale_1.scale(15),
        paddingHorizontal: Scale_1.scale(15),
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: 1,
        paddingVertical: Scale_1.scale(10),
    },
    topLeftContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    topRightContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
    },
    smileImageContainer: {
        width: '15%',
        aspectRatio: 1,
    },
    smileImage: {
        width: '100%',
        height: '100%',
    },
    button: {
        width: Scale_1.scale(70),
        aspectRatio: 2,
        borderRadius: Scale_1.scale(25),
        marginRight: Scale_1.scale(10),
    },
    title: {
        fontSize: Scale_1.scale(20),
        color: '#ffffff',
    },
    titleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: Scale_1.scale(10),
    },
    titleLeftContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    awardsContainer: {
        flex: 1,
        backgroundColor: '#eeeeee',
        aspectRatio: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: Scale_1.scale(20),
    },
    lotteryLogo: {
        width: '10%',
        aspectRatio: 1,
        marginHorizontal: Scale_1.scale(5),
    },
    adImage: {
        width: '95%',
        aspectRatio: 5,
    },
    navsContainer: {
        flex: 270,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    lotterysCintainer: {
        flex: 90,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    awardsText: {
        fontWeight: '600',
    },
    balanceLogo: {
        width: Scale_1.scale(22),
        aspectRatio: 1,
        marginHorizontal: Scale_1.scale(5),
    },
});
exports.default = NavBlock;
