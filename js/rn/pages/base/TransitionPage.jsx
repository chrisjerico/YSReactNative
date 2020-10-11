"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransitionPage = void 0;
var react_1 = require("react");
var react_native_1 = require("react-native");
var react_native_elements_1 = require("react-native-elements");
var RootNavigation_1 = require("../../public/navigation/RootNavigation");
var UGSkinManagers_1 = require("../../public/theme/UGSkinManagers");
// 过渡页面，每次切换都会先进这个页面再切换（优化了初次加载新页面时卡顿的体验）
exports.TransitionPage = function (props) {
    var setProps = props.setProps;
    react_1.useEffect(function () {
        setProps({
            backgroundColor: ['#ddd', '#ddd'],
            navbarOpstions: { backgroundColor: 'transparent', hideUnderline: true, back: true },
            didFocus: function (p) {
                if (!p)
                    return;
                var j = p.jumpTo, pushTo = p.pushTo, props = p.props;
                if (j) {
                    RootNavigation_1.jumpTo(j, props);
                }
                else if (pushTo) {
                    RootNavigation_1.push(pushTo, props);
                }
            }
        });
    }, []);
    // 渲染内容
    return (<react_native_1.View>
      <react_native_elements_1.Text style={{ marginTop: 100, textAlign: 'center', fontSize: 15, color: UGSkinManagers_1.Skin1.textColor1 }}>正在加载中...</react_native_elements_1.Text>
    </react_native_1.View>);
};
