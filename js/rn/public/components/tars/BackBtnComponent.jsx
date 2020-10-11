"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var useShowBackBtn_1 = require("../../hooks/tars/useShowBackBtn");
var RootNavigation_1 = require("../../navigation/RootNavigation");
var BackBtnComponent = function (_a) {
    var renderHeader = _a.renderHeader, homePage = _a.homePage;
    var _b = useShowBackBtn_1.default(), showBackBtn = _b.showBackBtn, userTab = _b.userTab;
    var onPressBackBtn = userTab
        ? RootNavigation_1.pop
        : function () {
            homePage && RootNavigation_1.navigate(homePage);
        };
    return renderHeader && renderHeader({ showBackBtn: showBackBtn, onPressBackBtn: onPressBackBtn });
};
exports.default = BackBtnComponent;
