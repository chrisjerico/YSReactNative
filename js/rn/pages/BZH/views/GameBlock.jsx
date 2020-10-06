"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Ionicons_1 = require("react-native-vector-icons/Ionicons");
var Scale_1 = require("../../../public/tools/Scale");
var GameBlock = function (_a) {
    var _b = _a.title, title = _b === void 0 ? '' : _b, containerStyle = _a.containerStyle, onPressTotal = _a.onPressTotal, renderGameContent = _a.renderGameContent;
    return (<react_native_1.View style={[styles.container, containerStyle]}>
      <react_native_1.View style={styles.headerConatiner}>
        <react_native_1.View style={styles.titleContainer}>
          <react_native_1.View style={styles.titlePillar}/>
          <react_native_1.Text style={styles.title}>{title}</react_native_1.Text>
        </react_native_1.View>
        <react_native_1.TouchableWithoutFeedback onPress={onPressTotal}>
          <react_native_1.View style={styles.titleContainer}>
            <react_native_1.Text style={[styles.title, { color: '#e53333' }]}>{'全部 '}</react_native_1.Text>
            <Ionicons_1.default name={'ios-arrow-forward'} size={Scale_1.scale(18)} color={'#e53333'} style={{ marginTop: Scale_1.scale(3) }}/>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>
      </react_native_1.View>
      {renderGameContent && renderGameContent()}
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        paddingHorizontal: Scale_1.scale(20),
        backgroundColor: '#ffffff',
        paddingBottom: Scale_1.scale(20),
        paddingTop: Scale_1.scale(10),
    },
    headerConatiner: {
        width: '100%',
        aspectRatio: 11.8,
        borderColor: '#f2f2f2',
        borderBottomWidth: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gamesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    title: {
        fontSize: Scale_1.scale(23),
    },
    titlePillar: {
        width: Scale_1.scale(5.5),
        height: '110%',
        backgroundColor: '#e53333',
        marginRight: Scale_1.scale(10),
        borderRadius: Scale_1.scale(10),
        marginTop: Scale_1.scale(3),
    },
    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Scale_1.scale(10),
    },
});
exports.default = GameBlock;
