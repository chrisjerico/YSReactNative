"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var Scale_1 = require("../../../public/tools/Scale");
var factor = 1.3;
var LotteryBall = function (_a) {
    var _b = _a.score, score = _b === void 0 ? null : _b, _c = _a.size, size = _c === void 0 ? 35 : _c, _d = _a.color, color = _d === void 0 ? '#ff0000' : _d, _e = _a.text, text = _e === void 0 ? '' : _e, _f = _a.showMore, showMore = _f === void 0 ? false : _f, onPress = _a.onPress, _g = _a.square, square = _g === void 0 ? false : _g;
    return (<react_native_1.TouchableWithoutFeedback onPress={onPress}>
      <react_native_1.View style={showMore ? styles.showMoreContainer : styles.container}>
        <react_native_1.View style={[
        styles.circleConatiner,
        {
            height: Scale_1.scale(30 + size),
        },
    ]}>
          {showMore ? (<react_native_elements_1.Icon type={'antdesign'} name={'plus'} color={'#9D9D9D'}/>) : square ? (<react_native_1.View style={[
        styles.squareContainer,
        {
            width: size,
            backgroundColor: color,
        },
    ]}>
              <react_native_1.Text style={{ fontSize: Scale_1.scale(size * 0.6), color: '#ffffff' }}>{score}</react_native_1.Text>
            </react_native_1.View>) : (<react_native_1.View style={[
        styles.circle,
        {
            backgroundColor: color,
            width: Scale_1.scale(size * factor),
            aspectRatio: 1,
            borderRadius: Scale_1.scale(size * factor),
        },
    ]}>
              <react_native_1.View style={[
        styles.scoreContainer,
        {
            width: Scale_1.scale(size),
            aspectRatio: 1,
            borderRadius: Scale_1.scale(size),
        },
    ]}>
                <react_native_1.Text style={{ fontSize: Scale_1.scale(size * 0.6) }}>{score}</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>)}
        </react_native_1.View>
        <react_native_1.View style={styles.textContainer}>
          <react_native_1.Text>{text}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_1.TouchableWithoutFeedback>);
};
var styles = react_native_1.StyleSheet.create({
    squareContainer: {
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: Scale_1.scale(10),
    },
    container: {
        alignItems: 'center',
        justifyContent: 'space-around',
    },
    showMoreContainer: {
        width: Scale_1.scale(30),
        aspectRatio: 30 / 82,
        alignItems: 'center',
    },
    circleConatiner: {
        justifyContent: 'center',
    },
    circle: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    scoreContainer: {
        backgroundColor: '#ffffff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    textContainer: {
        height: Scale_1.scale(30),
    },
});
exports.default = LotteryBall;
