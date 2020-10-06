"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useRandomString = function (defaultValue, min, max) {
    var _a = react_1.useState("¥ " + defaultValue), value = _a[0], setValue = _a[1];
    react_1.useEffect(function () {
        var timer = setInterval(function () {
            getRandomString();
        }, 500);
        return (function () { return clearInterval(timer); });
    }, []);
    var getRandomString = function () {
        var num = (Math.floor(Math.random() * (max - min + 1)) + min).toFixed(2);
        setValue("¥ " + num);
    };
    return value;
};
exports.default = useRandomString;
