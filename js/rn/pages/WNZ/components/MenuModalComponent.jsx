"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_modal_1 = require("react-native-modal");
var Scale_1 = require("../../../public/tools/Scale");
var List_1 = require("../../../public/views/tars/List");
var MenuModalComponent = function (_a, ref) {
    var menus = _a.menus, renderMenu = _a.renderMenu;
    var _b = react_1.useState(false), visible = _b[0], setVisible = _b[1];
    react_1.useImperativeHandle(ref, function () { return ({
        open: function () {
            setVisible(true);
        },
        close: function () {
            setVisible(false);
        },
    }); });
    return (<react_native_modal_1.default isVisible={visible} animationIn={'slideInRight'} animationOut={'slideOutRight'} style={{ width: '100%' }} animationInTiming={600} animationOutTiming={600} useNativeDriver={true} hideModalContentWhileAnimating={true}>
      <react_native_1.View style={{ flex: 1, flexDirection: 'row' }}>
        <react_native_1.TouchableWithoutFeedback onPress={function () {
        setVisible(false);
    }}>
          <react_native_1.View style={{ flex: 1 }}/>
        </react_native_1.TouchableWithoutFeedback>
        <react_native_1.View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)' }}>
          <List_1.default uniqueKey={'MenuModalComponent'} style={{ marginTop: Scale_1.scale(75), backgroundColor: '#ffffff', borderRadius: Scale_1.scale(10), marginRight: Scale_1.scale(35), marginBottom: Scale_1.scale(100) }} data={menus} renderItem={renderMenu}/>
        </react_native_1.View>
      </react_native_1.View>
    </react_native_modal_1.default>);
};
exports.default = react_1.forwardRef(MenuModalComponent);
