"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_fast_image_1 = require("react-native-fast-image");
var Scale_1 = require("../../tools/Scale");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var DefaultFlag = function (_a) {
    var center = _a.center, flagContainer = _a.flagContainer;
    if (center) {
        return (<react_native_1.View style={styles.centerFlagContainer}>
        <react_native_1.View style={styles.flag}>
          <react_native_1.Text style={styles.flagText}>{'热门'}</react_native_1.Text>
        </react_native_1.View>
      </react_native_1.View>);
    }
    else {
        return (<react_native_1.View style={[
            styles.flag,
            {
                position: 'absolute',
                right: 0,
                top: Scale_1.scale(5),
            },
            flagContainer
        ]}>
        <react_native_1.Text style={styles.flagText}>{'热门'}</react_native_1.Text>
      </react_native_1.View>);
    }
};
var GameButton = function (props) {
    var circleColor = props.circleColor, imageContainerStyle = props.imageContainerStyle, logo = props.logo, _a = props.title, title = _a === void 0 ? '' : _a, _b = props.subTitle, subTitle = _b === void 0 ? '' : _b, _c = props.showSubTitle, showSubTitle = _c === void 0 ? false : _c, onPress = props.onPress, containerStyle = props.containerStyle, titleStyle = props.titleStyle, subTitleStyle = props.subTitleStyle, titleContainerStyle = props.titleContainerStyle, _d = props.resizeMode, resizeMode = _d === void 0 ? 'contain' : _d, _e = props.enableCircle, enableCircle = _e === void 0 ? true : _e, showRightTopFlag = props.showRightTopFlag, showCenterFlag = props.showCenterFlag, flagIcon = props.flagIcon, showSecondLevelIcon = props.showSecondLevelIcon, secondLevelIconContainerStyle = props.secondLevelIconContainerStyle, _f = props.showUnReadMsg, showUnReadMsg = _f === void 0 ? false : _f, unreadMsg = props.unreadMsg, localLogo = props.localLogo, _g = props.useLocalLogo, useLocalLogo = _g === void 0 ? false : _g, flagContainer = props.flagContainer, circleContainerStyle = props.circleContainerStyle;
    return (<react_native_1.TouchableWithoutFeedback onPress={onPress}>
      <react_native_1.View style={[styles.conatiner, containerStyle]}>
        {enableCircle ? (<react_native_1.View style={[
        styles.circleContainer,
        {
            backgroundColor: circleColor ? circleColor : '#ACD6FF',
        },
        circleContainerStyle
    ]}>
            <react_native_1.View style={[styles.imageContainer, imageContainerStyle]}>
              <react_native_fast_image_1.default style={styles.image} source={useLocalLogo ? localLogo : { uri: logo }} resizeMode={resizeMode}/>
              {showCenterFlag &&
        (flagIcon ? (<react_native_fast_image_1.default source={{ uri: flagIcon }} style={[styles.image, { position: 'absolute' }]}/>) : (<DefaultFlag center={true}/>))}
              {showSecondLevelIcon && (<AntDesign_1.default name={'appstore1'} style={[styles.secondLevelIcon, secondLevelIconContainerStyle]} size={Scale_1.scale(25)}/>)}
            </react_native_1.View>
          </react_native_1.View>) : (<react_native_1.View style={[styles.imageContainer, imageContainerStyle]}>
              <react_native_fast_image_1.default style={styles.image} source={useLocalLogo ? localLogo : { uri: logo }} resizeMode={resizeMode}/>
              {showCenterFlag &&
        (flagIcon ? (<react_native_fast_image_1.default source={{ uri: flagIcon }} style={[styles.image, { position: 'absolute' }]}/>) : (<DefaultFlag center={true}/>))}
              {showSecondLevelIcon && (<AntDesign_1.default name={'appstore1'} style={[styles.secondLevelIcon, secondLevelIconContainerStyle]} size={Scale_1.scale(25)}/>)}
            </react_native_1.View>)}

        <react_native_1.View style={[styles.titleContainer, titleContainerStyle]}>
          <react_native_1.View style={styles.textContainer}>
            <react_native_1.Text style={titleStyle} numberOfLines={1}>
              {title}
            </react_native_1.Text>
          </react_native_1.View>
          {showSubTitle && (<react_native_1.View style={styles.textContainer}>
              <react_native_1.Text style={[styles.subTitle, subTitleStyle]} numberOfLines={1}>
                {subTitle}
              </react_native_1.Text>
            </react_native_1.View>)}
        </react_native_1.View>
        {showUnReadMsg && <react_native_1.View style={styles.unReadMsgContainer}>
            <react_native_1.Text style={styles.unReadMsgText}>{unreadMsg > 99 ? 99 : unreadMsg}</react_native_1.Text>
          </react_native_1.View>}
        {showRightTopFlag &&
        (flagIcon ? (<react_native_1.View style={[styles.rightTopFlag, flagContainer]}>
              <react_native_fast_image_1.default style={{ width: '100%', height: '100%' }} source={{ uri: flagIcon }} resizeMode={'contain'}/>
            </react_native_1.View>) : (<DefaultFlag center={false} flagContainer={flagContainer}/>))}
      </react_native_1.View>
    </react_native_1.TouchableWithoutFeedback>);
};
var styles = react_native_1.StyleSheet.create({
    conatiner: {
        width: Scale_1.scale(150),
        alignItems: 'center',
        justifyContent: 'flex-start',
    },
    circleContainer: {
        width: '50%',
        aspectRatio: 1,
        borderRadius: Scale_1.scale(150),
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleContainer: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '100%',
        aspectRatio: 2,
    },
    subTitle: {
        color: '#999999',
    },
    imageContainer: {
        width: '75%',
        aspectRatio: 1,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    flag: {
        width: Scale_1.scale(50),
        backgroundColor: 'red',
        borderRadius: Scale_1.scale(5),
        justifyContent: 'center',
        alignItems: 'center',
        padding: Scale_1.scale(5)
    },
    flagText: {
        color: '#ffffff',
        fontSize: Scale_1.scale(18)
        // padding: scale(5),
    },
    image: {
        width: '100%',
        height: '100%',
    },
    rightTopFlag: {
        position: 'absolute',
        width: '30%',
        aspectRatio: 1,
        right: 0,
        top: 0,
    },
    centerFlagContainer: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
    },
    secondLevelIcon: {
        position: 'absolute',
        right: -Scale_1.scale(30),
        top: '50%'
    },
    unReadMsgContainer: {
        width: Scale_1.scale(25),
        aspectRatio: 1,
        borderRadius: Scale_1.scale(200),
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        right: Scale_1.scale(30),
        top: -Scale_1.scale(10),
    },
    unReadMsgText: { color: '#ffffff', fontSize: Scale_1.scale(15), textAlign: 'center' },
});
exports.default = GameButton;
