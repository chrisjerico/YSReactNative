"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var react_native_1 = require("react-native");
var useRandomString_1 = require("../../hooks/useRandomString");
var RandomText = function (_a) {
    var style = _a.style;
    var value = useRandomString_1.default('200000000', 2000000000, 2999999999);
    return <react_native_1.Text style={style}>{value}</react_native_1.Text>;
};
exports.default = RandomText;
