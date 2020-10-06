"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var ReLoadBalanceComponent_1 = require("../../../public/components/tars/ReLoadBalanceComponent");
var Scale_1 = require("../../../public/tools/Scale");
var Avatar_1 = require("../../../public/views/tars/Avatar");
var LinearBadge_1 = require("../../../public/views/tars/LinearBadge");
var ProfileBlock = function (_a) {
    var avatar = _a.avatar, _b = _a.name, name = _b === void 0 ? '' : _b, _c = _a.balance, balance = _c === void 0 ? '' : _c, level = _a.level, _d = _a.profileButtons, profileButtons = _d === void 0 ? [] : _d, renderProfileButton = _a.renderProfileButton, onPressDaySign = _a.onPressDaySign, onPressTaskCenter = _a.onPressTaskCenter, onPressAvatar = _a.onPressAvatar, showSignBadge = _a.showSignBadge;
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={{ flex: 1.25, flexDirection: 'row' }}>
        <react_native_1.View style={{ flex: 3.2, flexDirection: 'row', alignItems: 'center' }}>
          <Avatar_1.default onPress={onPressAvatar} uri={avatar} size={90}/>
          <react_native_1.View style={{ paddingLeft: Scale_1.scale(18) }}>
            <react_native_1.View style={styles.nameTextContainer}>
              <react_native_1.View style={{ maxWidth: Scale_1.scale(150) }}>
                <react_native_1.Text style={styles.nameText} numberOfLines={1}>
                  {name}
                </react_native_1.Text>
              </react_native_1.View>
              <LinearBadge_1.default title={level} colors={['#55c6ff', '#91daff']} showIcon={false} size={0.5} containerStyle={{
        height: Scale_1.scale(25),
        marginBottom: Scale_1.scale(5),
        width: null,
    }} textStyle={{ paddingHorizontal: Scale_1.scale(10) }}/>
            </react_native_1.View>
            <react_native_1.View style={{ flexDirection: 'row', flex: 0.9 }}>
              <ReLoadBalanceComponent_1.default title={'余额 : '} color={'#ff861b'} containerStyle={{ justifyContent: 'flex-start' }} size={20} balance={balance}/>
            </react_native_1.View>
          </react_native_1.View>
        </react_native_1.View>
        <react_native_1.View style={{ flex: 1, marginRight: Scale_1.scale(10) }}>
          <react_native_1.View style={{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
    }}>
            <react_native_1.TouchableWithoutFeedback onPress={onPressTaskCenter}>
              <react_native_fast_image_1.default source={{
        uri: 'http://test05.6yc.com/static/vuePublic/images/my/userInfo/missionhall.png',
    }} style={{
        width: '100%',
        aspectRatio: 3.6,
        marginBottom: Scale_1.scale(5),
    }} resizeMode={'contain'}/>
            </react_native_1.TouchableWithoutFeedback>
          </react_native_1.View>
          <react_native_1.View style={{ flex: 1, alignItems: 'flex-end' }}>
            {showSignBadge && (<react_native_1.TouchableWithoutFeedback onPress={onPressDaySign}>
                <react_native_fast_image_1.default source={{
        uri: 'http://test05.6yc.com/static/vuePublic/images/my/userInfo/dailysign.png',
    }} style={{
        width: '100%',
        aspectRatio: 3.6,
        marginTop: Scale_1.scale(5),
    }} resizeMode={'contain'}/>
              </react_native_1.TouchableWithoutFeedback>)}
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>
      <react_native_1.View style={styles.profileButtonsContainer}>{profileButtons.map(renderProfileButton)}</react_native_1.View>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 540 / 220,
        borderBottomWidth: 1,
        borderColor: '#d9d9d9',
        paddingHorizontal: Scale_1.scale(25),
    },
    shareContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    profileButtonsContainer: {
        flex: 0.8,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    shareIdText: {
        color: '#00A600',
    },
    nameText: {
        fontWeight: '500',
        fontSize: Scale_1.scale(20),
        paddingRight: Scale_1.scale(5),
        marginBottom: Scale_1.scale(5),
    },
    nameTextContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'flex-end',
        paddingBottom: Scale_1.scale(10),
    },
});
exports.default = ProfileBlock;
