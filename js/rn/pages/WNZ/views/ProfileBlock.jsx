"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Scale_1 = require("../../../public/tools/Scale");
var ProfileBlock = function (_a) {
    var curLevelInt = _a.curLevelInt, nextLevelInt = _a.nextLevelInt, curLevelTitle = _a.curLevelTitle, nextLevelTitle = _a.nextLevelTitle, taskRewardTotal = _a.taskRewardTotal, backgroundImage = _a.backgroundImage, signImage = _a.signImage, onPressSign = _a.onPressSign;
    var curLevelInt_f = parseFloat(curLevelInt) || 0;
    var nextLevelInt_f = parseFloat(nextLevelInt) || 0;
    var taskRewardTotal_f = parseFloat(taskRewardTotal) || 0;
    var rate = nextLevelInt_f ? taskRewardTotal_f / nextLevelInt_f : 0;
    var diffLevelInt_f = nextLevelInt_f - curLevelInt_f;
    return (<react_native_1.View style={styles.container}>
      <react_native_1.ImageBackground style={styles.image} source={{ uri: backgroundImage }} resizeMode={'stretch'}>
        <react_native_1.View style={{ flexDirection: 'row', flex: 1 }}>
          <react_native_1.View style={{ flex: 8 }}>
            <react_native_1.View style={styles.taskRewardTitleContainer}></react_native_1.View>
            <react_native_1.View style={{ flex: 2, paddingHorizontal: Scale_1.scale(20) }}>
              <react_native_1.View style={styles.experienceContainer}>
                <react_native_1.Text style={styles.experience}>{taskRewardTotal_f}</react_native_1.Text>
                <react_native_1.Text style={styles.growText}>{'成长值'}</react_native_1.Text>
              </react_native_1.View>
              <react_native_1.View style={{
        width: Scale_1.scale(340) * (rate > 1 ? 1 : rate),
        height: Scale_1.scale(2),
        backgroundColor: '#f6fb00',
    }}/>
              <react_native_1.View style={{
        flex: 1,
        flexDirection: 'row',
        paddingTop: Scale_1.scale(10),
        // width: scale(400),
        justifyContent: 'space-between',
    }}>
                <react_native_1.Text style={{ color: '#fdc990', fontSize: Scale_1.scale(15) }}>{curLevelTitle == nextLevelTitle ? '恭喜您已经是最高等级!' : '距离下一级还差' + diffLevelInt_f}</react_native_1.Text>
                <react_native_1.Text style={{ color: '#fdc990', fontSize: Scale_1.scale(15) }}>{taskRewardTotal_f + '/' + nextLevelInt_f}</react_native_1.Text>
              </react_native_1.View>
            </react_native_1.View>
          </react_native_1.View>
          <react_native_1.TouchableWithoutFeedback onPress={onPressSign}>
            <react_native_1.View style={styles.signContainer}>
              <react_native_1.ImageBackground style={{ width: '100%', aspectRatio: 1, justifyContent: 'center', alignItems: 'center' }} source={{ uri: signImage }}>
                <react_native_1.Text style={{ fontSize: Scale_1.scale(23), color: '#f86764' }}>{'签到'}</react_native_1.Text>
              </react_native_1.ImageBackground>
            </react_native_1.View>
          </react_native_1.TouchableWithoutFeedback>
        </react_native_1.View>
      </react_native_1.ImageBackground>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        aspectRatio: 500 / 210,
    },
    image: {
        width: '100%',
        height: '100%',
    },
    taskRewardTitleContainer: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: Scale_1.scale(20),
    },
    experienceContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'flex-end',
        paddingBottom: Scale_1.scale(10),
    },
    experience: {
        fontSize: Scale_1.scale(60),
        color: '#f6fb00',
        fontWeight: '800',
        paddingRight: Scale_1.scale(10),
    },
    growText: {
        color: '#fdc990',
        fontSize: Scale_1.scale(15),
        paddingBottom: Scale_1.scale(5),
    },
    signContainer: {
        flex: 3,
        justifyContent: 'center',
        paddingRight: Scale_1.scale(20),
    },
});
exports.default = ProfileBlock;
