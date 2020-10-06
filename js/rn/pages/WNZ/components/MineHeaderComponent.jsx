"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useMineHeader_1 = require("../../../public/hooks/tars/useMineHeader");
var HomeHeader_1 = require("../views/HomeHeader");
var MineHeaderComponent = function (props) {
    var showBackBtn = useMineHeader_1.default().showBackBtn;
    return <HomeHeader_1.default {...props} showBackBtn={showBackBtn}/>;
};
exports.default = MineHeaderComponent;
