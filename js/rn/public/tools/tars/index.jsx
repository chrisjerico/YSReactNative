"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_native_1 = require("react-native");
var AppDefine_1 = require("../../define/AppDefine");
var OCHelper_1 = require("../../define/OCHelper/OCHelper");
var Enum_1 = require("../../models/Enum");
var Scale_1 = require("../Scale");
var ToastUtils_1 = require("../ToastUtils");
exports.validPassword = function (password, pass_limit) {
    if (password) {
        if (pass_limit == Enum_1.PasswordStrength.不限制) {
            return true;
        }
        else {
            if (pass_limit == Enum_1.PasswordStrength.数字字母) {
                return /^(?=.*\d)(?=.*[a-zA-Z])/.test(password);
            }
            else if ([pass_limit == Enum_1.PasswordStrength.数字字母字符]) {
                return /^(?=.*\d)(?=.*[a-zA-Z])(?=.*\W)/.test(password);
            }
            else {
                return false;
            }
        }
    }
    else {
        return false;
    }
};
exports.ToastSuccess = function (msg) {
    var msgString = JSON.stringify(msg).slice(1, -1);
    switch (react_native_1.Platform.OS) {
        case 'ios':
            OCHelper_1.OCHelper.call('SVProgressHUD.showSuccessWithStatus:', [msgString]);
            break;
        case 'android':
            ToastUtils_1.Toast(msgString);
            break;
    }
};
exports.ToastError = function (msg) {
    var msgString = JSON.stringify(msg).slice(1, -1);
    switch (react_native_1.Platform.OS) {
        case 'ios':
            OCHelper_1.OCHelper.call('SVProgressHUD.showErrorWithStatus:', [msgString]);
            break;
        case 'android':
            ToastUtils_1.Toast(msgString);
            break;
    }
};
exports.ToastStatus = function (msg) {
    var msgString = JSON.stringify(msg).slice(1, -1);
    switch (react_native_1.Platform.OS) {
        case 'ios':
            OCHelper_1.OCHelper.call('SVProgressHUD.showWithStatus:', [msgString]);
            break;
        case 'android':
            ToastUtils_1.Toast(msgString);
            break;
    }
};
exports.useHtml5Image = function (host) {
    if (host === void 0) { host = AppDefine_1.default.host; }
    var getHtml5Image = function (id, path, type) {
        if (type === void 0) { type = 'png'; }
        if (id) {
            return host + '/views/mobileTemplate/' + (id === null || id === void 0 ? void 0 : id.toString()) + '/images/' + path + '.' + type;
        }
        else {
            return host + '/images/' + path + '.' + type;
        }
    };
    return { getHtml5Image: getHtml5Image };
};
exports.getIbbImage = function (path) {
    return 'https://i.ibb.co/' + path + '.png';
};
exports.getActivityPosition = function (position) {
    if (position == 1) {
        return { left: 0, top: Scale_1.scale(100) };
    }
    else if (position == 2) {
        return { left: 0, bottom: Scale_1.scale(100) };
    }
    else if (position == 3) {
        return { right: 0, top: Scale_1.scale(100) };
    }
    else if (position == 4) {
        return { right: 0, bottom: Scale_1.scale(100) };
    }
    else {
        return {};
    }
};
exports.stringToNumber = function (x) {
    var parsed = parseInt(x);
    if (isNaN(parsed)) {
        return 0;
    }
    return parsed;
};
