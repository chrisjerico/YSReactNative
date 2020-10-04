"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useMineHeader_1 = require("../../hooks/tars/useMineHeader");
var MineHeader_1 = require("../../views/tars/MineHeader");
var MineHeaderComponent = function (props) {
    var _a = useMineHeader_1.default(), showBackBtn = _a.showBackBtn, goBack = _a.goBack;
    return <MineHeader_1.default showBackBtn={showBackBtn} onPressBackBtn={goBack} {...props}/>;
};
exports.default = MineHeaderComponent;
