"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useRerender = function () {
    var _a = react_1.useState(false), state = _a[0], setState = _a[1];
    var rerender = function () {
        setState(!state);
    };
    return {
        rerender: rerender
    };
};
exports.default = useRerender;
