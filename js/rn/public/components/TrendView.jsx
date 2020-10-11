"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var React = require("react");
var react_1 = require("react");
var ChunkArr_1 = require("../tools/ChunkArr");
var getTrendData_1 = require("../utils/getTrendData");
var react_native_svg_1 = require("react-native-svg");
var APIRouter_1 = require("../network/APIRouter");
var ChooseGameModal_1 = require("./ChooseGameModal");
var PushHelper_1 = require("../define/PushHelper");
var BaseScreen_1 = require("../../pages/\u4E50\u6A59/component/BaseScreen");
var AppDefine_1 = require("../define/AppDefine");
var OCHelper_1 = require("../define/OCHelper/OCHelper");
var TrendView = function (_a) {
    var _b;
    var navigation = _a.navigation;
    var _c = react_1.useState(), trendData = _c[0], setTrendData = _c[1];
    var _d = react_1.useState([]), headerArr = _d[0], setHeaderArr = _d[1];
    var screenWidth = react_native_1.Dimensions.get('screen').width;
    var itemWidth = screenWidth / 6 - 4;
    var _e = react_1.useState(false), showModal = _e[0], setShowModal = _e[1];
    var _f = react_1.useState(0), defaultNumber = _f[0], setDefaultNumber = _f[1];
    var _g = react_1.useState(defaultGame), currentGame = _g[0], setCurrentGame = _g[1];
    var _h = react_1.useState(false), loading = _h[0], setLoading = _h[1];
    react_1.useEffect(function () {
        getData();
    }, [defaultNumber, currentGame]);
    // useEffect(() => {
    //     // OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
    //     // const unsubscribe = navigation.addListener('focus', () => {
    //     //     OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
    //     //     console.log("123456")
    //     // }, []);
    //     OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
    //     // const _unsubscribe = navigation.addListener('blur', () => {
    //     //     OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
    //     //     console.log("123456")
    //     // }, []);
    //
    //     // Return the function to unsubscribe from the event so it gets removed on unmount
    //     // return _unsubscribe;
    // }, [])
    react_1.useEffect(function () {
        if (trendData) {
            setHeaderArr(ChunkArr_1.chunkArray(trendData.header, 6));
        }
    }, [trendData]);
    react_1.useEffect(function () {
        var unsubscribe = navigation.addListener('focus', function () {
            OCHelper_1.OCHelper.call('ReactNativeVC.setTabbarHidden:animated:', [true, true]);
        });
        return unsubscribe;
    }, []);
    var getData = function () {
        setLoading(true);
        APIRouter_1.default.getTrendData(currentGame.id.toString()).then(function (result) {
            setTrendData(getTrendData_1.getTrendData(defaultNumber, currentGame.gameType, result.data.data.list));
            setLoading(false);
        });
    };
    var getHeaderIndex = function (fromName, index) {
        switch (fromName) {
            case 'gdkl10':
            case 'xync':
            case 'xyft':
            case 'pk10':
            case 'pk10nn':
            case 'jsk3':
            case 'gd11x5':
                return index < 10 ? "0" + index : index;
            case 'pcdd':
            case 'cqssc':
            case 'qxc':
                return index < 11 ? "0" + (index - 1) : index - 1;
        }
    };
    return (<BaseScreen_1.BaseScreen style={{ backgroundColor: '#ffffff' }} screenName={'开奖走势'}>
      <react_native_1.View style={{ paddingVertical: 8, backgroundColor: '#f3f3f3' }}>
        {headerArr.map(function (item, index) {
        return (<react_native_1.View key={"btnView-" + index} style={{
            flexDirection: 'row',
            width: react_native_1.Dimensions.get('screen').width,
            marginTop: index != 0 ? 8 : 0,
        }}>
              {item.map(function (text, contentIndex) { return (<react_native_1.View key={index + "-" + contentIndex} style={{
            flex: 1 / item.length,
            alignItems: 'center',
        }}>
                  <react_native_1.TouchableOpacity style={{
            borderWidth: 1,
            borderRadius: 4,
            borderColor: '#999999',
            height: 32,
            marginHorizontal: 2,
            width: itemWidth,
            backgroundColor: defaultNumber == index * 6 + contentIndex ? '#f39b67' : 'rgba(255,255,255,0.2)',
        }} onPress={function () {
            setDefaultNumber(index * 6 + contentIndex);
        }}>
                    <react_native_1.Text style={{
            color: defaultNumber == index * 6 + contentIndex ? '#ffffff' : '#999999',
            fontSize: 15,
            marginVertical: 6,
            textAlign: 'center',
        }}>
                      {text}
                    </react_native_1.Text>
                  </react_native_1.TouchableOpacity>
                </react_native_1.View>); })}
            </react_native_1.View>);
    })}
      </react_native_1.View>
      <react_native_1.ScrollView bounces={false}>
        <react_native_1.ScrollView horizontal={true} bounces={false}>
          <react_native_1.View>
            <react_native_1.View style={{ flexDirection: 'row' }}>
              <react_native_1.View style={{ flexDirection: 'row', flex: 1 }}>
                {trendData === null || trendData === void 0 ? void 0 : trendData.data[0].map(function (item, index) {
        return index == 0 ? (<react_native_1.Text style={{
            backgroundColor: '#c2adac',
            borderWidth: 0.5,
            borderColor: '#ccc',
            color: '#ffffff',
            paddingVertical: 8,
            width: 120,
            textAlign: 'center',
        }}>
                      期数
                    </react_native_1.Text>) : (<react_native_1.Text key={"header-" + index} style={{
            textAlign: 'center',
            width: (screenWidth - 120) / 6,
            backgroundColor: '#c2adac',
            borderWidth: 0.5,
            borderColor: '#ccc',
            color: '#ffffff',
            paddingVertical: 8,
        }}>
                      {getHeaderIndex(currentGame.gameType, index)}
                    </react_native_1.Text>);
    })}
              </react_native_1.View>
            </react_native_1.View>
            {trendData === null || trendData === void 0 ? void 0 : trendData.data.map(function (item, index) { return (<react_native_1.View key={"row-" + index} style={{ flexDirection: 'row' }}>
                <react_native_1.View style={{ flexDirection: 'row', flex: 1 }}>
                  {item.map(function (data, i) {
        return i == 0 ? (<react_native_1.Text key={index + "-" + i} style={{
            backgroundColor: '#c2adac',
            borderWidth: 0.5,
            borderColor: '#ccc',
            color: '#ffffff',
            paddingVertical: 8,
            width: 120,
            textAlign: 'center',
        }}>
                        {data}
                      </react_native_1.Text>) : (<react_native_1.View style={{
            backgroundColor: '#d4d4ed',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
                        {typeof data === 'string' ? (<>
                            <react_native_1.View style={{
            width: 28,
            height: 28,
            backgroundColor: '#409fdc',
            borderRadius: 14,
            position: 'absolute',
        }}/>
                            <react_native_1.Text style={{
            height: 34.5,
            textAlign: 'center',
            width: (screenWidth - 120) / 6,
            borderWidth: 0.5,
            borderColor: '#ccc',
            color: '#ffffff',
            fontSize: 14,
            paddingVertical: 8,
        }}>
                              {data}
                            </react_native_1.Text>
                          </>) : (<react_native_1.Text style={{
            height: 34.5,
            textAlign: 'center',
            width: (screenWidth - 120) / 6,
            borderWidth: 0.5,
            borderColor: '#ccc',
            color: '#aaa',
            paddingVertical: 8,
            fontSize: 14,
        }}>
                            {data}
                          </react_native_1.Text>)}
                      </react_native_1.View>);
    })}
                </react_native_1.View>
              </react_native_1.View>); })}
            <>
              <react_native_1.View style={{ flexDirection: 'row' }}>
                {trendData === null || trendData === void 0 ? void 0 : trendData.totalTimes.map(function (item, index) {
        return index == 0 ? (<react_native_1.Text key={"header-" + index} style={{
            backgroundColor: '#c2adac',
            borderWidth: 0.5,
            borderColor: '#ccc',
            color: '#ffffff',
            paddingVertical: 8,
            width: 120,
            textAlign: 'center',
        }}>
                      {item}
                    </react_native_1.Text>) : (<react_native_1.Text key={"header-" + index} style={{
            textAlign: 'center',
            width: (screenWidth - 120) / 6,
            backgroundColor: '#c2adac',
            borderWidth: 0.5,
            borderColor: '#ccc',
            color: '#ffffff',
            paddingVertical: 8,
        }}>
                      {item}
                    </react_native_1.Text>);
    })}
              </react_native_1.View>
              <react_native_1.View style={{ flexDirection: 'row' }}>
                {trendData === null || trendData === void 0 ? void 0 : trendData.averageOmission.map(function (item, index) {
        return index == 0 ? (<react_native_1.Text key={"header-" + index} style={{
            backgroundColor: '#c2adac',
            borderWidth: 0.5,
            borderColor: '#ccc',
            color: '#ffffff',
            paddingVertical: 8,
            width: 120,
            textAlign: 'center',
        }}>
                      {item}
                    </react_native_1.Text>) : (<react_native_1.Text key={"header-" + index} style={{
            textAlign: 'center',
            width: (screenWidth - 120) / 6,
            backgroundColor: '#c2adac',
            borderWidth: 0.5,
            borderColor: '#ccc',
            color: '#ffffff',
            paddingVertical: 8,
        }}>
                      {item}
                    </react_native_1.Text>);
    })}
              </react_native_1.View>
              <react_native_1.View style={{ flexDirection: 'row' }}>
                {trendData === null || trendData === void 0 ? void 0 : trendData.maximumOmission.map(function (item, index) {
        return index == 0 ? (<react_native_1.Text key={"header-" + index} style={{
            backgroundColor: '#c2adac',
            borderWidth: 0.5,
            borderColor: '#ccc',
            color: '#ffffff',
            paddingVertical: 8,
            width: 120,
            textAlign: 'center',
        }}>
                      {item}
                    </react_native_1.Text>) : (<react_native_1.Text key={"header-" + index} style={{
            textAlign: 'center',
            width: (screenWidth - 120) / 6,
            backgroundColor: '#c2adac',
            borderWidth: 0.5,
            borderColor: '#ccc',
            color: '#ffffff',
            paddingVertical: 8,
        }}>
                      {item}
                    </react_native_1.Text>);
    })}
              </react_native_1.View>
              <react_native_1.View style={{ flexDirection: 'row' }}>
                {trendData === null || trendData === void 0 ? void 0 : trendData.maximumConnection.map(function (item, index) {
        return index == 0 ? (<react_native_1.Text key={"header-" + index} style={{
            backgroundColor: '#c2adac',
            borderWidth: 0.5,
            borderColor: '#ccc',
            color: '#ffffff',
            paddingVertical: 8,
            width: 120,
            textAlign: 'center',
        }}>
                      {item}
                    </react_native_1.Text>) : (<react_native_1.Text key={"header-" + index} style={{
            textAlign: 'center',
            width: (screenWidth - 120) / 6,
            backgroundColor: '#c2adac',
            borderWidth: 0.5,
            borderColor: '#ccc',
            color: '#ffffff',
            paddingVertical: 8,
        }}>
                      {item}
                    </react_native_1.Text>);
    })}
              </react_native_1.View>
            </>
          </react_native_1.View>
          {(trendData === null || trendData === void 0 ? void 0 : trendData.positionArr) && ((_b = trendData === null || trendData === void 0 ? void 0 : trendData.positionArr) === null || _b === void 0 ? void 0 : _b.length) > 0 && (<react_native_svg_1.default height={'100%'} width={'100%'} style={{ position: 'absolute', flex: 1 }}>
              {trendData === null || trendData === void 0 ? void 0 : trendData.positionArr.map(function (item, index) {
        return index != 0 && <react_native_svg_1.Line key={index} x1={item.x} y1={item.y} x2={trendData === null || trendData === void 0 ? void 0 : trendData.positionArr[index - 1].x} y2={trendData === null || trendData === void 0 ? void 0 : trendData.positionArr[index - 1].y} stroke="#409fdc" strokeWidth="1"/>;
    })}
            </react_native_svg_1.default>)}
        </react_native_1.ScrollView>
      </react_native_1.ScrollView>
      <react_native_1.View style={{ flexDirection: 'row' }}>
        <react_native_1.TouchableOpacity style={{ backgroundColor: '#d7213a', height: 44, width: 160, justifyContent: 'center' }} onPress={function () { return setShowModal(true); }}>
          <react_native_1.Text style={{
        textAlign: 'center',
        color: 'white',
        paddingHorizontal: 16,
    }}>
            {currentGame.title}
          </react_native_1.Text>
        </react_native_1.TouchableOpacity>
        <react_native_1.View style={{ flex: 1, flexDirection: 'row', paddingRight: 8, alignItems: 'center' }}>
          <react_native_1.View style={{ flex: 1 }}/>
          <react_native_1.TouchableOpacity style={{
        backgroundColor: '#e74d39',
        marginVertical: 6,
        width: 33,
        height: 26,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
    }} onPress={function () { return getData(); }}>
            <react_native_1.Image style={{ width: 20, height: 20 }} source={{ uri: 'https://test10.6yc.com/images/kj_refresh.png' }}/>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity style={{
        backgroundColor: '#e77d21',
        marginVertical: 6,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    }} onPress={function () { return setShowModal(true); }}>
            <react_native_1.Text style={{ color: 'white', paddingHorizontal: 8, paddingVertical: 6 }}>选择彩种</react_native_1.Text>
          </react_native_1.TouchableOpacity>
          <react_native_1.TouchableOpacity style={{
        backgroundColor: '#e74d39',
        marginVertical: 6,
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 4,
    }} onPress={function () { return PushHelper_1.default.pushCategory(1, currentGame.id); }}>
            <react_native_1.Text style={{ color: 'white', paddingHorizontal: 8, paddingVertical: 6 }}>去下注</react_native_1.Text>
          </react_native_1.TouchableOpacity>
        </react_native_1.View>
        <ChooseGameModal_1.ChooseGameModal setCurrentGame={function (game) {
        setDefaultNumber(0);
        setCurrentGame(game);
    }} setShowModal={setShowModal} showModal={showModal}/>
      </react_native_1.View>
      
      
      
      {loading && (<react_native_1.View style={{
        justifyContent: 'center',
        width: AppDefine_1.default.width,
        height: AppDefine_1.default.height,
        position: 'absolute',
        backgroundColor: 'rgba(0,0,0,0.5)',
    }}>
          <react_native_1.ActivityIndicator size={'small'} color={'white'}/>
        </react_native_1.View>)}
    </BaseScreen_1.BaseScreen>);
};
var defaultGame = {
    id: 50,
    changlong: false,
    title: '北京赛车(PK10)',
    name: 'pk10',
    sort: 11,
    cate: 6,
    open: 0,
    enable: '1',
    isSeal: '0',
    customise: '0',
    from_type: '0',
    isInstant: '0',
    lowFreq: '0',
    gameType: 'pk10',
    is_own: 0,
};
exports.default = TrendView;
