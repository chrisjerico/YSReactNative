"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var Scale_1 = require("../../../public/tools/Scale");
var HomeHeader = function (_a) {
    var logo = _a.logo;
    return (<react_native_1.View style={styles.container}>
      <react_native_fast_image_1.default source={{ uri: logo }} style={{ aspectRatio: 1, height: '100%', marginLeft: '2%' }} resizeMode={'contain'}/>
      <react_native_1.View style={{ width: '10%', height: '100%', justifyContent: 'space-evenly', alignItems: 'center', borderLeftWidth: Scale_1.scale(1), borderColor: '#95979f', marginLeft: '2%' }}>
        <react_native_1.Text style={{ color: '#cea458' }}>{'特别'}</react_native_1.Text>
        <react_native_1.Text style={{ color: '#cea458' }}>{'赞助'}</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.brandContainer}>
        <react_native_fast_image_1.default resizeMode={'contain'} style={styles.image} source={{ uri: 'https://a06frontweb.cathayfund.com/cdn/A06FM/img/sponsor_wgjj.26f0b33.png' }}/>
        <react_native_1.Text style={styles.title}>维冈竞技</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.brandContainer}>
        <react_native_fast_image_1.default resizeMode={'contain'} style={styles.image} source={{ uri: 'https://a06frontweb.cathayfund.com/cdn/A06FM/img/sponsor_lwks.8418f60.png' }}/>
        <react_native_1.Text style={styles.title}>勒沃库森</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.brandContainer}>
        <react_native_fast_image_1.default resizeMode={'contain'} style={styles.image} source={{ uri: 'https://a06frontweb.cathayfund.com/cdn/A06FM/img/sponsor_flmns.02406e3.png' }}/>
        <react_native_1.Text style={styles.title}>弗鲁米嫩塞</react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={styles.brandContainer}>
        <react_native_fast_image_1.default resizeMode={'contain'} style={styles.image} source={{ uri: 'http://test10.6yc.com/views/mobileTemplate/22/images/aggb.png' }}/>
        <react_native_1.Text style={styles.title}>奥格斯堡</react_native_1.Text>
      </react_native_1.View>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        aspectRatio: 7,
        backgroundColor: '#000000',
        alignItems: 'center',
        paddingBottom: Scale_1.scale(10),
    },
    title: {
        fontSize: Scale_1.scale(15),
        color: '#bbbbbb',
    },
    brandContainer: {
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        flex: 1,
        height: '100%',
    },
    image: { width: '40%', aspectRatio: 1 },
});
exports.default = HomeHeader;
