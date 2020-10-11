"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var AntDesign_1 = require("react-native-vector-icons/AntDesign");
var Scale_1 = require("../../../public/tools/Scale");
var MineHeader = function (_a) {
    var _b = _a.showRightTitle, showRightTitle = _b === void 0 ? false : _b, onPressRightTitle = _a.onPressRightTitle, title = _a.title, renderHeader = _a.renderHeader, _c = _a.showBackBtn, showBackBtn = _c === void 0 ? false : _c, onPressBackBtn = _a.onPressBackBtn, rightTitle = _a.rightTitle, _d = _a.backBtnColor, backBtnColor = _d === void 0 ? '#ffffff' : _d;
    return (<react_native_1.View style={styles.container}>
      {showBackBtn ? (<react_native_1.TouchableWithoutFeedback onPress={onPressBackBtn}>
          <react_native_1.View style={{ flex: 1, alignItems: 'flex-start', height: '100%', justifyContent: 'center' }}>
            <AntDesign_1.default name={'left'} color={backBtnColor} size={Scale_1.scale(25)}/>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>) : (<react_native_1.View style={{ flex: 1 }}/>)}
      {renderHeader ? renderHeader() : <DefaultHeader title={title} rightTitle={rightTitle} showRightTitle={showRightTitle} onPressRightTitle={onPressRightTitle}/>}
    </react_native_1.View>);
};
var DefaultHeader = function (_a) {
    var title = _a.title, showRightTitle = _a.showRightTitle, onPressRightTitle = _a.onPressRightTitle, rightTitle = _a.rightTitle;
    return (<>
      <react_native_1.View style={{ flex: 1, alignItems: 'center' }}>
        <react_native_1.Text style={styles.headerTitle}>{title}</react_native_1.Text>
      </react_native_1.View>
      {showRightTitle ? (<react_native_1.TouchableWithoutFeedback onPress={onPressRightTitle}>
          <react_native_1.View style={{ flex: 1, alignItems: 'flex-end', height: '100%', justifyContent: 'center' }}>
            <react_native_1.Text style={styles.rightTextStyle}>{rightTitle !== null && rightTitle !== void 0 ? rightTitle : '客服'}</react_native_1.Text>
          </react_native_1.View>
        </react_native_1.TouchableWithoutFeedback>) : (<react_native_1.View style={{ flex: 1 }}/>)}
    </>);
};
var styles = react_native_1.StyleSheet.create({
    headerTitle: {
        color: '#ffffff',
        fontSize: Scale_1.scale(25),
        fontWeight: '500',
    },
    rightTextStyle: {
        color: '#ffffff',
        fontSize: Scale_1.scale(22),
    },
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
});
exports.default = MineHeader;
