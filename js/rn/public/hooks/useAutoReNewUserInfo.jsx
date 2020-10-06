"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var IGlobalStateHelper_1 = require("../../redux/store/IGlobalStateHelper");
var useAutoRenewUserInfo = function (navigation) {
    react_1.useEffect(function () {
        var unsubscribe = navigation.addListener('focus', function () {
            IGlobalStateHelper_1.updateUserInfo();
        });
        return unsubscribe;
    }, []);
    return [];
};
exports.default = useAutoRenewUserInfo;
