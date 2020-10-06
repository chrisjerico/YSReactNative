"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var FontAwesome_1 = require("react-native-vector-icons/FontAwesome");
var Enum_1 = require("../../models/Enum");
var Scale_1 = require("../../tools/Scale");
var AnimatedRankComponent = function (_a) {
    var containerStyle = _a.containerStyle, iconTitleContainerStyle = _a.iconTitleContainerStyle, contentContainerStyle = _a.contentContainerStyle, titleConatinerStyle = _a.titleConatinerStyle, rankLists = _a.rankLists, _b = _a.duration, duration = _b === void 0 ? 1000 : _b, type = _a.type, iconTitleStyle = _a.iconTitleStyle, iconColor = _a.iconColor, contentTitleStyle = _a.contentTitleStyle;
    var listHeight = 180;
    var itemHeight = 40;
    var count = rankLists === null || rankLists === void 0 ? void 0 : rankLists.length;
    var height = react_1.useRef(new react_native_1.Animated.Value(listHeight)).current;
    var animated = function () {
        react_native_1.Animated.timing(height, {
            toValue: -(count * itemHeight),
            duration: (count + 4.5) * duration,
            useNativeDriver: false,
        }).start(function (_a) {
            var finished = _a.finished;
            if (finished) {
                height === null || height === void 0 ? void 0 : height.setValue(listHeight);
                animated();
            }
        });
    };
    react_1.useEffect(function () {
        height === null || height === void 0 ? void 0 : height.stopAnimation();
        height === null || height === void 0 ? void 0 : height.setValue(listHeight);
        animated();
    }, []);
    if (type == Enum_1.RankingListType.不顯示) {
        return null;
    }
    else {
        return (<react_native_1.View style={containerStyle}>
        <react_native_1.View style={[styles.iconTitleContainer, iconTitleContainerStyle]}>
          <FontAwesome_1.default name={'bar-chart'} size={Scale_1.scale(20)} color={iconColor}/>
          <react_native_1.Text style={[styles.iconText, iconTitleStyle]}>{type == Enum_1.RankingListType.中奖排行榜 ? '中奖排行榜' : '投注排行榜'}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.View style={[styles.contentContainer, contentContainerStyle]}>
          <react_native_1.View style={[styles.titleConatiner, titleConatinerStyle]}>
            <react_native_1.View style={styles.textContainer}>
              <react_native_1.Text style={[styles.title, contentTitleStyle]}>{'玩家'}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={styles.textContainer}>
              <react_native_1.Text style={[styles.title, contentTitleStyle]}>{'游戏'}</react_native_1.Text>
            </react_native_1.View>
            <react_native_1.View style={styles.textContainer}>
              <react_native_1.Text style={[styles.title, contentTitleStyle]}>{type == Enum_1.RankingListType.中奖排行榜 ? '中奖金额' : '投注金额'}</react_native_1.Text>
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.View style={[styles.listContainer, { height: listHeight }]}>
            <react_native_1.Animated.View style={{
            width: '100%',
            transform: [
                {
                    translateY: height,
                },
            ],
        }}>
              {rankLists === null || rankLists === void 0 ? void 0 : rankLists.map(function (item, index) {
            var coin = item.coin, type = item.type, username = item.username;
            return (<react_native_1.View key={index} style={styles.itemContainer}>
                    <react_native_1.View style={styles.itemTextContainer}>
                      <react_native_1.Text style={styles.item} numberOfLines={1}>
                        {username}
                      </react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={styles.itemTextContainer}>
                      <react_native_1.Text style={styles.item} numberOfLines={1}>
                        {type}
                      </react_native_1.Text>
                    </react_native_1.View>
                    <react_native_1.View style={styles.itemTextContainer}>
                      <react_native_1.Text style={styles.item} numberOfLines={1}>
                        {coin}
                      </react_native_1.Text>
                    </react_native_1.View>
                  </react_native_1.View>);
        })}
            </react_native_1.Animated.View>
          </react_native_1.View>
        </react_native_1.View>
      </react_native_1.View>);
    }
};
var styles = react_native_1.StyleSheet.create({
    iconTitleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Scale_1.scale(15),
        paddingVertical: Scale_1.scale(10),
    },
    contentContainer: {
        width: '100%',
        backgroundColor: '#ffffff',
        borderRadius: Scale_1.scale(15),
        paddingHorizontal: Scale_1.scale(15),
        marginTop: Scale_1.scale(10),
    },
    titleConatiner: {
        flexDirection: 'row',
        paddingVertical: Scale_1.scale(10),
        height: Scale_1.scale(50),
    },
    itemContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        height: 30,
        marginVertical: 5,
    },
    title: {
        paddingTop: Scale_1.scale(5),
        fontWeight: '500',
        fontSize: Scale_1.scale(25),
    },
    item: {
        color: '#EA0000',
        fontSize: Scale_1.scale(25),
    },
    iconText: {
        fontSize: Scale_1.scale(25),
        paddingLeft: Scale_1.scale(5),
    },
    listContainer: {
        marginTop: Scale_1.scale(5),
        marginBottom: Scale_1.scale(10),
        overflow: 'hidden',
    },
    textContainer: {
        flex: 1,
        alignItems: 'center',
    },
    itemTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
exports.default = AnimatedRankComponent;
