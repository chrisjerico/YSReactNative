"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var Scale_1 = require("../../../public/tools/Scale");
var ToolBlock = function (_a) {
    var tools = _a.tools, renderTool = _a.renderTool, title = _a.title, contentContainer = _a.contentContainer;
    return (<react_native_1.View style={styles.container}>
      <react_native_1.View style={{
        width: '100%',
        backgroundColor: '#ffffff',
        borderTopLeftRadius: Scale_1.scale(5),
        borderTopRightRadius: Scale_1.scale(5),
        aspectRatio: 500 / 50,
        justifyContent: 'center',
        borderBottomColor: '#d9d9d9',
        borderBottomWidth: Scale_1.scale(0.1),
    }}>
        <react_native_1.Text style={{
        paddingLeft: Scale_1.scale(25),
        fontWeight: '500',
        fontSize: Scale_1.scale(20),
    }}>
          {title}
        </react_native_1.Text>
      </react_native_1.View>
      <react_native_1.View style={[styles.contentContainer, contentContainer]}>{tools === null || tools === void 0 ? void 0 : tools.map(renderTool)}</react_native_1.View>
    </react_native_1.View>);
};
var styles = react_native_1.StyleSheet.create({
    container: {
        width: '100%',
        paddingHorizontal: Scale_1.scale(10),
        marginVertical: Scale_1.scale(8),
    },
    contentContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#ffffff',
        borderBottomLeftRadius: Scale_1.scale(5),
        borderBottomRightRadius: Scale_1.scale(5),
    },
});
exports.default = ToolBlock;
